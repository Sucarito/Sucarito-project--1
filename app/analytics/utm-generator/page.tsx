import type { Metadata, Viewport } from "next"
import UTMGeneratorClientPage from "./UTMGeneratorClientPage"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "UTM Link Generator - Burmese Vihar",
  description: "Create trackable links for your marketing campaigns",
}

export default function UTMGeneratorPage() {
  return <UTMGeneratorClientPage />
}
