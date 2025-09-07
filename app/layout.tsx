import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DHA Karachi real estate | House for sale in DHA Karachi | DHA Plot for sale",
  description:
    "DHA Karachi Villas offers Houses for sale in DHA Karachi, premium properties plots & luxury apartments. Secure your future with trusted DHA Karachi real estate investment.",
  keywords:
    "DHA Karachi, real estate, houses for sale, plots for sale, luxury apartments, DHA properties, Karachi real estate, property investment",
  authors: [{ name: "DHA Karachi Villas" }],
  creator: "DHA Karachi Villas",
  publisher: "DHA Karachi Villas",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhakv.com",
    siteName: "DHA Karachi Villas",
    title: "DHA Karachi real estate | House for sale in DHA Karachi | DHA Plot for sale",
    description:
      "DHA Karachi Villas offers Houses for sale in DHA Karachi, premium properties plots & luxury apartments. Secure your future with trusted DHA Karachi real estate investment.",
    images: [
      {
        url: "https://dhakv.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DHA Karachi Villas - Premium Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DHA Karachi real estate | House for sale in DHA Karachi | DHA Plot for sale",
    description:
      "DHA Karachi Villas offers Houses for sale in DHA Karachi, premium properties plots & luxury apartments. Secure your future with trusted DHA Karachi real estate investment.",
    images: ["https://dhakv.com/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
    shortcut: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
    apple: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
