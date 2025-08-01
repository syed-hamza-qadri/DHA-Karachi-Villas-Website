import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | number): string {
  // Remove non-numeric characters except for the decimal point
  const numericPrice = typeof price === "string" ? Number.parseFloat(price.replace(/[^0-9.]/g, "")) : price

  if (isNaN(numericPrice)) {
    return String(price) // Return original if not a valid number
  }

  // Format with commas for thousands
  return new Intl.NumberFormat("en-PK", {
    // Using 'en-PK' for Pakistani Rupee formatting, which typically uses commas
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericPrice)
}
