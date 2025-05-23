"use client"

import type React from "react"

import { useState } from "react"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

// Initialize Stripe with fallback for missing key
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder_key_for_development_only"

const stripePromise = loadStripe(publishableKey)

interface StripePaymentProps {
  clientSecret: string
  amount: number
  isMonthly: boolean
  onSuccess: (paymentId: string) => void
  onError: (error: string) => void
}

// Wrapper component that provides the Stripe Elements context
export function StripePaymentWrapper({ clientSecret, amount, isMonthly, onSuccess, onError }: StripePaymentProps) {
  if (!clientSecret) {
    // Handle missing client secret
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
        Unable to initialize payment form. Please try again later or contact support.
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#d97706",
            colorBackground: "#ffffff",
            colorText: "#1f2937",
            colorDanger: "#ef4444",
            fontFamily: "system-ui, sans-serif",
            borderRadius: "4px",
          },
        },
      }}
    >
      <StripePaymentForm amount={amount} isMonthly={isMonthly} onSuccess={onSuccess} onError={onError} />
    </Elements>
  )
}

// The actual payment form component
function StripePaymentForm({
  amount,
  isMonthly,
  onSuccess,
  onError,
}: {
  amount: number
  isMonthly: boolean
  onSuccess: (paymentId: string) => void
  onError: (error: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donate/success`,
        },
        redirect: "if_required",
      })

      if (error) {
        setErrorMessage(error.message || "An error occurred with your payment")
        onError(error.message || "An error occurred with your payment")
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded
        onSuccess(paymentIntent.id)
      } else {
        // Payment requires additional action or is processing
        onSuccess(paymentIntent?.id || "pending")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setErrorMessage(errorMessage)
      onError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{errorMessage}</div>
      )}

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-amber-600 hover:bg-amber-700 py-6 text-lg flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Heart className="h-5 w-5" />
            <span>
              {isMonthly ? `Donate $${amount.toFixed(2)} Monthly` : `Complete Donation of $${amount.toFixed(2)}`}
            </span>
          </>
        )}
      </Button>
    </form>
  )
}
