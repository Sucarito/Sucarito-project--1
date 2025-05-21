import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { formatCurrency } from "./utils"

export async function generatePdfReceipt({
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
  // Create a new PDF document
  const doc = new jsPDF()

  // Format the date
  const formattedDate =
    typeof date === "string"
      ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  // Add header with logo placeholder
  doc.setFillColor(180, 83, 9) // Amber color
  doc.rect(0, 0, 210, 40, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text("Donation Receipt", 105, 20, { align: "center" })
  doc.setFontSize(14)
  doc.text("Burmese Vihar-Bodhgaya", 105, 30, { align: "center" })

  // Add content
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.text(`Dear ${name || "Generous Donor"},`, 20, 50)
  doc.text(`Thank you for your ${isMonthly ? "monthly " : ""}donation to Burmese Vihar-Bodhgaya.`, 20, 60)
  doc.text(
    "Your generosity helps us maintain our temple, support our monks, and continue our community programs.",
    20,
    70,
  )

  // Add donation details table
  const tableBody = [
    ["Donation Amount", `${formatCurrency(amount)}${isMonthly ? " /month" : ""}`],
    ["Date", formattedDate],
    ["Transaction ID", transactionId],
    ["Payment Method", paymentMethod],
  ]

  // Add dedication if provided
  if (dedication) {
    tableBody.push(["Dedication", dedication])
  }

  // @ts-ignore - jspdf-autotable types are not fully compatible
  doc.autoTable({
    startY: 80,
    head: [["Detail", "Value"]],
    body: tableBody,
    theme: "striped",
    headStyles: { fillColor: [180, 83, 9], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 100 },
    },
  })

  // Add impact section
  // @ts-ignore - accessing lastAutoTable
  const finalY = doc.lastAutoTable.finalY + 10

  doc.setFontSize(14)
  doc.setTextColor(180, 83, 9)
  doc.text("Your Impact", 20, finalY)

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.text("Your donation will help us:", 20, finalY + 10)
  doc.text("• Preserve our historic temple buildings and sacred spaces", 25, finalY + 20)
  doc.text("• Support our resident monks and their daily needs", 25, finalY + 30)
  doc.text("• Provide meditation classes, cultural events, and educational programs", 25, finalY + 40)
  doc.text("• Extend community outreach and charitable initiatives", 25, finalY + 50)

  // Add tax information
  doc.setFontSize(10)
  doc.text(
    "This receipt is for your tax records. Burmese Vihar-Bodhgaya is a registered non-profit organization.",
    20,
    finalY + 70,
  )
  doc.text("All donations are tax-deductible to the extent allowed by law.", 20, finalY + 80)

  // Add footer
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text("Burmese Vihar-Bodhgaya | Near Mahabodhi Temple, Bodhgaya, Gaya District, Bihar, India - 824231", 105, 280, {
    align: "center",
  })
  doc.text(`© ${new Date().getFullYear()} Burmese Vihar-Bodhgaya. All rights reserved.`, 105, 285, { align: "center" })

  // Return the PDF as a blob
  return doc.output("blob")
}

// Function to download the PDF receipt
export function downloadPdfReceipt(pdfBlob: Blob, filename = "donation-receipt.pdf") {
  // Create a URL for the blob
  const url = URL.createObjectURL(pdfBlob)

  // Create a link element
  const link = document.createElement("a")
  link.href = url
  link.download = filename

  // Append to the document, click it, and remove it
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Clean up the URL object
  URL.revokeObjectURL(url)
}
