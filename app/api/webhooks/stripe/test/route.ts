import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// This endpoint is for testing webhooks locally
// It should be disabled in production

export async function GET(req: NextRequest) {
  // Check if we're in development mode
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  })

  try {
    // Create a test PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // $20.00
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        donationType: "temple_maintenance",
        isMonthly: "false",
      },
    })

    // Create a test webhook event
    const event = {
      id: `evt_test_${Date.now()}`,
      object: "event",
      api_version: "2023-10-16",
      created: Math.floor(Date.now() / 1000),
      data: {
        object: paymentIntent,
      },
      livemode: false,
      pending_webhooks: 1,
      request: {
        id: null,
        idempotency_key: null,
      },
      type: "payment_intent.succeeded",
    }

    // Make a request to our webhook endpoint
    const response = await fetch(`${req.nextUrl.origin}/api/webhooks/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Note: In a real webhook, Stripe would sign this
        // This is just for testing the logic
        "stripe-signature": "test_signature",
      },
      body: JSON.stringify(event),
    })

    const responseData = await response.json()

    return NextResponse.json({
      success: true,
      testPaymentIntentId: paymentIntent.id,
      webhookResponse: responseData,
    })
  } catch (error) {
    console.error("Error in test webhook:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
