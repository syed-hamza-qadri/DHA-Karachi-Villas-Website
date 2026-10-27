import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, MapPin, ShieldCheck, UsersRound } from "lucide-react"

const principles = [
  ["Trust & Confidence", "Buy property in DHA Karachi with confidence. We ensure complete transparency in all transactions."],
  ["100% Recommendation", "Our clients trust us completely. We maintain a 100% recommendation rate with excellent reviews."],
  ["Always Available", "We are always open and available to serve you 24/7 for all your DHA property needs."],
]

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet DHA Karachi Villas, property experts for buying, selling and renting homes, villas and plots in DHA Karachi.",
}

export default function AboutPage() {
  return <main className="catalog-page">
    <section className="catalog-page-hero catalog-about-hero"><div className="catalog-shell"><p>ABOUT DHA KARACHI VILLAS</p><h1>About <em>DHA Karachi Villas.</em></h1><span>Managing your space through DHA Karachi property guidance, villas, plots, homes for sale and rental opportunities.</span></div></section>
    <section className="catalog-section catalog-story-section"><div className="catalog-shell catalog-about-intro"><div><p className="catalog-kicker">OUR STORY</p><h2>Why choose DHA Karachi Villas?</h2></div><p>Buy property in DHA Karachi with confidence. We offer luxury villas, plots for sale, and smart real estate investment options in DHA. Trusted for houses for sale and rent in DHA Karachi with a 100% recommendation rate from our clients.<br /><br />Located in Bukhari Commercial, DHA Phase 6, Karachi, we specialize in managing your space with premium real estate solutions. Our expertise in DHA properties helps you find the best investment opportunities in Karachi&apos;s most prestigious residential areas.<br /><br />DHA Karachi Villas is a real estate specialist with years of local market experience.</p></div></section>
    <section className="catalog-about-stats"><div className="catalog-shell"><div><MapPin size={22} /><strong>DHA Phase 6</strong><span>Bukhari Commercial, Karachi</span></div><div><ShieldCheck size={22} /><strong>100% Recommendation</strong><span>Excellent reviews from our clients.</span></div><div><UsersRound size={22} /><strong>Always Available</strong><span>24/7 service for DHA property needs.</span></div></div></section>
    <section className="catalog-section catalog-soft-section"><div className="catalog-shell"><p className="catalog-kicker">WHY CHOOSE US</p><div className="catalog-principles">{principles.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><CheckCircle2 size={20} /><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>
    <section className="catalog-section"><div className="catalog-shell catalog-cta"><div><p>READY TO GET STARTED?</p><h2>Buy, sell or rent with confidence.</h2></div><Link href="/contact">Contact Us Today <ArrowUpRight size={18} /></Link></div></section>
  </main>
}
