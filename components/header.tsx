"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Schedule", href: "#schedule" },
  { name: "Events", href: "#events" },
  { name: "Gallery", href: "#gallery" },
  { name: "Teachings", href: "#teachings" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)

    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "py-4 bg-transparent before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/70 before:to-transparent before:z-[-1]"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-amber-700 z-10" onClick={() => scrollToSection("/")}>
            Burmese Vihar-Bodhgaya
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`text-sm ${
                  isScrolled
                    ? "text-stone-700 hover:text-amber-700 hover:bg-transparent"
                    : "text-white hover:text-white/80 hover:bg-transparent"
                }`}
                onClick={() => scrollToSection(item.href)}
              >
                {item.name}
              </Button>
            ))}
            <Button
              className={`ml-2 ${
                isScrolled ? "bg-amber-600 hover:bg-amber-700" : "bg-white/20 hover:bg-white/30 text-white"
              }`}
              onClick={() => router.push("/donate")}
            >
              Donate
            </Button>
          </nav>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={isScrolled ? "text-stone-700" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-amber-700">Burmese Vihar-Bodhgaya</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-start text-stone-700 hover:bg-transparent"
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </nav>
                <div className="mt-auto pt-6">
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      router.push("/donate")
                    }}
                  >
                    Donate
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
