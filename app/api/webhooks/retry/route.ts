import { type NextRequest, NextResponse } from "next/server"

// This is a placeholder for a more robust admin API to manage webhook retries
// In a production environment, this would be protected by authentication

export async function GET(req: NextRequest) {
  // This would redirect to the retry endpoint in the main webhook handler
  const url = new URL(req.url)
  const eventId = url.searchParams.get("eventId")

  if (!eventId) {
    return NextResponse.json({ error: "Missing eventId parameter" }, { status: 400 })
  }

  // Redirect to the main webhook handler's retry endpoint
  const response = await fetch(`/api/webhooks/stripe?retry=${eventId}`, {
    method: "GET",
    headers: {
      // Add any necessary authentication headers here
    },
  })

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
