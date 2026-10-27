import type { Metadata } from "next"
import { HomeRedesign } from "@/components/home-redesign"

export const metadata: Metadata = {
  title: "DHA Karachi Properties: Villas, Plots & Homes",
  description: "Explore DHA Karachi villas, plots, homes for sale and rental properties with DHA Karachi Villas. Get local guidance for buying, selling and renting.",
}

export default function HomePage() {
  return <HomeRedesign />
}
