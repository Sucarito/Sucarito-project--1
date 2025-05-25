import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for analytics (in production, use a database)
const analyticsData: any[] = []

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()

    // Add server-side timestamp and IP
    const enrichedEvent = {
      ...event,
      serverTimestamp: new Date().toISOString(),
      ip: request.ip || request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Store the event (in production, save to database)
    analyticsData.push(enrichedEvent)

    // Log for debugging
    console.log("Analytics Event Received:", enrichedEvent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing analytics event:", error)
    return NextResponse.json({ error: "Failed to process event" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const sessionId = url.searchParams.get("sessionId")
  const event = url.searchParams.get("event")

  let filteredData = analyticsData

  if (sessionId) {
    filteredData = analyticsData.filter((item) => item.sessionId === sessionId)
  }

  if (event) {
    filteredData = filteredData.filter((item) => item.event === event)
  }

  return NextResponse.json({
    events: filteredData,
    total: filteredData.length,
  })
}
