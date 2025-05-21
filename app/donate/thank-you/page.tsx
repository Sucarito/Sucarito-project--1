"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Download,
  Facebook,
  Heart,
  Instagram,
  Mail,
  Printer,
  Share2,
  Twitter,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const [donationDetails, setDonationDetails] = useState({
    amount: 0,
    name: "",
    email: "",
    transactionId: "",
    date: new Date().toLocaleDateString(),
    paymentMethod: "",
    isMonthly: false,
    dedication: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, you might fetch donation details from an API
    // or use URL parameters passed from the payment completion
    const amount = Number(searchParams.get("amount") || 100)
    const name = searchParams.get("name") || "Generous Donor"
    const email = searchParams.get("email") || "donor@example.com"
    const transactionId = searchParams.get("transaction_id") || `TXN${Math.floor(Math.random() * 1000000)}`
    const paymentMethod = searchParams.get("payment_method") || "Credit Card"
    const isMonthly = searchParams.get("recurring") === "true"
    const dedication = searchParams.get("dedication") || ""

    // Simulate loading state
    setTimeout(() => {
      setDonationDetails({
        amount,
        name,
        email,
        transactionId,
        date: new Date().toLocaleDateString(),
        paymentMethod,
        isMonthly,
        dedication,
      })
      setIsLoading(false)
    }, 500)
  }, [searchParams])

  const handleDownloadReceipt = () => {
    // In a real implementation, this would generate and download a PDF receipt
    alert("In a real implementation, this would download a PDF receipt.")
  }

  const handleAddToCalendar = () => {
    // In a real implementation, this would create a calendar event
    alert("In a real implementation, this would create a calendar event.")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-stone-600">Processing your donation...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
                  <CheckCircle2 className="h-10 w-10 text-amber-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Thank You for Your Donation!</h1>
                <p className="text-xl text-stone-600">
                  Your generous {donationDetails.isMonthly ? "monthly " : ""}contribution of{" "}
                  <span className="font-semibold text-amber-700">{formatCurrency(donationDetails.amount)}</span> will
                  help support our temple and community.
                </p>
              </div>

              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 py-6">
                  <h2 className="text-2xl font-bold text-white text-center">Donation Receipt</h2>
                </CardHeader>
                <CardContent className="p-8 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <p className="text-sm text-stone-500">Donor Name</p>
                      <p className="font-medium text-stone-800">{donationDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Email</p>
                      <p className="font-medium text-stone-800">{donationDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Amount</p>
                      <p className="font-medium text-stone-800">
                        {formatCurrency(donationDetails.amount)}
                        {donationDetails.isMonthly && <span className="text-stone-500 text-sm"> /month</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Date</p>
                      <p className="font-medium text-stone-800">{donationDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Transaction ID</p>
                      <p className="font-medium text-stone-800">{donationDetails.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Payment Method</p>
                      <p className="font-medium text-stone-800">{donationDetails.paymentMethod}</p>
                    </div>
                    {donationDetails.dedication && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-stone-500">Dedication</p>
                        <p className="font-medium text-stone-800">{donationDetails.dedication}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-100">
                    <p className="text-stone-600 mb-2">
                      A receipt has also been sent to your email address. Please keep it for your tax records.
                    </p>
                    <p className="text-stone-600">
                      Burmese Vihar-Bodhgaya is a registered non-profit organization. All donations are tax-deductible
                      to the extent allowed by law.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-amber-600 text-amber-700 hover:bg-amber-50"
                      onClick={handleDownloadReceipt}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Receipt</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-amber-600 text-amber-700 hover:bg-amber-50"
                      onClick={() => window.print()}
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print Receipt</span>
                    </Button>
                    {donationDetails.isMonthly && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-amber-600 text-amber-700 hover:bg-amber-50"
                        onClick={handleAddToCalendar}
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Add to Calendar</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardContent className="p-8 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-amber-100 p-3 flex-shrink-0">
                      <Heart className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-stone-800 mb-2">Your Impact</h3>
                      <p className="text-stone-600 mb-4">
                        Your donation will help us maintain our temple, support our monks, and continue our community
                        programs. Here's how your contribution makes a difference:
                      </p>
                      <ul className="space-y-2 text-stone-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>Preservation of our historic temple buildings and sacred spaces</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>Support for our resident monks and their daily needs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>Meditation classes, cultural events, and educational programs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>Community outreach and charitable initiatives</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Share Your Support</h3>
                <p className="text-stone-600 mb-6">
                  Help spread the word about our temple and inspire others to contribute.
                </p>
                <div className="flex justify-center gap-4 mb-8">
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    <Facebook className="h-5 w-5 text-amber-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    <Twitter className="h-5 w-5 text-amber-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    <Instagram className="h-5 w-5 text-amber-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    <Mail className="h-5 w-5 text-amber-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    <Share2 className="h-5 w-5 text-amber-600" />
                  </Button>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-amber-600 hover:bg-amber-700">Visit Our Temple</Button>
                  <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                    Explore Programs
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
