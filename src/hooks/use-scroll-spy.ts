import { useState, useEffect } from "react"

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    // Don't run if no sections or if we're on the server
    if (sectionIds.length === 0 || typeof window === 'undefined') {
      return
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      // Find the section that's currently in view
      let currentSection = ""
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i])
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = sectionIds[i]
          break
        }
      }

      setActiveSection(currentSection)
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Call once to set initial state
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionIds, offset])

  return activeSection
} 