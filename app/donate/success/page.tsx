import { redirect } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Stripe from "stripe"

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" }) : null

async function getSessionDetails(sessionId: string) {
  if (!stripe) {
    return {
      success: false,
      error: "Stripe is not configured",
    }
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "line_items"],
    })

    return {
      success: true,
      session,
    }
  } catch (error) {
    console.error("Error retrieving session:", error)
    return {
      success: false,
      error: "Failed to retrieve session details",
    }
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sessionId = searchParams.session_id as string | undefined

  if (!sessionId) {
    redirect("/donate")
  }

  const sessionDetails = await getSessionDetails(sessionId)

  if (!sessionDetails.success) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-6">We couldn't verify your donation. Please contact us for assistance.</p>
          <Button asChild>
            <Link href="/donate">Return to Donations</Link>
          </Button>
        </div>
      </div>
    )
  }

  const session = sessionDetails.session.session
  const customer = session.customer as Stripe.Customer
  const lineItems = session.line_items?.data || []
  const amount = lineItems[0]?.amount_total ? lineItems[0].amount_total / 100 : 0
  const isSubscription = session.mode === "subscription"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-50 p-6 text-center border-b">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-800">Thank You for Your Donation!</h1>
          <p className="text-green-700 mt-2">Your contribution makes a difference</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Donation Details</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-600">Amount:</div>
                <div className="font-medium">${amount.toFixed(2)} USD</div>

                <div className="text-gray-600">Type:</div>
                <div className="font-medium">{isSubscription ? "Monthly Donation" : "One-time Donation"}</div>

                <div className="text-gray-600">Date:</div>
                <div className="font-medium">{new Date().toLocaleDateString()}</div>

                <div className="text-gray-600">Payment Status:</div>
                <div className="font-medium text-green-600">Successful</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              A receipt has been sent to your email address. Please check your inbox for confirmation.
            </p>
          </div>

          <div className="text-center space-y-3">
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/">Return to Homepage</Link>
            </Button>

            {isSubscription && (
              <div className="text-sm text-gray-500">
                You can manage your recurring donation by contacting us at donations@burmesevihar.org
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
