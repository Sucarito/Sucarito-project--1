"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navItems = [
  {
    name: "Home",
    href: "/",
    description: "Welcome to our sanctuary",
  },
  {
    name: "About",
    href: "/about",
    description: "Our history and mission",
  },
  {
    name: "Visit",
    href: "/visit",
    description: "Plan your pilgrimage",
  },
  {
    name: "Events",
    href: "/events",
    description: "Upcoming ceremonies",
  },
  {
    name: "Gallery",
    href: "/gallery",
    description: "Sacred moments captured",
  },
  {
    name: "Teachings",
    href: "/teachings",
    description: "Buddhist wisdom",
  },
  {
    name: "Contact",
    href: "/contact",
    description: "Connect with us",
  },
]

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === ""
    }
    return pathname.startsWith(path)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200/50 py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <Link href="/" className="flex items-center gap-4">
              <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/maha-bodhi-temple-logo.png"
                  alt="Maha Bodhi Temple Logo"
                  fill
                  sizes="(max-width: 768px) 48px, 56px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif text-xl md:text-2xl font-medium tracking-tight ${
                    isScrolled ? "text-slate-800" : "text-white"
                  } transition-colors duration-500`}
                >
                  Burmese Vihar
                </span>
                <span
                  className={`font-sans text-sm tracking-wide ${
                    isScrolled ? "text-slate-500" : "text-white/80"
                  } transition-colors duration-500`}
                >
                  Bodhgaya
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                className="relative"
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${
                    isActive(item.href)
                      ? isScrolled
                        ? "text-blue-600"
                        : "text-blue-300"
                      : isScrolled
                        ? "text-slate-700 hover:text-blue-600"
                        : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute inset-0 rounded-xl ${isScrolled ? "bg-blue-50" : "bg-white/10"}`}
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl whitespace-nowrap"
                    >
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-6">
              <Button
                asChild
                className={`relative overflow-hidden rounded-xl px-6 py-2.5 font-medium transition-all duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/20"
                }`}
              >
                <Link href="/donate">
                  <span className="relative z-10">Donate</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                    style={{ zIndex: 0 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    isScrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
                  } rounded-xl transition-colors duration-300`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </motion.div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] max-w-[350px] p-0 border-l border-slate-200/50 bg-white/95 backdrop-blur-xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-xl overflow-hidden">
                      <Image src="/maha-bodhi-temple-logo.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-serif text-slate-800">Burmese Vihar</h2>
                      <span className="text-sm text-slate-500">Bodhgaya</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="ml-auto rounded-xl"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col p-6 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex flex-col py-4 px-4 rounded-xl transition-all duration-300 ${
                          isActive(item.href)
                            ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-slate-500 mt-1">{item.description}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-auto p-6 border-t border-slate-100">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-6 font-medium shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href="/donate">Make a Donation</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
