import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top section with detailed info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 py-12 sm:py-16">
          <div>
            <h3 className="text-xl font-serif mb-4 sm:mb-6 text-amber-400">Burmese Vihar</h3>
            <p className="text-stone-300 mb-6 sm:mb-8 leading-relaxed max-w-md text-sm sm:text-base">
              A historic Buddhist monastery established in 1936, offering meditation facilities, study resources, and
              pilgrimage support in the sacred land of Bodhgaya.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-full h-9 w-9 sm:h-10 sm:w-10"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-full h-9 w-9 sm:h-10 sm:w-10"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-full h-9 w-9 sm:h-10 sm:w-10"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-full h-9 w-9 sm:h-10 sm:w-10"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-400 mb-1 text-sm sm:text-base">Address</p>
                <p className="text-stone-300 text-xs sm:text-sm">Burmese Vihar, Near Mahabodhi Temple</p>
                <p className="text-stone-300 text-xs sm:text-sm">Bodhgaya, Gaya District</p>
                <p className="text-stone-300 text-xs sm:text-sm">Bihar, India - 824231</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-400 mb-1 text-sm sm:text-base">Phone</p>
                <p className="text-stone-300 text-xs sm:text-sm">+91 123 456 7890</p>
                <p className="text-stone-300 text-xs sm:text-sm">+91 987 654 3210</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-400 mb-1 text-sm sm:text-base">Visiting Hours</p>
                <p className="text-stone-300 text-xs sm:text-sm">Daily: 6:00 AM - 6:00 PM</p>
                <p className="text-stone-300 text-xs sm:text-sm">Office Hours: 9:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-4 sm:mb-6 text-amber-400">Quick Links</h3>
            <div className="grid grid-cols-2 gap-1 sm:gap-2">
              <Link
                href="/about"
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 text-sm sm:text-base"
              >
                About Us
              </Link>
              <Link
                href="/events"
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 text-sm sm:text-base"
              >
                Events
              </Link>
              <Link
                href="/visit"
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 text-sm sm:text-base"
              >
                Visit Us
              </Link>
              <Link
                href="/gallery"
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 text-sm sm:text-base"
              >
                Gallery
              </Link>
              <Link
                href="/teachings"
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 text-sm sm:text-base"
              >
                Teachings
              </Link>
              <Link
                href="/donate"
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 text-sm sm:text-base"
              >
                Donate
              </Link>
              <Link
                href="/volunteer"
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 text-sm sm:text-base"
              >
                Volunteer
              </Link>
              <Link
                href="/contact"
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 text-sm sm:text-base"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and newsletter */}
        <div className="py-4 sm:py-6 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-stone-400 text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Burmese Vihar Bodhgaya. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-stone-400">
            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-amber-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
