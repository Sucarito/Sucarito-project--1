import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - Burmese Vihar Bodhgaya",
  description: "Explore our collection of images showcasing the beauty and tranquility of Burmese Vihar in Bodhgaya.",
}

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
