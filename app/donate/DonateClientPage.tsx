"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, NotebookIcon as Lotus, School, Landmark, Send, Check } from "lucide-react"

const donationProjects = [
  {
    id: "temple",
    title: "Temple Maintenance",
    description: "Help us preserve our historic buildings and sacred spaces",
    icon: <Landmark className="h-8 w-8 mb-2 text-amber-600" />,
    goal: 50000,
    raised: 32500,
  },
  {
    id: "education",
    title: "Education Programs",
    description: "Support our Dhamma school and scholarship programs for local children",
    icon: <School className="h-8 w-8 mb-2 text-amber-600" />,
    goal: 25000,
    raised: 18750,
  },
  {
    id: "community",
    title: "Community Outreach",
    description: "Fund our initiatives to provide medical care and essential supplies to local families",
    icon: <Heart className="h-8 w-8 mb-2 text-amber-600" />,
    goal: 35000,
    raised: 21000,
  },
  {
    id: "meditation",
    title: "Meditation Center",
    description: "Help expand our meditation facilities to accommodate more practitioners",
    icon: <Lotus className="h-8 w-8 mb-2 text-amber-600" />,
    goal: 40000,
    raised: 12000,
  },
]

export default function DonateClientPage() {
  const [donationAmount, setDonationAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<string>("general")
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    message: "",
  })
  const [isMonthly, setIsMonthly] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleAmountChange = (amount: string) => {
    setDonationAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setDonationAmount("custom")
  }

  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDonorInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.85] z-0"
          style={{
            backgroundImage: "url('/buddhist-temple-offering.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 tracking-wide">
              Support Our Mission
            </h1>
            <div className="h-px w-32 bg-amber-500 mb-8"></div>
            <p className="text-xl text-white/80 max-w-2xl">
              Your generous donations help preserve our historic monastery and support our work in teaching the Dhamma.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          {isSubmitted ? (
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">
                Thank You for Your Donation
              </h2>
              <p className="text-stone-700 mb-8">
                Your generous contribution will help support our mission to preserve and share the teachings of the
                Buddha. We've sent a confirmation to your email address.
              </p>
              <Button asChild className="bg-amber-600 hover:bg-amber-700 rounded-none">
                <Link href="/">Return to Homepage</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">Make a Donation</h2>
                <div className="h-px w-20 bg-amber-500 mb-8"></div>

                <p className="text-stone-700 mb-8 leading-relaxed">
                  Your support enables us to maintain our historic temple, provide educational programs, support our
                  resident monks, and continue our community outreach efforts.
                </p>

                <Tabs defaultValue="once" className="mb-8">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger
                      value="once"
                      className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                      onClick={() => setIsMonthly(false)}
                    >
                      One-time Donation
                    </TabsTrigger>
                    <TabsTrigger
                      value="monthly"
                      className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                      onClick={() => setIsMonthly(true)}
                    >
                      Monthly Giving
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="once" className="pt-6">
                    <p className="text-stone-600 mb-4">
                      Make a one-time contribution to support our work. All donations are tax-deductible.
                    </p>
                  </TabsContent>
                  <TabsContent value="monthly" className="pt-6">
                    <p className="text-stone-600 mb-4">
                      Join our circle of sustaining donors. Your monthly gift provides reliable support for our ongoing
                      programs.
                    </p>
                  </TabsContent>
                </Tabs>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium text-stone-800 mb-4">Select Donation Amount</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {["25", "50", "100", "250"].map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount ? "default" : "outline"}
                          onClick={() => handleAmountChange(amount)}
                          className={
                            donationAmount === amount
                              ? "bg-amber-600 hover:bg-amber-700 border-amber-600"
                              : "border-amber-600 text-amber-700 hover:bg-amber-50"
                          }
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-none">
                        <input
                          type="radio"
                          id="custom"
                          name="donationAmount"
                          value="custom"
                          checked={donationAmount === "custom"}
                          onChange={() => setDonationAmount("custom")}
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                        />
                      </div>
                      <Label htmlFor="customAmount" className="flex-none">
                        Custom Amount:
                      </Label>
                      <div className="flex-1">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">$</span>
                          <Input
                            id="customAmount"
                            type="number"
                            min="1"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            className="pl-8"
                            onClick={() => setDonationAmount("custom")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-stone-800 mb-4">Select Donation Purpose</h3>
                    <RadioGroup value={donationType} onValueChange={setDonationType} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" className="text-amber-600" />
                        <Label htmlFor="general">General Temple Support</Label>
                      </div>

                      {donationProjects.map((project) => (
                        <div key={project.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={project.id} id={project.id} className="text-amber-600" />
                          <Label htmlFor={project.id}>{project.title}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-stone-800 mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={donorInfo.firstName}
                          onChange={handleDonorInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={donorInfo.lastName}
                          onChange={handleDonorInfoChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={donorInfo.email}
                        onChange={handleDonorInfoChange}
                        required
                      />
                    </div>

                    <div className="space-y-2 mb-4">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        name="country"
                        onValueChange={(value) => setDonorInfo((prev) => ({ ...prev, country: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="mm">Myanmar</SelectItem>
                          <SelectItem value="th">Thailand</SelectItem>
                          <SelectItem value="lk">Sri Lanka</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Leave a Message (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Share your thoughts or specify how you'd like your donation to be used"
                        value={donorInfo.message}
                        onChange={handleDonorInfoChange}
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 rounded-none py-6 text-lg">
                    <Send className="mr-2 h-5 w-5" />
                    {isMonthly ? "Start Monthly Donation" : "Complete Donation"}
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-light text-stone-800 mb-6">Current Projects</h2>
                <div className="h-px w-20 bg-amber-500 mb-8"></div>

                <div className="space-y-6">
                  {donationProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <CardHeader className="bg-stone-50 pb-3">
                        <div className="flex items-center mb-1">
                          {project.icon}
                          <CardTitle className="text-xl ml-2">{project.title}</CardTitle>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{Math.round((project.raised / project.goal) * 100)}%</span>
                          </div>
                          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-600 rounded-full"
                              style={{ width: `${(project.raised / project.goal) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-stone-600">
                            <span>Raised: ${project.raised.toLocaleString()}</span>
                            <span>Goal: ${project.goal.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                          onClick={() => {
                            setDonationType(project.id)
                            window.scrollTo({ top: 500, behavior: "smooth" })
                          }}
                        >
                          Support This Project
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-amber-50 border border-amber-100">
                  <h3 className="text-xl font-medium text-stone-800 mb-4">Other Ways to Give</h3>
                  <ul className="space-y-3 text-stone-700">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">
                        1
                      </div>
                      <div>
                        <span className="font-medium">Bank Transfer:</span> Contact us for our bank details to make a
                        direct transfer.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">
                        2
                      </div>
                      <div>
                        <span className="font-medium">In-person Donations:</span> Visit our temple to make an offering
                        in person.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">
                        3
                      </div>
                      <div>
                        <span className="font-medium">Checks:</span> Mail checks to our address, payable to "Burmese
                        Vihar Bodhgaya."
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
