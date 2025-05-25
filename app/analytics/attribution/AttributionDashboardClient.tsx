"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  RefreshCw,
  Download,
  Filter,
  ExternalLink,
} from "lucide-react"

interface AttributionMetrics {
  totalConversions: number
  totalRevenue: number
  averageOrderValue: number
  firstTouchAttribution: Record<string, { conversions: number; revenue: number }>
  lastTouchAttribution: Record<string, { conversions: number; revenue: number }>
  campaignPerformance: Record<string, { conversions: number; revenue: number }>
}

interface AttributionData {
  conversions: any[]
  total: number
  metrics: AttributionMetrics
}

function AttributionDashboard() {
  const [attributionData, setAttributionData] = useState<AttributionData>({
    conversions: [],
    total: 0,
    metrics: {
      totalConversions: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      firstTouchAttribution: {},
      lastTouchAttribution: {},
      campaignPerformance: {},
    },
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [attributionModel, setAttributionModel] = useState<"first-touch" | "last-touch">("last-touch")
  const [filters, setFilters] = useState({
    source: "",
    medium: "",
    campaign: "",
    dateFrom: "",
    dateTo: "",
  })

  const fetchAttributionData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })

      const response = await fetch(`/api/analytics/attribution?${params}`)
      const data = await response.json()
      setAttributionData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to fetch attribution data:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(attributionData.conversions, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `attribution-data-${new Date().toISOString().split("T")[0]}.json`
    link.click()
  }

  const generateUTMLink = (source: string, medium: string, campaign: string) => {
    const baseUrl = window.location.origin + "/donate"
    const params = new URLSearchParams({
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
    })
    return `${baseUrl}?${params}`
  }

  useEffect(() => {
    fetchAttributionData()
  }, [])

  const currentAttribution =
    attributionModel === "first-touch"
      ? attributionData.metrics.firstTouchAttribution
      : attributionData.metrics.lastTouchAttribution

  const topChannels = Object.entries(currentAttribution)
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 10)

  const topCampaigns = Object.entries(attributionData.metrics.campaignPerformance)
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 10)

  if (loading && attributionData.total === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading attribution data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Marketing Attribution</h1>
          <p className="text-gray-600">Track which channels drive the most donations</p>
          <p className="text-sm text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchAttributionData} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={exportData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                placeholder="e.g., google"
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medium">Medium</Label>
              <Input
                id="medium"
                placeholder="e.g., cpc"
                value={filters.medium}
                onChange={(e) => setFilters({ ...filters, medium: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign</Label>
              <Input
                id="campaign"
                placeholder="e.g., summer2024"
                value={filters.campaign}
                onChange={(e) => setFilters({ ...filters, campaign: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Attribution Model</Label>
              <Select value={attributionModel} onValueChange={(value: any) => setAttributionModel(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-touch">First-Touch</SelectItem>
                  <SelectItem value="last-touch">Last-Touch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={fetchAttributionData}>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attributionData.metrics.totalConversions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{attributionData.metrics.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Math.round(attributionData.metrics.averageOrderValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Channel</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{topChannels[0] ? topChannels[0][0].split("/")[0] : "No data"}</div>
            <p className="text-xs text-muted-foreground">
              {topChannels[0] ? `₹${topChannels[0][1].revenue.toLocaleString()}` : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Top Channels ({attributionModel})
            </CardTitle>
            <CardDescription>Revenue and conversions by marketing channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topChannels.map(([channel, data], index) => {
                const [source, medium] = channel.split("/")
                const percentage = (data.revenue / attributionData.metrics.totalRevenue) * 100
                return (
                  <div key={channel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full bg-blue-500"
                          style={{ backgroundColor: `hsl(${index * 45}, 70%, 50%)` }}
                        />
                        <div>
                          <div className="font-medium">{source}</div>
                          <div className="text-sm text-gray-600">{medium}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{data.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">
                        {data.conversions} conversions ({percentage.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Campaigns
            </CardTitle>
            <CardDescription>Performance by campaign name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCampaigns.map(([campaign, data], index) => {
                const percentage = (data.revenue / attributionData.metrics.totalRevenue) * 100
                return (
                  <div key={campaign} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full bg-green-500"
                        style={{ backgroundColor: `hsl(${120 + index * 30}, 70%, 50%)` }}
                      />
                      <div>
                        <div className="font-medium">{campaign}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{data.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">
                        {data.conversions} conversions ({percentage.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* UTM Link Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            UTM Link Generator
          </CardTitle>
          <CardDescription>Generate trackable links for your marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="utm-source">Source</Label>
              <Input id="utm-source" placeholder="facebook" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="utm-medium">Medium</Label>
              <Input id="utm-medium" placeholder="social" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="utm-campaign">Campaign</Label>
              <Input id="utm-campaign" placeholder="summer2024" />
            </div>
          </div>
          <Button
            onClick={() => {
              const source = (document.getElementById("utm-source") as HTMLInputElement)?.value
              const medium = (document.getElementById("utm-medium") as HTMLInputElement)?.value
              const campaign = (document.getElementById("utm-campaign") as HTMLInputElement)?.value

              if (source && medium && campaign) {
                const link = generateUTMLink(source, medium, campaign)
                navigator.clipboard.writeText(link)
                alert("UTM link copied to clipboard!")
              }
            }}
          >
            Generate & Copy Link
          </Button>
        </CardContent>
      </Card>

      {/* Recent Conversions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversions</CardTitle>
          <CardDescription>Latest donations with attribution data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {attributionData.conversions
              .slice(-10)
              .reverse()
              .map((conversion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">₹{conversion.amount}</Badge>
                    <div className="text-sm">
                      <div className="font-medium">
                        {conversion.attribution.lastTouch.source}/{conversion.attribution.lastTouch.medium}
                      </div>
                      {conversion.attribution.lastTouch.campaign && (
                        <div className="text-gray-600">Campaign: {conversion.attribution.lastTouch.campaign}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{new Date(conversion.conversionTimestamp).toLocaleDateString()}</div>
                    <div>{conversion.donationType}</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AttributionDashboard
