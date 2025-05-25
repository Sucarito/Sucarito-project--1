"use client"

import UnifiedHero from "@/components/unified-hero"
import UnifiedFeaturesGrid from "@/components/unified-features-grid"
import { motion } from "framer-motion"
import { unifiedDesignSystem as ds } from "@/lib/unified-design-system"

export default function UnifiedPage() {
  return (
    <div style={{ backgroundColor: ds.colors.background.default }}>
      <UnifiedHero />
      <UnifiedFeaturesGrid />

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
        style={{ backgroundColor: ds.colors.surface.secondary }}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: ds.colors.text.primary }}>
            Begin Your Spiritual Journey Today
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: ds.colors.text.secondary }}>
            Join our welcoming community and discover the path to inner peace and enlightenment.
          </p>
          <button
            className="px-10 py-4 rounded-xl font-medium transition-all"
            style={{
              background: `linear-gradient(135deg, ${ds.colors.action.primary}, ${ds.colors.action.primaryHover})`,
              color: ds.colors.surface.primary,
              boxShadow: ds.elevation[2],
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = ds.elevation[4]
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = ds.elevation[2]
            }}
          >
            Get Started
          </button>
        </div>
      </motion.section>
    </div>
  )
}
