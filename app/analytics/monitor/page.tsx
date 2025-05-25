import type { Metadata, Viewport } from "next"
import AnalyticsMonitorPageClient from "./AnalyticsMonitorPageClient"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Real-time Analytics Monitor - Burmese Vihar",
  description: "Monitor donation activity and user behavior in real-time",
}

export default function MonitorPage() {
  return (
    <div>
      <AnalyticsMonitorPageClient />
    </div>
  )
}
