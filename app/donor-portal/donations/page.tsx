import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import DonationHistory from "@/components/donation-history"

export default async function DonationHistoryPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/donor-portal/donations")
  }

  return <DonationHistory user={session.user} />
}
