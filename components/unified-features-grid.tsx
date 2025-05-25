"use client"

import UnifiedFeatureCard from "./unified-feature-card"
import { Heart, Users, BookOpen, Flower2, Calendar, Globe } from "lucide-react"
import { unifiedDesignSystem as ds } from "@/lib/unified-design-system"

const features = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Meditation Sessions",
    description: "Daily guided meditation sessions for inner peace and mindfulness practice.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Events",
    description: "Regular gatherings and ceremonies bringing together our spiritual community.",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Buddhist Teachings",
    description: "Learn from experienced monks through lectures and study groups.",
  },
  {
    icon: <Flower2 className="w-8 h-8" />,
    title: "Sacred Rituals",
    description: "Participate in traditional Buddhist ceremonies and blessing rituals.",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Retreat Programs",
    description: "Immersive spiritual retreats for deep practice and transformation.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Pilgrimage Support",
    description: "Guidance and accommodation for pilgrims visiting sacred Bodhgaya.",
  },
]

export default function UnifiedFeaturesGrid() {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: ds.colors.background.default }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: ds.colors.text.primary }}>
            Discover Our Offerings
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: ds.colors.text.secondary }}>
            Experience the richness of Buddhist tradition through our diverse programs and services designed to nurture
            your spiritual journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <UnifiedFeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
