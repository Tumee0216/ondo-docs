"use client"

import { useState } from "react"
import { Copy, Check, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { JSX } from "react/jsx-runtime"
import { generateAnchor } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const parseMarkdown = (markdown: string) => {
    if (!markdown || typeof markdown !== 'string') {
      return []
    }

    const lines = markdown.split("\n")
    const elements: JSX.Element[] = []
    let currentCodeBlock = ""
    let codeLanguage = ""
    let inCodeBlock = false
    let listItems: string[] = []
    let inList = false

    const processLine = (line: string, index: number) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <div key={`code-${index}`} className="relative group mb-6">
              <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{codeLanguage || "Code"}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(currentCodeBlock, `code-${index}`)}
                  className="text-white hover:bg-gray-700 h-8 w-8 p-0"
                >
                  {copiedCode === `code-${index}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
                <code className="text-sm">{currentCodeBlock}</code>
              </pre>
            </div>,
          )
          inCodeBlock = false
          currentCodeBlock = ""
          codeLanguage = ""
        } else {
          // Start code block
          inCodeBlock = true
          codeLanguage = line.replace("```", "").trim()
        }
        return
      }

      if (inCodeBlock) {
        currentCodeBlock += line + "\n"
        return
      }

      // Headers
      if (line.startsWith("#")) {
        const level = line.match(/^#+/)?.[0].length || 1
        const text = line.replace(/^#+\s*/, "").trim()
        
        if (text.length === 0) return
        
        // Generate anchor using the shared utility function
        const anchor = generateAnchor(text, index)

        const HeaderTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements
        const sizeClasses = {
          1: "text-4xl font-bold mb-6 pb-4 border-b-2 border-pink-500",
          2: "text-3xl font-bold mb-4 mt-8 pb-2 border-b border-gray-200",
          3: "text-2xl font-semibold mb-3 mt-6",
          4: "text-xl font-semibold mb-2 mt-4",
          5: "text-lg font-medium mb-2 mt-3",
          6: "text-base font-medium mb-2 mt-2",
        }

        elements.push(
          <HeaderTag
            key={`header-${index}`}
            id={anchor}
            className={`${sizeClasses[level as keyof typeof sizeClasses]} text-gray-900 scroll-mt-24`}
          >
            {text}
          </HeaderTag>,
        )
        return
      }

      // Lists
      if (line.match(/^[\s]*[-*+]\s/)) {
        const item = line.replace(/^[\s]*[-*+]\s/, "")
        listItems.push(item)
        inList = true
        return
      } else if (inList && line.trim() === "") {
        // End of list
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-2 mb-4 text-gray-700">
            {listItems.map((item, i) => (
              <li key={i} className="ml-4">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>,
        )
        listItems = []
        inList = false
        return
      }

      // Numbered lists
      if (line.match(/^[\s]*\d+\.\s/)) {
        const item = line.replace(/^[\s]*\d+\.\s/, "")
        listItems.push(item)
        inList = true
        return
      }

      // Blockquotes
      if (line.startsWith(">")) {
        const text = line.replace(/^>\s*/, "")
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="border-l-4 border-pink-500 pl-4 py-2 mb-4 bg-gray-50 italic text-gray-700"
          >
            {parseInlineMarkdown(text)}
          </blockquote>,
        )
        return
      }

      // Tables (basic support)
      if (line.includes("|") && line.trim() !== "") {
        // This is a simplified table parser
        const cells = line
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell !== "")
        if (cells.length > 1) {
          elements.push(
            <div key={`table-row-${index}`} className="grid grid-cols-3 gap-4 p-2 border-b border-gray-200">
              {cells.map((cell, i) => (
                <div key={i} className="text-sm">
                  {parseInlineMarkdown(cell)}
                </div>
              ))}
            </div>,
          )
          return
        }
      }

      // Regular paragraphs
      if (line.trim() !== "") {
        elements.push(
          <p key={`para-${index}`} className="mb-4 text-gray-700 leading-relaxed">
            {parseInlineMarkdown(line)}
          </p>,
        )
      }
    }

    lines.forEach(processLine)

    // Handle any remaining list items
    if (listItems.length > 0) {
      elements.push(
        <ul key="final-list" className="list-disc list-inside space-y-2 mb-4 text-gray-700">
          {listItems.map((item, i) => (
            <li key={i} className="ml-4">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>,
      )
    }

    return elements
  }

  const parseInlineMarkdown = (text: string) => {
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Inline code
    text = text.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-pink-600">$1</code>',
    )
    // Links
    text = text.replace(
      /\[([^\]]+)\]$$([^)]+)$$/g,
      '<a href="$2" class="text-pink-600 hover:text-pink-800 underline" target="_blank" rel="noopener noreferrer">$1 <svg class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>',
    )

    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }

  return <div className="markdown-content">{parseMarkdown(content)}</div>
}
