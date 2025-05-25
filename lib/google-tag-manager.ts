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

    // Load GTM script
    const script = document.createElement("script")
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${this.containerId}');
    `
    document.head.appendChild(script)

    // Add noscript fallback
    const noscript = document.createElement("noscript")
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${this.containerId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `
    document.body.appendChild(noscript)

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
