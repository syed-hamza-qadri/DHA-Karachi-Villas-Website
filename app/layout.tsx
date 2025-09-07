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
  keywords: [
    "DHA Karachi real estate",
    "House for sale in DHA Karachi",
    "DHA Plot for sale",
    "DHA Karachi properties",
    "luxury apartments DHA",
    "DHA Karachi villas",
    "real estate investment DHA",
    "premium properties DHA",
  ],
  authors: [{ name: "DHA Karachi Villas" }],
  creator: "DHA Karachi Villas",
  publisher: "DHA Karachi Villas",
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
    google: "your-google-verification-code-here",
  },
  alternates: {
    canonical: "https://dhakv.com",
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
      <head>
        <link rel="icon" href="https://i.ibb.co/Jk8Lqzr/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "DHA Karachi Villas",
              url: "https://dhakv.com",
              description:
                "DHA Karachi Villas offers Houses for sale in DHA Karachi, premium properties plots & luxury apartments. Secure your future with trusted DHA Karachi real estate investment.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Karachi",
                addressRegion: "Sindh",
                addressCountry: "Pakistan",
              },
              areaServed: "DHA Karachi",
              serviceType: ["Real Estate Sales", "Property Investment", "Luxury Villas", "Plots for Sale"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
