"use server"

import { z } from "zod"
import Stripe from "stripe"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

// Define validation schema for donation data
const donationSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  currency: z.string().default("usd"),
  donationType: z.string(),
  isMonthly: z.boolean().default(false),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().optional(),
  message: z.string().optional(),
})

export type DonationData = z.infer<typeof donationSchema>

export async function createPaymentIntent(data: DonationData) {
  try {
    // Validate the donation data
    const validatedData = donationSchema.parse(data)

    // Convert amount to cents (Stripe requires amounts in cents)
    const amountInCents = Math.round(validatedData.amount * 100)

    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      name: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      metadata: {
        donationType: validatedData.donationType,
        isMonthly: validatedData.isMonthly ? "true" : "false",
        message: validatedData.message || "",
      },
    })

    // For monthly donations, create a subscription
    if (validatedData.isMonthly) {
      // First create a product for this donation type if it doesn't exist
      const productName =
        validatedData.donationType === "general"
          ? "General Temple Support"
          : `${validatedData.donationType.charAt(0).toUpperCase() + validatedData.donationType.slice(1)} Support`

      // Check if product exists or create it
      const products = await stripe.products.list({
        active: true,
      })

      let product = products.data.find((p) => p.name === productName)

      if (!product) {
        product = await stripe.products.create({
          name: productName,
          description: `Monthly donation for ${productName}`,
        })
      }

      // Create or get price for this product
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      })

      let price = prices.data.find((p) => p.unit_amount === amountInCents && p.currency === validatedData.currency)

      if (!price) {
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: amountInCents,
          currency: validatedData.currency,
          recurring: { interval: "month" },
        })
      }

      // Create the subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      })

      // @ts-ignore - Stripe types are not perfect
      const clientSecret = subscription.latest_invoice.payment_intent.client_secret

      return {
        success: true,
        clientSecret,
        subscriptionId: subscription.id,
        customerId: customer.id,
      }
    }
    // For one-time donations, create a payment intent
    else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: validatedData.currency,
        customer: customer.id,
        metadata: {
          donationType: validatedData.donationType,
          isMonthly: "false",
        },
        receipt_email: validatedData.email,
        description: `Donation for ${
          validatedData.donationType === "general" ? "General Temple Support" : validatedData.donationType
        }`,
      })

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId: customer.id,
      }
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function verifyPaymentStatus(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return {
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100, // Convert back to dollars
      currency: paymentIntent.currency,
    }
  } catch (error) {
    console.error("Error verifying payment status:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function verifySubscriptionStatus(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    return {
      success: true,
      status: subscription.status,
      amount: subscription.items.data[0].price.unit_amount! / 100, // Convert back to dollars
      currency: subscription.currency,
    }
  } catch (error) {
    console.error("Error verifying subscription status:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
