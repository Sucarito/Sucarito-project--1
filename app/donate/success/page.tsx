import type { Metadata, Viewport } from "next"
import SuccessPageClient from "./SuccessPageClient"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Donation Successful - Burmese Vihar",
  description: "Thank you for your generous donation to Burmese Vihar",
}

export default function SuccessPage() {
  return <SuccessPageClient />
}
