"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Bath, BedDouble, MapPin, Maximize2, Search } from "lucide-react"
import { formatPrice, supabase, type Property } from "@/lib/supabase"

const shape = (item: Record<string, unknown>): Property => ({
  id: Number(item.id), title: String(item.title ?? "Untitled property"), price: Number(item.price ?? 0), location: String(item.location ?? "DHA Karachi"), image: String(item.image ?? "/placeholder.svg"), images: Array.isArray(item.images) ? item.images as string[] : [String(item.image ?? "/placeholder.svg")], type: String(item.type ?? "Property"), status: item.status === "For Rent" ? "For Rent" : "For Sale", category: item.category === "commercial" ? "commercial" : "residential", description: String(item.description ?? ""), bedrooms: typeof item.bedrooms === "number" ? item.bedrooms : undefined, bathrooms: typeof item.bathrooms === "number" ? item.bathrooms : undefined, area: typeof item.area === "string" ? item.area : undefined, buildingSize: typeof item.building_size === "string" ? item.building_size : undefined, totalFloors: undefined, parkingSpaces: undefined, zoning: undefined, leaseTerm: undefined, features: [], created_at: String(item.created_at ?? ""),
})

export function PropertyDirectory() {
  const searchParams = useSearchParams()
  const [items, setItems] = useState<Property[]>([])
  const [query, setQuery] = useState(() => searchParams.get("area") ?? "")
  const [status, setStatus] = useState(() => searchParams.get("status") === "for-sale" ? "For Sale" : searchParams.get("status") === "for-rent" ? "For Rent" : "")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let live = true
    const timeout = window.setTimeout(() => live && setLoading(false), 4500)
    void (async () => {
      try {
        const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false })
        if (live) setItems((data ?? []).map((item) => shape(item as Record<string, unknown>)))
      } finally {
        window.clearTimeout(timeout)
        if (live) setLoading(false)
      }
    })()
    return () => { live = false; window.clearTimeout(timeout) }
  }, [])
  useEffect(() => {
    setQuery(searchParams.get("area") ?? "")
    setStatus(searchParams.get("status") === "for-sale" ? "For Sale" : searchParams.get("status") === "for-rent" ? "For Rent" : "")
  }, [searchParams])
  const filtered = useMemo(() => items.filter((item) => (!query || `${item.title} ${item.location} ${item.type}`.toLowerCase().includes(query.toLowerCase())) && (!status || item.status === status)), [items, query, status])
  return <div className="catalog-page"><section className="catalog-page-hero"><div className="catalog-shell"><p>PROPERTY DIRECTORY</p><h1>Find a place worth seeing.</h1><span>Browse listings, compare the essentials and contact the DHA Karachi Villas team for current availability.</span></div></section><section className="catalog-section"><div className="catalog-shell"><div className="catalog-directory-filter"><label><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search area or property" /></label><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Buy or rent</option><option>For Sale</option><option>For Rent</option></select><button type="button" onClick={() => { setQuery(""); setStatus("") }}>Clear filters</button></div><div className="catalog-results-title"><strong>{loading ? "Loading listings" : `${filtered.length} listings found`}</strong><span>Availability is confirmed by the team.</span></div>{loading ? <div className="catalog-property-grid">{[1, 2, 3].map((id) => <div className="catalog-property-card catalog-skeleton" key={id}><div className="catalog-property-image" /><div className="catalog-card-body"><span /><span /><span /></div></div>)}</div> : filtered.length ? <div className="catalog-property-grid">{filtered.map((property, index) => <a href={`https://wa.me/923111468222?text=${encodeURIComponent(`Hi, I am interested in ${property.title}. Please share more details.`)}`} target="_blank" rel="noreferrer" className="catalog-property-card" key={property.id} style={{ animationDelay: `${index * 75}ms` }}><div className="catalog-property-image"><img src={property.images?.[0] || property.image || "/placeholder.svg"} alt={property.title} /><span className="catalog-badge">{property.status}</span></div><div className="catalog-card-body"><div className="catalog-price">PKR {formatPrice(property.price)}</div><h2>{property.title}</h2><p className="catalog-location"><MapPin size={15} />{property.location}</p><div className="catalog-stats">{property.bedrooms ? <span><BedDouble size={14} />{property.bedrooms} bed</span> : null}{property.bathrooms ? <span><Bath size={14} />{property.bathrooms} bath</span> : null}{property.area || property.buildingSize ? <span><Maximize2 size={14} />{property.area || property.buildingSize}</span> : null}</div></div></a>)}</div> : <div className="catalog-empty"><Search size={22} /><strong>Listings are being refreshed.</strong><span>Call or WhatsApp the team for the latest options.</span></div>}</div></section></div>
}
