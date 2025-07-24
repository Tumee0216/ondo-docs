import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { content, projectName } = await request.json()

    if (!content || !projectName) {
      return NextResponse.json({ error: "Content and project name are required" }, { status: 400 })
    }

    // Here you could add additional processing:
    // - Parse and validate markdown
    // - Extract metadata
    // - Generate search index
    // - Store in database
    // - Generate additional formats

    const processedData = {
      id: Date.now().toString(),
      name: projectName,
      content: content,
      generatedAt: new Date().toISOString(),
      sections: extractSections(content),
      wordCount: content.split(/\s+/).length,
      estimatedReadTime: Math.ceil(content.split(/\s+/).length / 200), // ~200 words per minute
    }

    return NextResponse.json({
      success: true,
      data: processedData,
    })
  } catch (error) {
    console.error("Error generating documentation:", error)
    return NextResponse.json({ error: "Failed to generate documentation" }, { status: 500 })
  }
}

function extractSections(content: string) {
  const lines = content.split("\n")
  const sections: Array<{ title: string; level: number; id: string }> = []

  lines.forEach((line) => {
    if (line.startsWith("#")) {
      const level = line.match(/^#+/)?.[0].length || 1
      const title = line.replace(/^#+\s*/, "")
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

      sections.push({ title, level, id })
    }
  })

  return sections
}
