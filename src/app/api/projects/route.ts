import { type NextRequest, NextResponse } from "next/server"
import { createProject, getAllProjects } from "@/lib/db-utils"

export async function POST(request: NextRequest) {
  try {
    const { name, content, description, category } = await request.json()


    if (!name || !content) {
      return NextResponse.json({ error: "Name and content are required" }, { status: 400 })
    }

    const project = await createProject({
      name,
      content,
      description,
      category,
      
    })

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Error creating projects11:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const projects = await getAllProjects()

    return NextResponse.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
