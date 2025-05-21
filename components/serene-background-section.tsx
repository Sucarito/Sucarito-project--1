import type { ReactNode } from "react"

interface SereneBackgroundSectionProps {
  children: ReactNode
  className?: string
  overlayOpacity?: number
  minHeight?: string
}

export default function SereneBackgroundSection({
  children,
  className = "",
  overlayOpacity = 0.7,
  minHeight = "500px",
}: SereneBackgroundSectionProps) {
  return (
    <section className={`relative flex items-center justify-center overflow-hidden ${className}`} style={{ minHeight }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/images/buddha-teaching.jpg')",
          filter: "brightness(0.9)",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-amber-950 z-10"
        style={{ opacity: overlayOpacity, mixBlendMode: "multiply" }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16 text-white">{children}</div>
    </section>
  )
}
