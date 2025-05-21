import Link from "next/link"
import { Button } from "@/components/ui/button"
import SereneBackgroundSection from "./serene-background-section"

export default function DonationCtaSection() {
  return (
    <SereneBackgroundSection minHeight="500px" overlayOpacity={0.75}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Support Our Temple</h2>
        <p className="text-xl text-amber-100 mb-8">
          Your generous contributions help us preserve our sacred traditions and support our community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8">
            <Link href="/donate">Make a Donation</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-amber-400 text-amber-100 hover:bg-amber-800/30 px-8"
          >
            <Link href="/donor-portal">Donor Portal</Link>
          </Button>
        </div>
      </div>
    </SereneBackgroundSection>
  )
}
