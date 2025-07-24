import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a consistent anchor ID from a heading text
 * This function is used by both the markdown renderer and section extraction
 * to ensure anchors match between the rendered content and table of contents
 */
export function generateAnchor(text: string, fallbackIndex?: number): string {
  if (!text || text.trim().length === 0) {
    return fallbackIndex !== undefined ? `section-${fallbackIndex}` : "section"
  }
  
  const anchor = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
  
  // Handle empty anchors
  if (anchor.length === 0) {
    return fallbackIndex !== undefined ? `section-${fallbackIndex}` : "section"
  }
  
  return anchor
}
