"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { sendDonationReceipt } from "@/lib/email"

interface PaymentFormProps {
  amount: number
  onSuccess?: (paymentId: string) => void
  donorName?: string
  donorEmail?: string
  isMonthly?: boolean
  dedication?: string
}

export default function PaymentForm({
  amount,
  onSuccess,
  donorName = "",
  donorEmail = "",
  isMonthly = false,
  dedication = "",
}: PaymentFormProps) {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return
    }

    setProcessing(true)

    // Get the CardElement
    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setError("Card element not found")
      setProcessing(false)
      return
    }

    // Use the card Element to create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (error) {
      setError(error.message || "An error occurred")
      setProcessing(false)
      return
    }

    try {
      // Here you would typically confirm the payment intent with your backend
      // For demonstration purposes, we're just simulating success

      // Send email receipt
      if (donorEmail) {
        try {
          await sendDonationReceipt({
            name: donorName,
            email: donorEmail,
            amount: amount / 100, // Convert from cents to dollars
            transactionId: paymentMethod.id,
            date: new Date().toISOString(),
            paymentMethod: `${paymentMethod.card?.brand} ending in ${paymentMethod.card?.last4}`,
            isMonthly,
            dedication,
          })
        } catch (emailError) {
          console.error("Failed to send receipt email:", emailError)
          // Continue with the payment process even if email fails
        }
      }

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess(paymentMethod.id)
      }

      // Redirect to the thank you page with relevant parameters
      router.push(
        `/donate/thank-you?amount=${amount / 100}&name=${encodeURIComponent(donorName)}&email=${encodeURIComponent(
          donorEmail,
        )}&transaction_id=${paymentMethod.id}&payment_method=${encodeURIComponent(
          `${paymentMethod.card?.brand || "Card"} ending in ${paymentMethod.card?.last4 || "****"}`,
        )}&recurring=${isMonthly}${dedication ? `&dedication=${encodeURIComponent(dedication)}` : ""}`,
      )
    } catch (err) {
      console.error("Payment error:", err)
      setError("An error occurred while processing your payment. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border-2 border-amber-200 rounded-lg bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">{error}</div>}

      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-5 rounded-lg border border-amber-200 flex items-start">
        <Shield className="h-6 w-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-800 text-lg">Secure Payment</h3>
          <p className="text-amber-700 mt-1">
            Your payment information is encrypted and securely processed. We never store your full card details.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-xl py-6 rounded-lg shadow-lg transition-all hover:shadow-xl"
      >
        {processing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </Button>
    </form>
  )
}
