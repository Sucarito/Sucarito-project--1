# Google Analytics 4 Setup Guide

This guide will help you set up Google Analytics 4 (GA4) integration with your Burmese Vihar website to track donation conversions and marketing attribution.

## 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon)
3. Click "Create Property"
4. Choose "GA4" property type
5. Enter property details:
   - Property name: "Burmese Vihar Website"
   - Reporting time zone: Your local timezone
   - Currency: Indian Rupee (INR)
6. Complete the setup

## 2. Get Measurement ID

1. In your GA4 property, go to "Admin" > "Data Streams"
2. Click "Add stream" > "Web"
3. Enter your website URL
4. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

## 3. Environment Variables

Add these environment variables to your Vercel project:

\`\`\`bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your_api_secret_here
\`\`\`

To get the API Secret:
1. Go to Admin > Data Streams > [Your Stream]
2. Click "Measurement Protocol API secrets"
3. Click "Create"
4. Enter a nickname and click "Create"
5. Copy the secret value

## 4. Custom Dimensions Setup

Set up these custom dimensions in GA4:

1. Go to Admin > Custom definitions > Custom dimensions
2. Create the following dimensions:

| Dimension Name | Parameter Name | Scope | Description |
|---|---|---|---|
| Donation Type | donation_type | Event | Type of donation (Temple Maintenance, etc.) |
| Is Recurring | is_recurring | Event | Whether donation is recurring |
| First Touch Source | first_touch_source | User | First marketing source |
| First Touch Medium | first_touch_medium | User | First marketing medium |
| First Touch Campaign | first_touch_campaign | User | First marketing campaign |
| Touchpoint Count | touchpoint_count | Event | Number of touchpoints before conversion |
| Days to Conversion | days_to_conversion | Event | Days from first touch to conversion |

## 5. Enhanced Ecommerce Setup

1. Go to Admin > Ecommerce settings
2. Enable "Enhanced ecommerce reporting"
3. Enable "Enable ecommerce reporting"

## 6. Conversion Events

Set up these conversion events:

1. Go to Admin > Events
2. Mark these events as conversions:
   - `purchase` (automatically marked)
   - `donation_completed`
   - `subscription_created`

## 7. Audiences

Create these audiences for better segmentation:

### High-Value Donors
- Condition: Event > purchase > value > greater than 5000

### Recurring Donors
- Condition: Event parameter > is_recurring > equals > true

### First-Time Donors
- Condition: Event count > purchase > equals > 1

### Attribution-Based Audiences
- **Social Media Donors**: source contains "facebook" OR "instagram" OR "twitter"
- **Search Donors**: medium equals "organic" OR "cpc"
- **Email Donors**: medium equals "email"

## 8. Custom Reports

### Attribution Report
1. Go to Explore > Free form
2. Add dimensions:
   - First user source/medium
   - Session source/medium
   - First touch source
   - Last touch source
3. Add metrics:
   - Purchase revenue
   - Conversions
   - Users

### Donation Funnel Report
1. Go to Explore > Funnel exploration
2. Set up funnel steps:
   - Step 1: page_view (donation page)
   - Step 2: begin_checkout
   - Step 3: add_to_cart
   - Step 4: purchase

### Campaign Performance Report
1. Go to Explore > Free form
2. Add dimensions:
   - Campaign name
   - Source/Medium
   - First touch campaign
3. Add metrics:
   - Purchase revenue
   - Conversions
   - Cost per conversion (if cost data imported)

## 9. Google Tag Manager (Optional)

If you want to use GTM for advanced tracking:

1. Create a GTM container
2. Add this environment variable:
   \`\`\`bash
   NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX
   \`\`\`
3. Set up triggers and tags in GTM for custom events

## 10. Data Import (Advanced)

To import cost data for ROI calculation:

1. Go to Admin > Data import
2. Create new data set for "Cost data"
3. Upload CSV files with campaign costs
4. Map to GA4 dimensions

## 11. Verification

After setup, verify tracking is working:

1. Visit your donation page
2. Complete a test donation
3. Check GA4 Real-time reports
4. Verify events are firing:
   - page_view
   - begin_checkout
   - purchase
   - donation_completed

## 12. Custom Dashboard

Create a custom dashboard with:

- Total donation revenue
- Conversion rate by source
- Top performing campaigns
- Attribution comparison (first vs last touch)
- Donor lifetime value

## Troubleshooting

### Events not showing
- Check measurement ID is correct
- Verify environment variables are set
- Check browser console for errors
- Use GA4 DebugView for real-time debugging

### Attribution data missing
- Ensure UTM parameters are in URLs
- Check localStorage for attribution data
- Verify custom dimensions are set up correctly

### Server-side tracking issues
- Verify API secret is correct
- Check server logs for errors
- Ensure client ID is being passed correctly

## Best Practices

1. **UTM Consistency**: Use consistent naming for campaigns
2. **Regular Monitoring**: Check reports weekly
3. **Data Quality**: Validate tracking implementation regularly
4. **Privacy Compliance**: Ensure GDPR/privacy compliance
5. **Documentation**: Keep track of custom dimensions and events

This setup will provide comprehensive tracking of your donation funnel and marketing attribution, helping you optimize your fundraising efforts.
\`\`\`

Now let's update the donation form to use the enhanced tracking:

\`\`\`tsx file="app/donate/donation-form.tsx"
[v0-no-op-code-block-prefix]import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"

import { attributionService, trackAttribution } from "@/lib/attribution"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<string>("General Support")
  const [isMonthly, setIsMonthly] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    attributionService.trackFormStart()
  }, [])

  useEffect(() => {
    trackAttribution()
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (selectedAmount || customAmount || donationType !== "General Support") {
        attributionService.trackFormAbandonment()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [selectedAmount, customAmount, donationType])

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    attributionService.trackAmountSelection(amount, false)
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount("")
    if (value) {
      attributionService.trackAmountSelection(value, true)
    }
  }

  const handleDonationTypeChange = (type: string) => {
    setDonationType(type)
    attributionService.trackDonationTypeSelection(type)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const amount = parseFloat(selectedAmount || customAmount)

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount.")
      return
    }

    attributionService.trackCheckoutInitiation(amount, donationType, isMonthly)

    const stripe = await stripePromise

    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Stripe uses cents
        donationType,
        isMonthly,
      }),
    }).then((res) => res.json())

    if (stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      })

      if (result.error) {
        console.error(result.error.message)
      }
    } else {
      console.error("Stripe not initialized")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="donationType"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Donation Type:
        </label>
        <select
          id="donationType"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={donationType}
          onChange={(e) => handleDonationTypeChange(e.target.value)}
        >
          <option>General Support</option>
          <option>Education</option>
          <option>Healthcare</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Amount:
        </label>
        <div className="flex flex-wrap gap-2">
          {["10", "25", "50", "100"].map((amount) => (
            <button
              key={amount}
              type="button"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                selectedAmount === amount ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleAmountSelect(amount)}
              disabled={selectedAmount === amount}
            >
              ${amount}
            </button>
          ))}
          <div className="w-full sm:w-auto">
            <input
              type="number"
              placeholder="Custom Amount"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={isMonthly}
            onChange={() => setIsMonthly(!isMonthly)}
          />
          <span className="ml-2 text-gray-700 text-sm font-bold">
            Make this a monthly donation
          </span>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Donate Now
        </button>
      </div>
    </form>
  )
}

export default DonationForm
