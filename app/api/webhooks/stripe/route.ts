import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { sendDonationReceiptEmail } from "@/lib/email"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

// You'll need to add this to your environment variables
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(req: NextRequest) {
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

  // Handle the event
  try {
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
      case "charge.dispute.created":
        await handleDisputeCreated(event.data.object as Stripe.Dispute)
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

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(`Error handling webhook event: ${error}`)
    return NextResponse.json({ error: "An error occurred while processing the webhook" }, { status: 500 })
  }
}

// Handler functions for different event types

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent succeeded: ${paymentIntent.id}`)

  // Get customer details
  if (paymentIntent.customer) {
    const customer = await stripe.customers.retrieve(paymentIntent.customer as string)

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
    const customer = await stripe.customers.retrieve(subscription.customer as string)

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
    const customer = await stripe.customers.retrieve(subscription.customer as string)

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
    const customer = await stripe.customers.retrieve(invoice.customer as string)

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
    const customer = await stripe.customers.retrieve(invoice.customer as string)

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
