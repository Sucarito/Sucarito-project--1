"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Visit", href: "/visit" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Teachings", href: "/teachings" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    // For the home page, only match exact "/"
    if (path === "/") {
      return pathname === "/" || pathname === ""
    }

    // For other pages, check if the pathname starts with the path
    // But make sure we're matching complete segments to avoid partial matches
    // e.g., /about should not match /about-us
    const pathSegments = path.split("/").filter(Boolean)
    const pathnameSegments = pathname.split("/").filter(Boolean)

    if (pathSegments.length === 0) return false

    for (let i = 0; i < pathSegments.length; i++) {
      if (i >= pathnameSegments.length || pathSegments[i] !== pathnameSegments[i]) {
        return false
      }
    }

    return true
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`font-serif text-2xl tracking-wide ${
              isScrolled ? "text-amber-800" : "text-white"
            } transition-colors duration-300`}
          >
            Burmese Vihar
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm transition-colors duration-300 ${
                  isActive(item.href)
                    ? isScrolled
                      ? "text-amber-700 font-medium"
                      : "text-amber-400 font-medium"
                    : isScrolled
                      ? "text-stone-700 hover:text-amber-700"
                      : "text-white/90 hover:text-white"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}

            <Button
              asChild
              className={`ml-3 rounded-none px-6 ${
                isScrolled
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              }`}
            >
              <Link href="/donate">Donate</Link>
            </Button>
          </nav>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={isScrolled ? "text-stone-700" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-serif text-amber-800">Burmese Vihar</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <nav className="flex flex-col p-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`py-3 text-base border-b border-stone-100 ${
                        isActive(item.href) ? "text-amber-700 font-medium" : "text-stone-700 hover:text-amber-700"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-6 border-t">
                  <Button
                    asChild
                    className="w-full bg-amber-600 hover:bg-amber-700 rounded-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/donate">Donate</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
