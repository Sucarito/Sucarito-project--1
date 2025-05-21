import type { ReactNode } from "react"
import Footer from "./footer"

interface InnerPageLayoutProps {
  children: ReactNode
  headerContent: ReactNode
}

export default function InnerPageLayout({ children, headerContent }: InnerPageLayoutProps) {
  return (
    <>
      <header className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center h-64 md:h-80"
          style={{
            backgroundImage: "url('/images/buddha-teaching.jpg')",
            filter: "brightness(0.7)",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent h-64 md:h-80" />

        {/* Header Content */}
        <div className="container mx-auto px-4 relative z-10">{headerContent}</div>
      </header>

      <main className="min-h-screen bg-white">{children}</main>

      <Footer />
    </>
  )
}
