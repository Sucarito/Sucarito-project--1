"use client"

import type React from "react"

import { useState } from "react"
import { useActionState } from "react"
import { createPaymentIntent } from "./actions"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : undefined

interface State {
  message: string | null
}

export default function DonateForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState<string | null>(null)
  const [stripeError, setStripeError] = useState<string | null>(null)

  const [state, formAction, isPending] = useActionState<State, FormData>(createPaymentIntent, {
    message: null,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null) // Clear any previous error messages

    if (!stripePromise) {
      setErrorMessage("Stripe is not configured. Please check your environment variables.")
      return
    }

    const formData = new FormData(e.currentTarget)
    const amount = formData.get("amount")

    const response = await createPaymentIntent(state, formData)

    if (!response.success && response.error) {
      setErrorMessage(response.error)
      return
    }

    if (response.client_secret) {
      setPaymentIntentClientSecret(response.client_secret)
    }

    if (response.success && response.client_secret) {
      const stripe = await stripePromise

      if (!stripe) {
        setErrorMessage("Failed to load Stripe.")
        return
      }

      const { error } = await stripe.confirmCardPayment(response.client_secret, {
        payment_method: {
          card: (e.currentTarget.elements.namedItem("card") as any).value,
          billing_details: {
            name: "Payer Name", // Replace with actual payer name if available
          },
        },
      })

      if (error) {
        setStripeError(error.message || "An unexpected error occurred.")
      } else {
        // Payment succeeded!
        alert("Payment successful!")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">{errorMessage}</div>
      )}
      {stripeError && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-4 text-red-700">{stripeError}</div>
      )}
      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
        Amount (in cents):
      </label>
      <input
        type="number"
        id="amount"
        name="amount"
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <label htmlFor="card" className="block text-sm font-medium text-gray-700">
        Card Number:
      </label>
      <input
        type="text"
        id="card"
        name="card"
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting..." : "Donate"}
        </button>
      </div>
      {state?.message && <p>{state.message}</p>}
    </form>
  )
}
