"use client"

import { type ReactNode, useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

// Initialize Stripe with the public key
// This is the exact location where the public key is used
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentProviderProps {
  children: ReactNode
}

export default function PaymentProvider({ children }: PaymentProviderProps) {
  const [clientSecret, setClientSecret] = useState<string>("")

  useEffect(() => {
    // This would typically fetch a payment intent from your server
    // For demonstration purposes, we're just showing where this would happen
    async function createPaymentIntent() {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1000, // This would be dynamic based on user selection
            currency: "usd",
          }),
        })

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (error) {
        console.error("Error creating payment intent:", error)
      }
    }

    createPaymentIntent()
  }, [])

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#b45309", // amber-700
        colorBackground: "#ffffff",
        colorText: "#1c1917", // stone-900
        colorDanger: "#ef4444", // red-500
        fontFamily: "system-ui, sans-serif",
        borderRadius: "8px",
      },
    },
  }

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  ) : (
    <div className="p-8 text-center">
      <p>Initializing payment system...</p>
    </div>
  )
}
