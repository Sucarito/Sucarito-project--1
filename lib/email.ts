import nodemailer from "nodemailer"

// Configure nodemailer with environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Interface for donation receipt email data
interface DonationReceiptEmailData {
  email: string
  name: string
  amount: number
  currency: string
  donationType: string
  date: string
  isRecurring: boolean
  paymentId: string
}

// Function to send donation receipt emails
export async function sendDonationReceiptEmail(data: DonationReceiptEmailData) {
  const { email, name, amount, currency, donationType, date, isRecurring, paymentId } = data

  // Format currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  })

  const formattedAmount = formatter.format(amount)
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create email content
  const subject = `Thank You for Your ${isRecurring ? "Recurring " : ""}Donation to Burmese Vihar`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #4f46e5;">Thank You for Your Donation</h1>
        <p style="font-size: 18px; color: #4b5563;">Your generosity makes our work possible.</p>
      </div>
      
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <p style="margin: 5px 0;">Dear ${name},</p>
        <p style="margin: 15px 0;">Thank you for your ${isRecurring ? "recurring " : ""}donation of <strong>${formattedAmount}</strong> to support ${donationType} at Burmese Vihar. Your contribution helps us continue our mission of spreading Buddhist teachings and supporting our community.</p>
      </div>
      
      <div style="border: 1px solid #e0e0e0; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
        <h2 style="color: #4f46e5; font-size: 18px; margin-top: 0;">Donation Receipt</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Amount:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${formattedAmount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Purpose:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${donationType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Type:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${isRecurring ? "Recurring (Monthly)" : "One-time"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Receipt ID:</strong></td>
            <td style="padding: 8px 0; text-align: right;">${paymentId}</td>
          </tr>
        </table>
      </div>
      
      <div style="margin-bottom: 20px;">
        <p>This donation ${isRecurring ? "will be charged monthly and " : ""}may be tax-deductible. Please keep this receipt for your records.</p>
        ${isRecurring ? `<p>You can manage your recurring donation by contacting us at <a href="mailto:${process.env.EMAIL_FROM}" style="color: #4f46e5;">${process.env.EMAIL_FROM}</a>.</p>` : ""}
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #6b7280; font-size: 14px;">Burmese Vihar Buddhist Temple</p>
        <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">123 Temple Street, Yangon, Myanmar</p>
        <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
          <a href="https://burmesevihar.org" style="color: #4f46e5; text-decoration: none;">burmesevihar.org</a> | 
          <a href="mailto:${process.env.EMAIL_FROM}" style="color: #4f46e5; text-decoration: none;">${process.env.EMAIL_FROM}</a>
        </p>
      </div>
    </div>
  `

  // Send the email
  try {
    const info = await transporter.sendMail({
      from: `"Burmese Vihar Temple" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject,
      html,
    })

    console.log(`Donation receipt email sent to ${email}: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending donation receipt email:", error)
    return { success: false, error }
  }
}

// Function to send notification emails to administrators
export async function sendDonationNotificationEmail(data: DonationReceiptEmailData) {
  const { name, amount, currency, donationType, date, isRecurring, paymentId } = data

  // Format currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  })

  const formattedAmount = formatter.format(amount)
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create email content
  const subject = `New ${isRecurring ? "Recurring " : ""}Donation Received`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h1 style="color: #4f46e5;">New Donation Received</h1>
      
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <p>A new ${isRecurring ? "recurring " : ""}donation has been received.</p>
      </div>
      
      <div style="border: 1px solid #e0e0e0; border-radius: 5px; padding: 15px;">
        <h2 style="color: #4f46e5; font-size: 18px; margin-top: 0;">Donation Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Donor:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Amount:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${formattedAmount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Purpose:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${donationType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Type:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">${isRecurring ? "Recurring (Monthly)" : "One-time"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Payment ID:</strong></td>
            <td style="padding: 8px 0; text-align: right;">${paymentId}</td>
          </tr>
        </table>
      </div>
      
      <div style="margin-top: 20px; text-align: center;">
        <p>You can view all donations in the <a href="https://dashboard.stripe.com/payments" style="color: #4f46e5;">Stripe Dashboard</a>.</p>
      </div>
    </div>
  `

  // Send the email
  try {
    const info = await transporter.sendMail({
      from: `"Burmese Vihar Temple" <${process.env.EMAIL_FROM}>`,
      to: process.env.DONATION_NOTIFICATION_EMAIL,
      subject,
      html,
    })

    console.log(`Donation notification email sent: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending donation notification email:", error)
    return { success: false, error }
  }
}
