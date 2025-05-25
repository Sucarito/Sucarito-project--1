import type { Metadata, Viewport } from "next"
import { TestTube, Link2, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Analytics Dashboard - Burmese Vihar",
  description: "Track and analyze donation patterns and marketing attribution",
}

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Analytics Dashboard</h1>

      {/* New Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <TestTube className="h-5 w-5" />
              GA4 Testing
            </CardTitle>
            <CardDescription>Verify your Google Analytics 4 integration and test tracking events</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/analytics/ga4-test">Test GA4 Integration</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Link2 className="h-5 w-5" />
              UTM Generator
            </CardTitle>
            <CardDescription>Create trackable links for your marketing campaigns with UTM parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/analytics/utm-generator">Generate UTM Links</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Activity className="h-5 w-5" />
              Live Monitor
            </CardTitle>
            <CardDescription>Monitor real-time donation activity and user behavior on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/analytics/monitor">View Live Activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
