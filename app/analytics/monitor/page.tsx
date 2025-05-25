"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Users, TrendingUp, DollarSign, Target, Eye, Clock } from "lucide-react"

interface AnalyticsEvent {
  id: string
  event: string
  timestamp: string
  properties: Record<string, any>
  attribution?: any
}

export default function AnalyticsMonitorPage() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([])
  const [isLive, setIsLive] = useState(false)
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeDonationForms: 0,
    conversionsToday: 0,
    revenueToday: 0,
  })

  // Simulate real-time events (in production, this would connect to your analytics API)
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(
      () => {
        // Simulate random events
        const eventTypes = [
          "page_view",
          "donation_form_started",
          "amount_selected",
          "donation_type_selected",
          "checkout_initiated",
          "donation_completed",
        ]

        const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const newEvent: AnalyticsEvent = {
          id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          event: randomEvent,
          timestamp: new Date().toISOString(),
          properties: {
            page_location: "/donate",
            amount: randomEvent.includes("amount") ? Math.floor(Math.random() * 10000) + 1000 : undefined,
            donation_type: randomEvent.includes("type") ? "Temple Maintenance" : undefined,
          },
          attribution: {
            source: ["facebook", "google", "direct", "email"][Math.floor(Math.random() * 4)],
            medium: ["social", "cpc", "none", "email"][Math.floor(Math.random() * 4)],
            campaign: ["vesak_2024", "temple_maintenance", null][Math.floor(Math.random() * 3)],
          },
        }

        setEvents((prev) => [newEvent, ...prev.slice(0, 49)]) // Keep last 50 events

        // Update stats
        if (randomEvent === "page_view") {
          setStats((prev) => ({ ...prev, totalSessions: prev.totalSessions + 1 }))
        }
        if (randomEvent === "donation_form_started") {
          setStats((prev) => ({ ...prev, activeDonationForms: prev.activeDonationForms + 1 }))
        }
        if (randomEvent === "donation_completed") {
          setStats((prev) => ({
            ...prev,
            conversionsToday: prev.conversionsToday + 1,
            revenueToday: prev.revenueToday + (newEvent.properties.amount || 5000),
          }))
        }
      },
      2000 + Math.random() * 3000,
    ) // Random interval between 2-5 seconds

    return () => clearInterval(interval)
  }, [isLive])

  const toggleLiveMode = () => {
    setIsLive(!isLive)
    if (!isLive) {
      // Reset stats when starting
      setStats({
        totalSessions: 0,
        activeDonationForms: 0,
        conversionsToday: 0,
        revenueToday: 0,
      })
      setEvents([])
    }
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "page_view":
        return <Eye className="h-4 w-4" />
      case "donation_form_started":
        return <Users className="h-4 w-4" />
      case "amount_selected":
      case "donation_type_selected":
        return <Target className="h-4 w-4" />
      case "checkout_initiated":
        return <TrendingUp className="h-4 w-4" />
      case "donation_completed":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case "page_view":
        return "bg-blue-100 text-blue-800"
      case "donation_form_started":
        return "bg-yellow-100 text-yellow-800"
      case "amount_selected":
      case "donation_type_selected":
        return "bg-purple-100 text-purple-800"
      case "checkout_initiated":
        return "bg-orange-100 text-orange-800"
      case "donation_completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatEventName = (eventType: string) => {
    return eventType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-time Analytics Monitor</h1>
            <p className="text-gray-600">Monitor donation activity and user behavior in real-time</p>
          </div>
          <Button onClick={toggleLiveMode} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${isLive ? "animate-spin" : ""}`} />
            {isLive ? "Stop Live Mode" : "Start Live Mode"}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold">{stats.totalSessions}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Forms</p>
                  <p className="text-2xl font-bold">{stats.activeDonationForms}</p>
                </div>
                <Target className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold">{stats.conversionsToday}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold">₹{stats.revenueToday.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
              Live Events
              {isLive && <Badge variant="outline">LIVE</Badge>}
            </CardTitle>
            <CardDescription>Real-time user interactions and donation activities</CardDescription>
          </CardHeader>
          <CardContent>
            {!isLive && events.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <RefreshCw className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Click "Start Live Mode" to begin monitoring real-time events</p>
              </div>
            )}

            {events.length > 0 && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`p-2 rounded-full ${getEventColor(event.event)}`}>{getEventIcon(event.event)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{formatEventName(event.event)}</h4>
                        <Badge variant="outline" className="text-xs">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        {event.properties.amount && <div>Amount: ₹{event.properties.amount.toLocaleString()}</div>}
                        {event.properties.donation_type && <div>Type: {event.properties.donation_type}</div>}
                        {event.attribution && (
                          <div>
                            Source: {event.attribution.source} / {event.attribution.medium}
                            {event.attribution.campaign && ` / ${event.attribution.campaign}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        {!isLive && (
          <Card>
            <CardHeader>
              <CardTitle>How to Use Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-medium text-blue-900 mb-2">Live Mode</h4>
                  <p className="text-sm text-blue-800">
                    Enable live mode to see real-time events as they happen on your website. This demo shows simulated
                    events.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-medium text-green-900 mb-2">Event Types</h4>
                  <p className="text-sm text-green-800">
                    Monitor page views, form interactions, donation attempts, and successful conversions in real-time.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-medium text-purple-900 mb-2">Attribution Data</h4>
                  <p className="text-sm text-purple-800">
                    See which marketing channels are driving activity and conversions as they happen.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                  <h4 className="font-medium text-orange-900 mb-2">Performance Metrics</h4>
                  <p className="text-sm text-orange-800">
                    Track key metrics like session count, active forms, conversions, and revenue in real-time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
