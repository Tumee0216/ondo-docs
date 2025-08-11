import { type NextRequest, NextResponse } from "next/server"
import { getProject, updateProject, deleteProject } from "@/lib/db-utils"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const project = await getProject(slug)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    
    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const { name, content, description, category  } = await request.json()

    // Validate required fields
    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and content are required" }, 
        { status: 400 }
      )
    }

    // Validate content length
    if (content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content cannot be empty" }, 
        { status: 400 }
      )
    }

    // Check if project exists
    const existingProject = await getProject(slug)
    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" }, 
        { status: 404 }
      )
    }

    const project = await updateProject(slug, {
      name: name.trim(),
      content: content.trim(),
      description: description?.trim() || null,
      category: category?.trim() || "general11", 
    });
    
    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    await deleteProject(slug)

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
