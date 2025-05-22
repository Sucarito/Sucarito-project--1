import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Check if the Stripe secret key is available
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

// Initialize Stripe with proper error handling
let stripe: Stripe | null = null

if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2023-10-16",
  })
} else {
  console.error("STRIPE_SECRET_KEY is not defined in environment variables")
}

export async function GET(req: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  // Check if Stripe is properly initialized
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not initialized. Check your environment variables." }, { status: 500 })
  }

  try {
    // Create a test payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // $10.00
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        donationType: "general",
        isMonthly: "false",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Test payment intent created",
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Error creating test payment intent:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
