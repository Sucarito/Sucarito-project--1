/**
 * Sends a donation receipt email to the donor
 */
export async function sendDonationReceipt({
  name,
  email,
  amount,
  transactionId,
  date,
  paymentMethod,
  isMonthly,
  dedication,
}: {
  name: string
  email: string
  amount: number
  transactionId: string
  date: string | Date
  paymentMethod: string
  isMonthly: boolean
  dedication?: string
}) {
  try {
    const response = await fetch("/api/send-receipt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        amount,
        transactionId,
        date,
        paymentMethod,
        isMonthly,
        dedication,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to send receipt")
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending receipt:", error)
    throw error
  }
}
