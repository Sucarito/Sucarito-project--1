"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, Share2 } from "lucide-react"
import { trackAttribution } from "@/lib/attribution"
import Link from "next/link"

export default function DonationSuccessPage() {
  const searchParams = useSearchParams()
  const [conversionTracked, setConversionTracked] = useState(false)
  const [donationDetails, setDonationDetails] = useState<any>(null)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")
    if (sessionId && !conversionTracked) {
      const pendingData = sessionStorage.getItem("pending_donation_attribution")
      if (pendingData) {
        try {
          const data = JSON.parse(pendingData)

          // Track the conversion with enhanced attribution
          const conversion = trackAttribution.trackConversion(
            sessionId,
            data.amount,
            "inr",
            data.donationType,
            data.isRecurring,
          )

          setDonationDetails(data)
          setConversionTracked(true)
          sessionStorage.removeItem("pending_donation_attribution")

          console.log("Enhanced conversion tracked:", conversion)
        } catch (error) {
          console.error("Error tracking conversion:", error)
        }
      }
    }
  }, [searchParams, conversionTracked])

  const shareOnSocial = (platform: string) => {
    const message = "I just made a donation to support our Buddhist temple community! 🙏"
    const url = window.location.origin

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + " " + url)}`,
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardHeader className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/20 rounded-full">
              <CheckCircle className="h-12 w-12" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Thank You for Your Generosity!</CardTitle>
          <CardDescription className="text-green-100 text-lg">
            Your donation has been successfully processed
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {/* Donation Details */}
          {donationDetails && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Donation Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <div className="font-bold text-lg">₹{donationDetails.amount.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <div className="font-medium">{donationDetails.isRecurring ? "Monthly" : "One-time"}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Purpose:</span>
                  <div className="font-medium">{donationDetails.donationType}</div>
                </div>
              </div>
            </div>
          )}

          {/* Impact Message */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Your Impact</h3>
            <p className="text-gray-600 leading-relaxed">
              Your generous contribution helps us maintain our sacred space, support our community programs, and
              continue sharing the teachings of Buddhism. Every donation, no matter the size, makes a meaningful
              difference in the lives of those we serve.
            </p>
          </div>

          {/* Receipt Information */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Receipt & Tax Information</h4>
            <p className="text-blue-800 text-sm">
              A receipt has been sent to your email address. This donation may be tax-deductible. Please consult with
              your tax advisor for specific guidance.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button onClick={() => shareOnSocial("facebook")} variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share on Facebook
              </Button>
              <Button onClick={() => shareOnSocial("twitter")} variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share on Twitter
              </Button>
              <Button onClick={() => shareOnSocial("whatsapp")} variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share on WhatsApp
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/">Return to Home</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/donate">Make Another Donation</Link>
              </Button>
            </div>
          </div>

          {/* Attribution Debug Info (only in development) */}
          {process.env.NODE_ENV === "development" && conversionTracked && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-xs">
              <h4 className="font-semibold mb-2">Attribution Debug Info:</h4>
              <pre className="text-gray-600 overflow-auto">
                {JSON.stringify(trackAttribution.getSummary(), null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
