"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { CheckCircle2, ArrowLeft, Shield, Heart, Gift, Calendar, DollarSign } from "lucide-react"
import PaymentProvider from "./payment-provider"
import PaymentForm from "@/components/payment-form"
import SereneBackgroundSection from "@/components/serene-background-section"

export default function DonatePage() {
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    dedication: "",
  })

  const [monthlyDonorInfo, setMonthlyDonorInfo] = useState({
    name: "",
    email: "",
    dedication: "",
  })

  const [selectedAmount, setSelectedAmount] = useState(50)
  const [selectedMonthlyAmount, setSelectedMonthlyAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState("")
  const [customMonthlyAmount, setCustomMonthlyAmount] = useState("")

  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDonorInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleMonthlyDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMonthlyDonorInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Calculate the actual amount in cents for Stripe
  const getAmount = () => {
    if (customAmount && !isNaN(Number(customAmount))) {
      return Number(customAmount) * 100
    }
    return selectedAmount * 100
  }

  const getMonthlyAmount = () => {
    if (customMonthlyAmount && !isNaN(Number(customMonthlyAmount))) {
      return Number(customMonthlyAmount) * 100
    }
    return selectedMonthlyAmount * 100
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto pt-24 pb-16">
          {/* Header Section */}
          <SereneBackgroundSection minHeight="300px" overlayOpacity={0.8} className="mb-12">
            <div className="text-center">
              <Link href="/" className="inline-flex items-center text-amber-300 hover:text-amber-200 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Support Our Temple</h1>
              <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
              <p className="text-lg text-amber-100 mb-4 max-w-2xl mx-auto">
                Your generous donations help us maintain the temple, support our monks, and continue our community
                programs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-amber-800/50 text-amber-100 px-4 py-2 rounded-full">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Tax Deductible</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-800/50 text-amber-100 px-4 py-2 rounded-full">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-800/50 text-amber-100 px-4 py-2 rounded-full">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">100% to Temple</span>
                </div>
              </div>
            </div>
          </SereneBackgroundSection>

          {/* Main Content */}
          <Tabs defaultValue="one-time" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="one-time" className="text-base">
                One-time Donation
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-base">
                Monthly Support
              </TabsTrigger>
            </TabsList>

            <TabsContent value="one-time">
              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                  <CardTitle className="text-2xl">Select Your Donation Amount</CardTitle>
                  <CardDescription className="text-white/90">
                    Choose how much you would like to contribute
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 bg-gradient-to-b from-amber-50/50 to-white">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg font-medium mb-4 block text-stone-800">Select Amount</Label>
                      <RadioGroup
                        defaultValue="50"
                        className="grid grid-cols-3 sm:grid-cols-6 gap-3"
                        onValueChange={(value) => setSelectedAmount(Number(value))}
                      >
                        {[20, 50, 100, 200, 500, 1000].map((amount) => (
                          <div key={amount} className="relative">
                            <RadioGroupItem
                              value={amount.toString()}
                              id={`amount-${amount}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`amount-${amount}`}
                              className="flex h-16 items-center justify-center rounded-lg border-2 border-amber-200 bg-white text-center peer-data-[state=checked]:border-amber-600 peer-data-[state=checked]:bg-amber-50 peer-data-[state=checked]:text-amber-700 cursor-pointer hover:bg-amber-50/50 transition-all shadow-sm hover:shadow-md"
                            >
                              <span className="text-lg font-semibold">${amount}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="custom-amount" className="text-stone-800">
                          Custom Amount
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-lg">$</span>
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="Enter amount"
                            className="pl-10 py-6 text-lg border-2 border-amber-200 focus-visible:ring-amber-500"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start">
                        <DollarSign className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-amber-800">
                            Your donation is tax-deductible. You will receive a receipt via email for your records.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-800 text-white">
                  <CardTitle className="text-2xl">Your Information</CardTitle>
                  <CardDescription className="text-white/90">
                    Please provide your details for the donation receipt
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 bg-gradient-to-b from-amber-50/50 to-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-stone-800">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="py-6 text-lg border-2 border-amber-200 focus-visible:ring-amber-500"
                        value={donorInfo.name}
                        onChange={handleDonorInfoChange}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-stone-800">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="py-6 text-lg border-2 border-amber-200 focus-visible:ring-amber-500"
                        value={donorInfo.email}
                        onChange={handleDonorInfoChange}
                      />
                      <p className="text-sm text-stone-500">We'll send a receipt to this email address</p>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <Label htmlFor="dedication" className="text-stone-800">
                        Dedication (Optional)
                      </Label>
                      <textarea
                        id="dedication"
                        name="dedication"
                        className="min-h-[100px] w-full rounded-lg border-2 border-amber-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="In memory of / In honor of / For the benefit of..."
                        value={donorInfo.dedication}
                        onChange={handleDonorInfoChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Card */}
              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                  <CardTitle className="text-2xl">Payment Details</CardTitle>
                  <CardDescription className="text-white/90">Enter your card information securely</CardDescription>
                </CardHeader>
                <CardContent className="p-8 bg-gradient-to-b from-amber-50/50 to-white">
                  <PaymentProvider>
                    <PaymentForm
                      amount={getAmount()}
                      donorName={donorInfo.name}
                      donorEmail={donorInfo.email}
                      dedication={donorInfo.dedication}
                      isMonthly={false}
                    />
                  </PaymentProvider>
                </CardContent>
              </Card>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 pt-2">
                <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="Amex" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="PayPal" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="Apple Pay" className="h-8" />
              </div>

              <p className="text-sm text-center text-stone-500 mt-4">
                By proceeding, you agree to our{" "}
                <Link href="#" className="text-amber-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-amber-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </TabsContent>

            <TabsContent value="monthly">
              {/* Similar structure for monthly donations */}
              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                  <CardTitle className="text-2xl">Select Your Monthly Amount</CardTitle>
                  <CardDescription className="text-white/90">
                    Choose how much you would like to contribute each month
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 bg-gradient-to-b from-amber-50/50 to-white">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg font-medium mb-4 block text-stone-800">Select Monthly Amount</Label>
                      <RadioGroup
                        defaultValue="25"
                        className="grid grid-cols-3 sm:grid-cols-6 gap-3"
                        onValueChange={(value) => setSelectedMonthlyAmount(Number(value))}
                      >
                        {[10, 25, 50, 100, 200, 500].map((amount) => (
                          <div key={amount} className="relative">
                            <RadioGroupItem
                              value={amount.toString()}
                              id={`monthly-${amount}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`monthly-${amount}`}
                              className="flex h-16 items-center justify-center rounded-lg border-2 border-amber-200 bg-white text-center peer-data-[state=checked]:border-amber-600 peer-data-[state=checked]:bg-amber-50 peer-data-[state=checked]:text-amber-700 cursor-pointer hover:bg-amber-50/50 transition-all shadow-sm hover:shadow-md"
                            >
                              <span className="text-lg font-semibold">${amount}/mo</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="monthly-custom-amount" className="text-stone-800">
                          Custom Monthly Amount
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-lg">$</span>
                          <Input
                            id="monthly-custom-amount"
                            type="number"
                            placeholder="Enter amount"
                            className="pl-10 py-6 text-lg border-2 border-amber-200 focus-visible:ring-amber-500"
                            value={customMonthlyAmount}
                            onChange={(e) => setCustomMonthlyAmount(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start">
                        <Calendar className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-amber-800">
                            You can cancel or modify your monthly donation at any time through your account.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-5 rounded-lg border border-amber-200">
                      <h3 className="font-medium text-amber-800 text-lg mb-2">Monthly Supporter Benefits</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-amber-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          <span>Special prayers during ceremonies</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          <span>Quarterly newsletter updates</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          <span>Priority registration for retreats</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          <span>Annual blessing ceremony invitation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-800 text-white">
                  <CardTitle className="text-2xl">Your Information</CardTitle>
                  <CardDescription className="text-white/90">
                    Please provide your details for the donation receipt
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 bg-gradient-to-b from-amber-50/50 to-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="monthly-name" className="text-stone-800">
                        Full Name
                      </Label>
                      <Input
                        id="monthly-name"
                        name="name"
                        placeholder="Your name"
                        className="py-6 text-lg border-2 border-amber-200 focus-visible:ring-amber-500"
                        value={monthlyDonorInfo.name}
                        onChange={handleMonthlyDonorInfoChange}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="monthly-email" className="text-stone-800">
                        Email Address
                      </Label>
                      <Input
                        id="monthly-email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="py-6 text-lg border-2 border-amber-200 focus-visible:ring-amber-500"
                        value={monthlyDonorInfo.email}
                        onChange={handleMonthlyDonorInfoChange}
                      />
                      <p className="text-sm text-stone-500">We'll send a receipt to this email address</p>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <Label htmlFor="monthly-dedication" className="text-stone-800">
                        Dedication (Optional)
                      </Label>
                      <textarea
                        id="monthly-dedication"
                        name="dedication"
                        className="min-h-[100px] w-full rounded-lg border-2 border-amber-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="In memory of / In honor of / For the benefit of..."
                        value={monthlyDonorInfo.dedication}
                        onChange={handleMonthlyDonorInfoChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Card for Monthly */}
              <Card className="border-none shadow-lg overflow-hidden mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                  <CardTitle className="text-2xl">Payment Details</CardTitle>
                  <CardDescription className="text-white/90">Enter your card information securely</CardDescription>
                </CardHeader>
                <CardContent className="p-8 bg-gradient-to-b from-amber-50/50 to-white">
                  <PaymentProvider>
                    <PaymentForm
                      amount={getMonthlyAmount()}
                      donorName={monthlyDonorInfo.name}
                      donorEmail={monthlyDonorInfo.email}
                      dedication={monthlyDonorInfo.dedication}
                      isMonthly={true}
                    />
                  </PaymentProvider>
                </CardContent>
              </Card>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 pt-2">
                <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="Amex" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="PayPal" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="Apple Pay" className="h-8" />
              </div>

              <p className="text-sm text-center text-stone-500 mt-4">
                By proceeding, you agree to our{" "}
                <Link href="#" className="text-amber-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-amber-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </TabsContent>
          </Tabs>

          {/* Impact Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-stone-800">Your Donation Makes a Difference</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-none shadow-md bg-gradient-to-b from-white to-amber-50">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                    <Gift className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Temple Preservation</h3>
                  <p className="text-stone-600 text-center">
                    Your donations help maintain our historic temple buildings and sacred spaces for future generations.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-gradient-to-b from-white to-amber-50">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                    <Heart className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Community Support</h3>
                  <p className="text-stone-600 text-center">
                    We provide meditation classes, cultural events, and educational programs for the local community.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-gradient-to-b from-white to-amber-50">
                <CardContent className="pt-6 p-6">
                  <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                    <DollarSign className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Monastic Support</h3>
                  <p className="text-stone-600 text-center">
                    Your generosity helps support our resident monks and their daily needs and spiritual practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
