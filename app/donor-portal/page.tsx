import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import DonorDashboard from "@/components/donor-dashboard"

export default async function DonorPortalPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/donor-portal")
  }

  return <DonorDashboard user={session.user} />
}
