import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, X } from "lucide-react"
import { useState } from "react"

interface Shortcut {
  key: string
  description: string
  category: string
}

const shortcuts: Shortcut[] = [
  { key: "⌘/Ctrl + S", description: "Save changes", category: "File" },
  { key: "⌘/Ctrl + Shift + P", description: "Toggle preview", category: "View" },
  { key: "⌘/Ctrl + Z", description: "Reset changes", category: "Edit" },
  { key: "Escape", description: "Cancel action", category: "Navigation" },
]

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-gray-500 hover:text-gray-700"
      >
        <HelpCircle className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Keyboard Shortcuts</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {["File", "View", "Edit", "Navigation"].map((category) => (
            <div key={category}>
              <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((shortcut) => shortcut.category === category)
                  .map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">
                        {shortcut.description}
                      </span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {shortcut.key}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
} 