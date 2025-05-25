// Enhanced attribution service with GA4 integration

import { trackGA4, type GA4Purchase } from "./google-analytics"
import { trackGTM } from "./google-tag-manager"

// Attribution tracking service for marketing channel analysis

export interface AttributionData {
  // First-touch attribution (first interaction)
  firstTouch: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
    referrer?: string
    landingPage?: string
    timestamp: string
  }
  // Last-touch attribution (most recent interaction)
  lastTouch: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
    referrer?: string
    landingPage?: string
    timestamp: string
  }
  // All touchpoints in the customer journey
  touchpoints: TouchPoint[]
  // Session information
  sessionId: string
  userId?: string
}

export interface TouchPoint {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  referrer?: string
  page?: string
  timestamp: string
  type: "organic" | "paid" | "social" | "email" | "direct" | "referral"
}

export interface ConversionAttribution {
  sessionId: string
  donationId: string
  amount: number
  currency: string
  donationType: string
  isRecurring: boolean
  attribution: AttributionData
  conversionTimestamp: string
}

class AttributionService {
  private readonly ATTRIBUTION_STORAGE_KEY = "donation_attribution"
  private readonly ATTRIBUTION_EXPIRY_DAYS = 30

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeAttribution()
    }
  }

  private initializeAttribution() {
    // Check if we have existing attribution data
    const existingAttribution = this.getStoredAttribution()

    // Get current page attribution
    const currentAttribution = this.getCurrentPageAttribution()

    if (existingAttribution) {
      // Update last-touch and add new touchpoint
      this.updateAttribution(existingAttribution, currentAttribution)
    } else {
      // Create new attribution record
      this.createNewAttribution(currentAttribution)
    }

    // Track page view with attribution data
    const attribution = this.getStoredAttribution()
    trackGA4.pageView(document.title, window.location.href, attribution)

    // Push to GTM dataLayer
    trackGTM.event({
      event: "page_view_with_attribution",
      page_location: window.location.href,
      page_title: document.title,
      attribution_data: attribution,
    })
  }

  private getCurrentPageAttribution(): TouchPoint {
    const urlParams = new URLSearchParams(window.location.search)
    const referrer = document.referrer

    // Extract UTM parameters
    const utmSource = urlParams.get("utm_source")
    const utmMedium = urlParams.get("utm_medium")
    const utmCampaign = urlParams.get("utm_campaign")
    const utmTerm = urlParams.get("utm_term")
    const utmContent = urlParams.get("utm_content")

    // Extract other tracking parameters
    const fbclid = urlParams.get("fbclid") // Facebook
    const gclid = urlParams.get("gclid") // Google Ads
    const msclkid = urlParams.get("msclkid") // Microsoft Ads

    // Determine source and medium
    let source = utmSource
    let medium = utmMedium
    const campaign = utmCampaign

    // Auto-detect source if not provided
    if (!source) {
      if (fbclid) {
        source = "facebook"
        medium = medium || "cpc"
      } else if (gclid) {
        source = "google"
        medium = medium || "cpc"
      } else if (msclkid) {
        source = "bing"
        medium = medium || "cpc"
      } else if (referrer) {
        source = this.extractDomainFromUrl(referrer)
        medium = medium || "referral"
      } else {
        source = "direct"
        medium = medium || "none"
      }
    }

    // Determine traffic type
    const type = this.determineTrafficType(source, medium, referrer)

    return {
      source,
      medium,
      campaign,
      term: utmTerm,
      content: utmContent,
      referrer,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      type,
    }
  }

  private determineTrafficType(source?: string, medium?: string, referrer?: string): TouchPoint["type"] {
    if (!source || source === "direct") return "direct"

    if (medium) {
      if (medium.includes("cpc") || medium.includes("ppc") || medium.includes("paid")) {
        return "paid"
      }
      if (medium.includes("email")) {
        return "email"
      }
      if (medium.includes("social")) {
        return "social"
      }
    }

    // Check for social platforms
    const socialPlatforms = ["facebook", "twitter", "instagram", "linkedin", "youtube", "tiktok", "whatsapp"]
    if (source && socialPlatforms.some((platform) => source.toLowerCase().includes(platform))) {
      return "social"
    }

    // Check for search engines
    const searchEngines = ["google", "bing", "yahoo", "duckduckgo", "baidu"]
    if (source && searchEngines.some((engine) => source.toLowerCase().includes(engine))) {
      return "organic"
    }

    return "referral"
  }

  private extractDomainFromUrl(url: string): string {
    try {
      const domain = new URL(url).hostname
      return domain.replace("www.", "")
    } catch {
      return "unknown"
    }
  }

  private getStoredAttribution(): AttributionData | null {
    try {
      const stored = localStorage.getItem(this.ATTRIBUTION_STORAGE_KEY)
      if (!stored) return null

      const attribution: AttributionData = JSON.parse(stored)

      // Check if attribution has expired
      const firstTouchDate = new Date(attribution.firstTouch.timestamp)
      const expiryDate = new Date(firstTouchDate.getTime() + this.ATTRIBUTION_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

      if (new Date() > expiryDate) {
        localStorage.removeItem(this.ATTRIBUTION_STORAGE_KEY)
        return null
      }

      return attribution
    } catch {
      return null
    }
  }

  private createNewAttribution(touchpoint: TouchPoint) {
    const attribution: AttributionData = {
      firstTouch: {
        source: touchpoint.source,
        medium: touchpoint.medium,
        campaign: touchpoint.campaign,
        term: touchpoint.term,
        content: touchpoint.content,
        referrer: touchpoint.referrer,
        landingPage: touchpoint.page,
        timestamp: touchpoint.timestamp,
      },
      lastTouch: {
        source: touchpoint.source,
        medium: touchpoint.medium,
        campaign: touchpoint.campaign,
        term: touchpoint.term,
        content: touchpoint.content,
        referrer: touchpoint.referrer,
        landingPage: touchpoint.page,
        timestamp: touchpoint.timestamp,
      },
      touchpoints: [touchpoint],
      sessionId: this.generateSessionId(),
    }

    this.storeAttribution(attribution)
  }

  private updateAttribution(existing: AttributionData, newTouchpoint: TouchPoint) {
    // Update last-touch
    existing.lastTouch = {
      source: newTouchpoint.source,
      medium: newTouchpoint.medium,
      campaign: newTouchpoint.campaign,
      term: newTouchpoint.term,
      content: newTouchpoint.content,
      referrer: newTouchpoint.referrer,
      landingPage: newTouchpoint.page,
      timestamp: newTouchpoint.timestamp,
    }

    // Add to touchpoints if it's different from the last one
    const lastTouchpoint = existing.touchpoints[existing.touchpoints.length - 1]
    if (
      !lastTouchpoint ||
      lastTouchpoint.source !== newTouchpoint.source ||
      lastTouchpoint.medium !== newTouchpoint.medium ||
      lastTouchpoint.campaign !== newTouchpoint.campaign
    ) {
      existing.touchpoints.push(newTouchpoint)
    }

    this.storeAttribution(existing)
  }

  private storeAttribution(attribution: AttributionData) {
    localStorage.setItem(this.ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution))
  }

  private generateSessionId(): string {
    return `attr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Public methods
  getAttribution(): AttributionData | null {
    return this.getStoredAttribution()
  }

  trackConversion(
    donationId: string,
    amount: number,
    currency: string,
    donationType: string,
    isRecurring: boolean,
  ): ConversionAttribution | null {
    const attribution = this.getStoredAttribution()
    if (!attribution) return null

    const conversion: ConversionAttribution = {
      sessionId: attribution.sessionId,
      donationId,
      amount,
      currency,
      donationType,
      isRecurring,
      attribution,
      conversionTimestamp: new Date().toISOString(),
    }

    // Send conversion data to analytics
    this.sendConversionData(conversion)

    // Track in GA4
    this.trackGA4Conversion(conversion)

    // Track in GTM
    this.trackGTMConversion(conversion)

    return conversion
  }

  private trackGA4Conversion(conversion: ConversionAttribution) {
    const attribution = conversion.attribution

    // Calculate days to conversion
    const firstTouchDate = new Date(attribution.firstTouch.timestamp)
    const daysSinceFirstTouch = Math.floor((Date.now() - firstTouchDate.getTime()) / (1000 * 60 * 60 * 24))

    const purchaseData: GA4Purchase = {
      transaction_id: conversion.donationId,
      value: conversion.amount,
      currency: conversion.currency.toUpperCase(),
      items: [
        {
          item_id: `donation_${conversion.donationType.toLowerCase().replace(/\s+/g, "_")}`,
          item_name: `${conversion.donationType} Donation`,
          item_category: "donation",
          quantity: 1,
          price: conversion.amount,
        },
      ],
      // Attribution data
      source: attribution.lastTouch.source,
      medium: attribution.lastTouch.medium,
      campaign: attribution.lastTouch.campaign,
      term: attribution.lastTouch.term,
      content: attribution.lastTouch.content,
      // Custom dimensions
      donation_type: conversion.donationType,
      is_recurring: conversion.isRecurring,
      first_touch_source: attribution.firstTouch.source,
      first_touch_medium: attribution.firstTouch.medium,
      first_touch_campaign: attribution.firstTouch.campaign,
      touchpoint_count: attribution.touchpoints.length,
      days_to_conversion: daysSinceFirstTouch,
    }

    trackGA4.donationSuccess(purchaseData)
  }

  private trackGTMConversion(conversion: ConversionAttribution) {
    const attribution = conversion.attribution

    // Enhanced ecommerce purchase event
    trackGTM.ecommerce(
      "purchase",
      {
        transaction_id: conversion.donationId,
        value: conversion.amount,
        currency: conversion.currency.toUpperCase(),
        items: [
          {
            item_id: `donation_${conversion.donationType.toLowerCase().replace(/\s+/g, "_")}`,
            item_name: `${conversion.donationType} Donation`,
            item_category: "donation",
            item_variant: conversion.isRecurring ? "recurring" : "one-time",
            quantity: 1,
            price: conversion.amount,
          },
        ],
      },
      {
        // Attribution data
        first_touch_source: attribution.firstTouch.source,
        first_touch_medium: attribution.firstTouch.medium,
        first_touch_campaign: attribution.firstTouch.campaign,
        last_touch_source: attribution.lastTouch.source,
        last_touch_medium: attribution.lastTouch.medium,
        last_touch_campaign: attribution.lastTouch.campaign,
        touchpoint_count: attribution.touchpoints.length,
        session_id: attribution.sessionId,
        donation_type: conversion.donationType,
        is_recurring: conversion.isRecurring,
      },
    )

    // Custom donation conversion event
    trackGTM.donation(
      "donation_completed",
      {
        donation_id: conversion.donationId,
        amount: conversion.amount,
        currency: conversion.currency,
        type: conversion.donationType,
        is_recurring: conversion.isRecurring,
      },
      attribution,
    )
  }

  // Track form interactions with GA4
  trackFormStart() {
    const attribution = this.getStoredAttribution()
    trackGA4.formStart(attribution)

    trackGTM.donation(
      "donation_form_started",
      {
        form_type: "donation",
      },
      attribution,
    )
  }

  trackAmountSelection(amount: string, isCustom: boolean) {
    const attribution = this.getStoredAttribution()
    trackGA4.amountSelect(amount, isCustom, attribution)

    trackGTM.donation(
      "donation_amount_selected",
      {
        amount: Number.parseFloat(amount) || 0,
        is_custom: isCustom,
      },
      attribution,
    )
  }

  trackDonationTypeSelection(donationType: string) {
    const attribution = this.getStoredAttribution()
    trackGA4.typeSelect(donationType, attribution)

    trackGTM.donation(
      "donation_type_selected",
      {
        donation_type: donationType,
      },
      attribution,
    )
  }

  trackCheckoutInitiation(amount: number, donationType: string, isRecurring: boolean) {
    const attribution = this.getStoredAttribution()
    trackGA4.checkoutStart(amount, donationType, isRecurring, attribution)

    trackGTM.ecommerce(
      "begin_checkout",
      {
        currency: "INR",
        value: amount,
        items: [
          {
            item_id: `donation_${donationType.toLowerCase().replace(/\s+/g, "_")}`,
            item_name: `${donationType} Donation`,
            item_category: "donation",
            item_variant: isRecurring ? "recurring" : "one-time",
            quantity: 1,
            price: amount,
          },
        ],
      },
      {
        donation_type: donationType,
        is_recurring: isRecurring,
      },
    )
  }

  trackFormAbandonment(lastCompletedField?: string) {
    const attribution = this.getStoredAttribution()
    trackGA4.formAbandon(lastCompletedField, attribution)

    trackGTM.donation(
      "donation_form_abandoned",
      {
        last_completed_field: lastCompletedField,
      },
      attribution,
    )
  }

  trackDonationError(error: string, step: string) {
    const attribution = this.getStoredAttribution()
    trackGA4.donationError(error, step, attribution)

    trackGTM.donation(
      "donation_error",
      {
        error_message: error,
        error_step: step,
      },
      attribution,
    )
  }

  private async sendConversionData(conversion: ConversionAttribution) {
    try {
      await fetch("/api/analytics/attribution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conversion),
      })
    } catch (error) {
      console.error("Failed to send conversion attribution data:", error)
    }
  }

  // Get attribution summary for current session
  getAttributionSummary() {
    const attribution = this.getStoredAttribution()
    if (!attribution) return null

    return {
      firstTouchChannel: `${attribution.firstTouch.source}/${attribution.firstTouch.medium}`,
      lastTouchChannel: `${attribution.lastTouch.source}/${attribution.lastTouch.medium}`,
      touchpointCount: attribution.touchpoints.length,
      campaignName: attribution.lastTouch.campaign || attribution.firstTouch.campaign,
      daysSinceFirstTouch: Math.floor(
        (new Date().getTime() - new Date(attribution.firstTouch.timestamp).getTime()) / (1000 * 60 * 60 * 24),
      ),
    }
  }

  // Clear attribution (useful for testing)
  clearAttribution() {
    localStorage.removeItem(this.ATTRIBUTION_STORAGE_KEY)
  }
}

// Create singleton instance
export const attributionService = new AttributionService()

// Utility functions for common attribution tasks
export const trackAttribution = {
  getAttribution: () => attributionService.getAttribution(),
  getSummary: () => attributionService.getAttributionSummary(),
  trackConversion: (donationId: string, amount: number, currency: string, donationType: string, isRecurring: boolean) =>
    attributionService.trackConversion(donationId, amount, currency, donationType, isRecurring),
  clear: () => attributionService.clearAttribution(),
}
