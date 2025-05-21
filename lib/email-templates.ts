export const emailTemplates = {
  // Standard donation receipt template
  donation_receipt: {
    subject: "Thank You for Your Donation to Burmese Vihar-Bodhgaya",
    getHtml: ({
      name,
      amount,
      date,
      transactionId,
      paymentMethod,
      dedication,
    }: {
      name: string
      amount: string
      date: string
      transactionId: string
      paymentMethod: string
      dedication?: string
    }) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Donation Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #b45309;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .detail-label {
            font-weight: bold;
            color: #666;
          }
          .detail-value {
            text-align: right;
          }
          .button {
            display: inline-block;
            background-color: #b45309;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .thank-you {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #b45309;
          }
          .impact {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #b45309;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Donation</h1>
            <p>Burmese Vihar-Bodhgaya</p>
          </div>
          <div class="content">
            <p class="thank-you">Dear ${name || "Generous Donor"},</p>
            <p>Thank you for your donation to Burmese Vihar-Bodhgaya. Your generosity helps us maintain our temple, support our monks, and continue our community programs.</p>
            
            <h2>Donation Receipt</h2>
            
            <div class="detail-row">
              <span class="detail-label">Donation Amount:</span>
              <span class="detail-value">${amount}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${date}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Transaction ID:</span>
              <span class="detail-value">${transactionId}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Payment Method:</span>
              <span class="detail-value">${paymentMethod}</span>
            </div>
            
            ${
              dedication
                ? `
            <div class="detail-row">
              <span class="detail-label">Dedication:</span>
              <span class="detail-value">${dedication}</span>
            </div>
            `
                : ""
            }
            
            <div class="impact">
              <h3>Your Impact</h3>
              <p>Your donation will help us:</p>
              <ul>
                <li>Preserve our historic temple buildings and sacred spaces</li>
                <li>Support our resident monks and their daily needs</li>
                <li>Provide meditation classes, cultural events, and educational programs</li>
                <li>Extend community outreach and charitable initiatives</li>
              </ul>
            </div>
            
            <p>This receipt is for your tax records. Burmese Vihar-Bodhgaya is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law.</p>
            
            <p>If you have any questions about your donation, please contact us at <a href="mailto:donations@burmesevihar.org">donations@burmesevihar.org</a>.</p>
            
            <div style="text-align: center;">
              <a href="https://burmesevihar.org" class="button">Visit Our Website</a>
            </div>
          </div>
          <div class="footer">
            <p>Burmese Vihar-Bodhgaya | Near Mahabodhi Temple, Bodhgaya, Gaya District, Bihar, India - 824231</p>
            <p>© ${new Date().getFullYear()} Burmese Vihar-Bodhgaya. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },

  // Monthly donation receipt template
  monthly_donation_receipt: {
    subject: "Thank You for Your Monthly Support to Burmese Vihar-Bodhgaya",
    getHtml: ({
      name,
      amount,
      date,
      transactionId,
      paymentMethod,
      dedication,
    }: {
      name: string
      amount: string
      date: string
      transactionId: string
      paymentMethod: string
      dedication?: string
    }) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Monthly Donation Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #b45309;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .detail-label {
            font-weight: bold;
            color: #666;
          }
          .detail-value {
            text-align: right;
          }
          .button {
            display: inline-block;
            background-color: #b45309;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .thank-you {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #b45309;
          }
          .impact {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #b45309;
          }
          .monthly-badge {
            background-color: #b45309;
            color: white;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 12px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Monthly Support</h1>
            <p>Burmese Vihar-Bodhgaya</p>
          </div>
          <div class="content">
            <div class="monthly-badge">MONTHLY SUPPORTER</div>
            <p class="thank-you">Dear ${name || "Generous Donor"},</p>
            <p>Thank you for your continued monthly support to Burmese Vihar-Bodhgaya. Your ongoing commitment helps us plan for the future and sustain our programs throughout the year.</p>
            
            <h2>Monthly Donation Receipt</h2>
            
            <div class="detail-row">
              <span class="detail-label">Monthly Amount:</span>
              <span class="detail-value">${amount}/month</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">This Payment Date:</span>
              <span class="detail-value">${date}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Transaction ID:</span>
              <span class="detail-value">${transactionId}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Payment Method:</span>
              <span class="detail-value">${paymentMethod}</span>
            </div>
            
            ${
              dedication
                ? `
            <div class="detail-row">
              <span class="detail-label">Dedication:</span>
              <span class="detail-value">${dedication}</span>
            </div>
            `
                : ""
            }
            
            <div class="impact">
              <h3>Your Monthly Impact</h3>
              <p>As a monthly supporter, your contributions provide reliable funding that allows us to:</p>
              <ul>
                <li>Plan long-term preservation projects for our historic temple</li>
                <li>Provide consistent support for our resident monks</li>
                <li>Develop and expand our meditation and educational programs</li>
                <li>Reach more people in our community with outreach initiatives</li>
              </ul>
            </div>
            
            <p>This receipt is for your tax records. Burmese Vihar-Bodhgaya is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law.</p>
            
            <p>If you need to update your monthly donation or have any questions, please contact us at <a href="mailto:donations@burmesevihar.org">donations@burmesevihar.org</a>.</p>
            
            <div style="text-align: center;">
              <a href="https://burmesevihar.org/donor-portal" class="button">Manage Your Donation</a>
            </div>
          </div>
          <div class="footer">
            <p>Burmese Vihar-Bodhgaya | Near Mahabodhi Temple, Bodhgaya, Gaya District, Bihar, India - 824231</p>
            <p>© ${new Date().getFullYear()} Burmese Vihar-Bodhgaya. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },

  // Special event donation template
  special_event_donation: {
    subject: "Thank You for Supporting Our Special Event",
    getHtml: ({
      name,
      amount,
      date,
      transactionId,
      paymentMethod,
      eventName,
      eventDate,
    }: {
      name: string
      amount: string
      date: string
      transactionId: string
      paymentMethod: string
      eventName: string
      eventDate: string
    }) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Donation Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #b45309;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .detail-label {
            font-weight: bold;
            color: #666;
          }
          .detail-value {
            text-align: right;
          }
          .button {
            display: inline-block;
            background-color: #b45309;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .thank-you {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #b45309;
          }
          .event-box {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #b45309;
          }
          .event-badge {
            background-color: #b45309;
            color: white;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 12px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Supporting Our Event</h1>
            <p>Burmese Vihar-Bodhgaya</p>
          </div>
          <div class="content">
            <div class="event-badge">EVENT SUPPORTER</div>
            <p class="thank-you">Dear ${name || "Generous Donor"},</p>
            <p>Thank you for your donation in support of our upcoming event. Your contribution helps make this special occasion possible.</p>
            
            <div class="event-box">
              <h3>${eventName}</h3>
              <p>Event Date: ${eventDate}</p>
              <p>Your support helps us create meaningful experiences for our community and visitors.</p>
            </div>
            
            <h2>Donation Receipt</h2>
            
            <div class="detail-row">
              <span class="detail-label">Donation Amount:</span>
              <span class="detail-value">${amount}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${date}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Transaction ID:</span>
              <span class="detail-value">${transactionId}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Payment Method:</span>
              <span class="detail-value">${paymentMethod}</span>
            </div>
            
            <p>This receipt is for your tax records. Burmese Vihar-Bodhgaya is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law.</p>
            
            <p>If you have any questions about the event or your donation, please contact us at <a href="mailto:events@burmesevihar.org">events@burmesevihar.org</a>.</p>
            
            <div style="text-align: center;">
              <a href="https://burmesevihar.org/events" class="button">View Event Details</a>
            </div>
          </div>
          <div class="footer">
            <p>Burmese Vihar-Bodhgaya | Near Mahabodhi Temple, Bodhgaya, Gaya District, Bihar, India - 824231</p>
            <p>© ${new Date().getFullYear()} Burmese Vihar-Bodhgaya. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },

  // Memorial donation template
  memorial_donation: {
    subject: "Thank You for Your Memorial Donation",
    getHtml: ({
      name,
      amount,
      date,
      transactionId,
      paymentMethod,
      dedication,
    }: {
      name: string
      amount: string
      date: string
      transactionId: string
      paymentMethod: string
      dedication: string
    }) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Memorial Donation Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #b45309;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .detail-label {
            font-weight: bold;
            color: #666;
          }
          .detail-value {
            text-align: right;
          }
          .button {
            display: inline-block;
            background-color: #b45309;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .thank-you {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #b45309;
          }
          .memorial-box {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border: 1px solid #eee;
            text-align: center;
          }
          .memorial-quote {
            font-style: italic;
            color: #666;
            margin: 15px 0;
            font-size: 16px;
          }
          .memorial-badge {
            background-color: #78716c;
            color: white;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 12px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Memorial Donation</h1>
            <p>Burmese Vihar-Bodhgaya</p>
          </div>
          <div class="content">
            <div class="memorial-badge">MEMORIAL DONATION</div>
            <p class="thank-you">Dear ${name || "Generous Donor"},</p>
            <p>Thank you for your memorial donation to Burmese Vihar-Bodhgaya. Your gift honors the memory of your loved one and supports our temple's mission.</p>
            
            <div class="memorial-box">
              <h3>In Loving Memory</h3>
              <p class="memorial-quote">"${dedication}"</p>
              <p>May their memory be a blessing.</p>
            </div>
            
            <h2>Donation Receipt</h2>
            
            <div class="detail-row">
              <span class="detail-label">Donation Amount:</span>
              <span class="detail-value">${amount}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${date}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Transaction ID:</span>
              <span class="detail-value">${transactionId}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Payment Method:</span>
              <span class="detail-value">${paymentMethod}</span>
            </div>
            
            <p>This receipt is for your tax records. Burmese Vihar-Bodhgaya is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law.</p>
            
            <p>If you would like to discuss other ways to honor your loved one, such as a prayer service or dedication, please contact us at <a href="mailto:memorial@burmesevihar.org">memorial@burmesevihar.org</a>.</p>
            
            <div style="text-align: center;">
              <a href="https://burmesevihar.org/memorial-services" class="button">Learn About Memorial Services</a>
            </div>
          </div>
          <div class="footer">
            <p>Burmese Vihar-Bodhgaya | Near Mahabodhi Temple, Bodhgaya, Gaya District, Bihar, India - 824231</p>
            <p>© ${new Date().getFullYear()} Burmese Vihar-Bodhgaya. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
}

// Function to select the appropriate email template based on donation type
export function selectEmailTemplate(donation: {
  isMonthly: boolean
  dedication?: string
  eventName?: string
}) {
  if (donation.eventName) {
    return emailTemplates.special_event_donation
  }

  if (donation.dedication && donation.dedication.toLowerCase().includes("memory")) {
    return emailTemplates.memorial_donation
  }

  if (donation.isMonthly) {
    return emailTemplates.monthly_donation_receipt
  }

  return emailTemplates.donation_receipt
}
