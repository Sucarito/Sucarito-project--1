import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Teachings - Burmese Vihar Bodhgaya",
  description: "Explore Buddhist teachings, Dhamma talks, and meditation resources from Burmese Vihar in Bodhgaya.",
}

export default function TeachingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
