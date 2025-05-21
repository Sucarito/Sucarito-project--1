"use client"

import { useState, useEffect } from "react"
import type { User } from "next-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Download, Filter } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { generatePdfReceipt, downloadPdfReceipt } from "@/lib/pdf"

interface DonationHistoryProps {
  user: User
}

export default function DonationHistory({ user }: DonationHistoryProps) {
  const [donations, setDonations] = useState<any[]>([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchDonations(pagination.page, pagination.limit, filter)
  }, [pagination.page, pagination.limit, filter])

  async function fetchDonations(page: number, limit: number, filter: string) {
    setIsLoading(true)
    try {
      let url = `/api/donations?page=${page}&limit=${limit}`
      if (filter !== "all") {
        url += `&filter=${filter}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (data.donations) {
        setDonations(data.donations)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error("Error fetching donations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage })
    }
  }

  const handleDownloadReceipt = async (donation: any) => {
    try {
      const pdfBlob = await generatePdfReceipt({
        name: user.name || "Donor",
        email: user.email || "",
        amount: donation.amount,
        transactionId: donation.transactionId,
        date: donation.createdAt,
        paymentMethod: donation.paymentMethod,
        isMonthly: donation.isMonthly,
        dedication: donation.dedication,
      })

      downloadPdfReceipt(pdfBlob, `donation-receipt-${donation.transactionId}.pdf`)
    } catch (error) {
      console.error("Error generating receipt:", error)
      alert("Failed to generate receipt. Please try again.")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/donor-portal" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-stone-800">Donation History</h1>
            <p className="text-stone-600">View and download receipts for all your donations</p>
          </div>

          <Card className="border-none shadow-md mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Your Donations</CardTitle>
                  <CardDescription>
                    {pagination.total} {pagination.total === 1 ? "donation" : "donations"} found
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-stone-500" />
                    <Select value={filter} onValueChange={(value) => setFilter(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter donations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Donations</SelectItem>
                        <SelectItem value="one-time">One-time Donations</SelectItem>
                        <SelectItem value="monthly">Monthly Donations</SelectItem>
                        <SelectItem value="with-dedication">With Dedication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between p-4 border-b">
                      <div className="space-y-2">
                        <div className="h-5 w-32 bg-stone-200 animate-pulse rounded"></div>
                        <div className="h-4 w-24 bg-stone-200 animate-pulse rounded"></div>
                      </div>
                      <div className="h-8 w-20 bg-stone-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              ) : donations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-stone-500">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-stone-500">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-stone-500">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-stone-500">Payment Method</th>
                        <th className="text-left py-3 px-4 font-medium text-stone-500">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-stone-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation) => (
                        <tr key={donation.id} className="border-b hover:bg-stone-50 transition-colors">
                          <td className="py-4 px-4">{new Date(donation.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-4">{donation.isMonthly ? "Monthly" : "One-time"}</td>
                          <td className="py-4 px-4 font-medium">{formatCurrency(donation.amount)}</td>
                          <td className="py-4 px-4">{donation.paymentMethod}</td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {donation.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleDownloadReceipt(donation)}
                              >
                                <Download className="h-3 w-3" />
                                <span>Receipt</span>
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/donor-portal/donations/${donation.id}`}>
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {pagination.totalPages > 1 && (
                    <div className="mt-6">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => handlePageChange(pagination.page - 1)}
                              className={pagination.page === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>

                          {[...Array(pagination.totalPages)].map((_, i) => {
                            const pageNumber = i + 1
                            // Show first page, last page, and pages around current page
                            if (
                              pageNumber === 1 ||
                              pageNumber === pagination.totalPages ||
                              (pageNumber >= pagination.page - 1 && pageNumber <= pagination.page + 1)
                            ) {
                              return (
                                <PaginationItem key={pageNumber}>
                                  <PaginationLink
                                    isActive={pageNumber === pagination.page}
                                    onClick={() => handlePageChange(pageNumber)}
                                  >
                                    {pageNumber}
                                  </PaginationLink>
                                </PaginationItem>
                              )
                            } else if (
                              (pageNumber === 2 && pagination.page > 3) ||
                              (pageNumber === pagination.totalPages - 1 && pagination.page < pagination.totalPages - 2)
                            ) {
                              return (
                                <PaginationItem key={pageNumber}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              )
                            }
                            return null
                          })}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() => handlePageChange(pagination.page + 1)}
                              className={
                                pagination.page === pagination.totalPages ? "pointer-events-none opacity-50" : ""
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-stone-600">No donations found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
