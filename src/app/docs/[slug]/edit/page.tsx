"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { KeyboardShortcutsHelp } from "@/components/keyboard-shortcuts-help"

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

export default function EditPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: ""
  })

  const fetchProject = useCallback(async (slug: string) => {
    try {
      const response = await fetch(`/api/projects/${slug}`)
      const result = await response.json()

      if (result.success) {
        setProject(result.data)
        setFormData({
          name: result.data.name,
          description: result.data.description || "",
          content: result.data.content
        })
      } else {
        console.error("Project not found")
        router.push("/")
      }
    } catch (error) {
      console.error("Error fetching project:", error)
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (params.slug) {
      fetchProject(params.slug as string)
    }
  }, [params.slug, fetchProject])

  const handleInputChange = (field: string, value: string) => {
    const newFormData = {
      ...formData,
      [field]: value
    }
    
    setFormData(newFormData)
    
    // Check if there are changes
    if (project) {
      const hasChanges = 
        newFormData.name !== project.name ||
        newFormData.description !== (project.description || "") ||
        newFormData.content !== project.content
      setHasChanges(hasChanges)
    }

    // Set up auto-save timer
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }
    
    const timer = setTimeout(() => {
      if (hasChanges && !isSaving) {
        handleSave()
      }
    }, 30000) // Auto-save after 30 seconds of inactivity
    
    setAutoSaveTimer(timer)
  }

  const handleSave = useCallback(async () => {
    if (!project || !hasChanges) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      const response = await fetch(`/api/projects/${project.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSaveStatus("success")
        setProject(result.data)
        setHasChanges(false)
        
        // Update form data to match the saved state
        setFormData({
          name: result.data.name,
          description: result.data.description || "",
          content: result.data.content
        })

        // Clear success message after 3 seconds
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
        console.error("Failed to save:", result.error)
      }
    } catch (error) {
      setSaveStatus("error")
      console.error("Error saving project:", error)
    } finally {
      setIsSaving(false)
    }
  }, [project, hasChanges, formData])

  const handleReset = useCallback(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || "",
        content: project.content
      })
      setHasChanges(false)
    }
  }, [project])

  const handlePreview = useCallback(() => {
    setIsPreviewMode(!isPreviewMode)
  }, [isPreviewMode])

  const handleDiscard = () => {
    if (hasChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to discard them?")) {
        router.push(`/docs/${params.slug}`)
      }
    } else {
      router.push(`/docs/${params.slug}`)
    }
  }

  // Use custom hooks
  useUnsavedChanges(hasChanges)
  useKeyboardShortcuts({
    onSave: handleSave,
    onPreview: handlePreview,
    onReset: handleReset,
    isSaving,
    hasChanges,
  })

  // Cleanup auto-save timer on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
    }
  }, [autoSaveTimer])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
            <p className="text-gray-600 mb-6">The requested project could not be found.</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleDiscard}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Docs
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">Edit Documentation</h1>
              <p className="text-sm text-gray-500">{project.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Save Status */}
            {saveStatus === "success" && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Saved successfully</span>
              </div>
            )}
            
            {saveStatus === "error" && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Save failed</span>
              </div>
            )}

            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreview}
            >
              {isPreviewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isPreviewMode ? "Hide Preview" : "Preview"}
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              disabled={!hasChanges}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>

            <KeyboardShortcutsHelp />

            <Button 
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-pink-600 hover:bg-pink-700"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Editor Panel */}
        <div className={`flex-1 flex flex-col ${isPreviewMode ? "w-1/2" : "w-full"}`}>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Project Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter project name"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Enter project description"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Documentation Content</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {formData.content.split(/\s+/).length} words
                      </Badge>
                      <Badge variant="outline">
                        {Math.ceil(formData.content.split(/\s+/).length / 200)} min read
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Write your documentation in Markdown format..."
                    className="min-h-[500px] font-mono text-sm"
                  />
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="font-medium mb-2">Markdown Tips:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Use # for main headings, ## for subheadings</li>
                      <li>• Use **bold** for emphasis</li>
                      <li>• Use `code` for inline code</li>
                      <li>• Use ``` for code blocks</li>
                      <li>• Use - or * for bullet points</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {isPreviewMode && (
          <div className="w-1/2 border-l border-gray-200 bg-white">
            <div className="p-6 overflow-y-auto h-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.name}</h2>
                <p className="text-gray-600">{formData.description || "No description provided"}</p>
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                  <span>{formData.content.split(/\s+/).length} words</span>
                  <span>{Math.ceil(formData.content.split(/\s+/).length / 200)} min read</span>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={formData.content} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 