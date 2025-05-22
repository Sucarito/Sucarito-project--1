import type { Metadata } from "next"
import DonateClientPage from "./donate-client"

export const metadata: Metadata = {
  title: "Support Our Mission - Burmese Vihar Bodhgaya",
  description:
    "Make a difference by supporting Burmese Vihar's mission of preserving Buddhist teachings and serving the community through your generous donations.",
}

export default function DonatePage() {
  return <DonateClientPage />
}
