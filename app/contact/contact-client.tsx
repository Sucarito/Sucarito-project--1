"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Landmark,
  School,
  Info,
} from "lucide-react"

export default function ContactClient() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [activeTab, setActiveTab] = useState("message")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormState("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1500)
  }

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
      {/* Hero Section - Immersive and visually striking */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/contact-hero-image.png')",
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
              <span className="text-white/90 text-sm font-medium tracking-wider px-4 py-1">CONNECT WITH US</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-white tracking-wide leading-tight mb-6">
              Let's Start a Conversation
            </h1>
            <div className="h-px w-32 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Whether you're seeking spiritual guidance, planning a visit, or simply curious about our monastery, we're
              here to assist you on your journey
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 rounded-none px-8 py-6 text-lg"
                onClick={() => {
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
                  setActiveTab("message")
                }}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Send a Message
              </Button>
              <Button
                size="lg"
                className="bg-white text-stone-900 hover:bg-white/90 rounded-none px-8 py-6 text-lg"
                onClick={() => {
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
                  setActiveTab("visit")
                }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Plan Your Visit
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Contact Information Cards - Modern and visually appealing */}
      <section className="py-20 bg-white relative">
        <div className="container px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-10"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full backdrop-blur-sm bg-white/95">
                <CardContent className="p-0">
                  <div className="bg-amber-600 p-6 text-white flex items-center justify-center">
                    <MapPin className="h-10 w-10" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-4">Our Location</h3>
                    <address className="not-italic text-stone-600 space-y-1">
                      <p>Burmese Vihar</p>
                      <p>Near Mahabodhi Temple</p>
                      <p>Bodhgaya, Gaya District</p>
                      <p>Bihar, India - 824231</p>
                    </address>
                    <Button
                      variant="link"
                      className="mt-4 p-0 text-amber-600 hover:text-amber-700 group flex items-center"
                      onClick={() => {
                        document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      View on Map
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full backdrop-blur-sm bg-white/95">
                <CardContent className="p-0">
                  <div className="bg-amber-600 p-6 text-white flex items-center justify-center">
                    <Clock className="h-10 w-10" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-4">Opening Hours</h3>
                    <ul className="space-y-2 text-stone-600">
                      <li className="flex justify-between">
                        <span>Temple Grounds</span>
                        <span className="font-medium">6:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Meditation Hall</span>
                        <span className="font-medium">5:30 AM - 8:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Office Hours</span>
                        <span className="font-medium">9:00 AM - 4:00 PM</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full backdrop-blur-sm bg-white/95">
                <CardContent className="p-0">
                  <div className="bg-amber-600 p-6 text-white flex items-center justify-center">
                    <Phone className="h-10 w-10" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-4">Contact Details</h3>
                    <ul className="space-y-3 text-stone-600">
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-amber-600" />
                        <span>+91 123 456 7890</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-amber-600" />
                        <span>info@burmesevihar.org</span>
                      </li>
                    </ul>
                    <Button
                      variant="link"
                      className="mt-4 p-0 text-amber-600 hover:text-amber-700 group flex items-center"
                      onClick={() => {
                        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Send a Message
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full backdrop-blur-sm bg-white/95">
                <CardContent className="p-0">
                  <div className="bg-amber-600 p-6 text-white flex items-center justify-center">
                    <Users className="h-10 w-10" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-4">Guided Tours</h3>
                    <p className="text-stone-600 mb-4">
                      Experience the monastery with our knowledgeable guides who can provide deeper insights into our
                      history and practices.
                    </p>
                    <p className="text-sm text-amber-600 font-medium">Available daily at 10:00 AM & 2:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section - Interactive and modern */}
      <section id="contact-form" className="py-20 bg-stone-50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Reach Out</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6">
              How Can We Help You?
            </h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-700">
              We're here to answer your questions and assist you on your spiritual journey
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-12 bg-white/80 backdrop-blur-sm p-1 rounded-full w-fit mx-auto">
                <TabsTrigger
                  value="message"
                  className="rounded-full data-[state=active]:bg-amber-600 data-[state=active]:text-white px-6"
                >
                  Send Message
                </TabsTrigger>
                <TabsTrigger
                  value="visit"
                  className="rounded-full data-[state=active]:bg-amber-600 data-[state=active]:text-white px-6"
                >
                  Plan a Visit
                </TabsTrigger>
                <TabsTrigger
                  value="donate"
                  className="rounded-full data-[state=active]:bg-amber-600 data-[state=active]:text-white px-6"
                >
                  Make a Donation
                </TabsTrigger>
              </TabsList>

              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <TabsContent value="message" className="m-0">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-amber-600 p-10 text-white">
                      <h3 className="text-2xl font-serif font-light mb-6">Get in Touch</h3>
                      <p className="mb-8 text-white/90">
                        Have questions about our monastery, programs, or teachings? We're here to help. Fill out the
                        form and we'll get back to you as soon as possible.
                      </p>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Email Us</p>
                            <p className="text-white/80">info@burmesevihar.org</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <Phone className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Call Us</p>
                            <p className="text-white/80">+91 123 456 7890</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-10">
                      {formState === "success" ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center justify-center h-full text-center py-10"
                        >
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                          </div>
                          <h3 className="text-2xl font-medium text-stone-800 mb-4">Message Sent!</h3>
                          <p className="text-stone-600 mb-8">
                            Thank you for reaching out. We'll get back to you as soon as possible.
                          </p>
                          <Button onClick={() => setFormState("idle")} className="bg-amber-600 hover:bg-amber-700">
                            Send Another Message
                          </Button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <h3 className="text-2xl font-serif font-light text-stone-800 mb-6">Send a Message</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                                Your Name
                              </label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="border-stone-300 focus-visible:ring-amber-500"
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                                Email Address
                              </label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border-stone-300 focus-visible:ring-amber-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
                              Subject
                            </label>
                            <Input
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="border-stone-300 focus-visible:ring-amber-500"
                            />
                          </div>

                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                              Message
                            </label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows={5}
                              className="border-stone-300 focus-visible:ring-amber-500"
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2 py-6"
                            disabled={formState === "submitting"}
                          >
                            {formState === "submitting" ? (
                              <>
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send className="h-5 w-5" />
                                <span>Send Message</span>
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="visit" className="m-0">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-amber-600 p-10 text-white">
                      <h3 className="text-2xl font-serif font-light mb-6">Plan Your Visit</h3>
                      <p className="mb-8 text-white/90">
                        We welcome visitors from all backgrounds. Whether you're coming for meditation, pilgrimage, or
                        cultural exploration, we're here to help you plan your visit.
                      </p>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Best Times to Visit</p>
                            <p className="text-white/80">
                              Morning hours (6:00 AM - 9:00 AM) are ideal for experiencing the peaceful atmosphere
                              during morning chanting and meditation.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Guided Tours</p>
                            <p className="text-white/80">
                              Available daily at 10:00 AM & 2:00 PM. No reservation needed for individuals or small
                              groups.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-10">
                      <form className="space-y-6">
                        <h3 className="text-2xl font-serif font-light text-stone-800 mb-6">Request a Visit</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="visit-name" className="block text-sm font-medium text-stone-700 mb-1">
                              Your Name
                            </label>
                            <Input
                              id="visit-name"
                              name="name"
                              required
                              className="border-stone-300 focus-visible:ring-amber-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="visit-email" className="block text-sm font-medium text-stone-700 mb-1">
                              Email Address
                            </label>
                            <Input
                              id="visit-email"
                              name="email"
                              type="email"
                              required
                              className="border-stone-300 focus-visible:ring-amber-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="visit-date" className="block text-sm font-medium text-stone-700 mb-1">
                              Preferred Visit Date
                            </label>
                            <Input
                              id="visit-date"
                              name="date"
                              type="date"
                              required
                              className="border-stone-300 focus-visible:ring-amber-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="visit-people" className="block text-sm font-medium text-stone-700 mb-1">
                              Number of People
                            </label>
                            <Input
                              id="visit-people"
                              name="people"
                              type="number"
                              min="1"
                              required
                              className="border-stone-300 focus-visible:ring-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="visit-purpose" className="block text-sm font-medium text-stone-700 mb-1">
                            Purpose of Visit
                          </label>
                          <Textarea
                            id="visit-purpose"
                            name="purpose"
                            rows={5}
                            className="border-stone-300 focus-visible:ring-amber-500"
                            placeholder="Please tell us about the purpose of your visit and any specific requirements you may have."
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2 py-6"
                        >
                          <Calendar className="h-5 w-5" />
                          <span>Request Visit</span>
                        </Button>
                      </form>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="donate" className="m-0">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-amber-600 p-10 text-white">
                      <h3 className="text-2xl font-serif font-light mb-6">Support Our Mission</h3>
                      <p className="mb-8 text-white/90">
                        Your generous donations help preserve our historic monastery and support our work in teaching
                        the Dhamma and serving the community.
                      </p>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Landmark className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Temple Maintenance</p>
                            <p className="text-white/80">
                              Help us preserve our historic buildings and sacred spaces for future generations.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <School className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Education Programs</p>
                            <p className="text-white/80">
                              Support our Dhamma school and scholarship programs for local children.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-10">
                      <div className="text-center">
                        <h3 className="text-2xl font-serif font-light text-stone-800 mb-6">Make a Donation</h3>
                        <p className="text-stone-600 mb-8">
                          For detailed information about donation options and to make a contribution, please visit our
                          dedicated donation page.
                        </p>
                        <Button asChild className="bg-amber-600 hover:bg-amber-700 px-8 py-6">
                          <Link href="/donate">Visit Donation Page</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Map Section - Interactive and visually appealing */}
      <section id="map-section" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Find Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6">
              Location & Directions
            </h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-700">
              Burmese Vihar is conveniently located near the sacred Mahabodhi Temple in Bodhgaya
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="bg-stone-100 rounded-lg overflow-hidden shadow-lg h-[500px] relative"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635.5378838885394!2d84.98762851544597!3d24.696148984128068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32c5b4bd80825%3A0xb6c3ca5215c53d3c!2sMahabodhi%20Temple!5e0!3m2!1sen!2sus!4v1621345678901!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Burmese Vihar Location"
                ></iframe>
              </motion.div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center">
                      <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                      Getting Here
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-stone-800">By Air</h4>
                        <p className="text-stone-600 text-sm">
                          Gaya International Airport (GAY) is 12km away. Taxis are available.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">By Train</h4>
                        <p className="text-stone-600 text-sm">
                          Gaya Junction Railway Station is 16km away. Auto-rickshaws and taxis available.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800">By Bus</h4>
                        <p className="text-stone-600 text-sm">
                          Regular buses connect Bodhgaya to Gaya, Patna, and other major cities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center">
                      <Info className="h-5 w-5 text-amber-600 mr-2" />
                      Local Transportation
                    </h3>
                    <ul className="space-y-2 text-stone-600 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                        <span>Auto-rickshaws are readily available for local travel</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                        <span>Bicycle rentals are popular for exploring the area</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                        <span>Walking is convenient as most sites are within 2km</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                        <span>Taxi services can be arranged through your hotel</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-amber-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center">
                      <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                      Nearby Attractions
                    </h3>
                    <ul className="space-y-2 text-stone-600 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                        <span>Mahabodhi Temple (0.5km) - UNESCO World Heritage Site</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                        <span>Bodhi Tree (0.6km) - Where Buddha attained enlightenment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                        <span>Thai Temple (1.2km) - Beautiful Thai architecture</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                        <span>Archaeological Museum (1.8km) - Buddhist artifacts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Modern and interactive */}
      <section className="py-20 bg-stone-50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-amber-600 text-sm tracking-widest uppercase font-medium">Questions</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mt-3 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-700">Find answers to common questions about contacting and visiting us</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg text-stone-800 mb-3">
                    What are the best times to visit the monastery?
                  </h3>
                  <p className="text-stone-700">
                    The monastery is open daily from 6:00 AM to 6:00 PM. Morning hours (6:00 AM - 9:00 AM) are ideal for
                    experiencing the peaceful atmosphere during morning chanting and meditation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg text-stone-800 mb-3">
                    Do I need to make an appointment to speak with a monk?
                  </h3>
                  <p className="text-stone-700">
                    For general visits, no appointment is necessary. However, if you wish to speak with a specific monk
                    or have a private consultation, we recommend contacting us in advance to arrange a suitable time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg text-stone-800 mb-3">
                    How can I arrange accommodation at the monastery?
                  </h3>
                  <p className="text-stone-700">
                    Please contact us via email or phone at least two weeks in advance to inquire about accommodation
                    availability. Include your arrival and departure dates, number of people, and purpose of visit.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg text-stone-800 mb-3">
                    Are there food options available at the temple?
                  </h3>
                  <p className="text-stone-700">
                    The monastery offers a simple vegetarian lunch to visitors at 11:30 AM (donation-based). There is
                    also a small tea shop on the grounds. Several restaurants serving vegetarian and non-vegetarian food
                    are available within walking distance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Visually striking */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/contact-cta-background.png')",
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
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">Begin Your Spiritual Journey</h2>
            <div className="h-px w-20 bg-amber-500 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
              Whether you're seeking meditation guidance, cultural immersion, or a peaceful retreat, we welcome you to
              experience the transformative power of Buddhist practice in the sacred land of Bodhgaya.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 rounded-none px-10 py-7 text-lg">
                <Link href="/visit">Plan Your Visit</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-stone-900 hover:bg-white/90 rounded-none px-10 py-7 text-lg"
              >
                <a
                  href="#contact-form"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Contact Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
