"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowUpRight, Bath, BedDouble, Building2, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Maximize2, MessageCircle, Phone, ShieldCheck } from "lucide-react"
import { formatPrice, mapPropertyRecord, supabase, type Property } from "@/lib/supabase"

export function PropertyDetail({ propertyId }: { propertyId: string }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    let active = true
    const id = propertyId.trim()

    if (!id) {
      setLoading(false)
      return
    }

    void (async () => {
      try {
        const { data, error } = await supabase.from("properties").select("*").eq("id", id).maybeSingle()
        if (!error && data && active) setProperty(mapPropertyRecord(data as Record<string, unknown>))
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => { active = false }
  }, [propertyId])

  const images = useMemo(() => {
    if (!property) return []
    return Array.from(new Set([...property.images, property.image].filter((image): image is string => typeof image === "string" && image.length > 0)))
  }, [property])

  if (loading) return <main className="catalog-page catalog-detail-page"><div className="catalog-loading"><span className="catalog-loading-mark" />Loading property details</div></main>

  if (!property) return <main className="catalog-page catalog-detail-page"><section className="catalog-section"><div className="catalog-shell catalog-detail-empty"><h1>Property details unavailable.</h1><p>This listing may have been removed or is being refreshed. Please browse the latest DHA Karachi properties.</p><Link href="/properties" className="catalog-dark-button">Back to properties <ArrowLeft size={17} /></Link></div></section></main>

  const image = images[selectedImage] || property.image || "/placeholder.svg"
  const area = property.area || property.buildingSize
  const whatsappMessage = `Hi, I am interested in ${property.title} (Property ID: ${property.id}). Please share more details.`
  const whatsappUrl = `https://wa.me/923111468222?text=${encodeURIComponent(whatsappMessage)}`
  const previousImage = () => setSelectedImage((current) => (current - 1 + images.length) % images.length)
  const nextImage = () => setSelectedImage((current) => (current + 1) % images.length)

  return <main className="catalog-page catalog-detail-page">
    <section className="catalog-section catalog-detail-section">
      <div className="catalog-shell catalog-detail-grid">
        <article className="catalog-detail-content">
          <Link href="/properties" className="catalog-detail-back"><ArrowLeft size={17} />All properties</Link>
          <p className="catalog-detail-eyebrow">{property.status} · {property.type}</p>
          <h1>{property.title}</h1>

          <div className="catalog-detail-gallery">
            <img src={image} alt={property.title} className="catalog-detail-image" />
            {images.length > 1 ? <>
              <button type="button" className="catalog-gallery-arrow is-left" onClick={previousImage} aria-label="Previous property image"><ChevronLeft size={21} /></button>
              <button type="button" className="catalog-gallery-arrow is-right" onClick={nextImage} aria-label="Next property image"><ChevronRight size={21} /></button>
              <div className="catalog-gallery-count">{selectedImage + 1} / {images.length}</div>
            </> : null}
          </div>

          {images.length > 1 ? <div className="catalog-detail-thumbnails">{images.map((thumbnail, index) => <button type="button" className={index === selectedImage ? "is-active" : ""} onClick={() => setSelectedImage(index)} key={`${thumbnail}-${index}`} aria-label={`View image ${index + 1}`}><img src={thumbnail} alt="" /></button>)}</div> : null}

          <div className="catalog-detail-facts">
            <div><small>Property type</small><strong><Building2 size={16} />{property.type}</strong></div>
            <div><small>Location</small><strong><MapPin size={16} />{property.location}</strong></div>
            <div><small>Purpose</small><strong><CheckCircle2 size={16} />{property.status}</strong></div>
            {property.category === "residential" && property.bedrooms ? <div><small>Bedrooms</small><strong><BedDouble size={16} />{property.bedrooms} bed</strong></div> : null}
            {property.category === "residential" && property.bathrooms ? <div><small>Bathrooms</small><strong><Bath size={16} />{property.bathrooms} bath</strong></div> : null}
            {area ? <div><small>{property.category === "commercial" ? "Building size" : "Area"}</small><strong><Maximize2 size={16} />{area}</strong></div> : null}
          </div>

          <section className="catalog-detail-copy">
            <p className="catalog-kicker">ABOUT THIS PROPERTY</p>
            <h2>Details that matter.</h2>
            <p>{property.description}</p>
            <p className="catalog-detail-note"><ShieldCheck size={18} />Availability, specifications and viewing arrangements are confirmed by the DHA Karachi Villas team before you proceed.</p>
          </section>

          {property.features.length ? <section className="catalog-detail-copy catalog-detail-features"><p className="catalog-kicker">FEATURES & AMENITIES</p><div>{property.features.map((feature) => <span key={feature}><CheckCircle2 size={15} />{feature}</span>)}</div></section> : null}
        </article>

        <aside className="catalog-detail-summary">
          <p>LISTING SUMMARY</p>
          <div className="catalog-detail-price">PKR {formatPrice(property.price)}</div>
          <div className="catalog-detail-location"><MapPin size={17} />{property.location}</div>
          <div className="catalog-detail-status"><ShieldCheck size={16} />Current availability to be confirmed</div>
          <hr />
          <h2>Request a follow-up.</h2>
          <span>A DHA Karachi Villas representative will confirm current status before arranging a viewing.</span>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="catalog-detail-whatsapp"><MessageCircle size={18} />WhatsApp the team</a>
          <a href="tel:+923111468222" className="catalog-detail-call"><Phone size={17} />Call +92 311 146 8222</a>
          <Link href="/contact" className="catalog-detail-contact">Send an enquiry <ArrowUpRight size={16} /></Link>
        </aside>
      </div>
    </section>
  </main>
}
