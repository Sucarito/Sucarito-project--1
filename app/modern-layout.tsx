import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import ModernHeader from "@/components/modern-header"
import ModernFooter from "@/components/modern-footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Burmese Vihar Bodhgaya - A Sacred Sanctuary of Peace",
  description:
    "Experience enlightenment at the historic Burmese Vihar, a beacon of Buddhist wisdom in Bodhgaya since 1936. Offering meditation, teachings, and pilgrimage support.",
  keywords: "Buddhist monastery, Bodhgaya, meditation, Buddhist teachings, pilgrimage, spiritual sanctuary",
  authors: [{ name: "Burmese Vihar Bodhgaya" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
  openGraph: {
    title: "Burmese Vihar Bodhgaya - A Sacred Sanctuary",
    description: "Historic Buddhist monastery offering meditation, teachings, and spiritual guidance since 1936.",
    type: "website",
    locale: "en_US",
  },
}

export default function ModernLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <ModernHeader />
            <main className="flex-1">{children}</main>
            <ModernFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
