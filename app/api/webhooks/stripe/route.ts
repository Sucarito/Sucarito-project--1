import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16", // Use the latest API version
})

// Webhook endpoint for Stripe events
export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = headers().get("stripe-signature") || ""

    // Verify the webhook signature
    let event: Stripe.Event

    try {
      if (!process.env.STRIPE_WEBHOOK_SECRET) {
        throw new Error("STRIPE_WEBHOOK_SECRET is not defined")
      }

      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 })
    }

    // Handle different event types
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case "charge.succeeded":
        await handleChargeSucceeded(event.data.object as Stripe.Charge)
        break

      case "charge.failed":
        await handleChargeFailed(event.data.object as Stripe.Charge)
        break

      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error(`Webhook error: ${error.message}`)
    return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 500 })
  }
}

// Handler functions for different event types

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent succeeded: ${paymentIntent.id}`)

  // Here you would typically:
  // 1. Update your database with the payment information
  // 2. Send a confirmation email to the customer
  // 3. Fulfill the order or service

  // Example: Log the payment details
  console.log({
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    customer: paymentIntent.customer,
    metadata: paymentIntent.metadata,
    status: paymentIntent.status,
  })
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent failed: ${paymentIntent.id}`)

  // Here you would typically:
  // 1. Update your database with the failed payment
  // 2. Notify the customer about the failed payment
  // 3. Possibly retry the payment or suggest alternative payment methods

  // Example: Log the failure details
  console.log({
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    customer: paymentIntent.customer,
    lastPaymentError: paymentIntent.last_payment_error,
  })
}

async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log(`Charge succeeded: ${charge.id}`)

  // Example: Log the charge details
  console.log({
    id: charge.id,
    amount: charge.amount,
    currency: charge.currency,
    customer: charge.customer,
    paymentIntentId: charge.payment_intent,
    status: charge.status,
  })
}

async function handleChargeFailed(charge: Stripe.Charge) {
  console.log(`Charge failed: ${charge.id}`)

  // Example: Log the failure details
  console.log({
    id: charge.id,
    amount: charge.amount,
    currency: charge.currency,
    customer: charge.customer,
    paymentIntentId: charge.payment_intent,
    failureCode: charge.failure_code,
    failureMessage: charge.failure_message,
  })
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`Subscription created: ${subscription.id}`)

  // Example: Log the subscription details
  console.log({
    id: subscription.id,
    customer: subscription.customer,
    status: subscription.status,
    currentPeriodStart: subscription.current_period_start,
    currentPeriodEnd: subscription.current_period_end,
    items: subscription.items.data,
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`Subscription updated: ${subscription.id}`)

  // Example: Log the updated subscription details
  console.log({
    id: subscription.id,
    customer: subscription.customer,
    status: subscription.status,
    currentPeriodStart: subscription.current_period_start,
    currentPeriodEnd: subscription.current_period_end,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`Subscription deleted: ${subscription.id}`)

  // Example: Log the deleted subscription details
  console.log({
    id: subscription.id,
    customer: subscription.customer,
    status: subscription.status,
    canceledAt: subscription.canceled_at,
  })
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`Invoice payment succeeded: ${invoice.id}`)

  // Example: Log the invoice details
  console.log({
    id: invoice.id,
    customer: invoice.customer,
    subscription: invoice.subscription,
    amount: invoice.amount_paid,
    currency: invoice.currency,
    status: invoice.status,
  })
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`Invoice payment failed: ${invoice.id}`)

  // Example: Log the failed invoice details
  console.log({
    id: invoice.id,
    customer: invoice.customer,
    subscription: invoice.subscription,
    amount: invoice.amount_due,
    currency: invoice.currency,
    status: invoice.status,
  })
}
