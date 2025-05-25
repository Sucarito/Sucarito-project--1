"use client"

import { useEffect, useState } from "react"

interface LoadingAnimationProps {
  onComplete?: () => void
  duration?: number
}

export function LoadingAnimation({ onComplete, duration = 2000 }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => onComplete?.(), 500)
          return 100
        }
        return prev + 2
      })
    }, duration / 50)

    return () => clearInterval(interval)
  }, [duration, onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900 transition-opacity duration-500 ${isComplete ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="text-center">
        {/* Loading spinner */}
        <div className="relative w-16 h-16 mx-auto mb-8">
          <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full"></div>
          <div
            className="absolute inset-0 border-2 border-transparent border-t-blue-500 rounded-full animate-spin"
            style={{ animationDuration: "1s" }}
          ></div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden mx-auto mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-slate-400 text-sm font-light">Loading experience... {Math.round(progress)}%</p>
      </div>
    </div>
  )
}
