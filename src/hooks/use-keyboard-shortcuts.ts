import { useEffect } from "react"

interface KeyboardShortcutsProps {
  onSave: () => void
  onPreview: () => void
  onReset: () => void
  isSaving: boolean
  hasChanges: boolean
}

export function useKeyboardShortcuts({
  onSave,
  onPreview,
  onReset,
  isSaving,
  hasChanges,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Cmd/Ctrl + S to save
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        if (hasChanges && !isSaving) {
          onSave()
        }
      }

      // Cmd/Ctrl + Shift + P to toggle preview
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "P") {
        e.preventDefault()
        onPreview()
      }

      // Cmd/Ctrl + Z to reset (when not in input fields)
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        if (hasChanges) {
          onReset()
        }
      }

      // Escape to cancel
      if (e.key === "Escape") {
        e.preventDefault()
        // Could add a cancel action here
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onSave, onPreview, onReset, isSaving, hasChanges])
} 