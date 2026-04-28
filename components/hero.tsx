import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen sm:min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Base background color as fallback */}
      <div className="absolute inset-0 bg-stone-800 z-0" />

      {/* Background image - optimized for responsive loading */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-5"
        style={{
          backgroundImage: "url('/serene-buddha-statue.png')",
          backgroundAttachment: "fixed",
          opacity: 0.7,
        }}
      />

      {/* Responsive overlay - stronger on mobile for text readability */}
      <div className="absolute inset-0 bg-black/50 sm:bg-black/40 md:bg-black/35 z-10" />

      {/* Main content - fully responsive with proper spacing */}
      <div className="container relative z-20 text-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-24 w-full">
        {/* Main heading - scales from mobile to desktop */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-5 tracking-tight leading-tight font-serif">
          BURMESE VIHAR BODHGAYA
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
          A Place of Peace and Mindfulness
        </p>

        {/* Sanskrit quote */}
        <p className="text-sm sm:text-base md:text-lg italic text-white/80 mb-1 sm:mb-2 max-w-2xl mx-auto font-serif">
          "Sabbe sattā sukhi hontu"
        </p>

        {/* Quote translation */}
        <p className="text-xs sm:text-sm md:text-base text-white/70 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
          May all beings be happy
        </p>

        {/* CTA Buttons - stack on mobile, horizontal on tablet+ */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center sm:items-stretch flex-wrap max-w-lg sm:max-w-2xl mx-auto">
          <Button 
            asChild 
            size="lg" 
            className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:flex-1 min-h-12 sm:min-h-11 text-sm sm:text-base transition-all duration-300 hover:shadow-lg"
          >
            <Link href="/visit">Visit Us</Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:flex-1 min-h-12 sm:min-h-11 text-sm sm:text-base transition-all duration-300 hover:shadow-lg"
          >
            <Link href="/events">Events</Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:flex-1 min-h-12 sm:min-h-11 text-sm sm:text-base transition-all duration-300 hover:shadow-lg"
          >
            <Link href="/donate">Donate</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator for desktop */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="text-white/70 text-center">
          <p className="text-xs mb-2">Scroll to explore</p>
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
