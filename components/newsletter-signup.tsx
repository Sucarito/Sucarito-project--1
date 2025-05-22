"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, CheckCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <div>
      {isSubscribed ? (
        <div className="flex flex-col items-center justify-center text-green-600 space-y-4 py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-green-700 mb-2">Thank You for Subscribing!</h3>
            <p className="text-stone-600">You'll receive our next newsletter with updates on events and teachings.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-none border-stone-300 focus-visible:ring-amber-500 py-6 text-lg"
              />
            </div>
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 rounded-none py-6 px-8 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  <span className="mr-2">Subscribe</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-stone-500 text-center">
            By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  )
}
