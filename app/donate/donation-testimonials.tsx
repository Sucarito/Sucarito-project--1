"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export default function DonationTestimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      image: "/donor-testimonial-1.png",
      text: "Supporting Burmese Vihar has been one of the most fulfilling experiences of my life. Seeing how my donations help preserve Buddhist teachings and support the community fills my heart with joy.",
      rating: 5,
    },
    {
      name: "David Chen",
      location: "Singapore",
      image: "/donor-testimonial-2.png",
      text: "The transparency and impact of this temple's work is remarkable. Every donation feels meaningful, and the regular updates show exactly how funds are being used to help others.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      location: "California, USA",
      image: "/donor-testimonial-3.png",
      text: "As someone who found peace through Buddhist meditation, supporting this temple feels like giving back to a tradition that has given me so much. The monthly donation option makes it easy to contribute regularly.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stories from Our Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from fellow supporters who have experienced the joy of giving and the impact of their generosity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto border-4 border-amber-200"
                    />
                    <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1">
                      <Quote className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>

                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed text-center italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
