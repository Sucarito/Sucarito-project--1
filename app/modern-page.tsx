"use client"

import ModernHero from "@/components/modern-hero"
import ModernFeatures from "@/components/modern-features"
import { motion } from "framer-motion"

export default function ModernPage() {
  return (
    <div className="overflow-hidden">
      <ModernHero />
      <ModernFeatures />

      {/* Additional sections can be added here */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-800 mb-8">Begin Your Journey Today</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Take the first step towards inner peace and spiritual growth with our welcoming community.
          </p>
        </div>
      </motion.section>
    </div>
  )
}
