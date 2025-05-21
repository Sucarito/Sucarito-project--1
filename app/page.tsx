import Hero from "@/components/hero"
import About from "@/components/about"
import Schedule from "@/components/schedule"
import Events from "@/components/events"
import Gallery from "@/components/gallery"
import Teachings from "@/components/teachings"
import Contact from "@/components/contact"
import DonationCtaSection from "@/components/donation-cta-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Burmese Vihar Bodhgaya - A Place of Peace and Mindfulness",
  description:
    "A historic Buddhist monastery established in 1936, offering meditation facilities, study resources, and pilgrimage support.",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Schedule />
      <Events />
      <Gallery />
      <DonationCtaSection />
      <Teachings />
      <Contact />
    </main>
  )
}
