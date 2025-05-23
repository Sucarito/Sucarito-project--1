"use client"

import type React from "react"
import { useState } from "react"
import { createCheckoutSession } from "./checkout-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Heart, CreditCard, Calendar, Shield, CheckCircle, Sparkles, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DonationForm() {
  const [isMonthly, setIsMonthly] = useState(false)
  const [donationType, setDonationType] = useState("general")
  const [amount, setAmount] = useState<string>("5000")
  const [isCustomAmount, setIsCustomAmount] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAmountSelect = (value: string) => {
    if (value === "custom") {
      setIsCustomAmount(true)
      setAmount("")
    } else {
      setIsCustomAmount(false)
      setAmount(value)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Call the server action to create a checkout session
      const result = await createCheckoutSession(new FormData(event.currentTarget))

      if (result.error) {
        // Handle error
        setError(result.error)
        setIsSubmitting(false)
      } else if (result.url) {
        // Redirect to Stripe Checkout
        window.location.href = result.url
      } else {
        // Unexpected result
        setError("An unexpected error occurred. Please try again.")
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("An error occurred while processing your donation. Please try again.")
      setIsSubmitting(false)
    }
  }

  const donationPurposes = [
    { value: "general", label: "General Temple Support", icon: "🏛️" },
    { value: "maintenance", label: "Temple Maintenance", icon: "🔧" },
    { value: "education", label: "Education Programs", icon: "📚" },
    { value: "community", label: "Community Outreach", icon: "🤝" },
    { value: "meditation", label: "Meditation Programs", icon: "🧘" },
  ]

  return (
    <div id="donation-form" className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Heart className="h-6 w-6" />
              </div>
              Complete Your Donation
            </CardTitle>
            <CardDescription className="text-amber-100 text-lg mt-2">
              Your generosity creates lasting change in our community
            </CardDescription>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        </CardHeader>

        {error && (
          <Alert variant="destructive" className="mx-8 mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-8">
            {/* Donation Purpose */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">Choose Your Impact</Label>
              <Select name="donationType" value={donationType} onValueChange={setDonationType}>
                <SelectTrigger className="h-14 text-lg border-2 border-gray-200 hover:border-amber-300 transition-colors">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {donationPurposes.map((purpose) => (
                    <SelectItem key={purpose.value} value={purpose.value} className="text-lg py-3">
                      <span className="flex items-center gap-3">
                        <span>{purpose.icon}</span>
                        {purpose.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Donation Frequency */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">Donation Frequency</Label>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {isMonthly ? "Monthly Donation" : "One-time Donation"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isMonthly ? "Ongoing support for sustained impact" : "Single contribution"}
                    </div>
                  </div>
                </div>
                <Switch
                  id="isMonthly"
                  name="isMonthly"
                  checked={isMonthly}
                  onCheckedChange={setIsMonthly}
                  value={isMonthly ? "true" : "false"}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            </div>

            {/* Donation Amount */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">Select Amount</Label>
              <RadioGroup
                defaultValue="5000"
                className="grid grid-cols-2 gap-4 lg:grid-cols-4"
                onValueChange={handleAmountSelect}
              >
                {[
                  { value: "2000", label: "₹2,000", popular: false },
                  { value: "5000", label: "₹5,000", popular: true },
                  { value: "10000", label: "₹10,000", popular: false },
                  { value: "custom", label: "Custom", popular: false },
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={`amount-${option.value}`}
                    className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-6 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-300 ${
                      (!isCustomAmount && amount === option.value) || (isCustomAmount && option.value === "custom")
                        ? "border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {option.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Popular
                        </div>
                      </div>
                    )}
                    <RadioGroupItem value={option.value} id={`amount-${option.value}`} className="sr-only" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{option.label}</div>
                    {option.value !== "custom" && (
                      <div className="text-sm text-gray-500 text-center">
                        {option.value === "2000" && "Meditation Session"}
                        {option.value === "5000" && "Education Support"}
                        {option.value === "10000" && "Temple Maintenance"}
                      </div>
                    )}
                  </Label>
                ))}
              </RadioGroup>

              {isCustomAmount && (
                <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <Label htmlFor="custom-amount" className="text-base font-medium text-gray-900">
                    Enter Your Amount (₹)
                  </Label>
                  <Input
                    id="custom-amount"
                    name="amount"
                    type="number"
                    min="100"
                    step="1"
                    placeholder="Enter amount in rupees"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="mt-2 h-12 text-lg border-2 border-amber-200 focus:border-amber-400"
                  />
                </div>
              )}
              {!isCustomAmount && <input type="hidden" name="amount" value={amount} />}
              <input type="hidden" name="currency" value="inr" />
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">Your Information</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    className="h-12 border-2 border-gray-200 focus:border-amber-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    className="h-12 border-2 border-gray-200 focus:border-amber-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-amber-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-medium">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Share why you're donating or any special message..."
                  className="border-2 border-gray-200 focus:border-amber-400 min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-8 bg-gradient-to-r from-gray-50 to-amber-50/50">
            <div className="w-full space-y-4">
              {/* Security Notice */}
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <div className="text-sm text-green-800">
                  <div className="font-medium">Secure Payment</div>
                  <div>Protected by 256-bit SSL encryption</div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-16 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 hover:from-amber-700 hover:via-orange-600 hover:to-red-600 text-white text-xl font-bold rounded-xl shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Your Donation...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6" />
                    <span>
                      Donate {amount && !isCustomAmount ? `₹${Number.parseInt(amount).toLocaleString()}` : ""} Securely
                    </span>
                  </div>
                )}
              </Button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Tax Deductible</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Instant Receipt</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
