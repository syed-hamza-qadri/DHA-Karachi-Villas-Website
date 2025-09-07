import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DHA Karachi real estate | House for sale in DHA Karachi | DHA Plot for sale",
  description:
    "DHA Karachi Villas offers Houses for sale in DHA Karachi, premium properties plots & luxury apartments. Secure your future with trusted DHA Karachi real estate investment.",
  keywords: [
    "DHA Karachi real estate",
    "House for sale in DHA Karachi",
    "DHA Plot for sale",
    "DHA Karachi Villas",
    "premium properties DHA",
    "luxury apartments DHA",
    "DHA Karachi investment",
    "houses for sale DHA",
    "plots for sale DHA Karachi",
    "real estate DHA Karachi",
  ],
  authors: [{ name: "DHA Karachi Villas" }],
  openGraph: {
    title: "DHA Karachi real estate | House for sale in DHA Karachi | DHA Plot for sale",
    description:
      "DHA Karachi Villas offers Houses for sale in DHA Karachi, premium properties plots & luxury apartments. Secure your future with trusted DHA Karachi real estate investment.",
    url: "https://dhakv.com",
    siteName: "DHA Karachi Villas",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DHA Karachi real estate | House for sale in DHA Karachi | DHA Plot for sale",
    description:
      "DHA Karachi Villas offers Houses for sale in DHA Karachi, premium properties plots & luxury apartments. Secure your future with trusted DHA Karachi real estate investment.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://gvitckactendhzpjezgu.supabase.co/storage/v1/object/public/property-images/property-images/1752626165307-r8x5nwjk5l.jpg",
    shortcut:
      "https://gvitckactendhzpjezgu.supabase.co/storage/v1/object/public/property-images/property-images/1752626165307-r8x5nwjk5l.jpg",
    apple:
      "https://gvitckactendhzpjezgu.supabase.co/storage/v1/object/public/property-images/property-images/1752626165307-r8x5nwjk5l.jpg",
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
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
