// Google Tag Manager integration for advanced tracking

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export interface GTMEvent {
  event: string
  [key: string]: any
}

class GoogleTagManagerService {
  private containerId: string
  private isInitialized = false

  constructor(containerId: string) {
    this.containerId = containerId

    if (typeof window !== "undefined") {
      this.initializeGTM()
    }
  }

  private initializeGTM() {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []

    // Push GTM start event
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    })

    // Load GTM script via src attribute (not innerHTML)
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${this.containerId}`
    document.head.appendChild(script)

    this.isInitialized = true
    console.log("Google Tag Manager initialized")
  }

  // Push events to dataLayer
  pushEvent(event: GTMEvent) {
    if (!this.isInitialized) return

    window.dataLayer.push(event)
    console.log("GTM Event:", event)
  }

  // Enhanced ecommerce events
  pushEcommerceEvent(event: string, ecommerce: any, additionalData: any = {}) {
    this.pushEvent({
      event,
      ecommerce,
      ...additionalData,
    })
  }

  // Donation-specific events
  pushDonationEvent(eventName: string, donationData: any, attribution?: any) {
    const eventData: GTMEvent = {
      event: eventName,
      donation: donationData,
    }

    // Add attribution data
    if (attribution) {
      eventData.attribution = {
        first_touch_source: attribution.firstTouch.source,
        first_touch_medium: attribution.firstTouch.medium,
        first_touch_campaign: attribution.firstTouch.campaign,
        last_touch_source: attribution.lastTouch.source,
        last_touch_medium: attribution.lastTouch.medium,
        last_touch_campaign: attribution.lastTouch.campaign,
        touchpoint_count: attribution.touchpoints.length,
        session_id: attribution.sessionId,
      }
    }

    this.pushEvent(eventData)
  }
}

// Initialize GTM service
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "GTM-XXXXXXX"
export const gtm = new GoogleTagManagerService(GTM_CONTAINER_ID)

// Utility functions for GTM tracking
export const trackGTM = {
  event: (event: GTMEvent) => gtm.pushEvent(event),
  ecommerce: (event: string, ecommerce: any, additionalData?: any) =>
    gtm.pushEcommerceEvent(event, ecommerce, additionalData),
  donation: (eventName: string, donationData: any, attribution?: any) =>
    gtm.pushDonationEvent(eventName, donationData, attribution),
}
