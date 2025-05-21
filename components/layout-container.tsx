import type React from "react"
import { cn } from "@/lib/utils"

interface LayoutContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
}

/**
 * A container component that provides consistent layout constraints
 * across the site with configurable max-width and padding.
 */
export function LayoutContainer({ children, className, maxWidth = "xl", padding = "md" }: LayoutContainerProps) {
  // Map size names to actual max-width classes
  const maxWidthClasses = {
    xs: "max-w-screen-xs",
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  }

  // Map padding sizes to actual padding classes
  const paddingClasses = {
    none: "px-0",
    sm: "px-3 md:px-4",
    md: "px-4 md:px-6",
    lg: "px-6 md:px-8",
  }

  return (
    <div className={cn("mx-auto w-full", maxWidthClasses[maxWidth], paddingClasses[padding], className)}>
      {children}
    </div>
  )
}
