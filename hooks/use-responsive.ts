"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useResponsive() {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0)

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("xs")

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)

      // Determine current breakpoint
      if (width >= breakpoints["2xl"]) {
        setCurrentBreakpoint("2xl")
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint("xl")
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint("lg")
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint("md")
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint("sm")
      } else {
        setCurrentBreakpoint("xs")
      }
    }

    // Set initial values
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isAbove = (breakpoint: Breakpoint) => windowWidth >= breakpoints[breakpoint]
  const isBelow = (breakpoint: Breakpoint) => windowWidth < breakpoints[breakpoint]

  return {
    windowWidth,
    currentBreakpoint,
    isAbove,
    isBelow,
    isMobile: isBelow("md"),
    isTablet: isAbove("md") && isBelow("lg"),
    isDesktop: isAbove("lg"),
    breakpoints,
  }
}
