"use client"

import { useState, useEffect } from "react"
import type { User } from "next-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle2, Download, Heart, Printer } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { generatePdfReceipt, downloadPdfReceipt } from "@/lib/pdf"

interface DonationDetailsProps {
  donationId: string
  user: User
}

export default function DonationDetails({ donationId, user }: DonationDetailsProps) {
  const [donation, setDonation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDonation() {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from your API
        // For now, we'll use mock data
        const mockDonation = {
          id: donationId,
          userId: "user_1",
          amount: 100,
          currency: "USD",
          status: "completed",
          paymentMethod: "Credit Card ending in 4242",
          transactionId: `txn_${donationId}`,
          isMonthly: false,
          dedication: "In memory of my grandfather",
          createdAt: new Date("2025-05-01T10:30:00Z"),
          emailSent: true,
          emailTemplate: "donation_receipt",
          emailOpened: true,
          emailOpenedAt: new Date("2025-05-01T10:35:00Z"),
        }

        // Simulate API delay
        setTimeout(() => {
          setDonation(mockDonation)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching donation:", error)
        setIsLoading(false)
      }
    }

    fetchDonation()
  }, [donationId])

  const handleDownloadReceipt = async () => {
    if (!donation) return

    try {
      const pdfBlob = await generatePdfReceipt({
        name: user.name || "Donor",
        email: user.email || "",
        amount: donation.amount,
        transactionId: donation.transactionId,
        date: donation.createdAt,
        paymentMethod: donation.paymentMethod,
        isMonthly: donation.isMonthly,
        dedication: donation.dedication,
      })

      downloadPdfReceipt(pdfBlob, `donation-receipt-${donation.transactionId}.pdf`)
    } catch (error) {
      console.error("Error generating receipt:", error)
      alert("Failed to generate receipt. Please try again.")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/donor-portal/donations"
              className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Donation History
            </Link>
            <h1 className="text-3xl font-bold text-stone-800">Donation Details</h1>
            <p className="text-stone-600">View details and download receipt</p>
          </div>

          {isLoading ? (
            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <div className="animate-pulse space-y-6">
                  <div className="h-8 w-1/2 bg-stone-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-stone-200 rounded"></div>
                    <div className="h-4 w-full bg-stone-200 rounded"></div>
                    <div className="h-4 w-2/3 bg-stone-200 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="h-4 w-1/3 bg-stone-200 rounded"></div>
                      <div className="h-6 w-1/2 bg-stone-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-1/3 bg-stone-200 rounded"></div>
                      <div className="h-6 w-1/2 bg-stone-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : donation ? (
            <>
              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 py-6">
                  <CardTitle className="text-2xl text-white">Donation Receipt</CardTitle>
                </CardHeader>
                <CardContent className="p-8 bg-white">
                  <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                      {donation.status}
                    </div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-2">{formatCurrency(donation.amount)}</h2>
                    <p className="text-stone-600">
                      {donation.isMonthly ? "Monthly Donation" : "One-time Donation"} •
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                    <div>
                      <p className="text-sm text-stone-500">Donor Name</p>
                      <p className="font-medium text-stone-800">{user.name || user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Email</p>
                      <p className="font-medium text-stone-800">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Transaction ID</p>
                      <p className="font-medium text-stone-800">{donation.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500">Payment Method</p>
                      <p className="font-medium text-stone-800">{donation.paymentMethod}</p>
                    </div>
                    {donation.dedication && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-stone-500">Dedication</p>
                        <p className="font-medium text-stone-800 italic">"{donation.dedication}"</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-amber-50 p-5 rounded-lg border border-amber-100 mb-6">
                    <h3 className="font-medium text-amber-800 text-lg mb-2">Tax Information</h3>
                    <p className="text-amber-700">
                      This receipt is for your tax records. Burmese Vihar-Bodhgaya is a registered non-profit
                      organization. All donations are tax-deductible to the extent allowed by law.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
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
                    {donation.isMonthly && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-amber-600 text-amber-700 hover:bg-amber-50"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Manage Recurring Donation</span>
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
                        Your donation helps us maintain our temple, support our monks, and continue our community
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

              <div className="flex justify-center">
                <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href="/donate">Make Another Donation</Link>
                </Button>
              </div>
            </>
          ) : (
            <Card className="border-none shadow-md">
              <CardContent className="p-8 text-center">
                <p className="text-stone-600">Donation not found or you don't have permission to view it.</p>
                <Button className="mt-4 bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href="/donor-portal/donations">Return to Donation History</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
