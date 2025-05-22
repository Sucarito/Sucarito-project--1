import type { Metadata } from "next"
import EnhancedGallery from "./enhanced-gallery"

export const metadata: Metadata = {
  title: "Visual Journey - Burmese Vihar Bodhgaya",
  description:
    "Immerse yourself in the beauty and tranquility of Burmese Vihar through our curated collection of stunning imagery.",
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
          style={{
            backgroundImage: "url('/buddhist-temple-interior.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="container relative z-10 px-4 md:px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 bg-amber-600/30 backdrop-blur-sm rounded-full text-amber-200 text-sm font-medium tracking-wider mb-6">
              VISUAL JOURNEY
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-wide leading-tight mb-6">
              Moments of Serenity
            </h1>
            <div className="h-px w-32 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              Explore the sacred spaces, cultural ceremonies, and peaceful moments that define the essence of Burmese
              Vihar
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 animate-pulse">
          <p className="text-sm mb-2">Scroll to explore</p>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Our Visual Story</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80">
              Each image in our gallery captures a moment of beauty, tradition, and spiritual significance. From ancient
              architecture to vibrant ceremonies, these photographs offer a window into the rich heritage and daily life
              at Burmese Vihar.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Component */}
      <EnhancedGallery />
    </main>
  )
}
