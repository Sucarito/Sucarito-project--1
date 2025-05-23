"use client"

import { Button } from "@/components/ui/button"
import { Heart, Users, BookOpen, Home } from "lucide-react"

export default function DonationHero() {
  const scrollToForm = () => {
    const formSection = document.querySelector("#donation-form")
    formSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/donation-hero-image.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-2 mb-6">
            <Heart className="h-4 w-4 text-amber-400" />
            <span className="text-amber-100 text-sm font-medium">Transform Lives Through Compassion</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your Generosity
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
              Creates Miracles
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of compassionate souls in preserving ancient wisdom and building a more peaceful world. Every
            donation plants seeds of enlightenment that bloom for generations.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <Users className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">5,000+</div>
              <div className="text-sm text-gray-300">Lives Touched</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <BookOpen className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-300">Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <Home className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">25</div>
              <div className="text-sm text-gray-300">Years Serving</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <Heart className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-sm text-gray-300">Compassion</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Donate Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full"
            >
              Learn Our Impact
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
