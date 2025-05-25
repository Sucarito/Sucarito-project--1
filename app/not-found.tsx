import type { Metadata, Viewport } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Page Not Found - Burmese Vihar Bodhgaya",
  description: "The page you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-amber-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you are looking for does not exist or has been moved.</p>
        <Button asChild className="bg-amber-600 hover:bg-amber-700">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
