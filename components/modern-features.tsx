"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, BookOpen, Calendar, Compass, NotebookIcon as Lotus } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Lotus,
    title: "Meditation & Mindfulness",
    description: "Daily meditation sessions and mindfulness practices in our serene halls.",
    image: "/buddhist-meditation.png",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    title: "Buddhist Teachings",
    description: "Learn ancient wisdom through our comprehensive study programs and lectures.",
    image: "/buddhist-monk-teaching.png",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Community Gatherings",
    description: "Join our vibrant community for festivals, ceremonies, and cultural events.",
    image: "/buddhist-ceremony.png",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Calendar,
    title: "Sacred Ceremonies",
    description: "Participate in traditional Buddhist ceremonies and seasonal celebrations.",
    image: "/buddhist-cultural-ceremony.png",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Compass,
    title: "Pilgrimage Support",
    description: "Comprehensive guidance for your spiritual journey to sacred sites.",
    image: "/buddhist-temple-offering.png",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Heart,
    title: "Community Service",
    description: "Engage in compassionate service through our outreach programs.",
    image: "/community-outreach.png",
    gradient: "from-pink-500 to-rose-500",
  },
]

export default function ModernFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Our Offerings
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-slate-800 mb-6">
            Nurturing Mind, Body & Spirit
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover the transformative power of Buddhist practice through our comprehensive programs designed to
            cultivate inner peace and wisdom.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="group h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    {/* Icon overlay */}
                    <div className="absolute top-4 right-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-serif font-medium text-slate-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
