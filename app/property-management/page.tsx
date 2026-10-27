import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ClipboardCheck, KeyRound, MessageCircleMore, ShieldCheck } from "lucide-react"

const services = [
  {
    icon: KeyRound,
    title: "Tenant coordination",
    text: "Keep enquiries, viewings and the next practical step organised around your property.",
  },
  {
    icon: ClipboardCheck,
    title: "Listing oversight",
    text: "Present property details clearly and keep your listing information ready for interested buyers or tenants.",
  },
  {
    icon: MessageCircleMore,
    title: "One clear contact",
    text: "Get timely updates and a direct point of contact when there is an enquiry or a decision to make.",
  },
]

export const metadata: Metadata = {
  title: "Property Management",
  description: "Property management support for DHA Karachi owners, including listing oversight, tenant coordination and clear communication.",
}

export default function PropertyManagementPage() {
  return <main className="catalog-page catalog-management-page">
    <section className="catalog-page-hero catalog-management-hero">
      <div className="catalog-shell">
        <p>PROPERTY MANAGEMENT</p>
        <h1>Care for your <em>DHA property.</em></h1>
        <span>Practical property management support for DHA Karachi owners who value clear communication and well-managed next steps.</span>
      </div>
    </section>

    <section className="catalog-section">
      <div className="catalog-shell catalog-management-intro">
        <div><p className="catalog-kicker">FOR PROPERTY OWNERS</p><h2>Management with the essentials in view.</h2></div>
        <div><p>Whether you are preparing a property for rent, handling incoming interest or simply want a more organised way to manage your listing, DHA Karachi Villas helps keep the process clear.</p><p>Our approach is built around responsive communication, local DHA understanding and practical coordination, so you remain informed without having to manage every enquiry yourself.</p></div>
      </div>
    </section>

    <section className="catalog-section catalog-management-services">
      <div className="catalog-shell">
        <div className="catalog-section-heading"><div><p>HOW WE HELP</p><h2>Support at the right moment.</h2></div><span>Flexible support shaped around your property, its current status and what you need next.</span></div>
        <div className="catalog-management-grid">{services.map(({ icon: Icon, title, text }, index) => <article key={title}><span>0{index + 1}</span><Icon size={24} /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="catalog-section">
      <div className="catalog-shell catalog-management-note"><ShieldCheck size={24} /><div><p className="catalog-kicker">A CLEAR START</p><h2>Let&apos;s discuss your property first.</h2><p>Every property and owner requirement is different. Speak with the team to discuss the right level of listing, tenant and communication support for your DHA Karachi property.</p></div><Link href="/contact">Talk to the team <ArrowUpRight size={18} /></Link></div>
    </section>
  </main>
}
