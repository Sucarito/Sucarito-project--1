"use client"

import { useState, useEffect } from "react"
import type { User } from "next-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Calendar, CreditCard, DollarSign, Heart, UserIcon } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface DonorDashboardProps {
  user: User
}

export default function DonorDashboard({ user }: DonorDashboardProps) {
  const [donations, setDonations] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalDonated: 0,
    monthlyDonations: 0,
    donationCount: 0,
    lastDonation: null as Date | null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDonations() {
      try {
        const response = await fetch("/api/donations?limit=5")
        const data = await response.json()

        if (data.donations) {
          setDonations(data.donations)

          // Calculate stats
          const total = data.donations.reduce((sum: number, donation: any) => sum + donation.amount, 0)
          const monthly = data.donations
            .filter((donation: any) => donation.isMonthly)
            .reduce((sum: number, donation: any) => sum + donation.amount, 0)

          const dates = data.donations.map((donation: any) => new Date(donation.createdAt))
          const lastDonation = dates.length > 0 ? new Date(Math.max(...dates.map((d) => d.getTime()))) : null

          setStats({
            totalDonated: total,
            monthlyDonations: monthly,
            donationCount: data.pagination.total,
            lastDonation,
          })
        }
      } catch (error) {
        console.error("Error fetching donations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDonations()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-stone-800">Donor Portal</h1>
              <p className="text-stone-600">Welcome back, {user.name || user.email}</p>
            </div>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/donate">Make a New Donation</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardDescription>Total Contributions</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                  {isLoading ? (
                    <div className="h-8 w-24 bg-stone-200 animate-pulse rounded"></div>
                  ) : (
                    formatCurrency(stats.totalDonated)
                  )}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardDescription>Monthly Support</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  {isLoading ? (
                    <div className="h-8 w-24 bg-stone-200 animate-pulse rounded"></div>
                  ) : (
                    formatCurrency(stats.monthlyDonations) + "/month"
                  )}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardDescription>Total Donations</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Heart className="h-5 w-5 text-amber-600" />
                  {isLoading ? (
                    <div className="h-8 w-12 bg-stone-200 animate-pulse rounded"></div>
                  ) : (
                    stats.donationCount
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Tabs defaultValue="donations" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="donations">Recent Donations</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="donations">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Your Recent Donations</CardTitle>
                  <CardDescription>View your donation history and download receipts</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex justify-between p-4 border-b">
                          <div className="space-y-2">
                            <div className="h-5 w-32 bg-stone-200 animate-pulse rounded"></div>
                            <div className="h-4 w-24 bg-stone-200 animate-pulse rounded"></div>
                          </div>
                          <div className="h-8 w-20 bg-stone-200 animate-pulse rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : donations.length > 0 ? (
                    <div className="space-y-4">
                      {donations.map((donation) => (
                        <div
                          key={donation.id}
                          className="flex justify-between items-center p-4 border-b hover:bg-stone-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-stone-800">
                              {donation.isMonthly ? "Monthly Donation" : "One-time Donation"}
                            </p>
                            <p className="text-sm text-stone-500">
                              {new Date(donation.createdAt).toLocaleDateString()} • {donation.paymentMethod}
                            </p>
                            {donation.dedication && (
                              <p className="text-sm text-amber-600 italic mt-1">"{donation.dedication}"</p>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-stone-800">{formatCurrency(donation.amount)}</span>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/donor-portal/donations/${donation.id}`}>
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-center mt-6">
                        <Button variant="outline" asChild className="border-amber-600 text-amber-700 hover:bg-amber-50">
                          <Link href="/donor-portal/donations">View All Donations</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-amber-200 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-stone-800 mb-2">No donations yet</h3>
                      <p className="text-stone-600 mb-4">Make your first donation to support our temple</p>
                      <Button asChild className="bg-amber-600 hover:bg-amber-700">
                        <Link href="/donate">Make a Donation</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                        <UserIcon className="h-8 w-8 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-800">{user.name || "Donor"}</h3>
                        <p className="text-stone-600">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-stone-500 mb-1">Email</h3>
                        <p className="text-stone-800">{user.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-stone-500 mb-1">Member Since</h3>
                        <p className="text-stone-800">May 2025</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-stone-500 mb-1">Donation Preferences</h3>
                        <p className="text-stone-800">Email receipts, Monthly newsletter</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-stone-500 mb-1">Tax Receipts</h3>
                        <p className="text-stone-800">Sent annually in January</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment-methods">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Saved Payment Methods</CardTitle>
                  <CardDescription>Manage your payment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-stone-800">Visa ending in 4242</p>
                          <p className="text-sm text-stone-500">Expires 12/2028</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                          Remove
                        </Button>
                      </div>
                    </div>

                    <Button className="bg-amber-600 hover:bg-amber-700">Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
