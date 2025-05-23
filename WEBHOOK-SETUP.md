# Stripe Webhook Setup Instructions

This document provides instructions for setting up Stripe webhooks to handle payment events for the Burmese Vihar donation system.

## Why Webhooks Are Important

Webhooks allow Stripe to notify your application when events happen in your account, such as:

- Successful payments
- Failed payments
- Disputed charges
- Subscription renewals
- Subscription cancellations

Without webhooks, your application would need to constantly poll Stripe's API to check for updates, which is inefficient and can lead to missed events.

## Setup Instructions

### 1. Create a Webhook Endpoint in Stripe Dashboard

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers > Webhooks
3. Click "Add endpoint"
4. Enter your webhook URL: `https://your-domain.com/api/webhooks/stripe`
5. Select the events you want to receive (recommended events):
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
   - `charge.failed`
   - `charge.dispute.created`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click "Add endpoint"

### 2. Get Your Webhook Signing Secret

After creating the webhook endpoint, Stripe will provide you with a signing secret. This is used to verify that webhook events are actually coming from Stripe.

1. In the webhook details page, click "Reveal" next to "Signing secret"
2. Copy the signing secret

### 3. Add the Webhook Secret to Your Environment Variables

Add the following to your environment variables:

\`\`\`
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
\`\`\`

### 4. Testing Webhooks

#### Local Development Testing

For local development, you can use the Stripe CLI to forward webhook events to your local server:

1. [Install the Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Run the following command:

\`\`\`
stripe listen --forward-to localhost:3000/api/webhooks/stripe
\`\`\`

3. The CLI will provide a webhook signing secret for testing. Add this to your local environment variables.

#### Production Testing

To test in production:

1. Make a test donation on your site
2. Check the Stripe Dashboard > Developers > Webhooks to see if the event was delivered successfully
3. Check your application logs for any errors

## Troubleshooting

If webhooks aren't working:

1. Check that the webhook URL is correct and publicly accessible
2. Verify that the webhook signing secret is correctly set in your environment variables
3. Check your application logs for any errors
4. In the Stripe Dashboard, look at the webhook details page to see if there are any delivery attempts that failed

## Additional Resources

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Testing Webhooks with the Stripe CLI](https://stripe.com/docs/webhooks/test)
- [Webhook Events Reference](https://stripe.com/docs/api/events/types)
