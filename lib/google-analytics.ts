// Google Analytics 4 integration service

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export interface GA4Event {
  event_name: string
  event_parameters: Record<string, any>
}

export interface GA4Purchase {
  transaction_id: string
  value: number
  currency: string
  items: GA4Item[]
  // Attribution data
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  // Custom dimensions
  donation_type?: string
  is_recurring?: boolean
  first_touch_source?: string
  first_touch_medium?: string
  first_touch_campaign?: string
  touchpoint_count?: number
  days_to_conversion?: number
}

export interface GA4Item {
  item_id: string
  item_name: string
  item_category: string
  quantity: number
  price: number
}

class GoogleAnalyticsService {
  private measurementId: string
  private apiSecret: string
  private isInitialized = false

  constructor(measurementId: string, apiSecret?: string) {
    this.measurementId = measurementId
    this.apiSecret = apiSecret || ""

    if (typeof window !== "undefined") {
      this.initializeGA4()
    }
  }

  private initializeGA4() {
    // Load Google Analytics 4
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
    document.head.appendChild(script)

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }

    // Configure GA4
    window.gtag("js", new Date())
    window.gtag("config", this.measurementId, {
      // Enhanced ecommerce settings
      send_page_view: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
      // Custom configuration
      custom_map: {
        custom_parameter_1: "donation_type",
        custom_parameter_2: "is_recurring",
        custom_parameter_3: "first_touch_source",
        custom_parameter_4: "first_touch_medium",
        custom_parameter_5: "first_touch_campaign",
        custom_parameter_6: "touchpoint_count",
        custom_parameter_7: "days_to_conversion",
      },
    })

    this.isInitialized = true
    console.log("Google Analytics 4 initialized")
  }

  // Track page views with attribution data
  trackPageView(page_title?: string, page_location?: string, attribution?: any) {
    if (!this.isInitialized) return

    const eventData: any = {
      page_title,
      page_location: page_location || window.location.href,
    }

    // Add attribution data if available
    if (attribution) {
      eventData.source = attribution.lastTouch.source
      eventData.medium = attribution.lastTouch.medium
      eventData.campaign = attribution.lastTouch.campaign
      eventData.first_touch_source = attribution.firstTouch.source
      eventData.first_touch_medium = attribution.firstTouch.medium
      eventData.first_touch_campaign = attribution.firstTouch.campaign
      eventData.touchpoint_count = attribution.touchpoints.length
    }

    window.gtag("event", "page_view", eventData)
  }

  // Track custom events
  trackEvent(eventName: string, parameters: Record<string, any> = {}) {
    if (!this.isInitialized) return

    window.gtag("event", eventName, parameters)
    console.log("GA4 Event:", eventName, parameters)
  }

  // Track donation form interactions
  trackDonationFormStart(attribution?: any) {
    const eventData: any = {
      event_category: "donation",
      event_label: "form_started",
    }

    if (attribution) {
      eventData.source = attribution.lastTouch.source
      eventData.medium = attribution.lastTouch.medium
      eventData.campaign = attribution.lastTouch.campaign
    }

    this.trackEvent("begin_checkout", eventData)
  }

  trackAmountSelection(amount: string, isCustom: boolean, attribution?: any) {
    const eventData: any = {
      event_category: "donation",
      event_label: "amount_selected",
      value: Number.parseFloat(amount) || 0,
      currency: "INR",
      is_custom_amount: isCustom,
    }

    if (attribution) {
      eventData.source = attribution.lastTouch.source
      eventData.medium = attribution.lastTouch.medium
      eventData.campaign = attribution.lastTouch.campaign
    }

    this.trackEvent("select_item", eventData)
  }

  trackDonationTypeSelection(donationType: string, attribution?: any) {
    const eventData: any = {
      event_category: "donation",
      event_label: "type_selected",
      donation_type: donationType,
    }

    if (attribution) {
      eventData.source = attribution.lastTouch.source
      eventData.medium = attribution.lastTouch.medium
      eventData.campaign = attribution.lastTouch.campaign
    }

    this.trackEvent("select_content", eventData)
  }

  trackCheckoutInitiation(amount: number, donationType: string, isRecurring: boolean, attribution?: any) {
    const eventData: any = {
      event_category: "donation",
      event_label: "checkout_initiated",
      value: amount,
      currency: "INR",
      donation_type: donationType,
      is_recurring: isRecurring,
      items: [
        {
          item_id: `donation_${donationType.toLowerCase().replace(/\s+/g, "_")}`,
          item_name: `${donationType} Donation`,
          item_category: "donation",
          quantity: 1,
          price: amount,
        },
      ],
    }

    if (attribution) {
      eventData.source = attribution.lastTouch.source
      eventData.medium = attribution.lastTouch.medium
      eventData.campaign = attribution.lastTouch.campaign
      eventData.first_touch_source = attribution.firstTouch.source
      eventData.first_touch_medium = attribution.firstTouch.medium
      eventData.first_touch_campaign = attribution.firstTouch.campaign
      eventData.touchpoint_count = attribution.touchpoints.length

      // Calculate days to conversion
      const firstTouchDate = new Date(attribution.firstTouch.timestamp)
      const daysSinceFirstTouch = Math.floor((Date.now() - firstTouchDate.getTime()) / (1000 * 60 * 60 * 24))
      eventData.days_to_conversion = daysSinceFirstTouch
    }

    this.trackEvent("add_to_cart", eventData)
  }

  // Track successful donation (Enhanced Ecommerce Purchase)
  trackDonationSuccess(purchaseData: GA4Purchase) {
    const eventData = {
      transaction_id: purchaseData.transaction_id,
      value: purchaseData.value,
      currency: purchaseData.currency,
      items: purchaseData.items,
      // Attribution dimensions
      source: purchaseData.source,
      medium: purchaseData.medium,
      campaign: purchaseData.campaign,
      term: purchaseData.term,
      content: purchaseData.content,
      // Custom dimensions
      donation_type: purchaseData.donation_type,
      is_recurring: purchaseData.is_recurring,
      first_touch_source: purchaseData.first_touch_source,
      first_touch_medium: purchaseData.first_touch_medium,
      first_touch_campaign: purchaseData.first_touch_campaign,
      touchpoint_count: purchaseData.touchpoint_count,
      days_to_conversion: purchaseData.days_to_conversion,
    }

    // Track purchase event
    this.trackEvent("purchase", eventData)

    // Track conversion event
    this.trackEvent("donation_completed", {
      event_category: "donation",
      event_label: "completed",
      value: purchaseData.value,
      currency: purchaseData.currency,
      donation_type: purchaseData.donation_type,
      is_recurring: purchaseData.is_recurring,
    })

    console.log("GA4 Purchase tracked:", eventData)
  }

  // Track donation errors
  trackDonationError(error: string, step: string, attribution?: any) {
    const eventData: any = {
      event_category: "donation",
      event_label: "error",
      error_message: error,
      error_step: step,
    }

    if (attribution) {
      eventData.source = attribution.lastTouch.source
      eventData.medium = attribution.lastTouch.medium
      eventData.campaign = attribution.lastTouch.campaign
    }

    this.trackEvent("exception", eventData)
  }

  // Track form abandonment
  trackFormAbandonment(lastCompletedField?: string, attribution?: any) {
    const eventData: any = {
      event_category: "donation",
      event_label: "form_abandoned",
      last_completed_field: lastCompletedField,
    }

    if (attribution) {
      eventData.source = attribution.lastTouch.source
      eventData.medium = attribution.lastTouch.medium
      eventData.campaign = attribution.lastTouch.campaign
    }

    this.trackEvent("abandon_cart", eventData)
  }

  // Server-side tracking using Measurement Protocol
  async trackServerSideEvent(clientId: string, event: GA4Event) {
    if (!this.apiSecret) {
      console.warn("GA4 API Secret not configured for server-side tracking")
      return
    }

    try {
      const response = await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: clientId,
            events: [
              {
                name: event.event_name,
                params: event.event_parameters,
              },
            ],
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`GA4 server-side tracking failed: ${response.statusText}`)
      }

      console.log("GA4 server-side event sent:", event)
    } catch (error) {
      console.error("Failed to send GA4 server-side event:", error)
    }
  }

  // Set user properties
  setUserProperties(properties: Record<string, any>) {
    if (!this.isInitialized) return

    window.gtag("config", this.measurementId, {
      user_properties: properties,
    })
  }

  // Set custom dimensions
  setCustomDimensions(dimensions: Record<string, any>) {
    if (!this.isInitialized) return

    window.gtag("config", this.measurementId, {
      custom_map: dimensions,
    })
  }
}

// Initialize GA4 service
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-XXXXXXXXXX"
const GA4_API_SECRET = process.env.GA4_API_SECRET

export const ga4 = new GoogleAnalyticsService(GA4_MEASUREMENT_ID, GA4_API_SECRET)

// Utility functions for common GA4 tracking
export const trackGA4 = {
  pageView: (title?: string, location?: string, attribution?: any) => ga4.trackPageView(title, location, attribution),
  event: (name: string, parameters?: Record<string, any>) => ga4.trackEvent(name, parameters),
  formStart: (attribution?: any) => ga4.trackDonationFormStart(attribution),
  amountSelect: (amount: string, isCustom: boolean, attribution?: any) =>
    ga4.trackAmountSelection(amount, isCustom, attribution),
  typeSelect: (type: string, attribution?: any) => ga4.trackDonationTypeSelection(type, attribution),
  checkoutStart: (amount: number, type: string, isRecurring: boolean, attribution?: any) =>
    ga4.trackCheckoutInitiation(amount, type, isRecurring, attribution),
  donationSuccess: (purchaseData: GA4Purchase) => ga4.trackDonationSuccess(purchaseData),
  donationError: (error: string, step: string, attribution?: any) => ga4.trackDonationError(error, step, attribution),
  formAbandon: (lastField?: string, attribution?: any) => ga4.trackFormAbandonment(lastField, attribution),
  serverEvent: (clientId: string, event: GA4Event) => ga4.trackServerSideEvent(clientId, event),
  setUserProperties: (properties: Record<string, any>) => ga4.setUserProperties(properties),
}
