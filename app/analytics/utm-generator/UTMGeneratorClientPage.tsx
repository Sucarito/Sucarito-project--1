"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, Share2, CheckCircle } from "lucide-react"

export default function UTMGeneratorClientPage() {
  const [baseUrl, setBaseUrl] = useState("https://yourtemple.com/donate")
  const [source, setSource] = useState("")
  const [medium, setMedium] = useState("")
  const [campaign, setCampaign] = useState("")
  const [term, setTerm] = useState("")
  const [content, setContent] = useState("")
  const [generatedUrl, setGeneratedUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const commonSources = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "google", label: "Google" },
    { value: "youtube", label: "YouTube" },
    { value: "email", label: "Email" },
    { value: "newsletter", label: "Newsletter" },
    { value: "whatsapp", label: "WhatsApp" },
  ]

  const commonMediums = [
    { value: "social", label: "Social Media" },
    { value: "cpc", label: "Cost Per Click (CPC)" },
    { value: "email", label: "Email" },
    { value: "organic", label: "Organic Search" },
    { value: "referral", label: "Referral" },
    { value: "display", label: "Display Advertising" },
    { value: "video", label: "Video" },
    { value: "affiliate", label: "Affiliate" },
  ]

  const generateUrl = () => {
    if (!baseUrl || !source || !medium || !campaign) {
      alert("Please fill in the required fields (URL, Source, Medium, Campaign)")
      return
    }

    const url = new URL(baseUrl)
    const params = new URLSearchParams()

    params.set("utm_source", source)
    params.set("utm_medium", medium)
    params.set("utm_campaign", campaign)

    if (term) params.set("utm_term", term)
    if (content) params.set("utm_content", content)

    url.search = params.toString()
    setGeneratedUrl(url.toString())
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const presetCampaigns = [
    {
      name: "Facebook Vesak Campaign",
      source: "facebook",
      medium: "social",
      campaign: "vesak_2024",
      content: "video_ad",
    },
    {
      name: "Google Ads - Temple Maintenance",
      source: "google",
      medium: "cpc",
      campaign: "temple_maintenance",
      term: "buddhist temple donation",
    },
    {
      name: "Email Newsletter",
      source: "newsletter",
      medium: "email",
      campaign: "monthly_update",
      content: "donation_cta",
    },
    {
      name: "Instagram Story",
      source: "instagram",
      medium: "social",
      campaign: "meditation_program",
      content: "story_swipe_up",
    },
  ]

  const loadPreset = (preset: (typeof presetCampaigns)[0]) => {
    setSource(preset.source)
    setMedium(preset.medium)
    setCampaign(preset.campaign)
    setTerm(preset.term || "")
    setContent(preset.content || "")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">UTM Link Generator</h1>
          <p className="text-gray-600">Create trackable links for your marketing campaigns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>Fill in your campaign information to generate a trackable link</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Base URL */}
              <div className="space-y-2">
                <Label htmlFor="baseUrl">
                  Website URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://yourtemple.com/donate"
                />
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="source">
                  Campaign Source <span className="text-red-500">*</span>
                </Label>
                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or type source" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonSources.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Or type custom source"
                  className="mt-2"
                />
              </div>

              {/* Medium */}
              <div className="space-y-2">
                <Label htmlFor="medium">
                  Campaign Medium <span className="text-red-500">*</span>
                </Label>
                <Select value={medium} onValueChange={setMedium}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or type medium" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonMediums.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="Or type custom medium"
                  className="mt-2"
                />
              </div>

              {/* Campaign */}
              <div className="space-y-2">
                <Label htmlFor="campaign">
                  Campaign Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="campaign"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  placeholder="vesak_2024, temple_maintenance, etc."
                />
              </div>

              {/* Term */}
              <div className="space-y-2">
                <Label htmlFor="term">Campaign Term (Optional)</Label>
                <Input
                  id="term"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="buddhist temple, meditation, donation"
                />
                <p className="text-xs text-gray-500">Used for paid search keywords</p>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Campaign Content (Optional)</Label>
                <Input
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="video_ad, text_link, banner_top"
                />
                <p className="text-xs text-gray-500">Used to differentiate similar content or links</p>
              </div>

              <Button onClick={generateUrl} className="w-full">
                Generate UTM Link
              </Button>
            </CardContent>
          </Card>

          {/* Result and Presets */}
          <div className="space-y-6">
            {/* Generated URL */}
            {generatedUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Generated Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea value={generatedUrl} readOnly className="min-h-[100px] text-sm" />
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex items-center gap-2">
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </Button>
                    <Button
                      onClick={() => window.open(generatedUrl, "_blank")}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Test Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Campaign Presets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Campaign Presets
                </CardTitle>
                <CardDescription>Quick start with common campaign types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {presetCampaigns.map((preset, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{preset.name}</h4>
                        <p className="text-sm text-gray-500">
                          {preset.source} / {preset.medium} / {preset.campaign}
                        </p>
                      </div>
                      <Button onClick={() => loadPreset(preset)} variant="outline" size="sm">
                        Use
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* UTM Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle>UTM Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Source</h4>
                    <p className="text-blue-800">Where traffic comes from (facebook, google, newsletter)</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Medium</h4>
                    <p className="text-green-800">How traffic arrives (social, cpc, email, organic)</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900">Campaign</h4>
                    <p className="text-purple-800">Specific campaign name (vesak_2024, temple_maintenance)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Usage Instructions */}
        <Alert>
          <AlertDescription>
            <strong>How to use:</strong> Share the generated UTM link in your marketing campaigns. When visitors click
            the link, their journey will be tracked in Google Analytics, allowing you to see which campaigns drive the
            most donations.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
