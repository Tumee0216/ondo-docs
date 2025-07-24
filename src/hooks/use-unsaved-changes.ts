import { useEffect } from "react"

export function useUnsavedChanges(hasChanges: boolean) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    const handlePopState = () => {
      if (hasChanges) {
        const confirmed = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
        if (!confirmed) {
          window.history.pushState(null, "", window.location.href)
        }
      }
    }

    if (hasChanges) {
      window.addEventListener("beforeunload", handleBeforeUnload)
      window.addEventListener("popstate", handlePopState)
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [hasChanges])
} 