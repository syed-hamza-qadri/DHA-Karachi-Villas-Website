"use client"

import { type FormEvent, useState } from "react"
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react"
import { sendContactEmail } from "@/lib/send-email"

const initialForm = { name: "", email: "", phone: "", purpose: "Buying", propertyType: "House", customPropertyType: "", message: "" }

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }))
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("sending")
    try {
      const result = await sendContactEmail(form)
      if (!result.success) throw new Error("Unable to send")
      setForm(initialForm)
      setState("sent")
    } catch { setState("error") }
  }
  return <main className="catalog-page">
    <section className="catalog-page-hero catalog-contact-hero"><div className="catalog-shell"><p>CONTACT DHA KARACHI VILLAS</p><h1>Talk to <em>DHA Property Experts.</em></h1><span>Get personal help with DHA Karachi villas, plots, homes for sale, rentals or property listing.</span></div></section>
    <section className="catalog-section"><div className="catalog-shell catalog-contact-layout"><div className="catalog-contact-details"><p className="catalog-kicker">CONTACT INFORMATION</p><h2>Send us a message.</h2><p>Ready to find your dream property in DHA Karachi? Contact our expert team today for personalized assistance.</p><a href="tel:+923111468222"><Phone size={18} /><span><strong>Phone Numbers</strong>+92 3 111 468 222<br />Call us for immediate assistance</span></a><a href="mailto:dhakarachivillas@gmail.com"><Mail size={18} /><span><strong>Email Address</strong>dhakarachivillas@gmail.com<br />Send us your queries anytime</span></a><div><MapPin size={18} /><span><strong>Office Location</strong>Bukhari Commercial, DHA Phase 6<br />Karachi, Pakistan</span></div><div><Clock3 size={18} /><span><strong>Business Hours</strong>Monday - Saturday<br />10:00 AM - 8:00 PM</span></div></div><form className="catalog-contact-form" onSubmit={submit}><p>SEND US A MESSAGE</p><h2>What can we help with?</h2><div className="catalog-form-grid"><label>Name<input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" /></label><label>Phone<input required value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="03xx xxxxxxx" /></label><label>Email<input type="email" required value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@email.com" /></label><label>Purpose<select value={form.purpose} onChange={(event) => update("purpose", event.target.value)}><option>Buying</option><option>Renting</option><option>Listing a property</option><option>General enquiry</option></select></label><label>Property type<select value={form.propertyType} onChange={(event) => update("propertyType", event.target.value)}><option>House</option><option>Plot</option><option>Apartment</option><option>Commercial</option><option value="other">Other</option></select></label>{form.propertyType === "other" ? <label>Property type<input required value={form.customPropertyType} onChange={(event) => update("customPropertyType", event.target.value)} placeholder="Please specify" /></label> : null}</div><label>Message<textarea required value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Area, budget, bedrooms or anything useful to know" /></label><button disabled={state === "sending"} type="submit">{state === "sending" ? "Sending enquiry..." : <>Send enquiry <Send size={16} /></>}</button>{state === "sent" ? <output className="catalog-form-success">Thank you. Your message has been sent to the team.</output> : null}{state === "error" ? <output className="catalog-form-error">Message could not be sent. Please call or WhatsApp the team directly.</output> : null}</form></div></section>
  </main>
}
