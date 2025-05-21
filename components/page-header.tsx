import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SereneBackgroundSection from "./serene-background-section"

interface PageHeaderProps {
  title: string
  description?: string
  backLink?: {
    href: string
    label: string
  }
  minHeight?: string
}

export default function PageHeader({ title, description, backLink, minHeight = "300px" }: PageHeaderProps) {
  return (
    <SereneBackgroundSection minHeight={minHeight} overlayOpacity={0.75} className="mb-8">
      <div className="text-center">
        {backLink && (
          <Link href={backLink.href} className="inline-flex items-center text-amber-300 hover:text-amber-200 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLink.label}
          </Link>
        )}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">{title}</h1>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
        {description && <p className="text-lg text-amber-100 max-w-2xl mx-auto">{description}</p>}
      </div>
    </SereneBackgroundSection>
  )
}
