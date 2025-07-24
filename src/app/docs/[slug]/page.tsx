"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Download, Share2, ArrowLeft, Menu, X, Code, FileText, Zap, Edit } from "lucide-react"
import Link from "next/link"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { useParams, useRouter } from "next/navigation"
import { useScrollSpy } from "@/hooks/use-scroll-spy"

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

export default function DocsPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Use scroll spy to track active section
  const sectionIds = project?.sections?.map(s => s.anchor) || []
  const activeSection = useScrollSpy(sectionIds)

  useEffect(() => {
    if (params.slug) {
      fetchProject(params.slug as string)
    }
  }, [params.slug])

  const fetchProject = async (slug: string) => {
    try {
      const response = await fetch(`/api/projects/${slug}`)
      const result = await response.json()

      if (result.success) {
        setProject(result.data)
      } else {
        console.error("Project not found")
      }
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${project?.name} Documentation`,
        text: "Check out this documentation",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documentation...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Documentation Not Found</h2>
            <p className="text-gray-600 mb-6">The requested documentation could not be found.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 print:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>

            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/ondo-logo.png" alt="ONDO Logo" className="h-6" />
              <div className="hidden sm:block">
                <h1 className="font-semibold text-gray-900">{project.name}</h1>
                <p className="text-xs text-gray-500">Documentation</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            <Button variant="outline" size="sm" onClick={() => router.push(`/docs/${project.slug}/edit`)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>

            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>

            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-40 w-80 bg-gray-50 border-r border-gray-200 
          transform transition-transform duration-200 ease-in-out print:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-5 h-5 text-pink-600" />
                  <h2 className="font-semibold text-gray-900">Documentation</h2>
                </div>
                <p className="text-sm text-gray-600">Updated {new Date(project.updatedAt).toLocaleDateString()}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-900">{project.wordCount}</div>
                  <div className="text-xs text-gray-600">Words</div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-900">{project.sections.length}</div>
                  <div className="text-xs text-gray-600">Sections</div>
                </div>
              </div>

              {/* Table of Contents */}
              <TableOfContents
                sections={project.sections}
                activeSection={activeSection}
                onSectionClick={() => {
                  setSidebarOpen(false)
                }}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Document Header */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.name}</h1>
                  <p className="text-gray-600">
                    {project.description || "Professional documentation generated from README"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Zap className="w-3 h-3 mr-1" />
                    Auto-generated
                  </Badge>
                  <Badge variant="outline">
                    <Code className="w-3 h-3 mr-1" />
                    Markdown
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{project.wordCount} words</span>
                <span>{project.readTime} min read</span>
                <span>Last updated {new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Rendered Content */}
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={project.content} />
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src="/images/ondo-logo.png" alt="ONDO Logo" className="h-6" />
                  <div className="text-sm text-gray-600">
                    <p>© 2024 ONDO. All rights reserved.</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>Generated: {new Date(project.createdAt).toLocaleString()}</p>
                  <p>Documentation Hub v1.0</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - On This Page */}
        <aside className="hidden xl:block w-64 p-6 print:hidden">
          <div className="sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">On This Page</h3>
            <TableOfContents
              sections={project.sections}
              activeSection={activeSection}
              onSectionClick={() => {}}
              compact
            />
          </div>
        </aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden print:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
