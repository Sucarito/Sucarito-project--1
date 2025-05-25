import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Clock, Send } from "lucide-react"
import Image from "next/image"

export default function ModernFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        {/* Newsletter section */}
        <div className="py-16 border-b border-slate-700/50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-serif font-light mb-4">Stay Connected with Our Community</h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Receive updates about upcoming events, teachings, and community activities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl backdrop-blur-sm"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 whitespace-nowrap">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-14 w-14 rounded-2xl overflow-hidden shadow-lg">
                <Image src="/maha-bodhi-temple-logo.png" alt="Maha Bodhi Temple Logo" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-white">Burmese Vihar</h3>
                <p className="text-slate-400">Bodhgaya</p>
              </div>
            </div>

            <p className="text-slate-300 mb-8 leading-relaxed max-w-md">
              A historic Buddhist monastery established in 1936, offering meditation facilities, study resources, and
              pilgrimage support in the sacred land of Bodhgaya.
            </p>

            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Mail, href: "#" },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-300"
                  asChild
                >
                  <Link href={social.href}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-serif text-white mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <p>Burmese Vihar, Near Mahabodhi Temple</p>
                  <p>Bodhgaya, Gaya District</p>
                  <p>Bihar, India - 824231</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <p>+91 123 456 7890</p>
                  <p>+91 987 654 3210</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <p>Daily: 6:00 AM - 6:00 PM</p>
                  <p>Office: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-serif text-white mb-6">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Visit Us", href: "/visit" },
                { name: "Events", href: "/events" },
                { name: "Gallery", href: "/gallery" },
                { name: "Teachings", href: "/teachings" },
                { name: "Donate", href: "/donate" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Burmese Vihar Bodhgaya. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-blue-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
