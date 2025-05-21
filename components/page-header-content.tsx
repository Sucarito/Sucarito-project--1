"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Schedule", href: "/#schedule" },
  { name: "Events", href: "/#events" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Teachings", href: "/#teachings" },
  { name: "Contact", href: "/#contact" },
]

interface PageHeaderContentProps {
  title: string
  description?: string
}

export default function PageHeaderContent({ title, description }: PageHeaderContentProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      {/* Navigation Bar */}
      <div className="flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold text-white">
          Burmese Vihar-Bodhgaya
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" className="text-sm text-white hover:text-white/80">
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
          <Button className="ml-2 bg-white/20 hover:bg-white/30 text-white" onClick={() => router.push("/donate")}>
            Donate
          </Button>
        </nav>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
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
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-stone-700 hover:text-amber-700 hover:bg-amber-50"
                    >
                      {item.name}
                    </Button>
                  </Link>
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

      {/* Page Title Area */}
      <div className="py-16 md:py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        {description && <p className="text-xl text-white/90 max-w-2xl mx-auto">{description}</p>}
      </div>
    </>
  )
}
