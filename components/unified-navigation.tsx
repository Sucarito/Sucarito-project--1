"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { unifiedDesignSystem as ds } from "@/lib/unified-design-system"

const navigationItems = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "About", href: "/about", icon: "ℹ️" },
  {
    label: "Services",
    href: "/services",
    icon: "🛠️",
    submenu: [
      { label: "Meditation", href: "/services/meditation" },
      { label: "Teachings", href: "/services/teachings" },
      { label: "Retreats", href: "/services/retreats" },
    ],
  },
  { label: "Gallery", href: "/gallery", icon: "🖼️" },
  { label: "Contact", href: "/contact", icon: "📧" },
]

export default function UnifiedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: ds.transitions.easing.decelerate }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${ds.transitions.standard}`}
      style={{
        backgroundColor: isScrolled ? ds.colors.surface.primary : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        boxShadow: isScrolled ? ds.elevation[2] : ds.elevation[0],
      }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
              style={{
                background: `linear-gradient(135deg, ${ds.colors.action.primary}, ${ds.colors.action.primaryHover})`,
                color: ds.colors.surface.primary,
              }}
            >
              B
            </div>
            <span className="text-xl font-medium hidden sm:block" style={{ color: ds.colors.text.primary }}>
              Burmese Vihar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative">
                <button
                  onClick={() => item.submenu && setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${ds.transitions.fast}`}
                  style={{
                    color: pathname === item.href ? ds.colors.action.primary : ds.colors.text.primary,
                    backgroundColor: pathname === item.href ? "rgba(25, 118, 210, 0.08)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!pathname.startsWith(item.href)) {
                      e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pathname.startsWith(item.href)) {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-lg overflow-hidden"
                      style={{
                        backgroundColor: ds.colors.surface.primary,
                        boxShadow: ds.elevation[3],
                      }}
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-4 py-3 transition-all"
                          style={{
                            color: ds.colors.text.primary,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = ds.colors.surface.secondary
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent"
                          }}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              className="p-2 rounded-lg transition-all"
              style={{ color: ds.colors.text.secondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/donate"
              className="hidden md:flex px-6 py-2 rounded-lg font-medium transition-all"
              style={{
                background: `linear-gradient(135deg, ${ds.colors.action.primary}, ${ds.colors.action.primaryHover})`,
                color: ds.colors.surface.primary,
                boxShadow: ds.elevation[1],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)"
                e.currentTarget.style.boxShadow = ds.elevation[3]
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = ds.elevation[1]
              }}
            >
              Donate
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-all"
              style={{ color: ds.colors.text.primary }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t"
            style={{
              backgroundColor: ds.colors.surface.primary,
              borderColor: ds.colors.divider,
            }}
          >
            <div className="container mx-auto px-4 py-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all"
                    style={{
                      color: pathname === item.href ? ds.colors.action.primary : ds.colors.text.primary,
                      backgroundColor: pathname === item.href ? "rgba(25, 118, 210, 0.08)" : "transparent",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                  {item.submenu && (
                    <div className="ml-12 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm rounded transition-all"
                          style={{ color: ds.colors.text.secondary }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
