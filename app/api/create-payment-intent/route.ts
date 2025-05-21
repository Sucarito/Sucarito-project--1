import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with the SECRET key (not the public key)
// This is server-side code, so we use the secret key here
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency } = body

    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      // Verify your integration by passing this parameter
      metadata: { integration_check: "burmese_vihar_donation" },
    })

    // Return the client secret to the client
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 })
  }
}
