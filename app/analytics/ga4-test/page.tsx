"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Play, Eye } from "lucide-react"
import { trackGA4 } from "@/lib/google-analytics"
import { trackAttribution } from "@/lib/attribution"

interface TestResult {
  name: string
  status: "success" | "error" | "warning" | "pending"
  message: string
  details?: string
}

export default function GA4TestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [attribution, setAttribution] = useState<any>(null)

  useEffect(() => {
    // Get current attribution data
    const currentAttribution = trackAttribution.getAttribution()
    setAttribution(currentAttribution)
  }, [])

  const runTests = async () => {
    setIsRunning(true)
    setTestResults([])

    const tests: TestResult[] = []

    // Test 1: Check environment variables
    tests.push({
      name: "Environment Variables",
      status: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ? "success" : "error",
      message: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ? "GA4 Measurement ID found" : "GA4 Measurement ID missing",
      details: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "Not configured",
    })

    // Test 2: Check if gtag is loaded
    await new Promise((resolve) => setTimeout(resolve, 1000))
    tests.push({
      name: "Google Analytics Script",
      status: typeof window !== "undefined" && window.gtag ? "success" : "error",
      message: typeof window !== "undefined" && window.gtag ? "gtag function available" : "gtag not loaded",
      details:
        typeof window !== "undefined" && window.gtag ? "GA4 script loaded successfully" : "Check network connectivity",
    })

    // Test 3: Check dataLayer
    tests.push({
      name: "DataLayer",
      status: typeof window !== "undefined" && window.dataLayer ? "success" : "error",
      message: typeof window !== "undefined" && window.dataLayer ? "dataLayer initialized" : "dataLayer not found",
      details:
        typeof window !== "undefined" && window.dataLayer
          ? `${window.dataLayer.length} events in dataLayer`
          : "GTM may not be loaded",
    })

    // Test 4: Test custom event
    try {
      trackGA4.event("test_event", {
        test_parameter: "test_value",
        timestamp: new Date().toISOString(),
      })
      tests.push({
        name: "Custom Event Tracking",
        status: "success",
        message: "Test event sent successfully",
        details: "Check GA4 DebugView to verify event receipt",
      })
    } catch (error) {
      tests.push({
        name: "Custom Event Tracking",
        status: "error",
        message: "Failed to send test event",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    // Test 5: Attribution data
    const attributionData = trackAttribution.getAttribution()
    tests.push({
      name: "Attribution Tracking",
      status: attributionData ? "success" : "warning",
      message: attributionData ? "Attribution data available" : "No attribution data found",
      details: attributionData
        ? `Source: ${attributionData.lastTouch.source}, Medium: ${attributionData.lastTouch.medium}`
        : "Visit with UTM parameters to test attribution",
    })

    // Test 6: Test donation funnel event
    try {
      trackGA4.formStart(attributionData)
      tests.push({
        name: "Donation Funnel Tracking",
        status: "success",
        message: "Form start event sent",
        details: "Donation funnel tracking is working",
      })
    } catch (error) {
      tests.push({
        name: "Donation Funnel Tracking",
        status: "error",
        message: "Failed to send funnel event",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    }

    setTestResults(tests)
    setIsRunning(false)
  }

  const testDonationFlow = () => {
    // Simulate donation flow events
    const testAttribution = trackAttribution.getAttribution()

    // Test amount selection
    trackGA4.amountSelect("5000", false, testAttribution)

    // Test type selection
    trackGA4.typeSelect("Temple Maintenance", testAttribution)

    // Test checkout initiation
    trackGA4.checkoutStart(5000, "Temple Maintenance", false, testAttribution)

    alert("Test donation flow events sent! Check GA4 DebugView to verify.")
  }

  const testConversion = () => {
    // Simulate a test conversion
    const testAttribution = trackAttribution.getAttribution()
    if (testAttribution) {
      trackAttribution.trackConversion("test_donation_123", 5000, "INR", "Temple Maintenance", false)
      alert("Test conversion tracked! Check GA4 for purchase event.")
    } else {
      alert("No attribution data available. Visit with UTM parameters first.")
    }
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <RefreshCw className="h-5 w-5 text-gray-500 animate-spin" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    const variants = {
      success: "default",
      error: "destructive",
      warning: "secondary",
      pending: "outline",
    } as const

    return (
      <Badge variant={variants[status]} className="ml-2">
        {status.toUpperCase()}
      </Badge>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GA4 Integration Testing</h1>
          <p className="text-gray-600">Verify your Google Analytics 4 and attribution tracking setup</p>
        </div>

        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Test Controls
            </CardTitle>
            <CardDescription>Run tests to verify your GA4 integration is working correctly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button onClick={runTests} disabled={isRunning} className="flex items-center gap-2">
                {isRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Run All Tests
              </Button>
              <Button onClick={testDonationFlow} variant="outline">
                Test Donation Flow
              </Button>
              <Button onClick={testConversion} variant="outline">
                Test Conversion
              </Button>
              <Button
                onClick={() => window.open("https://analytics.google.com/analytics/web/#/debugview", "_blank")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Open GA4 DebugView
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                {testResults.filter((t) => t.status === "success").length} of {testResults.length} tests passed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((test, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    {getStatusIcon(test.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{test.name}</h4>
                        {getStatusBadge(test.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{test.message}</p>
                      {test.details && <p className="text-xs text-gray-500 mt-1">{test.details}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Attribution */}
        <Card>
          <CardHeader>
            <CardTitle>Current Attribution Data</CardTitle>
            <CardDescription>Attribution information for the current session</CardDescription>
          </CardHeader>
          <CardContent>
            {attribution ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">First Touch</h4>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-blue-700">Source:</span> {attribution.firstTouch.source || "N/A"}
                      </div>
                      <div>
                        <span className="text-blue-700">Medium:</span> {attribution.firstTouch.medium || "N/A"}
                      </div>
                      <div>
                        <span className="text-blue-700">Campaign:</span> {attribution.firstTouch.campaign || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Last Touch</h4>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-green-700">Source:</span> {attribution.lastTouch.source || "N/A"}
                      </div>
                      <div>
                        <span className="text-green-700">Medium:</span> {attribution.lastTouch.medium || "N/A"}
                      </div>
                      <div>
                        <span className="text-green-700">Campaign:</span> {attribution.lastTouch.campaign || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Session Info</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="text-gray-700">Session ID:</span> {attribution.sessionId}
                    </div>
                    <div>
                      <span className="text-gray-700">Touchpoints:</span> {attribution.touchpoints.length}
                    </div>
                    <div>
                      <span className="text-gray-700">First Touch Time:</span>{" "}
                      {new Date(attribution.firstTouch.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Attribution Data</AlertTitle>
                <AlertDescription>
                  No attribution data found for this session. Try visiting with UTM parameters like:
                  <br />
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    ?utm_source=facebook&utm_medium=social&utm_campaign=test
                  </code>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Complete your GA4 setup for optimal tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">1. Set Up Custom Dimensions</h4>
                <p className="text-sm text-blue-800">
                  Create custom dimensions in GA4 for donation_type, is_recurring, first_touch_source, etc. See the
                  GA4-SETUP.md guide for details.
                </p>
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                <h4 className="font-medium text-green-900 mb-2">2. Configure Conversion Events</h4>
                <p className="text-sm text-green-800">
                  Mark 'purchase' and 'donation_completed' as conversion events in GA4 Admin &gt; Events.
                </p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                <h4 className="font-medium text-purple-900 mb-2">3. Create Attribution Reports</h4>
                <p className="text-sm text-purple-800">
                  Set up custom reports in GA4 Explore to analyze first-touch vs last-touch attribution.
                </p>
              </div>
              <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                <h4 className="font-medium text-orange-900 mb-2">4. Test with Real Campaigns</h4>
                <p className="text-sm text-orange-800">
                  Create trackable links with UTM parameters for your marketing campaigns and test the full flow.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
