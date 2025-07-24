import { prisma } from "./prisma"
import { generateAnchor } from "./utils"

export interface CreateProjectData {
  name: string
  content: string
  description?: string
}

export interface ProjectWithSections {
  id: string
  name: string
  slug: string
  description: string | null
  content: string
  createdAt: Date
  updatedAt: Date
  wordCount: number
  readTime: number
  sections: {
    id: string
    title: string
    level: number
    anchor: string
    order: number
  }[]
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function extractSections(content: string) {
  if (!content || typeof content !== 'string') {
    return []
  }

  const lines = content.split("\n")
  const sections: Array<{
    title: string
    level: number
    anchor: string
    order: number
  }> = []

  let order = 0
  const usedAnchors = new Set<string>()

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    if (trimmedLine.startsWith("#")) {
      const level = trimmedLine.match(/^#+/)?.[0].length || 1
      const title = trimmedLine.replace(/^#+\s*/, "").trim()
      
      if (title.length === 0) return // Skip empty headings
      
      // Generate anchor with conflict resolution
      const anchor = generateAnchor(title, order)
      
      // Resolve conflicts by adding number suffix
      let finalAnchor = anchor
      let counter = 1
      while (usedAnchors.has(finalAnchor)) {
        finalAnchor = `${anchor}-${counter}`
        counter++
      }
      usedAnchors.add(finalAnchor)

      sections.push({
        title,
        level: Math.min(level, 6), // Limit to h6 maximum
        anchor: finalAnchor,
        order: order++,
      })
    }
  })

  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log("Extracted sections:", sections)
  }

  return sections
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export async function createProject(data: CreateProjectData) {
  const slug = generateSlug(data.name)
  const sections = extractSections(data.content)
  const wordCount = data.content.split(/\s+/).length
  const readTime = calculateReadTime(data.content)

  // Check if slug already exists
  const existingProject = await prisma.project.findUnique({
    where: { slug },
  })

  let finalSlug = slug
  if (existingProject) {
    finalSlug = `${slug}-${Date.now()}`
  }

  const project = await prisma.project.create({
    data: {
      name: data.name,
      slug: finalSlug,
      description: data.description,
      content: data.content,
      wordCount,
      readTime,
      sections: {
        create: sections,
      },
    },
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
    },
  })

  return project
}

export async function getProject(slug: string): Promise<ProjectWithSections | null> {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
    },
  })

  return project
}

export async function getAllProjects() {
  const projects = await prisma.project.findMany({
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return projects
}

export async function updateProject(slug: string, data: Partial<CreateProjectData>) {
  const updateData: Record<string, unknown> = {}

  // Handle name change and slug generation
  if (data.name) {
    updateData.name = data.name
    const newSlug = generateSlug(data.name)
    
    // Check if the new slug would conflict with another project
    if (newSlug !== slug) {
      const existingProject = await prisma.project.findUnique({
        where: { slug: newSlug },
      })
      
      if (existingProject) {
        // Generate a unique slug with timestamp
        updateData.slug = `${newSlug}-${Date.now()}`
      } else {
        updateData.slug = newSlug
      }
    }
  }

  if (data.description !== undefined) {
    updateData.description = data.description
  }

  if (data.content) {
    updateData.content = data.content
    updateData.wordCount = data.content.split(/\s+/).length
    updateData.readTime = calculateReadTime(data.content)

    // Update sections
    const sections = extractSections(data.content)

    // Delete existing sections and create new ones
    await prisma.section.deleteMany({
      where: { project: { slug } },
    })

    updateData.sections = {
      create: sections,
    }
  }

  const project = await prisma.project.update({
    where: { slug },
    data: updateData,
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
    },
  })

  return project
}

export async function deleteProject(slug: string) {
  await prisma.project.delete({
    where: { slug },
  })
}
