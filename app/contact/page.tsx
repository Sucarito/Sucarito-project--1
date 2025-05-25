import type { Metadata, Viewport } from "next"
import ContactClient from "./contact-client"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Connect With Us - Burmese Vihar Bodhgaya",
  description:
    "Reach out to Burmese Vihar monastery in Bodhgaya. Connect with our spiritual community through our modern, intuitive contact platform.",
}

export default function ContactPage() {
  return <ContactClient />
}
