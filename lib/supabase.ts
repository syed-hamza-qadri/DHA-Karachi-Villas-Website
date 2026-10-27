import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Property {
  id: string
  title: string
  price: number
  location: string
  image: string | null
  images: string[]
  type: string
  status: "For Sale" | "For Rent"
  category: "residential" | "commercial"
  description: string
  bedrooms?: number | null
  bathrooms?: number | null
  area?: string | null
  buildingSize?: string | null
  totalFloors?: number
  parkingSpaces?: number
  zoning?: string
  leaseTerm?: string
  features: string[]
  created_at: string
}

// Mirrors the existing DHA `properties` table written by the add/edit listing screens.
export function mapPropertyRecord(row: Record<string, unknown>): Property {
  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? "Untitled property"),
    price: Number(row.price ?? 0),
    location: String(row.location ?? "DHA Karachi"),
    image: typeof row.image === "string" && row.image.length > 0 ? row.image : null,
    images: Array.isArray(row.images) ? row.images.filter((image): image is string => typeof image === "string" && image.length > 0) : [],
    type: String(row.type ?? "Property"),
    status: row.status === "For Rent" ? "For Rent" : "For Sale",
    category: row.category === "commercial" ? "commercial" : "residential",
    description: String(row.description ?? ""),
    bedrooms: typeof row.bedrooms === "number" ? row.bedrooms : null,
    bathrooms: typeof row.bathrooms === "number" ? row.bathrooms : null,
    area: typeof row.area === "string" ? row.area : null,
    buildingSize: typeof row.building_size === "string" ? row.building_size : null,
    totalFloors: typeof row.total_floors === "number" ? row.total_floors : undefined,
    parkingSpaces: typeof row.parking_spaces === "number" ? row.parking_spaces : undefined,
    zoning: typeof row.zoning === "string" ? row.zoning : undefined,
    leaseTerm: typeof row.lease_term === "string" ? row.lease_term : undefined,
    features: Array.isArray(row.features) ? row.features.filter((feature): feature is string => typeof feature === "string") : [],
    created_at: String(row.created_at ?? ""),
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
