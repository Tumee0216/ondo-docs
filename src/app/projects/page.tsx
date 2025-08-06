"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Calendar,
  Clock,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Project {
  id: string
  name: string
  slug: string
  description: string | null
  content: string
  createdAt: string
  updatedAt: string
  wordCount: number
  readTime: number
  sections: Array<{
    id: string
    title: string
    level: number
    anchor: string
    order: number
  }>
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const result = await response.json()

      if (result.success) {
        setProjects(result.data)
      } else {
        toast.error("Failed to fetch projects:", result.error)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(project.id)

    try {
      const response = await fetch(`/api/projects/${project.slug}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        setProjects(projects.filter(p => p.id !== project.id))
      } else {
        toast.error("Failed to delete project:", result.error)
        alert("Failed to delete project. Please try again.")
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("Failed to delete project. Please try again.")
    } finally {
      setIsDeleting(null)
    }
  }

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your documentation projects
              </p>
            </div>
            <Link href="/">
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              {searchQuery ? (
                <>
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                  <p className="text-gray-600 mb-6">
                    No projects match your search criteria.
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </>
              ) : (
                <>
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-600 mb-6">
                    Get started by creating your first documentation project.
                  </p>
                  <Link href="/">
                    <Button className="bg-pink-600 hover:bg-pink-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Project
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                        {project.name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {project.description || "No description provided"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{project.wordCount}</div>
                      <div className="text-xs text-gray-600">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{project.sections.length}</div>
                      <div className="text-xs text-gray-600">Sections</div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{project.readTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Link href={`/docs/${project.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/docs/${project.slug}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project)}
                      disabled={isDeleting === project.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {isDeleting === project.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        {filteredProjects.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        )}
      </div>
    </div>
  )
} 