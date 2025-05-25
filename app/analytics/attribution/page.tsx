import type { Metadata, Viewport } from "next"
import AttributionDashboardClient from "./AttributionDashboardClient"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Marketing Attribution - Burmese Vihar",
  description: "Track which marketing channels drive the most donations",
}

export default function AttributionPage() {
  return (
    <div>
      <AttributionDashboardClient />
    </div>
  )
}
