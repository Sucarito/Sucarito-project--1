import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { formatCurrency } from "@/lib/utils"
import { selectEmailTemplate, emailTemplates } from "@/lib/email-templates"

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "user@example.com",
    pass: process.env.SMTP_PASSWORD || "password",
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, amount, transactionId, date, paymentMethod, isMonthly, dedication, eventName, eventDate } =
      body

    if (!email || !amount || !transactionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Format the date
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Format the amount
    const formattedAmount = formatCurrency(amount)

    // Select the appropriate email template
    const template = selectEmailTemplate({ isMonthly, dedication, eventName })

    // Generate the HTML content
    const htmlContent = template.getHtml({
      name,
      amount: formattedAmount,
      date: formattedDate,
      transactionId,
      paymentMethod,
      dedication,
      eventName,
      eventDate,
    })

    // Add tracking pixel for analytics
    const trackingPixel = `<img src="https://burmesevihar.org/api/track-email?id=${transactionId}" width="1" height="1" alt="" style="display:none;" />`
    const htmlWithTracking = htmlContent.replace("</body>", `${trackingPixel}</body>`)

    // Send email
    const info = await transporter.sendMail({
      from: `"Burmese Vihar-Bodhgaya" <${process.env.EMAIL_FROM || "donations@burmesevihar.org"}>`,
      to: email,
      subject: template.subject,
      html: htmlWithTracking,
      // Add BCC for temple records
      bcc: process.env.DONATION_NOTIFICATION_EMAIL || "records@burmesevihar.org",
    })

    // Log email sending for analytics
    await fetch("/api/log-email-sent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionId,
        emailId: info.messageId,
        template:
          template === emailTemplates.donation_receipt
            ? "donation_receipt"
            : template === emailTemplates.monthly_donation_receipt
              ? "monthly_donation_receipt"
              : template === emailTemplates.special_event_donation
                ? "special_event_donation"
                : "memorial_donation",
        sentAt: new Date().toISOString(),
      }),
    })

    console.log("Email sent:", info.messageId)

    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email receipt" }, { status: 500 })
  }
}
