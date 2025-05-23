import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <div className="space-y-6 max-w-3xl">
        <div className="relative w-40 h-40 mx-auto mb-4">
          <Image src="/serene-buddha.png" alt="Buddha statue" fill className="object-contain" priority />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">404 - Page Not Found</h1>

        <p className="text-xl text-muted-foreground">
          We apologize for the inconvenience. The page you are looking for does not exist or has been moved.
        </p>

        <div className="max-w-xs mx-auto">
          <blockquote className="italic text-muted-foreground border-l-4 pl-4 my-6">
            "Peace comes from within. Do not seek it without."
            <footer className="text-right mt-2">— Buddha</footer>
          </blockquote>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button asChild size="lg">
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
