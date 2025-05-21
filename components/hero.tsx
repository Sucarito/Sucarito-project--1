import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/buddha-teaching.jpg')",
          filter: "brightness(0.8)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10" />

      <div className="container relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">BURMESE VIHAR BODHGAYA</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">A Place of Peace and Mindfulness</p>
        <div className="italic text-white/80 mb-10 max-w-xl mx-auto">
          <p className="text-lg md:text-xl mb-2">"Sabbe sattā sukhi hontu"</p>
          <p className="text-lg md:text-xl">May all beings be happy</p>
        </div>
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
