"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LoadingAnimation } from "./components/loading-animation"
import { ChevronRight, Sparkles, ArrowDown } from "lucide-react"

export default function EnhancedWelcome() {
  const [showLoading, setShowLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
    setTimeout(() => setIsLoaded(true), 100)
    setTimeout(() => setShowContent(true), 800)
  }

  const handleEnterSite = () => {
    setShowContent(false)
    setTimeout(() => {
      console.log("Navigating to main site...")
    }, 600)
  }

  if (showLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Dynamic background with mouse interaction */}
      <div className="absolute inset-0">
        {/* Interactive light flare that follows mouse */}
        <div
          className={`absolute w-96 h-96 bg-blue-400/10 rounded-full blur-3xl transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{
            left: `${mousePosition.x * 0.1}%`,
            top: `${mousePosition.y * 0.1}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Static background elements */}
        <div
          className={`absolute top-1/4 right-1/3 w-80 h-80 bg-purple-400/8 rounded-full blur-3xl transition-all duration-[3000ms] delay-500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        />
        <div
          className={`absolute bottom-1/3 left-1/4 w-72 h-72 bg-indigo-400/8 rounded-full blur-3xl transition-all duration-[3000ms] delay-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        />

        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/20 to-purple-900/20 animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated logo */}
          <div
            className={`mb-12 transition-all duration-1200 delay-300 ${showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}
          >
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-12 h-12 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
              </div>
              {/* Pulsing ring */}
              <div
                className="absolute inset-0 rounded-3xl border-2 border-blue-400/30 animate-ping"
                style={{ animationDuration: "3s" }}
              />
            </div>
          </div>

          {/* Main heading with enhanced typography */}
          <div
            className={`mb-8 transition-all duration-1200 delay-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 leading-[0.9] tracking-tight mb-6">
              Welcome
            </h1>
            <div className="relative">
              <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400/60 rounded-full -translate-y-1/2" />
            </div>
          </div>

          {/* Enhanced subtitle */}
          <div
            className={`mb-16 transition-all duration-1200 delay-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <p className="text-xl md:text-3xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-4">
              Experience the future of digital innovation
            </p>
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
              Crafted for modern professionals who demand excellence
            </p>
          </div>

          {/* Enhanced CTA section */}
          <div
            className={`mb-12 transition-all duration-1200 delay-900 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <Button
              onClick={handleEnterSite}
              size="lg"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:via-blue-400 hover:to-purple-500 text-white font-medium rounded-full shadow-2xl shadow-blue-500/30 border-0 transition-all duration-500 hover:scale-105 hover:shadow-blue-500/50 text-lg"
            >
              <span className="flex items-center gap-3 relative z-10">
                Enter Experience
                <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
              </span>

              {/* Enhanced button effects */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Scroll indicator */}
          <div
            className={`transition-all duration-1200 delay-1100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="flex flex-col items-center space-y-3">
              <p className="text-slate-500 text-sm font-light">Scroll to explore</p>
              <ArrowDown className="w-5 h-5 text-slate-500 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-300/20 rounded-full transition-all duration-[6000ms] ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 500}ms`,
              animation: isLoaded ? `float ${4 + Math.random() * 4}s ease-in-out infinite` : "none",
            }}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900/80 to-transparent" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-30px) translateX(10px) rotate(90deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) translateX(-10px) rotate(180deg); 
            opacity: 0.6;
          }
          75% { 
            transform: translateY(-40px) translateX(5px) rotate(270deg); 
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}
