import type { Metadata, Viewport } from "next"
import GA4TestPageClient from "./GA4TestPageClient"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "GA4 Testing - Burmese Vihar",
  description: "Test and verify Google Analytics 4 integration",
}

export default function GA4TestPage() {
  return <GA4TestPageClient />
}
