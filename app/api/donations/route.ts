import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock database for demonstration
// In a real app, you would use a database like MongoDB, PostgreSQL, etc.
const mockDonations = [
  {
    id: "don_1",
    userId: "user_1",
    amount: 100,
    currency: "USD",
    status: "completed",
    paymentMethod: "Credit Card ending in 4242",
    transactionId: "txn_1234567890",
    isMonthly: false,
    createdAt: new Date("2025-05-01T10:30:00Z"),
    emailSent: true,
    emailTemplate: "donation_receipt",
    emailOpened: true,
    emailOpenedAt: new Date("2025-05-01T10:35:00Z"),
  },
  {
    id: "don_2",
    userId: "user_1",
    amount: 50,
    currency: "USD",
    status: "completed",
    paymentMethod: "PayPal",
    transactionId: "txn_0987654321",
    isMonthly: true,
    createdAt: new Date("2025-04-15T14:20:00Z"),
    emailSent: true,
    emailTemplate: "monthly_donation_receipt",
    emailOpened: true,
    emailOpenedAt: new Date("2025-04-15T14:25:00Z"),
  },
  {
    id: "don_3",
    userId: "user_1",
    amount: 50,
    currency: "USD",
    status: "completed",
    paymentMethod: "PayPal",
    transactionId: "txn_1122334455",
    isMonthly: true,
    dedication: "In memory of my grandfather",
    createdAt: new Date("2025-03-15T14:20:00Z"),
    emailSent: true,
    emailTemplate: "monthly_donation_receipt",
    emailOpened: false,
  },
]

export async function GET(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")

    // In a real app, you would query your database
    // For now, we'll use the mock data
    const userDonations = mockDonations.filter((donation) => donation.userId === "user_1")

    // Paginate results
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedDonations = userDonations.slice(startIndex, endIndex)

    // Calculate total pages
    const totalDonations = userDonations.length
    const totalPages = Math.ceil(totalDonations / limit)

    return NextResponse.json({
      donations: paginatedDonations,
      pagination: {
        total: totalDonations,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}
