import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import UnifiedNavigation from "@/components/unified-navigation"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function UnifiedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <UnifiedNavigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
