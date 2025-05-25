import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for attribution data (in production, use a database)
const attributionData: any[] = []

export async function POST(request: NextRequest) {
  try {
    const conversion = await request.json()

    // Enrich with server-side data
    const enrichedConversion = {
      ...conversion,
      serverTimestamp: new Date().toISOString(),
      ip: request.ip || request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Store the conversion (in production, save to database)
    attributionData.push(enrichedConversion)

    console.log("Attribution Conversion Received:", enrichedConversion)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing attribution conversion:", error)
    return NextResponse.json({ error: "Failed to process conversion" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const source = url.searchParams.get("source")
  const medium = url.searchParams.get("medium")
  const campaign = url.searchParams.get("campaign")
  const dateFrom = url.searchParams.get("dateFrom")
  const dateTo = url.searchParams.get("dateTo")

  let filteredData = attributionData

  // Filter by source
  if (source) {
    filteredData = filteredData.filter(
      (item) => item.attribution.firstTouch.source === source || item.attribution.lastTouch.source === source,
    )
  }

  // Filter by medium
  if (medium) {
    filteredData = filteredData.filter(
      (item) => item.attribution.firstTouch.medium === medium || item.attribution.lastTouch.medium === medium,
    )
  }

  // Filter by campaign
  if (campaign) {
    filteredData = filteredData.filter(
      (item) => item.attribution.firstTouch.campaign === campaign || item.attribution.lastTouch.campaign === campaign,
    )
  }

  // Filter by date range
  if (dateFrom || dateTo) {
    filteredData = filteredData.filter((item) => {
      const conversionDate = new Date(item.conversionTimestamp)
      if (dateFrom && conversionDate < new Date(dateFrom)) return false
      if (dateTo && conversionDate > new Date(dateTo)) return false
      return true
    })
  }

  // Calculate attribution metrics
  const metrics = calculateAttributionMetrics(filteredData)

  return NextResponse.json({
    conversions: filteredData,
    total: filteredData.length,
    metrics,
  })
}

function calculateAttributionMetrics(conversions: any[]) {
  if (conversions.length === 0) {
    return {
      totalConversions: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      firstTouchAttribution: {},
      lastTouchAttribution: {},
      channelPerformance: {},
      campaignPerformance: {},
    }
  }

  const totalRevenue = conversions.reduce((sum, conv) => sum + conv.amount, 0)
  const averageOrderValue = totalRevenue / conversions.length

  // First-touch attribution
  const firstTouchChannels: Record<string, { conversions: number; revenue: number }> = {}
  const lastTouchChannels: Record<string, { conversions: number; revenue: number }> = {}
  const campaigns: Record<string, { conversions: number; revenue: number }> = {}

  conversions.forEach((conv) => {
    // First-touch attribution
    const firstTouchChannel = `${conv.attribution.firstTouch.source}/${conv.attribution.firstTouch.medium}`
    if (!firstTouchChannels[firstTouchChannel]) {
      firstTouchChannels[firstTouchChannel] = { conversions: 0, revenue: 0 }
    }
    firstTouchChannels[firstTouchChannel].conversions += 1
    firstTouchChannels[firstTouchChannel].revenue += conv.amount

    // Last-touch attribution
    const lastTouchChannel = `${conv.attribution.lastTouch.source}/${conv.attribution.lastTouch.medium}`
    if (!lastTouchChannels[lastTouchChannel]) {
      lastTouchChannels[lastTouchChannel] = { conversions: 0, revenue: 0 }
    }
    lastTouchChannels[lastTouchChannel].conversions += 1
    lastTouchChannels[lastTouchChannel].revenue += conv.amount

    // Campaign attribution
    const campaign = conv.attribution.lastTouch.campaign || conv.attribution.firstTouch.campaign || "unknown"
    if (!campaigns[campaign]) {
      campaigns[campaign] = { conversions: 0, revenue: 0 }
    }
    campaigns[campaign].conversions += 1
    campaigns[campaign].revenue += conv.amount
  })

  return {
    totalConversions: conversions.length,
    totalRevenue,
    averageOrderValue,
    firstTouchAttribution: firstTouchChannels,
    lastTouchAttribution: lastTouchChannels,
    campaignPerformance: campaigns,
  }
}
