"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { unifiedDesignSystem as ds } from "@/lib/unified-design-system"
import Image from "next/image"

export default function UnifiedHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with soft gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${ds.colors.background.canvas} 0%, ${ds.colors.surface.secondary} 100%)`,
        }}
      />

      {/* Natural lighting effect */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(33, 150, 243, 0.3) 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(25, 118, 210, 0.3) 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: ds.transitions.easing.decelerate }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                color: ds.colors.action.primary,
              }}
            >
              <span className="text-sm font-medium">Welcome to Burmese Vihar</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
                fontWeight: 300,
                color: ds.colors.text.primary,
              }}
            >
              Find Peace in the
              <span
                className="block font-normal"
                style={{
                  background: `linear-gradient(135deg, ${ds.colors.action.primary}, ${ds.colors.status.info})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sacred Sanctuary
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg mb-8 max-w-xl"
              style={{ color: ds.colors.text.secondary, lineHeight: 1.7 }}
            >
              Experience the tranquility of our historic Buddhist monastery, where ancient wisdom meets modern
              mindfulness in the heart of Bodhgaya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button
                className="px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition-all"
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
                Plan Your Visit
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                className="px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition-all border"
                style={{
                  backgroundColor: "transparent",
                  color: ds.colors.text.primary,
                  borderColor: ds.colors.divider,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = ds.colors.surface.secondary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <Play className="w-5 h-5" />
                Watch Video Tour
              </button>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: ds.transitions.easing.decelerate }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: ds.elevation[4] }}>
              <Image
                src="/buddhist-temple-golden-roof.png"
                alt="Burmese Vihar Temple"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />

              {/* Overlay gradient for depth */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Floating elements for visual interest */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${ds.colors.status.info}, ${ds.colors.action.primary})`,
                opacity: 0.1,
                filter: "blur(40px)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
