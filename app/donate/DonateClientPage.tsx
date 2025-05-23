"use client"

import { useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import DonateForm from "./DonateForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const DonateClientPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (amount: number) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error("Failed to create payment intent")
      }

      const { clientSecret, paymentResponse } = await response.json()

      if (paymentResponse?.error) {
        if (paymentResponse.error.includes("Stripe is not properly configured")) {
          setError("Payment system is currently unavailable. Please try again later or contact us directly.")
          setIsSubmitting(false)
          return
        }
        setError(paymentResponse.error)
        setIsSubmitting(false)
        return
      }

      // Handle successful payment intent creation (e.g., redirect, show success message)
      console.log("Payment intent created successfully:", clientSecret)
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <Elements stripe={stripePromise}>
        <DonateForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Elements>
    </div>
  )
}

export default DonateClientPage
