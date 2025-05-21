import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16", // Use the latest API version
})

// Test endpoint to create a payment intent and simulate a webhook event
export async function GET(req: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  try {
    // Create a test payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // $10.00
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        purpose: "Temple Maintenance",
        isMonthly: "false",
        name: "Test Donor",
        email: "test@example.com",
      },
    })

    // Return the payment intent details
    return NextResponse.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      },
      message: "Test payment intent created. Use the webhook endpoint to simulate events.",
    })
  } catch (error: any) {
    console.error(`Test webhook error: ${error.message}`)
    return NextResponse.json({ error: `Test webhook error: ${error.message}` }, { status: 500 })
  }
}

// Test endpoint to simulate a webhook event
export async function POST(req: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  try {
    const { eventType, objectId } = await req.json()

    if (!eventType || !objectId) {
      return NextResponse.json({ error: "Missing eventType or objectId" }, { status: 400 })
    }

    // Simulate different event types
    let eventData: any

    switch (eventType) {
      case "payment_intent.succeeded":
        const paymentIntent = await stripe.paymentIntents.retrieve(objectId)
        eventData = {
          id: "evt_test_webhook_payment_intent_succeeded",
          object: "event",
          type: "payment_intent.succeeded",
          data: {
            object: paymentIntent,
          },
        }
        break

      case "payment_intent.payment_failed":
        const failedPaymentIntent = await stripe.paymentIntents.retrieve(objectId)
        eventData = {
          id: "evt_test_webhook_payment_intent_failed",
          object: "event",
          type: "payment_intent.payment_failed",
          data: {
            object: failedPaymentIntent,
          },
        }
        break

      default:
        return NextResponse.json({ error: `Unsupported event type: ${eventType}` }, { status: 400 })
    }

    // Make a request to the webhook endpoint
    const webhookUrl = new URL("/api/webhooks/stripe", req.url)
    const response = await fetch(webhookUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "test_signature", // This will be rejected by the real handler
      },
      body: JSON.stringify(eventData),
    })

    const responseData = await response.json()

    return NextResponse.json({
      success: true,
      webhookResponse: responseData,
      message: "Test webhook event sent. Note that signature verification will fail in the real handler.",
    })
  } catch (error: any) {
    console.error(`Test webhook error: ${error.message}`)
    return NextResponse.json({ error: `Test webhook error: ${error.message}` }, { status: 500 })
  }
}
