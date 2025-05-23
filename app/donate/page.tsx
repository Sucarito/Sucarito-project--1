import { Suspense } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { checkStripeConfiguration } from "./actions"
import DonationHero from "./donation-hero"
import DonationForm from "./donation-form"
import DonationImpact from "./donation-impact"
import DonationTestimonials from "./donation-testimonials"

export const metadata = {
  title: "Transform Lives Through Your Generosity - Burmese Vihar Bodhgaya",
  description:
    "Join our mission to preserve Buddhist teachings and serve the community. Your donation creates lasting impact in the lives of countless individuals seeking peace and wisdom.",
}

export default async function DonatePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Check Stripe configuration status from the server
  const { isConfigured } = await checkStripeConfiguration()

  // Check for error or canceled status from URL params
  const error = searchParams.error
  const canceled = searchParams.canceled

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <DonationHero />

      {/* Main Content */}
      <div className="relative">
        {/* Error/Success Alerts */}
        <div className="container mx-auto px-4 py-8">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6 max-w-4xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Payment Error</AlertTitle>
              <AlertDescription>
                {error === "checkout_creation_failed"
                  ? "We couldn't process your donation at this time. Please try again later."
                  : "There was an error processing your donation. Please try again."}
              </AlertDescription>
            </Alert>
          )}

          {/* Canceled Alert */}
          {canceled && (
            <Alert className="mb-6 max-w-4xl mx-auto border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle>Payment Canceled</AlertTitle>
              <AlertDescription>
                Your donation process was canceled. You can try again whenever you're ready.
              </AlertDescription>
            </Alert>
          )}

          {/* Stripe Configuration Error */}
          {!isConfigured && (
            <Alert variant="destructive" className="mb-6 max-w-4xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Configuration Error</AlertTitle>
              <AlertDescription>
                Donation functionality is currently unavailable. Please contact the administrator.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Impact Section */}
        <DonationImpact />

        {/* Donation Form Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Make Your Donation Today</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every contribution, no matter the size, helps us continue our mission of spreading peace, wisdom, and
                compassion throughout the world.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                </div>
              }
            >
              {isConfigured ? (
                <DonationForm />
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
                  <p className="text-gray-500">Donation system is temporarily unavailable.</p>
                </div>
              )}
            </Suspense>
          </div>
        </section>

        {/* Testimonials Section */}
        <DonationTestimonials />

        {/* Alternative Donation Methods */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Other Ways to Support</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4 text-amber-400">Bank Transfer</h3>
                  <p className="text-gray-300 mb-4">
                    For larger donations or international transfers, please contact us for bank details.
                  </p>
                  <div className="text-sm text-gray-400">Email: donations@burmesevihar.org</div>
                </div>
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4 text-amber-400">Volunteer</h3>
                  <p className="text-gray-300 mb-4">
                    Your time and skills are just as valuable as monetary donations. Join our volunteer community.
                  </p>
                  <div className="text-sm text-gray-400">Email: volunteer@burmesevihar.org</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
