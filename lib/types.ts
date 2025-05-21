export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Donation {
  id: string
  userId?: string // Optional, for anonymous donations
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  transactionId: string
  isMonthly: boolean
  dedication?: string
  createdAt: Date
  emailSent: boolean
  emailTemplate: string
  notes?: string
}

export interface DonationWithAnalytics extends Donation {
  emailOpened?: boolean
  emailOpenedAt?: Date
  clickedLinks?: string[]
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  htmlContent: string
  textContent: string
  variables: string[] // List of variables that can be used in the template
  createdAt: Date
  updatedAt: Date
}
