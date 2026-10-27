import Link from "next/link"
import { ArrowUpRight, CheckCircle2, MapPin, ShieldCheck, UsersRound } from "lucide-react"

const principles = [
  ["Local context", "DHA Karachi property decisions need area knowledge, not generic listings."],
  ["Clear next steps", "The essentials are visible first, then the team confirms availability and viewings."],
  ["Human support", "A real person remains available for the details that a listing cannot settle."],
]

export default function AboutPage() {
  return <main className="catalog-page">
    <section className="catalog-page-hero catalog-about-hero"><div className="catalog-shell"><p>ABOUT DHA KARACHI VILLAS</p><h1>Property guidance with the noise taken out.</h1><span>We help people explore homes, plots and investments in DHA Karachi through clearer information and practical local support.</span></div></section>
    <section className="catalog-section catalog-story-section"><div className="catalog-shell catalog-about-intro"><div><p className="catalog-kicker">OUR APPROACH</p><h2>A calmer way to begin a property decision.</h2></div><p>Buying, renting or listing a property has enough moving parts already. DHA Karachi Villas focuses on the information that helps first, and direct support when it matters most.</p></div></section>
    <section className="catalog-about-stats"><div className="catalog-shell"><div><MapPin size={22} /><strong>DHA Karachi focused</strong><span>Built around local market context.</span></div><div><ShieldCheck size={22} /><strong>Clearer conversations</strong><span>Availability is confirmed before a viewing.</span></div><div><UsersRound size={22} /><strong>Human support</strong><span>Speak directly with the team.</span></div></div></section>
    <section className="catalog-section catalog-soft-section"><div className="catalog-shell"><p className="catalog-kicker">WHAT GUIDES US</p><div className="catalog-principles">{principles.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><CheckCircle2 size={20} /><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>
    <section className="catalog-section"><div className="catalog-shell catalog-cta"><div><p>START WITH A CONVERSATION</p><h2>Tell us what you are looking for.</h2></div><Link href="/contact">Talk to DHA Karachi Villas <ArrowUpRight size={18} /></Link></div></section>
  </main>
}
