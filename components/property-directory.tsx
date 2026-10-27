"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Bath, BedDouble, MapPin, Maximize2, Search } from "lucide-react"
import { formatPrice, mapPropertyRecord, supabase, type Property } from "@/lib/supabase"

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
        if (active && data) setItems(data.map((item) => mapPropertyRecord(item as Record<string, unknown>)))
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
                <Link href={`/properties/${encodeURIComponent(property.id)}`} className="catalog-property-card" key={property.id} style={{ animationDelay: `${index * 75}ms` }}>
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
