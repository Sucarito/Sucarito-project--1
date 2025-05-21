import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-400">Burmese Vihar</h3>
            <p className="text-stone-300 mb-4">
              A historic Buddhist monastery established in 1936, offering meditation facilities, study resources, and
              pilgrimage support.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-stone-300 hover:text-amber-400 hover:bg-stone-700 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-stone-300 hover:text-amber-400 hover:bg-stone-700 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-stone-300 hover:text-amber-400 hover:bg-stone-700 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-stone-300 hover:text-amber-400 hover:bg-stone-700 rounded-full"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-stone-300 hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#schedule" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Daily Schedule
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="#teachings" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Teachings
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Meditation Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Dhamma Talks
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Pali Chanting
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Buddhist Calendar
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Newsletter</h3>
            <p className="text-stone-300 mb-4">
              Subscribe to our newsletter to receive updates on events and teachings.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-stone-700 border-stone-600 text-white placeholder:text-stone-400 focus-visible:ring-amber-400"
              />
              <Button size="icon" className="bg-amber-600 hover:bg-amber-700">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8 text-center text-stone-400 text-sm">
          <p>© {new Date().getFullYear()} Burmese Vihar Bodhgaya. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
