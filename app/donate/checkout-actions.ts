"use server"

import { z } from "zod"
import Stripe from "stripe"

// Initialize Stripe with the secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
let stripe: Stripe | null = null
let stripeConfigured = false

try {
  if (stripeSecretKey) {
    stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" })
    stripeConfigured = true
  } else {
    console.error("STRIPE_SECRET_KEY environment variable is not set")
  }
} catch (error) {
  console.error("Failed to initialize Stripe:", error)
}

// Define validation schema for donation data
const donationSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  currency: z.string().default("usd"),
  donationType: z.string().default("general"),
  isMonthly: z.coerce.boolean().default(false),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
})

export type DonationFormData = z.infer<typeof donationSchema>

export async function createCheckoutSession(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    // Check if Stripe is properly initialized
    if (!stripeConfigured || !stripe) {
      return { error: "Stripe is not properly configured. Please contact the administrator." }
    }

    // Parse and validate the form data
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = donationSchema.parse({
      amount: rawData.amount,
      currency: rawData.currency || "usd",
      donationType: rawData.donationType || "general",
      isMonthly: rawData.isMonthly === "true",
      firstName: rawData.firstName,
      lastName: rawData.lastName,
      email: rawData.email,
      message: rawData.message,
    })

    // Convert amount to cents (Stripe requires amounts in cents)
    const amountInCents = Math.round(validatedData.amount * 100)

    // Create a customer in Stripe or use an existing one
    const customerEmail = validatedData.email
    const customerName = `${validatedData.firstName} ${validatedData.lastName}`

    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    })

    let customerId: string

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id
      // Update customer name if needed
      if (existingCustomers.data[0].name !== customerName) {
        await stripe.customers.update(customerId, {
          name: customerName,
        })
      }
    } else {
      // Create a new customer
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
        },
      })
      customerId = customer.id
    }

    // Format donation type for display
    const donationTypeFormatted =
      validatedData.donationType === "general"
        ? "General Temple Support"
        : validatedData.donationType.charAt(0).toUpperCase() + validatedData.donationType.slice(1)

    // Set up line items and payment details
    const lineItems = [
      {
        price_data: {
          currency: validatedData.currency,
          product_data: {
            name: `Donation - ${donationTypeFormatted}`,
            description: validatedData.isMonthly ? "Monthly donation" : "One-time donation",
          },
          unit_amount: amountInCents,
          recurring: validatedData.isMonthly ? { interval: "month" } : undefined,
        },
        quantity: 1,
      },
    ]

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: validatedData.isMonthly ? "subscription" : "payment",
      success_url: `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL || "http://localhost:3000"}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL || "http://localhost:3000"}/donate?canceled=true`,
      metadata: {
        donationType: validatedData.donationType,
        isMonthly: validatedData.isMonthly ? "true" : "false",
        message: validatedData.message || "",
      },
    })

    // Return the URL instead of redirecting
    return { url: session.url || undefined }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return { error: "Failed to create checkout session. Please try again later." }
  }
}
