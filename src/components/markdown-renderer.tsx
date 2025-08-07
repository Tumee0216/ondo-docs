"use client";

import { Button } from "@/components/ui/button";
import { useCooldown } from "@/hooks/use-cooldown";
import { generateAnchor } from "@/lib/utils";
import { Check, Code2, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownContent = ({ content }: MarkdownRendererProps) => {
  const { onCooldown, startCooldown } = useCooldown();

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    toast(text);
    startCooldown(2000);
  };
  return (
    <ReactMarkdown
      children={content}
      components={{
        h1: ({ children }) => (
          <h1
            className="text-4xl font-bold mb-6 pb-4 border-b-2 border-pink-500 text-gray-900 scroll-mt-24"
            id={generateAnchor(String(children))}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className="text-3xl font-bold mb-4 mt-8 pb-2 border-b border-gray-200 text-gray-900 scroll-mt-24"
            id={generateAnchor(String(children))}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            className="text-2xl font-semibold mb-3 mt-6 text-gray-900 scroll-mt-24"
            id={generateAnchor(String(children))}
          >
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4
            className="text-xl font-semibold mb-2 mt-4 text-gray-900 scroll-mt-24"
            id={generateAnchor(String(children))}
          >
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5
            className="text-lg font-medium mb-2 mt-3 text-gray-900 scroll-mt-24"
            id={generateAnchor(String(children))}
          >
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6
            className="text-base font-medium mb-2 mt-2 text-gray-900 scroll-mt-24"
            id={generateAnchor(String(children))}
          >
            {children}
          </h6>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-pink-600 hover:text-pink-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ children, className }) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";
          const codeString = String(children).replace(/\n$/, "");
          const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;

          // If it's a code block (has language or multiline)
          if (className || codeString.includes("\n")) {
            return (
              <div className="relative group mb-6">
                <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {language || "Code"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(codeString, codeId)}
                    className="text-white hover:bg-gray-700 h-8 w-8 p-0"
                    disabled={onCooldown}
                  >
                    {onCooldown ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
                  <code className="text-sm">{codeString}</code>
                </pre>
              </div>
            );
          }

          // Inline code
          return (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-pink-600">
              {children}
            </code>
          );
        },
        pre: ({ children }) => {
          // Let the code component handle everything
          return <>{children}</>;
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-pink-500 pl-4 py-2 mb-4 bg-gray-50 italic text-gray-700">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 ml-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 ml-4">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-200 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-200">{children}</tbody>
        ),
        tr: ({ children }) => <tr className="hover:bg-gray-50">{children}</tr>,
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
            {children}
          </td>
        ),
      }}
    />
  );
};
