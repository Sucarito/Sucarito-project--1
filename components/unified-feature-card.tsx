"use client"

import type React from "react"

import { motion } from "framer-motion"
import { unifiedDesignSystem as ds } from "@/lib/unified-design-system"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

export default function UnifiedFeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: ds.transitions.easing.decelerate }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className="p-8 rounded-2xl h-full transition-all cursor-pointer"
        style={{
          backgroundColor: ds.colors.surface.primary,
          boxShadow: ds.elevation[1],
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = ds.elevation[3]
          e.currentTarget.style.transform = "translateY(-4px)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = ds.elevation[1]
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        {/* Icon Container */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(33, 150, 243, 0.1))`,
          }}
        >
          <div style={{ color: ds.colors.action.primary }}>{icon}</div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-medium mb-3" style={{ color: ds.colors.text.primary }}>
          {title}
        </h3>
        <p className="leading-relaxed" style={{ color: ds.colors.text.secondary }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}
