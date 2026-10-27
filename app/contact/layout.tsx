import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us: Buy, Sell & Rent Property",
  description: "Contact DHA Karachi Villas for help buying, selling or renting DHA Karachi homes, villas and plots. Speak with the team by phone, email or enquiry form.",
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
