"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo + site name */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <img src="/images/ondo-logo.png" alt="ONDO logo" />
            </Link>

            <h1 className="text-xl font-bold text-gray-900">README Page</h1>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* README content will be rendered here */}
        <article className="prose lg:prose-xl max-w-none">
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
                      Updated {new Date(project.updatedAt).toLocaleDateString()}
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
        </article>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-500 text-center">
          © 2025 ONDO Docs
        </div>
      </footer>
    </div>
  );
}
