// Analytics service for tracking donation conversions and user behavior

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: string
  sessionId?: string
  userId?: string
}

export interface DonationAnalytics {
  sessionId: string
  pageViews: number
  timeOnPage: number
  formStarted: boolean
  formCompleted: boolean
  checkoutInitiated: boolean
  donationCompleted: boolean
  donationAmount?: number
  donationType?: string
  isRecurring?: boolean
  errorOccurred?: boolean
  errorMessage?: string
  conversionTime?: number
  userAgent?: string
  referrer?: string
  timestamp: string
}

class AnalyticsService {
  private sessionId: string
  private startTime: number
  private events: AnalyticsEvent[] = []

  constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()

    // Initialize session tracking
    if (typeof window !== "undefined") {
      this.initializeSession()
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeSession() {
    // Track page load
    this.track("page_view", {
      page: "donation",
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    })

    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.track("page_hidden", {
          timeOnPage: Date.now() - this.startTime,
        })
      } else {
        this.track("page_visible")
      }
    })

    // Track page unload
    window.addEventListener("beforeunload", () => {
      this.track("page_unload", {
        timeOnPage: Date.now() - this.startTime,
        totalEvents: this.events.length,
      })
      this.flush()
    })
  }

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
      },
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
    }

    this.events.push(analyticsEvent)

    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      const storedEvents = localStorage.getItem("donation_analytics") || "[]"
      const events = JSON.parse(storedEvents)
      events.push(analyticsEvent)
      localStorage.setItem("donation_analytics", JSON.stringify(events))
    }

    // Send to server immediately for critical events
    if (this.isCriticalEvent(event)) {
      this.sendEvent(analyticsEvent)
    }

    console.log("Analytics Event:", analyticsEvent)
  }

  private isCriticalEvent(event: string): boolean {
    const criticalEvents = ["checkout_initiated", "donation_completed", "donation_failed", "form_abandoned"]
    return criticalEvents.includes(event)
  }

  private async sendEvent(event: AnalyticsEvent) {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error("Failed to send analytics event:", error)
    }
  }

  // Track donation funnel steps
  trackFormStart() {
    this.track("form_started", {
      timeToStart: Date.now() - this.startTime,
    })
  }

  trackAmountSelection(amount: string, isCustom: boolean) {
    this.track("amount_selected", {
      amount,
      isCustom,
      timeToSelect: Date.now() - this.startTime,
    })
  }

  trackDonationTypeSelection(donationType: string) {
    this.track("donation_type_selected", {
      donationType,
    })
  }

  trackFrequencySelection(isMonthly: boolean) {
    this.track("frequency_selected", {
      isMonthly,
    })
  }

  trackFormFieldCompletion(field: string) {
    this.track("form_field_completed", {
      field,
    })
  }

  trackFormValidationError(field: string, error: string) {
    this.track("form_validation_error", {
      field,
      error,
    })
  }

  trackCheckoutInitiation(amount: number, donationType: string, isMonthly: boolean) {
    this.track("checkout_initiated", {
      amount,
      donationType,
      isMonthly,
      timeToCheckout: Date.now() - this.startTime,
    })
  }

  trackDonationCompletion(amount: number, donationType: string, isMonthly: boolean, paymentId: string) {
    this.track("donation_completed", {
      amount,
      donationType,
      isMonthly,
      paymentId,
      conversionTime: Date.now() - this.startTime,
    })
  }

  trackDonationError(error: string, step: string) {
    this.track("donation_failed", {
      error,
      step,
      timeToError: Date.now() - this.startTime,
    })
  }

  trackFormAbandonment(lastCompletedField?: string) {
    this.track("form_abandoned", {
      lastCompletedField,
      timeOnForm: Date.now() - this.startTime,
      completedFields: this.getCompletedFields(),
    })
  }

  private getCompletedFields(): string[] {
    return this.events
      .filter((event) => event.event === "form_field_completed")
      .map((event) => event.properties?.field)
      .filter(Boolean)
  }

  // Flush events to server
  async flush() {
    if (this.events.length === 0) return

    try {
      await fetch("/api/analytics/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: this.events,
        }),
      })

      this.events = []

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("donation_analytics")
      }
    } catch (error) {
      console.error("Failed to flush analytics events:", error)
    }
  }

  // Get session summary
  getSessionSummary(): DonationAnalytics {
    const formStarted = this.events.some((e) => e.event === "form_started")
    const checkoutInitiated = this.events.some((e) => e.event === "checkout_initiated")
    const donationCompleted = this.events.some((e) => e.event === "donation_completed")
    const errorOccurred = this.events.some((e) => e.event === "donation_failed")

    const completionEvent = this.events.find((e) => e.event === "donation_completed")
    const errorEvent = this.events.find((e) => e.event === "donation_failed")

    return {
      sessionId: this.sessionId,
      pageViews: this.events.filter((e) => e.event === "page_view").length,
      timeOnPage: Date.now() - this.startTime,
      formStarted,
      formCompleted: checkoutInitiated,
      checkoutInitiated,
      donationCompleted,
      donationAmount: completionEvent?.properties?.amount,
      donationType: completionEvent?.properties?.donationType,
      isRecurring: completionEvent?.properties?.isMonthly,
      errorOccurred,
      errorMessage: errorEvent?.properties?.error,
      conversionTime: completionEvent?.properties?.conversionTime,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    }
  }
}

// Create singleton instance
export const analytics = new AnalyticsService()

// Utility functions for common tracking scenarios
export const trackDonationFunnel = {
  pageView: () => analytics.track("donation_page_view"),
  formStart: () => analytics.trackFormStart(),
  amountSelect: (amount: string, isCustom: boolean) => analytics.trackAmountSelection(amount, isCustom),
  typeSelect: (type: string) => analytics.trackDonationTypeSelection(type),
  frequencySelect: (isMonthly: boolean) => analytics.trackFrequencySelection(isMonthly),
  fieldComplete: (field: string) => analytics.trackFormFieldCompletion(field),
  validationError: (field: string, error: string) => analytics.trackFormValidationError(field, error),
  checkoutStart: (amount: number, type: string, isMonthly: boolean) =>
    analytics.trackCheckoutInitiation(amount, type, isMonthly),
  donationSuccess: (amount: number, type: string, isMonthly: boolean, paymentId: string) =>
    analytics.trackDonationCompletion(amount, type, isMonthly, paymentId),
  donationError: (error: string, step: string) => analytics.trackDonationError(error, step),
  formAbandon: (lastField?: string) => analytics.trackFormAbandonment(lastField),
}
