"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Landmark,
  School,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  BookOpen,
  Home,
  Globe,
  Clock,
  CreditCard,
  Info,
} from "lucide-react"
import { createPaymentIntent, type DonationData } from "./actions"
import { StripePaymentWrapper } from "./stripe-payment"

const donationProjects = [
  {
    id: "temple",
    title: "Temple Maintenance",
    description: "Help us preserve our historic buildings and sacred spaces",
    icon: <Landmark className="h-8 w-8 mb-2 text-amber-600" />,
    goal: 50000,
    raised: 32500,
    image: "/temple-maintenance.png",
  },
  {
    id: "education",
    title: "Education Programs",
    description: "Support our Dhamma school and scholarship programs for local children",
    icon: <School className="h-8 w-8 mb-2 text-amber-600" />,
    goal: 25000,
    raised: 18750,
    image: "/education-programs.png",
  },
  {
    id: "community",
    title: "Community Outreach",
    description: "Fund our initiatives to provide medical care and essential supplies to local families",
    icon: <Heart className="h-8 w-8 mb-2 text-amber-600" />,
    goal: 35000,
    raised: 21000,
    image: "/community-outreach.png",
  },
  {
    id: "meditation",
    title: "Meditation Center",
    description: "Help expand our meditation facilities to accommodate more practitioners",
    icon: <Sparkles className="h-8 w-8 mb-2 text-amber-600" />,
    goal: 40000,
    raised: 12000,
    image: "/meditation-center.png",
  },
]

const impactStats = [
  {
    number: "5,000+",
    label: "Visitors Hosted Annually",
    icon: <Users className="h-6 w-6 text-amber-600" />,
  },
  {
    number: "120+",
    label: "Children Educated",
    icon: <BookOpen className="h-6 w-6 text-amber-600" />,
  },
  {
    number: "85+",
    label: "Years of Service",
    icon: <Clock className="h-6 w-6 text-amber-600" />,
  },
  {
    number: "12+",
    label: "Community Programs",
    icon: <Home className="h-6 w-6 text-amber-600" />,
  },
]

const testimonials = [
  {
    quote: "My monthly donation to Burmese Vihar gives me joy knowing I'm helping preserve these ancient teachings.",
    author: "Sarah Johnson",
    location: "United States",
    image: "/donor-testimonial-1.png",
  },
  {
    quote: "Supporting the education programs has been deeply fulfilling. The impact on local children is remarkable.",
    author: "Raj Patel",
    location: "India",
    image: "/donor-testimonial-2.png",
  },
  {
    quote: "As a long-time supporter, I've seen firsthand how every donation transforms lives in the community.",
    author: "Mei Lin",
    location: "Singapore",
    image: "/donor-testimonial-3.png",
  },
]

export default function DonateClientPage() {
  const [donationAmount, setDonationAmount] = useState<string>("50")
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const [clientSecret, setClientSecret] = useState<string>("")
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)
  const [paymentId, setPaymentId] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentProcessing(true)
    setPaymentError(null)

    try {
      // Validate form data
      if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) {
        throw new Error("Please fill in all required fields")
      }

      // Get the donation amount
      const amount = donationAmount === "custom" ? Number.parseFloat(customAmount) : Number.parseFloat(donationAmount)

      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid donation amount")
      }

      // Prepare donation data
      const donationData: DonationData = {
        amount,
        currency: "usd",
        donationType,
        isMonthly,
        firstName: donorInfo.firstName,
        lastName: donorInfo.lastName,
        email: donorInfo.email,
        country: donorInfo.country,
        message: donorInfo.message,
      }

      // Create payment intent
      const result = await createPaymentIntent(donationData)

      if (result.success && result.clientSecret) {
        setClientSecret(result.clientSecret)
        if (result.paymentIntentId) {
          setPaymentId(result.paymentIntentId)
        } else if (result.subscriptionId) {
          setPaymentId(result.subscriptionId)
        }
      } else {
        throw new Error(result.error || "Failed to create payment intent")
      }
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "An unknown error occurred")
      setPaymentProcessing(false)
    }
  }

  const handlePaymentSuccess = useCallback(
    (id: string) => {
      setPaymentId(id)
      setPaymentSuccess(true)
      setPaymentProcessing(false)
      // Redirect to success page
      window.location.href = `/donate/success?${isMonthly ? "subscription=" : "payment_intent="}${id}`
    },
    [isMonthly],
  )

  const handlePaymentError = useCallback((error: string) => {
    setPaymentError(error)
    setPaymentProcessing(false)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <main className="overflow-hidden">
      {isSubmitted ? (
        <section className="min-h-screen flex items-center justify-center bg-stone-50 py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center bg-white p-12 rounded-xl shadow-xl"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-800 mb-6">
                Thank You for Your Generous Donation
              </h2>
              <div className="h-px w-32 bg-amber-500 mx-auto mb-8"></div>
              <p className="text-xl text-stone-700 mb-8 leading-relaxed">
                Your contribution will help support our mission to preserve and share the teachings of the Buddha. We've
                sent a confirmation to your email address.
              </p>
              <p className="text-stone-600 mb-12">
                Your donation helps us maintain our historic temple, provide educational programs, support our resident
                monks, and continue our community outreach efforts.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6 text-lg">
                  <Link href="/">Return to Homepage</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-none px-8 py-6 text-lg"
                  onClick={() => setIsSubmitted(false)}
                >
                  Make Another Donation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section - Immersive and visually striking */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: "url('/donation-hero-image.png')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

            <div className="container relative z-10 px-4 md:px-6 py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-block p-2 bg-amber-600/30 backdrop-blur-sm rounded-full mb-6">
                  <span className="text-white/90 text-sm font-medium tracking-wider px-4 py-1">MAKE A DIFFERENCE</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-wide leading-tight mb-6">
                  Support Our Sacred Mission
                </h1>
                <div className="h-px w-32 bg-amber-500 mx-auto mb-8"></div>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                  Your generous contribution helps preserve ancient wisdom, support our community, and continue our
                  spiritual traditions for generations to come
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6 text-lg"
                    onClick={() => {
                      document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Donate Now
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-stone-900 hover:bg-white/90 rounded-none px-8 py-6 text-lg"
                    onClick={() => {
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Explore Our Projects
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
          </section>

          {/* Impact Stats Section - Visual and engaging */}
          <section className="py-20 bg-white">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Our Impact</span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6">
                  The Difference You Make
                </h2>
                <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
                <p className="text-lg text-stone-700">
                  Your donations have a profound impact on our monastery and the communities we serve
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
              >
                {impactStats.map((stat, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          {stat.icon}
                        </div>
                        <h3 className="text-4xl font-bold text-amber-600 mb-2">{stat.number}</h3>
                        <p className="text-stone-700">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Projects Section - Visual and interactive */}
          <section id="projects" className="py-20 bg-stone-50">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Our Initiatives</span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6">
                  Current Projects
                </h2>
                <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
                <p className="text-lg text-stone-700">
                  Explore our ongoing projects and choose where you'd like your donation to make an impact
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {donationProjects.map((project, index) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <Card
                      className={`border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full ${
                        activeProject === project.id ? "ring-2 ring-amber-500" : ""
                      }`}
                      onClick={() => {
                        setActiveProject(project.id)
                        setDonationType(project.id)
                        document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex justify-between text-white text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{Math.round((project.raised / project.goal) * 100)}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${(project.raised / project.goal) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center mb-1">
                          {project.icon}
                          <CardTitle className="text-xl ml-2">{project.title}</CardTitle>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex justify-between text-sm text-stone-600">
                          <span>Raised: ${project.raised.toLocaleString()}</span>
                          <span>Goal: ${project.goal.toLocaleString()}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white group"
                          onClick={() => {
                            setDonationType(project.id)
                            setActiveProject(project.id)
                            document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" })
                          }}
                        >
                          Support This Project
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section - Social proof */}
          <section className="py-20 bg-amber-50">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Donor Stories</span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6">Why Others Give</h2>
                <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
                <p className="text-lg text-stone-700">
                  Hear from our community of supporters about why they choose to donate
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto relative">
                <div className="h-[300px] md:h-[250px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Card className="border-none shadow-xl h-full">
                        <CardContent className="p-8 h-full flex flex-col md:flex-row items-center gap-6">
                          <div className="md:w-1/4 flex-shrink-0">
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                              <img
                                src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                                alt={testimonials[currentTestimonial].author}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="md:w-3/4 text-center md:text-left">
                            <svg
                              className="text-amber-400 w-10 h-10 mb-4 mx-auto md:mx-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                            <p className="text-lg text-stone-700 italic mb-4">
                              "{testimonials[currentTestimonial].quote}"
                            </p>
                            <div>
                              <p className="font-medium text-stone-800">{testimonials[currentTestimonial].author}</p>
                              <p className="text-amber-600 text-sm">{testimonials[currentTestimonial].location}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center mt-6 gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        currentTestimonial === index ? "bg-amber-600" : "bg-amber-200"
                      }`}
                      onClick={() => setCurrentTestimonial(index)}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Unified Professional Donation Section */}
          <section id="donation-form" className="py-20 bg-white">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto text-center mb-12"
              >
                <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">
                  Support Our Mission
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6">
                  Make Your Contribution
                </h2>
                <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
                <p className="text-lg text-stone-700">
                  Your generosity helps preserve ancient wisdom, support our community, and continue our spiritual
                  traditions
                </p>
              </motion.div>

              <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-5 min-h-[600px]">
                  {/* Left Panel - Project Selection */}
                  <div className="lg:col-span-2 bg-amber-50 p-6 lg:p-8">
                    <div className="sticky top-8">
                      <h3 className="text-2xl font-serif font-light text-stone-800 mb-6">Your Contribution</h3>

                      <Tabs defaultValue="once" className="mb-8">
                        <TabsList className="grid grid-cols-2 w-full">
                          <TabsTrigger
                            value="once"
                            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                            onClick={() => setIsMonthly(false)}
                          >
                            One-time
                          </TabsTrigger>
                          <TabsTrigger
                            value="monthly"
                            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                            onClick={() => setIsMonthly(true)}
                          >
                            Monthly
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <div className="mb-8">
                        <h4 className="text-lg font-medium text-stone-800 mb-3">Select Amount</h4>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {["25", "50", "100", "250"].map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant={donationAmount === amount ? "default" : "outline"}
                              onClick={() => handleAmountChange(amount)}
                              className={`h-12 ${
                                donationAmount === amount
                                  ? "bg-amber-600 hover:bg-amber-700 border-amber-600"
                                  : "border-amber-600 text-amber-700 hover:bg-amber-50"
                              }`}
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
                            Custom:
                          </Label>
                          <div className="flex-1">
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">$</span>
                              <Input
                                id="customAmount"
                                type="number"
                                min="1"
                                placeholder="Amount"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                className="pl-8"
                                onClick={() => setDonationAmount("custom")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-lg font-medium text-stone-800 mb-3">Select Purpose</h4>
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

                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                          <span className="text-stone-700">Amount:</span>
                          <span className="font-medium text-stone-800">
                            ${donationAmount === "custom" ? customAmount || "0" : donationAmount}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-stone-200">
                          <span className="text-stone-700">Frequency:</span>
                          <span className="font-medium text-stone-800">{isMonthly ? "Monthly" : "One-time"}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-stone-700">Purpose:</span>
                          <span className="font-medium text-stone-800">
                            {donationType === "general"
                              ? "General Support"
                              : donationProjects.find((p) => p.id === donationType)?.title || ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Form */}
                  <div className="lg:col-span-3 p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-serif font-light text-stone-800 mb-6">Your Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={donorInfo.firstName}
                              onChange={handleDonorInfoChange}
                              required
                              className="border-stone-300 focus-visible:ring-amber-500"
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
                              className="border-stone-300 focus-visible:ring-amber-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={donorInfo.email}
                            onChange={handleDonorInfoChange}
                            required
                            className="border-stone-300 focus-visible:ring-amber-500"
                          />
                        </div>

                        <div className="space-y-2 mb-6">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            name="country"
                            onValueChange={(value) => setDonorInfo((prev) => ({ ...prev, country: value }))}
                          >
                            <SelectTrigger className="border-stone-300 focus:ring-amber-500">
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
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Share your thoughts or specify how you'd like your donation to be used"
                            value={donorInfo.message}
                            onChange={handleDonorInfoChange}
                            rows={3}
                            className="border-stone-300 focus-visible:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-serif font-light text-stone-800 mb-6">Payment Method</h3>

                        <Tabs defaultValue="card" className="mb-8">
                          <TabsList className="w-full grid grid-cols-5 mb-6">
                            <TabsTrigger
                              value="card"
                              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              <span className="hidden sm:inline">Card</span>
                            </TabsTrigger>
                            <TabsTrigger
                              value="bank"
                              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                            >
                              <Landmark className="h-4 w-4 mr-2" />
                              <span className="hidden sm:inline">Bank</span>
                            </TabsTrigger>
                            <TabsTrigger
                              value="upi"
                              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                            >
                              <svg
                                className="h-4 w-4 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 22V16"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M20 6L12 10L4 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M4 14L12 18L20 14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 10V16"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="hidden sm:inline">UPI</span>
                            </TabsTrigger>
                            <TabsTrigger
                              value="qr"
                              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                            >
                              <svg
                                className="h-4 w-4 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 3H10V10H3V3Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 3H21V10H14V3Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3 14H10V21H3V14Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 14H21V21H14V14Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="hidden sm:inline">QR Code</span>
                            </TabsTrigger>
                            <TabsTrigger
                              value="online"
                              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                            >
                              <Globe className="h-4 w-4 mr-2" />
                              <span className="hidden sm:inline">Online</span>
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="card" className="space-y-4">
                            {clientSecret ? (
                              <StripePaymentWrapper
                                clientSecret={clientSecret}
                                amount={Number.parseFloat(
                                  donationAmount === "custom" ? customAmount || "0" : donationAmount,
                                )}
                                isMonthly={isMonthly}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                              />
                            ) : (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="cardNumber">Card Number</Label>
                                  <div className="relative">
                                    <Input
                                      id="cardNumber"
                                      placeholder="1234 5678 9012 3456"
                                      className="pl-10 border-stone-300 focus-visible:ring-amber-500"
                                      disabled={paymentProcessing}
                                    />
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                                  </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                  <div className="space-y-2 col-span-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input
                                      id="expiry"
                                      placeholder="MM/YY"
                                      className="border-stone-300 focus-visible:ring-amber-500"
                                      disabled={paymentProcessing}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input
                                      id="cvc"
                                      placeholder="123"
                                      className="border-stone-300 focus-visible:ring-amber-500"
                                      disabled={paymentProcessing}
                                    />
                                  </div>
                                </div>

                                {paymentError && (
                                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                                    {paymentError}
                                  </div>
                                )}

                                <div className="flex items-center gap-2 mt-2">
                                  <svg
                                    className="h-5 w-5 text-amber-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9 12L11 14L15 10"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <span className="text-sm text-stone-600">Secure payment processed by Stripe</span>
                                </div>
                              </div>
                            )}
                          </TabsContent>

                          <TabsContent value="bank" className="space-y-4">
                            <div className="bg-amber-50 p-4 rounded-lg">
                              <h4 className="font-medium text-stone-800 mb-2">Bank Transfer Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-stone-600">Bank Name:</span>
                                  <span className="col-span-2 font-medium">International Buddhist Bank</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-stone-600">Account Name:</span>
                                  <span className="col-span-2 font-medium">Burmese Vihar Bodhgaya</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-stone-600">Account Number:</span>
                                  <span className="col-span-2 font-medium">1234567890</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-stone-600">SWIFT/BIC:</span>
                                  <span className="col-span-2 font-medium">BUDDBANK123</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-stone-600">Reference:</span>
                                  <span className="col-span-2 font-medium">Donation - [Your Name]</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-stone-600">
                              After making your bank transfer, please email a confirmation to{" "}
                              <span className="font-medium">donations@burmesevihar.org</span> with your name and
                              donation details.
                            </p>
                          </TabsContent>

                          <TabsContent value="upi" className="space-y-4">
                            <div className="bg-amber-50 p-4 rounded-lg text-center">
                              <h4 className="font-medium text-stone-800 mb-4">UPI Payment</h4>
                              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                                <p className="font-medium text-xl mb-2">burmesevihar@upi</p>
                              </div>
                              <p className="text-sm text-stone-600 mb-4">
                                Open your UPI app and send payment to the UPI ID above
                              </p>
                              <div className="flex justify-center gap-4">
                                <img src="/gpay-logo.png" alt="Google Pay" className="h-8" />
                                <img src="/phonepe-logo.png" alt="PhonePe" className="h-8" />
                                <img src="/paytm-logo.png" alt="Paytm" className="h-8" />
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="qr" className="space-y-4">
                            <div className="bg-amber-50 p-4 rounded-lg text-center">
                              <h4 className="font-medium text-stone-800 mb-4">Scan QR Code</h4>
                              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                                <div className="w-48 h-48 mx-auto bg-stone-100 flex items-center justify-center">
                                  <img src="/donation-qr-code.png" alt="Donation QR Code" className="w-40 h-40" />
                                </div>
                              </div>
                              <p className="text-sm text-stone-600">
                                Scan this QR code with your payment app to donate
                              </p>
                            </div>
                          </TabsContent>

                          <TabsContent value="online" className="space-y-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              <Button
                                variant="outline"
                                className="h-16 border-stone-300 hover:bg-stone-50 flex flex-col items-center justify-center"
                              >
                                <img src="/paypal-logo.png" alt="PayPal" className="h-6 mb-1" />
                                <span className="text-xs">PayPal</span>
                              </Button>
                              <Button
                                variant="outline"
                                className="h-16 border-stone-300 hover:bg-stone-50 flex flex-col items-center justify-center"
                              >
                                <img src="/venmo-logo.png" alt="Venmo" className="h-6 mb-1" />
                                <span className="text-xs">Venmo</span>
                              </Button>
                              <Button
                                variant="outline"
                                className="h-16 border-stone-300 hover:bg-stone-50 flex flex-col items-center justify-center"
                              >
                                <img src="/apple-pay-logo.png" alt="Apple Pay" className="h-6 mb-1" />
                                <span className="text-xs">Apple Pay</span>
                              </Button>
                              <Button
                                variant="outline"
                                className="h-16 border-stone-300 hover:bg-stone-50 flex flex-col items-center justify-center"
                              >
                                <img src="/google-pay-logo.png" alt="Google Pay" className="h-6 mb-1" />
                                <span className="text-xs">Google Pay</span>
                              </Button>
                              <Button
                                variant="outline"
                                className="h-16 border-stone-300 hover:bg-stone-50 flex flex-col items-center justify-center"
                              >
                                <img src="/amazon-pay-logo.png" alt="Amazon Pay" className="h-6 mb-1" />
                                <span className="text-xs">Amazon Pay</span>
                              </Button>
                              <Button
                                variant="outline"
                                className="h-16 border-stone-300 hover:bg-stone-50 flex flex-col items-center justify-center"
                              >
                                <img src="/wechat-pay-logo.png" alt="WeChat Pay" className="h-6 mb-1" />
                                <span className="text-xs">WeChat Pay</span>
                              </Button>
                            </div>
                            <p className="text-sm text-stone-600">
                              Click on your preferred payment method to continue with your donation
                            </p>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="pt-4">
                        {!clientSecret ? (
                          <Button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 py-6 text-lg flex items-center justify-center gap-2"
                            disabled={paymentProcessing}
                          >
                            {paymentProcessing ? (
                              <>
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Processing...</span>
                              </>
                            ) : (
                              <>
                                <Heart className="h-5 w-5" />
                                <span>
                                  {isMonthly
                                    ? `Proceed to Pay $${
                                        donationAmount === "custom" ? customAmount || "0" : donationAmount
                                      } Monthly`
                                    : `Proceed to Pay $${
                                        donationAmount === "custom" ? customAmount || "0" : donationAmount
                                      }`}
                                </span>
                              </>
                            )}
                          </Button>
                        ) : null}

                        <div className="mt-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Info className="h-4 w-4 text-amber-600" />
                            <p className="text-sm text-stone-600">
                              Your donation is tax-deductible. You will receive a receipt via email.
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section - Visually striking */}
          <section className="py-20 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: "url('/donation-cta-background.png')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

            <div className="container relative z-10 px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
                  Join Our Community of Supporters
                </h2>
                <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
                <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Your donation is more than a financial contribution—it's an investment in preserving ancient wisdom
                  and supporting a living tradition that benefits countless individuals.
                </p>

                <div className="flex flex-wrap gap-6 justify-center">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 rounded-none px-10 py-7 text-lg"
                    onClick={() => {
                      document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Donate Now
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-stone-900 hover:bg-white/90 rounded-none px-10 py-7 text-lg"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
