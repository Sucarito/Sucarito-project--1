import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Burmese Vihar Bodhgaya",
  description:
    "Get in touch with Burmese Vihar monastery in Bodhgaya. Find our contact information, location, and send us a message.",
}

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
