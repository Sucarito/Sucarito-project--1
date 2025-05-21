"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would connect to the Python backend in a real implementation
    console.log("Form submitted:", formData)
    alert("Thank you for your message. We will get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 bg-stone-100">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-stone-800">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-stone-800">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">Address</p>
                    <p className="text-stone-600">Burmese Vihar, Near Mahabodhi Temple</p>
                    <p className="text-stone-600">Bodhgaya, Gaya District</p>
                    <p className="text-stone-600">Bihar, India - 824231</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">Phone</p>
                    <p className="text-stone-600">+91 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">Email</p>
                    <p className="text-stone-600">info@burmesevihar.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">Visiting Hours</p>
                    <p className="text-stone-600">Daily: 6:00 AM - 6:00 PM</p>
                    <p className="text-stone-600">Office Hours: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-stone-200 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-stone-600">Interactive map will be displayed here</p>
                    <p className="text-sm text-stone-500 mt-2">Google Maps integration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-stone-800">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
