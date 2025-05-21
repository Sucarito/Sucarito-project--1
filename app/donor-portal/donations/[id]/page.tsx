import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import DonationDetails from "@/components/donation-details"

export default async function DonationDetailsPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/donor-portal/donations")
  }

  return <DonationDetails donationId={params.id} user={session.user} />
}
