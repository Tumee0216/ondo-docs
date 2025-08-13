"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Zap,
  Globe,
  Code,
  BookOpen,
  ArrowRight,
  Trash2,
  Edit,
  Gitlab,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  category: string;
  wordCount: number;
  readTime: number;
  sections: Array<{
    id: string;
    title: string;
    level: number;
    anchor: string;
    order: number;
  }>;
}

export default function HomePage() {
  const [category, setCategory] = useState("");
  const [readmeContent, setReadmeContent] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const result = await response.json();
      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.toLowerCase().includes("readme")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setReadmeContent(content);
        // Extract project name from README title
        const titleMatch = content.match(/^#\s+(.+)/m);
        if (titleMatch) {
          setProjectName(titleMatch[1]);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleGenerateDocumentation = async () => {
    if (!readmeContent || !projectName) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          content: readmeContent,
          description: projectDescription,
          category: category,
        }),
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/docs/${result.data.slug}`);
      } else {
        toast.error("Error creating project:", result.error);
        alert("Error creating project: " + result.error);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.slug !== slug));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/images/ondo-logo.png"
                alt="ONDO Logo"
                className="h-8"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Documentation Hub
                </h1>
                <p className="text-sm text-gray-600">
                  Automated documentation generation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/projects">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  All Projects
                </Button>
              </Link>
              <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                <Zap className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Button variant="outline" size="sm">
                <Gitlab className="w-4 h-4 mr-2" />
                GitLab
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your README into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                {" "}
                Beautiful Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Automatically generate professional, searchable documentation
              websites from your README files. Perfect for development teams who
              want beautiful docs without the hassle.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-black hover:bg-gray-800">
                <BookOpen className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                <Globe className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Documentation Hub?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built specifically for development teams who need professional
              documentation fast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Instant Generation</CardTitle>
                <CardDescription>
                  Upload your README and get a complete documentation website in
                  seconds
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Code Highlighting</CardTitle>
                <CardDescription>
                  Automatic syntax highlighting for all major programming
                  languages
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Responsive Design</CardTitle>
                <CardDescription>
                  Mobile-first design that looks perfect on all devices and
                  screen sizes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Documentation Generator */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Generate Your Documentation
              </h2>
              <p className="text-gray-600">
                Upload your README file or paste the content directly to get
                started
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  README to Documentation
                </CardTitle>
                <CardDescription>
                  Transform your project README into a professional
                  documentation website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input
                        id="project-name"
                        placeholder="Enter your project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="project-description">
                        Description (Optional)
                      </Label>
                      <Input
                        id="project-description"
                        placeholder="Brief description of your project"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="readme-upload">Upload README File</Label>
                      <div className="mt-2">
                        <Input
                          id="readme-upload"
                          type="file"
                          accept=".md,.txt"
                          onChange={handleFileUpload}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full mt-2 p-2 border rounded-md"
                      >
                        <option value="">Select category</option>
                        <option value="api">API</option>
                        <option value="tool">Tool</option>
                      </select>
                    </div>
                    {/* end  left side */}
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="readme-content">
                      Or Paste README Content Code
                    </Label>
                    <Textarea
                      id="readme-content"
                      placeholder="Paste your README content here..."
                      value={readmeContent}
                      onChange={(e) => setReadmeContent(e.target.value)}
                      className="min-h-[200px] font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleGenerateDocumentation}
                    disabled={!readmeContent || !projectName || isGenerating}
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Documentation
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Existing Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Documentation Projects
            </h2>
            <p className="text-gray-600">
              Manage and view your existing documentation
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No projects yet. Create your first documentation above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg truncate">
                          {project.name}
                        </CardTitle>
                        {/* category  */}
                        <p className="text-xs font-medium text-pink-600 uppercase tracking-wide mb-1">
                          {project.category || "Uncategorized"}
                        </p>

                        <CardDescription className="line-clamp-2">
                          {project.description || "No description provided"}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(`/docs/${project.slug}/edit`)
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.slug)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <span>{project.wordCount} words</span>
                        <span>{project.readTime} min read</span>
                        <span>{project.sections.length} sections</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Updated{" "}
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </div>
                      <Link href={`/docs/${project.slug}`}>
                        <Button variant="ghost" size="sm">
                          View Docs <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/images/ondo-logo.png"
                alt="ONDO Logo"
                className="h-6 brightness-0 invert"
              />
              <div>
                <p className="font-semibold">ONDO Documentation Hub</p>
                <p className="text-sm text-gray-400">
                  © 2024 ONDO. All rights reserved.
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Developed by Tumee</p>
              <p className="text-sm text-gray-400">
                Powered by Next.js & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
