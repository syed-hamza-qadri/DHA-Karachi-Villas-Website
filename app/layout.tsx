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
  title: "DHA Karachi Villas | Houses and Bungalows for Sale | DHA Karachi Real Estate",
  description:
    "Discover premium properties across Pakistan and find your perfect home with DHA Karachi Villas comprehensive platform.",
  icons: {
    icon: "https://gvitckactendhzpjezgu.supabase.co/storage/v1/object/public/property-images/property-images/1752626165307-r8x5nwjk5l.jpg",
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
