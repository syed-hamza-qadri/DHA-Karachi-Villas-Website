import type { Metadata } from "next"
import { PropertyDetail } from "@/components/property-detail"

export const metadata: Metadata = {
  title: "Property Details",
  description: "View DHA Karachi property details, photos, specifications and direct enquiry options from DHA Karachi Villas.",
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return <PropertyDetail propertyId={params.id} />
}
