"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Bath, BedDouble, MapPin, Maximize2, Search } from "lucide-react"
import { formatPrice, supabase, type Property } from "@/lib/supabase"

function shapeProperty(item: Record<string, unknown>): Property {
  return {
    id: Number(item.id),
    title: String(item.title ?? "Untitled property"),
    price: Number(item.price ?? 0),
    location: String(item.location ?? "DHA Karachi"),
    image: String(item.image ?? "/placeholder.svg"),
    images: Array.isArray(item.images) ? item.images.filter((image): image is string => typeof image === "string") : [],
    type: String(item.type ?? "Property"),
    status: item.status === "For Rent" ? "For Rent" : "For Sale",
    category: item.category === "commercial" ? "commercial" : "residential",
    description: String(item.description ?? ""),
    bedrooms: typeof item.bedrooms === "number" ? item.bedrooms : undefined,
    bathrooms: typeof item.bathrooms === "number" ? item.bathrooms : undefined,
    area: typeof item.area === "string" ? item.area : undefined,
    buildingSize: typeof item.building_size === "string" ? item.building_size : undefined,
    totalFloors: typeof item.total_floors === "number" ? item.total_floors : undefined,
    parkingSpaces: typeof item.parking_spaces === "number" ? item.parking_spaces : undefined,
    zoning: typeof item.zoning === "string" ? item.zoning : undefined,
    leaseTerm: typeof item.lease_term === "string" ? item.lease_term : undefined,
    features: Array.isArray(item.features) ? item.features.filter((feature): feature is string => typeof feature === "string") : [],
    created_at: String(item.created_at ?? ""),
  }
}

export function PropertyDirectory() {
  const [items, setItems] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    let active = true

    void (async () => {
      try {
        const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false })
        if (active && data) setItems(data.map((item) => shapeProperty(item as Record<string, unknown>)))
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => { active = false }
  }, [])

  const filtered = useMemo(() => items.filter((item) => {
    const matchesQuery = !query || `${item.title} ${item.location} ${item.type}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (!status || item.status === status)
  }), [items, query, status])

  return (
    <div className="catalog-page">
      <section className="catalog-page-hero">
        <div className="catalog-shell">
          <p>PROPERTY DIRECTORY</p>
          <h1>DHA Karachi <em>Properties.</em></h1>
          <span>Browse DHA Karachi homes, villas, plots and rental listings. Contact our team to confirm current availability.</span>
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-shell">
          <div className="catalog-directory-filter">
            <label>
              <Search size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search area or property" />
            </label>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Buy or rent</option>
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <button type="button" onClick={() => { setQuery(""); setStatus("") }}>Clear filters</button>
          </div>

          <div className="catalog-results-title">
            <strong>{loading ? "Loading listings" : `${filtered.length} listings found`}</strong>
            <span>Availability is confirmed by the team.</span>
          </div>

          {loading ? (
            <div className="catalog-property-grid">
              {[1, 2, 3].map((id) => <div className="catalog-property-card catalog-skeleton" key={id}><div className="catalog-property-image" /><div className="catalog-card-body"><span /><span /><span /></div></div>)}
            </div>
          ) : filtered.length ? (
            <div className="catalog-property-grid">
              {filtered.map((property, index) => (
                <Link href={`/properties/${property.id}`} className="catalog-property-card" key={property.id} style={{ animationDelay: `${index * 75}ms` }}>
                  <div className="catalog-property-image">
                    <img src={property.images?.[0] || property.image || "/placeholder.svg"} alt={property.title} />
                    <span className="catalog-badge">{property.status}</span>
                  </div>
                  <div className="catalog-card-body">
                    <div className="catalog-price">PKR {formatPrice(property.price)}</div>
                    <h2>{property.title}</h2>
                    <p className="catalog-location"><MapPin size={15} />{property.location}</p>
                    <div className="catalog-stats">
                      {property.bedrooms ? <span><BedDouble size={14} />{property.bedrooms} bed</span> : null}
                      {property.bathrooms ? <span><Bath size={14} />{property.bathrooms} bath</span> : null}
                      {property.area || property.buildingSize ? <span><Maximize2 size={14} />{property.area || property.buildingSize}</span> : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="catalog-empty">
              <Search size={22} />
              <strong>Listings are being refreshed.</strong>
              <span>Call or WhatsApp the team for the latest options.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
