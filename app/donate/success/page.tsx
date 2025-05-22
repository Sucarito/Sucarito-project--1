"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { verifyPaymentStatus, verifySubscriptionStatus } from "../actions"

export default function DonationSuccessPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [amount, setAmount] = useState<number | null>(null)
  const [currency, setCurrency] = useState<string>("usd")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    async function verifyPayment() {
      const paymentIntentId = searchParams.get("payment_intent")
      const subscriptionId = searchParams.get("subscription")

      if (paymentIntentId) {
        const result = await verifyPaymentStatus(paymentIntentId)
        if (result.success && result.status === "succeeded") {
          setStatus("success")
          setAmount(result.amount)
          setCurrency(result.currency)
        } else {
          setStatus("error")
          setErrorMessage(result.error || "Payment verification failed")
        }
      } else if (subscriptionId) {
        const result = await verifySubscriptionStatus(subscriptionId)
        if (result.success && ["active", "trialing"].includes(result.status)) {
          setStatus("success")
          setAmount(result.amount)
          setCurrency(result.currency)
        } else {
          setStatus("error")
          setErrorMessage(result.error || "Subscription verification failed")
        }
      } else {
        setStatus("error")
        setErrorMessage("No payment information found")
      }
    }

    verifyPayment()
  }, [searchParams])

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50 py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center bg-white p-12 rounded-xl shadow-xl">
          {status === "loading" && (
            <>
              <div className="w-24 h-24 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">
                Verifying Your Donation
              </h2>
              <p className="text-xl text-stone-700 mb-8 leading-relaxed">
                Please wait while we confirm your donation...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">
                Thank You for Your Generous Donation
              </h2>
              <div className="h-px w-32 bg-amber-500 mx-auto mb-8"></div>
              <p className="text-xl text-stone-700 mb-4 leading-relaxed">
                Your contribution of{" "}
                <span className="font-medium">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency,
                  }).format(amount || 0)}
                </span>{" "}
                has been received.
              </p>
              <p className="text-stone-700 mb-8 leading-relaxed">We've sent a confirmation to your email address.</p>
              <p className="text-stone-600 mb-12">
                Your donation helps us maintain our historic temple, provide educational programs, support our resident
                monks, and continue our community outreach efforts.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6 text-lg">
                  <Link href="/">Return to Homepage</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none px-8 py-6 text-lg"
                >
                  <Link href="/donate">Make Another Donation</Link>
                </Button>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">
                There Was an Issue with Your Donation
              </h2>
              <div className="h-px w-32 bg-amber-500 mx-auto mb-8"></div>
              <p className="text-xl text-stone-700 mb-8 leading-relaxed">
                {errorMessage || "We couldn't process your donation at this time."}
              </p>
              <p className="text-stone-600 mb-12">Please try again or contact us for assistance with your donation.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6 text-lg">
                  <Link href="/donate">Try Again</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none px-8 py-6 text-lg"
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
