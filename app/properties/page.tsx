import type { Metadata } from "next"
import { PropertyDirectory } from "@/components/property-directory"

export const metadata: Metadata = {
  title: "DHA Karachi Properties for Sale & Rent",
  description: "Browse DHA Karachi homes, villas, plots and rental properties. Filter available DHA listings and contact DHA Karachi Villas for current availability.",
}

export default function PropertiesPage() {
  return <PropertyDirectory />
}
