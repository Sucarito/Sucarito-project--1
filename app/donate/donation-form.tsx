"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"

import { attributionService } from "@/lib/attribution"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<string>("General Support")
  const [isMonthly, setIsMonthly] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    attributionService.trackFormStart()
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (selectedAmount || customAmount || donationType !== "General Support") {
        attributionService.trackFormAbandonment()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [selectedAmount, customAmount, donationType])

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    attributionService.trackAmountSelection(amount, false)
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount("")
    if (value) {
      attributionService.trackAmountSelection(value, true)
    }
  }

  const handleDonationTypeChange = (type: string) => {
    setDonationType(type)
    attributionService.trackDonationTypeSelection(type)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const amount = Number.parseFloat(selectedAmount || customAmount)

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount.")
      return
    }

    attributionService.trackCheckoutInitiation(amount, donationType, isMonthly)

    const stripe = await stripePromise

    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Stripe uses cents
        donationType,
        isMonthly,
      }),
    }).then((res) => res.json())

    if (stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      })

      if (result.error) {
        console.error(result.error.message)
      }
    } else {
      console.error("Stripe not initialized")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="donationType" className="block text-gray-700 text-sm font-bold mb-2">
          Donation Type:
        </label>
        <select
          id="donationType"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={donationType}
          onChange={(e) => handleDonationTypeChange(e.target.value)}
        >
          <option>General Support</option>
          <option>Education</option>
          <option>Healthcare</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Amount:</label>
        <div className="flex flex-wrap gap-2">
          {["10", "25", "50", "100"].map((amount) => (
            <button
              key={amount}
              type="button"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                selectedAmount === amount ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleAmountSelect(amount)}
              disabled={selectedAmount === amount}
            >
              ${amount}
            </button>
          ))}
          <div className="w-full sm:w-auto">
            <input
              type="number"
              placeholder="Custom Amount"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={isMonthly}
            onChange={() => setIsMonthly(!isMonthly)}
          />
          <span className="ml-2 text-gray-700 text-sm font-bold">Make this a monthly donation</span>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Donate Now
        </button>
      </div>
    </form>
  )
}

export default DonationForm
