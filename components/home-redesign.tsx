"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bath,
  BedDouble,
  Building2,
  CalendarCheck2,
  CircleCheck,
  Clock3,
  DollarSign,
  FileSearch,
  Headphones,
  Home,
  KeyRound,
  MapPin,
  Maximize2,
  Search,
  SearchCheck,
  ShieldCheck,
  Users,
} from "lucide-react"
import { formatPrice, supabase, type Property } from "@/lib/supabase"

const localities = [
  { name: "DHA", text: "Explore the area", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85" },
  { name: "Clifton", text: "Explore the area", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85" },
  { name: "PECHS", text: "Explore the area", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=85" },
  { name: "Gulshan", text: "Explore the area", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85" },
]

const pathways = {
  buy: {
    title: "Make every viewing more informed.",
    text: "Start with an area, compare the essentials, then ask DHA Karachi Villas to confirm availability before you plan a visit.",
    action: "Explore homes for sale",
    href: "/properties?status=for-sale",
    icon: Building2,
  },
  rent: {
    title: "Find a place that fits the everyday.",
    text: "Use property type and locality filters to narrow options, then confirm the next step with a person.",
    action: "Explore rentals",
    href: "/properties?status=for-rent",
    icon: KeyRound,
  },
  list: {
    title: "A clearer route to market.",
    text: "Share the essentials first. The team can review the information before a listing is published.",
    action: "List a property",
    href: "/contact",
    icon: ArrowUpRight,
  },
} as const

type Pathway = keyof typeof pathways

function toProperty(row: Record<string, unknown>): Property {
  return {
    id: Number(row.id),
    title: String(row.title ?? "Untitled property"),
    price: Number(row.price ?? 0),
    location: String(row.location ?? "DHA Karachi"),
    image: String(row.image ?? "/placeholder.svg"),
    images: Array.isArray(row.images) ? (row.images as string[]) : [String(row.image ?? "/placeholder.svg")],
    type: String(row.type ?? "Property"),
    status: row.status === "For Rent" ? "For Rent" : "For Sale",
    category: row.category === "commercial" ? "commercial" : "residential",
    description: String(row.description ?? ""),
    bedrooms: typeof row.bedrooms === "number" ? row.bedrooms : undefined,
    bathrooms: typeof row.bathrooms === "number" ? row.bathrooms : undefined,
    area: typeof row.area === "string" ? row.area : undefined,
    buildingSize: typeof row.building_size === "string" ? row.building_size : undefined,
    totalFloors: typeof row.total_floors === "number" ? row.total_floors : undefined,
    parkingSpaces: typeof row.parking_spaces === "number" ? row.parking_spaces : undefined,
    zoning: typeof row.zoning === "string" ? row.zoning : undefined,
    leaseTerm: typeof row.lease_term === "string" ? row.lease_term : undefined,
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    created_at: String(row.created_at ?? ""),
  }
}

function ListingCard({ property, index }: { property: Property; index: number }) {
  const image = property.images?.[0] || property.image || "/placeholder.svg"

  return (
    <Link href={`/properties/${property.id}`} className="catalog-property-card" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="catalog-property-image">
        <img src={image} alt={property.title} />
        <span className="catalog-badge">{property.status}</span>
        <span className="catalog-review"><BadgeCheck size={14} /> Review ready</span>
      </div>
      <div className="catalog-card-body">
        <div className="catalog-price">PKR {formatPrice(property.price)}</div>
        <h3>{property.title}</h3>
        <p className="catalog-location"><MapPin size={15} />{property.location}</p>
        <div className="catalog-stats">
          {property.bedrooms ? <span><BedDouble size={14} />{property.bedrooms} bed</span> : null}
          {property.bathrooms ? <span><Bath size={14} />{property.bathrooms} bath</span> : null}
          {property.area || property.buildingSize ? <span><Maximize2 size={14} />{property.area || property.buildingSize}</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ListingSkeleton() {
  return (
    <article className="catalog-property-card catalog-skeleton" aria-label="Loading property">
      <div className="catalog-property-image" />
      <div className="catalog-card-body"><span /><span /><span /></div>
    </article>
  )
}

export function HomeRedesign() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [purpose, setPurpose] = useState("")
  const [area, setArea] = useState("")
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPath, setSelectedPath] = useState<Pathway>("buy")
  const selected = useMemo(() => pathways[selectedPath], [selectedPath])
  const SelectedIcon = selected.icon

  useEffect(() => {
    let active = true
    const loadingTimeout = window.setTimeout(() => {
      if (active) setLoading(false)
    }, 4500)

    async function loadProperties() {
      try {
        const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false }).limit(3)
        if (error) throw error
        if (active) setProperties((data ?? []).map((row) => toProperty(row as Record<string, unknown>)))
      } catch {
        if (active) setProperties([])
      } finally {
        window.clearTimeout(loadingTimeout)
        if (active) setLoading(false)
      }
    }
    loadProperties()
    return () => {
      active = false
      window.clearTimeout(loadingTimeout)
    }
  }, [])

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set("search", query.trim())
    if (purpose) params.set("status", purpose)
    if (area) params.set("area", area)
    router.push(`/properties${params.size ? `?${params.toString()}` : ""}`)
  }

  return (
    <div className="catalog-page">
      <section className="catalog-hero">
        <span className="catalog-orb catalog-orb-one" />
        <span className="catalog-orb catalog-orb-two" />
        <div className="catalog-shell catalog-hero-layout">
          <div className="catalog-hero-copy">
            <p className="catalog-hero-label"><span />DHA KARACHI VILLAS</p>
            <h1>Buy property in <em>DHA Karachi.</em></h1>
            <p className="catalog-hero-intro">Explore DHA villas, plots, homes for sale and rental options with a team that knows the local market.</p>
            <form className="catalog-search" onSubmit={submitSearch}>
              <label><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Area, property type or keyword" /></label>
              <label><span>I want to</span><select value={purpose} onChange={(event) => setPurpose(event.target.value)}><option value="">Buy or rent</option><option value="for-sale">Buy</option><option value="for-rent">Rent</option></select></label>
              <label><span>Area</span><select value={area} onChange={(event) => setArea(event.target.value)}><option value="">All DHA Karachi</option><option>DHA Phase 6</option><option>DHA Phase 5</option><option>Clifton</option><option>PECHS</option><option>Gulshan</option></select></label>
              <button type="submit"><Search size={18} />Search</button>
            </form>
            <div className="catalog-hero-links"><Link href="/properties?status=for-sale">Homes for sale <ArrowUpRight size={15} /></Link><Link href="/properties?status=for-rent">Homes for rent <ArrowUpRight size={15} /></Link></div>
          </div>
          <aside className="catalog-hero-aside">
            <p>WHY CHOOSE DHA KARACHI VILLAS</p>
            <h2>Managing your space.</h2>
            <ul><li><CircleCheck size={17} />Luxury villas, plots and investment options</li><li><CircleCheck size={17} />Houses for sale and rent in DHA Karachi</li><li><CircleCheck size={17} />Premium real estate solutions in DHA</li></ul>
            <Link href="/about">Learn more about us <ArrowRight size={16} /></Link>
          </aside>
        </div>
      </section>

      <section className="catalog-intent"><div className="catalog-shell catalog-intent-grid">
        <Link href="/properties?status=for-sale"><span className="catalog-intent-number">01</span><span className="catalog-intent-copy"><strong>Buy</strong><small>Explore sale listings</small></span><span className="catalog-intent-arrow"><ArrowUpRight size={19} /></span></Link>
        <Link href="/properties?status=for-rent"><span className="catalog-intent-number">02</span><span className="catalog-intent-copy"><strong>Rent</strong><small>Find your next address</small></span><span className="catalog-intent-arrow"><ArrowUpRight size={19} /></span></Link>
        <Link href="/contact"><span className="catalog-intent-number">03</span><span className="catalog-intent-copy"><strong>Sell</strong><small>Start with a conversation</small></span><span className="catalog-intent-arrow"><ArrowUpRight size={19} /></span></Link>
      </div></section>

      <section className="catalog-section"><div className="catalog-shell">
        <div className="catalog-section-heading"><div><p>JUST ADDED</p><h2>Worth a closer look.</h2></div><Link href="/properties" className="catalog-dark-button">View all listings <ArrowRight size={17} /></Link></div>
        <div className="catalog-property-grid">
          {loading ? <><ListingSkeleton /><ListingSkeleton /><ListingSkeleton /></> : properties.length ? properties.map((property, index) => <ListingCard key={property.id} property={property} index={index} />) : <div className="catalog-empty"><SearchCheck size={22} /><strong>Listings are being refreshed.</strong><span>Call or WhatsApp the team for the latest property options.</span><a href="https://wa.me/923111468222" target="_blank" rel="noreferrer">Talk to the team <ArrowUpRight size={15} /></a></div>}
        </div>
      </div></section>

      <section className="catalog-section catalog-process-section"><div className="catalog-shell">
        <div className="catalog-section-heading"><div><p>HOW IT WORKS</p><h2>A better shortlist, before the call.</h2></div><span>Simple steps for turning a broad property search into a more useful conversation.</span></div>
        <div className="catalog-process-grid">
          <article><span>01</span><SearchCheck size={25} /><h3>Explore</h3><p>Start with the area, type and purpose that matter to you.</p></article>
          <article><span>02</span><CalendarCheck2 size={25} /><h3>Confirm</h3><p>Ask the team to confirm current availability before you plan a viewing.</p></article>
          <article><span>03</span><BadgeCheck size={25} /><h3>Move forward</h3><p>Take the next step with the practical details clearer from the start.</p></article>
        </div>
      </div></section>

      <section className="catalog-section catalog-pathway-section"><div className="catalog-shell catalog-pathway-layout">
        <div><p className="catalog-eyebrow">CHOOSE YOUR PATH</p><h2>Property decisions, made less noisy.</h2><p className="catalog-muted-copy">Whether you are moving, investing or bringing a property to market, DHA Karachi Villas keeps the next step clear.</p><div className="catalog-tabs" role="tablist">{(Object.keys(pathways) as Pathway[]).map((key) => <button type="button" key={key} onClick={() => setSelectedPath(key)} className={selectedPath === key ? "active" : ""}>{key[0].toUpperCase() + key.slice(1)}</button>)}</div></div>
        <article className="catalog-pathway-card"><SelectedIcon size={25} /><p>DHA Karachi Villas for {selectedPath}</p><h3>{selected.title}</h3><span>{selected.text}</span><Link href={selected.href}> {selected.action} <ArrowUpRight size={17} /></Link></article>
      </div></section>

      <section id="help" className="catalog-section catalog-help-section"><div className="catalog-shell"><div className="catalog-section-heading"><div><p>OUR SERVICES</p><h2>Useful help at the right moment.</h2></div><span>Comprehensive real estate services to help you buy, sell, or rent properties with confidence.</span></div><div className="catalog-service-grid">
        {[{ icon: SearchCheck, title: "Property Search", text: "Find your perfect home with our advanced search filters and personalized recommendations." }, { icon: DollarSign, title: "Market Analysis", text: "Get accurate property valuations and market insights to make informed decisions." }, { icon: Users, title: "Expert Agents", text: "Work with experienced real estate professionals who know the local market." }, { icon: ShieldCheck, title: "Secure Transactions", text: "Safe and secure property transactions with full legal support and documentation." }, { icon: Home, title: "Property Management", text: "Comprehensive property management services for landlords and investors." }, { icon: Headphones, title: "24/7 Support", text: "Round-the-clock customer support to assist you throughout your property journey." }].map(({ icon: Icon, title, text }, index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><Icon size={25} /><h3>{title}</h3><p>{text}</p></article>)}
      </div></div></section>

      <section className="catalog-section catalog-area-section"><div className="catalog-shell"><div className="catalog-section-heading"><div><p>EXPLORE KARACHI</p><h2>Every search starts somewhere.</h2></div><span>Discover an area first, then filter into property details that are useful before you call.</span></div><div className="catalog-area-grid">{localities.map((locality, index) => <Link href={`/properties?area=${encodeURIComponent(locality.name)}`} key={locality.name} style={{ backgroundImage: `url(${locality.image})` }}><span>0{index + 1}</span><strong>{locality.name}<small>{locality.text} <ArrowUpRight size={14} /></small></strong></Link>)}</div></div></section>

      <section className="catalog-section catalog-standard-section"><div className="catalog-shell catalog-standard-layout"><div><p className="catalog-eyebrow">DESIGNED FOR THE REAL DECISION</p><h2>Good property platforms do not create false certainty.</h2></div><div>{[{ icon: FileSearch, title: "Details before promises", text: "Price, type, area and location are clear before a conversation begins." }, { icon: BadgeCheck, title: "Human support where it matters", text: "Availability, viewings and the next step are confirmed by the DHA Karachi Villas team." }, { icon: ShieldCheck, title: "Privacy in the right place", text: "Public forms are only for enquiries, not for sensitive personal documents." }].map(({ icon: Icon, title, text }) => <article key={title}><Icon size={25} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="catalog-section"><div className="catalog-shell catalog-office"><div><p className="catalog-eyebrow">VISIT OR CALL</p><h2>A DHA team, easy to reach.</h2><p>For a direct conversation, visit the office in Bukhari Commercial or contact the team during business hours.</p><Link href="/contact" className="catalog-orange-button">Contact DHA Karachi Villas <ArrowUpRight size={17} /></Link></div><div><p><MapPin size={21} /><span><strong>Office</strong>Bukhari Commercial, DHA Phase 6<br />Karachi, Pakistan</span></p><p><Clock3 size={21} /><span><strong>Hours</strong>Monday to Saturday<br />10:00 AM to 8:00 PM</span></p></div></div></section>

      <section className="catalog-section catalog-cta-section"><div className="catalog-shell catalog-cta"><div><p>HAVE A PROPERTY TO LIST</p><h2>List your DHA property with confidence.</h2></div><Link href="/contact">List a property <ArrowUpRight size={17} /></Link></div></section>
    </div>
  )
}
