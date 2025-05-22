import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Base background color as fallback */}
      <div className="absolute inset-0 bg-stone-800 z-0" />

      {/* Background image using CSS background-image instead of Next.js Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-5"
        style={{
          backgroundImage: "url('/serene-buddha-statue.png')",
          opacity: 0.7,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="container relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">BURMESE VIHAR BODHGAYA</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">A Place of Peace and Mindfulness</p>
        <p className="text-lg md:text-xl italic text-white/80 mb-2 max-w-xl mx-auto">"Sabbe sattā sukhi hontu"</p>
        <p className="text-sm md:text-base text-white/70 mb-10 max-w-xl mx-auto">May all beings be happy</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
            Visit Us
          </Button>
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
            Upcoming Events
          </Button>
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
            Donate
          </Button>
        </div>
      </div>
    </section>
  )
}
