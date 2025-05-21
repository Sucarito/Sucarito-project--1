import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, ArrowLeft, Calendar, Download } from "lucide-react"

export default function DonationSuccessPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-stone-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <Card className="border-none shadow-md overflow-hidden">
            <div className="bg-amber-600 p-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white mb-4">
                <CheckCircle2 className="h-8 w-8 text-amber-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Thank You for Your Donation!</h1>
              <p className="text-amber-100">Your support means the world to our community.</p>
            </div>

            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <h2 className="font-semibold text-amber-800 mb-2">Donation Details</h2>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-stone-500">Amount:</div>
                    <div className="font-medium text-stone-700">$100.00</div>
                    <div className="text-stone-500">Date:</div>
                    <div className="font-medium text-stone-700">May 17, 2025</div>
                    <div className="text-stone-500">Transaction ID:</div>
                    <div className="font-medium text-stone-700">TXN123456789</div>
                    <div className="text-stone-500">Payment Method:</div>
                    <div className="font-medium text-stone-700">Credit Card (ending in 1234)</div>
                  </div>
                </div>

                <p className="text-stone-600">
                  A receipt has been sent to your email address. If you have any questions about your donation, please
                  contact us at <span className="text-amber-600">donations@burmesevihar.org</span>.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download Receipt</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 border-amber-600 text-amber-700">
                    <Calendar className="h-4 w-4" />
                    <span>Add to Calendar</span>
                  </Button>
                </div>

                <div className="border-t border-stone-200 pt-6 mt-6">
                  <h3 className="font-semibold text-stone-800 mb-4">What Your Donation Supports</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-700">Temple Maintenance</p>
                        <p className="text-sm text-stone-500">
                          Keeping our sacred spaces beautiful and functional for all visitors
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-700">Monastic Support</p>
                        <p className="text-sm text-stone-500">
                          Providing for the daily needs of our resident monks and nuns
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-stone-700">Community Programs</p>
                        <p className="text-sm text-stone-500">
                          Funding meditation classes, cultural events, and educational initiatives
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-stone-600 mb-4">Share your support with others</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-600"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-600"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-600"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
