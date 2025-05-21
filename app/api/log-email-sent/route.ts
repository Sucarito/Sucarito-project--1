import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { transactionId, emailId, template, sentAt } = body

    if (!transactionId || !emailId || !template) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would store this in your database
    console.log(`Email sent: ${emailId} for transaction ${transactionId} using template ${template} at ${sentAt}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error logging email:", error)
    return NextResponse.json({ error: "Failed to log email" }, { status: 500 })
  }
}
