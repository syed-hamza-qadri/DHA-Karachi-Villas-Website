import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Property {
  id: number
  title: string
  price: number
  location: string
  image: string
  images?: string[]
  type: string
  status: "For Sale" | "For Rent"
  category: "residential" | "commercial"
  description: string
  bedrooms?: number
  bathrooms?: number
  area?: string
  buildingSize?: string
  totalFloors?: number
  parkingSpaces?: number
  zoning?: string
  leaseTerm?: string
  features: string[]
  created_at: string
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
