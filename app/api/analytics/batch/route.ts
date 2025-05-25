import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for analytics (in production, use a database)
const analyticsData: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { sessionId, events } = await request.json()

    // Enrich events with server-side data
    const enrichedEvents = events.map((event: any) => ({
      ...event,
      serverTimestamp: new Date().toISOString(),
      ip: request.ip || request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }))

    // Store the events (in production, save to database)
    analyticsData.push(...enrichedEvents)

    console.log(`Batch analytics received: ${events.length} events for session ${sessionId}`)

    return NextResponse.json({
      success: true,
      processed: events.length,
    })
  } catch (error) {
    console.error("Error processing batch analytics:", error)
    return NextResponse.json({ error: "Failed to process batch events" }, { status: 500 })
  }
}
