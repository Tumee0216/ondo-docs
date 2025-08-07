"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { toast } from "sonner"

interface Section {
  id: string
  title: string
  level: number
  anchor: string
  order: number
}

interface TreeNode extends Section {
  children: TreeNode[]
}

interface TableOfContentsProps {
  sections: Section[]
  activeSection?: string
  onSectionClick?: (section: string) => void
  compact?: boolean
}

export function TableOfContents({ sections, activeSection, onSectionClick, compact = false }: TableOfContentsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  // Debug logging (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      toast.info(`TableOfContents sections: ${sections}`)
      toast.info(`Active section: ${activeSection}`)
    }
  }, [sections, activeSection])

  const handleSectionClick = (anchor: string) => {
    if (process.env.NODE_ENV === 'development') {
      toast.info(`Clicking section: ${anchor}`)
    }
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      if (process.env.NODE_ENV === 'development') {
        toast.warning(`Element not found for anchor: ${anchor}`)
      }
    }
    onSectionClick?.(anchor)
  }

  const toggleSection = (anchor: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(anchor)) {
      newExpanded.delete(anchor)
    } else {
      newExpanded.add(anchor)
    }
    setExpandedSections(newExpanded)
  }

  // Build hierarchy tree
  const buildHierarchy = (sections: Section[]) => {
    const tree: TreeNode[] = []
    const stack: TreeNode[] = []

    sections.forEach((section) => {
      const node: TreeNode = { ...section, children: [] }

      // Find the correct parent
      while (stack.length > 0 && stack[stack.length - 1].level >= section.level) {
        stack.pop()
      }

      if (stack.length === 0) {
        tree.push(node)
      } else {
        stack[stack.length - 1].children.push(node)
      }

      stack.push(node)
    })

    return tree
  }

  const renderTocItem = (section: TreeNode, depth: number = 0) => {
    const isActive = activeSection === section.anchor
    const hasChildren = section.children.length > 0
    const isExpanded = expandedSections.has(section.anchor)
    const indentLevel = compact ? Math.min(depth, 1) : depth

    return (
      <div key={section.id}>
        <div
          className={`
            flex items-center py-2 px-3 rounded-lg cursor-pointer transition-colors
            ${isActive ? "bg-pink-100 text-pink-800 border-l-2 border-pink-500" : "text-gray-700 hover:bg-gray-100"}
            ${indentLevel > 0 ? `ml-${indentLevel * 4}` : ""}
          `}
          onClick={() => handleSectionClick(section.anchor)}
        >
          {hasChildren && !compact && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleSection(section.anchor)
              }}
              className="mr-2 p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
          )}

          <span
            className={`
              text-sm truncate flex-1
              ${section.level === 1 ? "font-semibold" : ""}
              ${section.level === 2 ? "font-medium" : ""}
              ${section.level >= 3 ? "text-gray-600" : ""}
            `}
            title={section.title} // Show full title on hover
          >
            {section.title}
          </span>
        </div>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && !compact && (
          <div>
            {section.children.map((child) => renderTocItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  if (sections.length === 0) {
    return <div className="text-sm text-gray-500 italic">No sections found</div>
  }

  // Build hierarchy and filter for compact mode
  const hierarchy = buildHierarchy(sections)
  const displaySections = compact ? hierarchy.filter(section => section.level === 1) : hierarchy

  return (
    <nav className="space-y-1">
      {displaySections.map((section) => renderTocItem(section))}
    </nav>
  )
}
