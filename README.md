# Burmese Vihar Website

This is the official website for Burmese Vihar Bodhgaya, a historic Buddhist monastery established in 1936, offering meditation facilities, study resources, and pilgrimage support.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/YOUR-USERNAME/v0-burmese-vihar-website.git
cd v0-burmese-vihar-website
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables
Create a `.env.local` file in the root directory and add the following variables:
\`\`\`
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
EMAIL_FROM=your_email_address
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_SECURE=true_or_false
DONATION_NOTIFICATION_EMAIL=notification_email_address
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy

### Setting up Stripe Webhooks

Follow the instructions in the [WEBHOOK-SETUP.md](./WEBHOOK-SETUP.md) file to set up Stripe webhooks for handling donation payments.

## Features

- Responsive design
- Donation system with Stripe integration
- Contact form with email notifications
- Event calendar
- Photo gallery
- Buddhist teachings section
- Visitor information

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Stripe for payments
- Nodemailer for emails

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

Let's also create a GitHub workflow file for continuous integration:
