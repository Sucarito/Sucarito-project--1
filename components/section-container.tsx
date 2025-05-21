import type React from "react"
import { cn } from "@/lib/utils"
import { LayoutContainer } from "./layout-container"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
  verticalPadding?: "none" | "sm" | "md" | "lg" | "xl"
  background?: "white" | "light" | "dark" | "primary" | "none"
}

/**
 * A section container component that provides consistent section styling
 * across the site with configurable padding, background, and max-width.
 */
export function SectionContainer({
  children,
  className,
  id,
  maxWidth = "xl",
  padding = "md",
  verticalPadding = "lg",
  background = "none",
}: SectionContainerProps) {
  // Map vertical padding sizes to actual padding classes
  const verticalPaddingClasses = {
    none: "py-0",
    sm: "py-4 md:py-6",
    md: "py-6 md:py-8",
    lg: "py-8 md:py-12",
    xl: "py-12 md:py-16",
  }

  // Map background types to actual background classes
  const backgroundClasses = {
    white: "bg-white",
    light: "bg-stone-100",
    dark: "bg-stone-900 text-white",
    primary: "bg-amber-50",
    none: "",
  }

  return (
    <section
      id={id}
      className={cn(
        verticalPaddingClasses[verticalPadding],
        backgroundClasses[background],
        "overflow-hidden",
        className,
      )}
    >
      <LayoutContainer maxWidth={maxWidth} padding={padding}>
        {children}
      </LayoutContainer>
    </section>
  )
}
