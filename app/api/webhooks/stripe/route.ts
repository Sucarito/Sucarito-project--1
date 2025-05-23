import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { sendDonationReceiptEmail } from "@/lib/email"

// Initialize Stripe with the secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

if (!stripeSecretKey) {
  console.error("STRIPE_SECRET_KEY environment variable is not set")
}

// Initialize Stripe only if we have a key
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" }) : null

// In-memory store for processed event IDs
// NOTE: In production, this should be replaced with a database solution
const processedEvents = new Set<string>()

// In-memory store for failed events that need retry
// In production, this should be in a persistent store like a database
interface FailedEvent {
  id: string
  type: string
  data: any
  failCount: number
  lastAttempt: Date
  error: string
}

const failedEvents = new Map<string, FailedEvent>()

// Maximum number of events to keep in memory to prevent unbounded growth
const MAX_EVENTS = 1000
const MAX_FAILED_EVENTS = 100
const MAX_RETRY_ATTEMPTS = 3

// Error categorization
enum ErrorType {
  TRANSIENT = "transient", // Temporary errors that can be retried (network issues, rate limits)
  PERMANENT = "permanent", // Permanent errors that shouldn't be retried (invalid data, authentication)
  UNKNOWN = "unknown", // Errors we can't categorize
}

// Function to categorize errors
function categorizeError(error: any): ErrorType {
  if (!error) return ErrorType.UNKNOWN

  const errorMessage = error instanceof Error ? error.message : String(error)

  // Network and service availability errors (can be retried)
  if (
    errorMessage.includes("ECONNREFUSED") ||
    errorMessage.includes("ETIMEDOUT") ||
    errorMessage.includes("EAI_AGAIN") ||
    errorMessage.includes("socket hang up") ||
    errorMessage.includes("network") ||
    errorMessage.includes("429") ||
    errorMessage.includes("rate limit") ||
    errorMessage.includes("timeout")
  ) {
    return ErrorType.TRANSIENT
  }

  // Authentication and validation errors (shouldn't be retried)
  if (
    errorMessage.includes("authentication") ||
    errorMessage.includes("invalid") ||
    errorMessage.includes("not found") ||
    errorMessage.includes("already exists") ||
    errorMessage.includes("permission") ||
    errorMessage.includes("unauthorized")
  ) {
    return ErrorType.PERMANENT
  }

  return ErrorType.UNKNOWN
}

// Function to add an event ID to the processed set with size limit enforcement
function markEventAsProcessed(eventId: string) {
  // If we've reached the maximum size, remove the oldest events
  if (processedEvents.size >= MAX_EVENTS) {
    // Convert to array to get the first few items
    const eventsArray = Array.from(processedEvents)
    // Remove the oldest 10% of events
    const eventsToRemove = Math.ceil(MAX_EVENTS * 0.1)
    for (let i = 0; i < eventsToRemove; i++) {
      processedEvents.delete(eventsArray[i])
    }
  }

  // Add the new event ID
  processedEvents.add(eventId)
}

// Function to check if an event has already been processed
function hasEventBeenProcessed(eventId: string): boolean {
  return processedEvents.has(eventId)
}

// Function to record a failed event for later retry
function recordFailedEvent(event: Stripe.Event, error: any): void {
  // Clean up if we've reached the maximum size
  if (failedEvents.size >= MAX_FAILED_EVENTS) {
    // Find the oldest event to remove
    let oldestEventId: string | null = null
    let oldestDate = new Date()

    failedEvents.forEach((failedEvent, id) => {
      if (failedEvent.lastAttempt < oldestDate) {
        oldestDate = failedEvent.lastAttempt
        oldestEventId = id
      }
    })

    if (oldestEventId) {
      failedEvents.delete(oldestEventId)
    }
  }

  // Check if this event is already in the failed events map
  const existingFailedEvent = failedEvents.get(event.id)
  const errorMessage = error instanceof Error ? error.message : String(error)

  if (existingFailedEvent) {
    // Update the existing record
    existingFailedEvent.failCount += 1
    existingFailedEvent.lastAttempt = new Date()
    existingFailedEvent.error = errorMessage
    failedEvents.set(event.id, existingFailedEvent)
  } else {
    // Create a new record
    failedEvents.set(event.id, {
      id: event.id,
      type: event.type,
      data: event.data.object,
      failCount: 1,
      lastAttempt: new Date(),
      error: errorMessage,
    })
  }

  // Log the failure for monitoring
  console.error(
    `📝 Recorded failed event ${event.id} for retry. Attempt: ${
      existingFailedEvent ? existingFailedEvent.failCount + 1 : 1
    }. Error: ${errorMessage}`,
  )
}

// Function to determine if an event should be retried
function shouldRetryEvent(eventId: string): boolean {
  const failedEvent = failedEvents.get(eventId)
  if (!failedEvent) return false

  // Don't retry if we've exceeded the maximum attempts
  if (failedEvent.failCount >= MAX_RETRY_ATTEMPTS) {
    console.log(`❌ Event ${eventId} has exceeded maximum retry attempts (${MAX_RETRY_ATTEMPTS})`)
    return false
  }

  // Calculate backoff time based on fail count (exponential backoff)
  const backoffMinutes = Math.pow(2, failedEvent.failCount - 1)
  const nextRetryTime = new Date(failedEvent.lastAttempt.getTime() + backoffMinutes * 60 * 1000)

  // Only retry if we've passed the backoff period
  return new Date() >= nextRetryTime
}

// Function to process a specific event type with error handling and recovery
async function processEventWithRecovery(event: Stripe.Event, handler: (data: any) => Promise<void>): Promise<void> {
  try {
    await handler(event.data.object)

    // If we get here, processing succeeded
    // Remove from failed events if it was there
    failedEvents.delete(event.id)
  } catch (error) {
    // Categorize the error
    const errorType = categorizeError(error)
    const errorMessage = error instanceof Error ? error.message : String(error)

    console.error(`❌ Error processing event ${event.id}: ${errorMessage}`)
    console.error(`Error type: ${errorType}`)

    // For transient errors, record for retry
    if (errorType === ErrorType.TRANSIENT) {
      recordFailedEvent(event, error)
      throw error // Re-throw to prevent marking as processed
    }

    // For permanent errors, log but don't retry
    if (errorType === ErrorType.PERMANENT) {
      console.error(`⛔ Permanent error for event ${event.id}. Will not retry.`)
      // You could send an alert here for manual intervention
    }

    // For unknown errors, record for retry but with caution
    if (errorType === ErrorType.UNKNOWN) {
      recordFailedEvent(event, error)
      throw error // Re-throw to prevent marking as processed
    }
  }
}

// Endpoint to manually retry a failed event (for admin use)
export async function GET(req: NextRequest) {
  // This would typically be protected by authentication
  const url = new URL(req.url)
  const eventId = url.searchParams.get("retry")

  if (!eventId) {
    // If no specific event, return stats about failed events
    return NextResponse.json({
      failedEvents: Array.from(failedEvents.entries()).map(([id, event]) => ({
        id,
        type: event.type,
        failCount: event.failCount,
        lastAttempt: event.lastAttempt,
        error: event.error,
      })),
    })
  }

  // Check if the event exists in our failed events
  const failedEvent = failedEvents.get(eventId)
  if (!failedEvent) {
    return NextResponse.json({ error: `Event ${eventId} not found in failed events` }, { status: 404 })
  }

  // Attempt to retry the event
  try {
    console.log(`🔄 Manually retrying event ${eventId}`)

    // Reconstruct an event-like object
    const eventLike = {
      id: failedEvent.id,
      type: failedEvent.type,
      data: {
        object: failedEvent.data,
      },
    }

    // Process the event
    await handleEvent(eventLike as Stripe.Event)

    // If successful, remove from failed events
    failedEvents.delete(eventId)

    return NextResponse.json({ success: true, message: `Successfully retried event ${eventId}` })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      {
        error: `Failed to retry event ${eventId}`,
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}

// Main webhook handler
export async function POST(req: NextRequest) {
  // Check if Stripe is properly initialized
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not properly configured. Please contact the administrator." },
      { status: 500 },
    )
  }

  const body = await req.text()
  const headersList = headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    console.error(`Webhook signature verification failed: ${errorMessage}`)
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 })
  }

  // Implement idempotency check
  if (hasEventBeenProcessed(event.id)) {
    console.log(`Event ${event.id} has already been processed. Skipping.`)
    // Return 200 OK to acknowledge receipt (don't treat as an error)
    return NextResponse.json({ received: true, status: "already_processed" })
  }

  // Check if this is a retry of a failed event
  const isRetry = failedEvents.has(event.id)
  if (isRetry) {
    // Check if we should retry now based on backoff
    if (!shouldRetryEvent(event.id)) {
      // Not time to retry yet, but acknowledge receipt
      return NextResponse.json({
        received: true,
        status: "retry_scheduled",
        message: "Event received, but retry is scheduled for later",
      })
    }
    console.log(`🔄 Retrying previously failed event: ${event.id}`)
  }

  try {
    // Process the event with our recovery mechanisms
    await handleEvent(event)

    // Mark the event as processed after successful handling
    markEventAsProcessed(event.id)

    console.log(`✅ Successfully processed event: ${event.id}`)
    return NextResponse.json({ received: true, status: "processed" })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error(`Error handling webhook event ${event.id}: ${errorMessage}`)

    // Don't mark as processed if there was an error, so Stripe can retry
    return NextResponse.json(
      { error: "An error occurred while processing the webhook", details: errorMessage },
      { status: 500 },
    )
  }
}

// Centralized event handling function
async function handleEvent(event: Stripe.Event): Promise<void> {
  console.log(`🔔 Processing event: ${event.id} of type ${event.type}`)

  switch (event.type) {
    case "payment_intent.succeeded":
      await processEventWithRecovery(event, handlePaymentIntentSucceeded)
      break
    case "payment_intent.payment_failed":
      await processEventWithRecovery(event, handlePaymentIntentFailed)
      break
    case "charge.succeeded":
      await processEventWithRecovery(event, handleChargeSucceeded)
      break
    case "charge.failed":
      await processEventWithRecovery(event, handleChargeFailed)
      break
    case "charge.dispute.created":
      await processEventWithRecovery(event, handleDisputeCreated)
      break
    case "customer.subscription.created":
      await processEventWithRecovery(event, handleSubscriptionCreated)
      break
    case "customer.subscription.updated":
      await processEventWithRecovery(event, handleSubscriptionUpdated)
      break
    case "customer.subscription.deleted":
      await processEventWithRecovery(event, handleSubscriptionDeleted)
      break
    case "invoice.payment_succeeded":
      await processEventWithRecovery(event, handleInvoicePaymentSucceeded)
      break
    case "invoice.payment_failed":
      await processEventWithRecovery(event, handleInvoicePaymentFailed)
      break
    case "checkout.session.completed":
      await processEventWithRecovery(event, handleCheckoutSessionCompleted)
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }
}

// Handler functions for different event types

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent succeeded: ${paymentIntent.id}`)

  // Get customer details
  if (paymentIntent.customer) {
    const customer = await stripe!.customers.retrieve(paymentIntent.customer as string)

    // Send receipt email if we have customer email
    if (typeof customer !== "string" && customer.email) {
      await sendDonationReceiptEmail({
        email: customer.email,
        name: customer.name || "Valued Donor",
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        donationType: paymentIntent.metadata.donationType || "General Support",
        date: new Date().toISOString(),
        isRecurring: false,
        paymentId: paymentIntent.id,
      })
    }
  }

  // Here you would typically:
  // 1. Update your database with the payment information
  // 2. Fulfill any orders associated with the payment
  // 3. Log the successful payment for your records
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent failed: ${paymentIntent.id}`)
  console.log(`Failure reason: ${paymentIntent.last_payment_error?.message}`)

  // Here you would typically:
  // 1. Log the failure
  // 2. Notify the customer if appropriate
  // 3. Take any necessary actions based on the failure reason
}

async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log(`Charge succeeded: ${charge.id}`)

  // Additional processing for successful charges
  // This event is often redundant with payment_intent.succeeded
  // but can be useful for certain integrations
}

async function handleChargeFailed(charge: Stripe.Charge) {
  console.log(`Charge failed: ${charge.id}`)
  console.log(`Failure reason: ${charge.failure_message}`)

  // Handle failed charges (similar to failed payment intents)
}

async function handleDisputeCreated(dispute: Stripe.Dispute) {
  console.log(`Dispute created: ${dispute.id}`)
  console.log(`Dispute reason: ${dispute.reason}`)

  // Here you would typically:
  // 1. Log the dispute
  // 2. Notify administrators
  // 3. Begin gathering evidence for dispute response

  // Send alert email to administrators
  // await sendDisputeAlertEmail({
  //   amount: dispute.amount / 100,
  //   reason: dispute.reason,
  //   chargeId: dispute.charge as string,
  //   created: new Date(dispute.created * 1000).toISOString()
  // })
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`Subscription created: ${subscription.id}`)

  // Here you would typically:
  // 1. Update your database with the new subscription
  // 2. Send a welcome email to the subscriber
  // 3. Set up any necessary resources for the subscriber

  // Get customer details
  if (subscription.customer) {
    const customer = await stripe!.customers.retrieve(subscription.customer as string)

    // Send confirmation email
    if (typeof customer !== "string" && customer.email) {
      const firstItem = subscription.items.data[0]
      if (firstItem && firstItem.price) {
        await sendDonationReceiptEmail({
          email: customer.email,
          name: customer.name || "Valued Donor",
          amount: firstItem.price.unit_amount ? firstItem.price.unit_amount / 100 : 0,
          currency: subscription.currency || "usd",
          donationType: customer.metadata.donationType || "General Support",
          date: new Date().toISOString(),
          isRecurring: true,
          paymentId: subscription.id,
        })
      }
    }
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`Subscription updated: ${subscription.id}`)
  console.log(`New status: ${subscription.status}`)

  // Here you would typically:
  // 1. Update your database with the new subscription status
  // 2. Take any necessary actions based on the new status
  // 3. Notify the customer of any important changes
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`Subscription deleted: ${subscription.id}`)

  // Here you would typically:
  // 1. Update your database to mark the subscription as canceled
  // 2. Send a cancellation confirmation to the customer
  // 3. Clean up any resources associated with the subscription

  // Get customer details
  if (subscription.customer) {
    const customer = await stripe!.customers.retrieve(subscription.customer as string)

    // Send cancellation email
    if (typeof customer !== "string" && customer.email) {
      // await sendSubscriptionCancellationEmail({
      //   email: customer.email,
      //   name: customer.name || 'Valued Donor',
      //   subscriptionId: subscription.id
      // })
    }
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`Invoice payment succeeded: ${invoice.id}`)

  // Here you would typically:
  // 1. Update your database with the payment information
  // 2. Send a receipt to the customer
  // 3. Process any necessary fulfillment

  // For subscription invoices, this is how you'd handle recurring payments
  if (invoice.subscription && invoice.customer) {
    const customer = await stripe!.customers.retrieve(invoice.customer as string)

    if (typeof customer !== "string" && customer.email) {
      await sendDonationReceiptEmail({
        email: customer.email,
        name: customer.name || "Valued Donor",
        amount: invoice.amount_paid / 100,
        currency: invoice.currency || "usd",
        donationType: customer.metadata.donationType || "General Support",
        date: new Date().toISOString(),
        isRecurring: true,
        paymentId: invoice.id,
      })
    }
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`Invoice payment failed: ${invoice.id}`)

  // Here you would typically:
  // 1. Log the failure
  // 2. Notify the customer
  // 3. Take any necessary actions based on your retry policy

  if (invoice.customer) {
    const customer = await stripe!.customers.retrieve(invoice.customer as string)

    if (typeof customer !== "string" && customer.email) {
      // await sendPaymentFailureEmail({
      //   email: customer.email,
      //   name: customer.name || 'Valued Donor',
      //   amount: invoice.amount_due / 100,
      //   currency: invoice.currency || 'usd',
      //   invoiceId: invoice.id
      // })
    }
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`Checkout session completed: ${session.id}`)

  // Get customer details
  if (session.customer) {
    const customer = await stripe!.customers.retrieve(session.customer as string)

    // Get payment details
    let amount = 0
    let currency = "usd"
    const isRecurring = session.mode === "subscription"
    let paymentId = session.id

    // For one-time payments
    if (session.amount_total) {
      amount = session.amount_total / 100
      currency = session.currency || "usd"
    }
    // For subscriptions, get the subscription details
    else if (session.subscription && isRecurring) {
      const subscription = await stripe!.subscriptions.retrieve(session.subscription as string)
      const firstItem = subscription.items.data[0]
      if (firstItem && firstItem.price) {
        amount = firstItem.price.unit_amount ? firstItem.price.unit_amount / 100 : 0
        currency = subscription.currency || "usd"
        paymentId = subscription.id
      }
    }

    // Send receipt email if we have customer email
    if (typeof customer !== "string" && customer.email) {
      await sendDonationReceiptEmail({
        email: customer.email,
        name: customer.name || "Valued Donor",
        amount: amount,
        currency: currency,
        donationType: session.metadata?.donationType || "General Support",
        date: new Date().toISOString(),
        isRecurring: isRecurring,
        paymentId: paymentId,
      })
    }
  }

  // Here you would typically:
  // 1. Update your database with the donation information
  // 2. Send notifications to administrators
  // 3. Update any donation statistics or counters
}
