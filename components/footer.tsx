import Link from "next/link"

export function Footer() {
  return (
    <footer className="catalog-footer">
      <div className="catalog-shell catalog-footer-grid">
        <div className="catalog-footer-brand"><strong>DHA <span>KARACHI VILLAS</span></strong><p>Clear, considered DHA Karachi property guidance for owners, buyers and tenants.</p><p className="catalog-footer-contact"><a href="tel:+923111468222">+92 3 111 468 222</a><a href="mailto:dhakarachivillas@gmail.com">dhakarachivillas@gmail.com</a></p></div>
        <div><b>Explore</b><ul><li><Link href="/">Home</Link></li><li><Link href="/properties">Browse properties</Link></li><li><Link href="/about">About us</Link></li></ul></div>
        <div><b>Services</b><ul><li><Link href="/property-management">Property management</Link></li><li><Link href="/contact">List a property</Link></li><li><Link href="/contact">Talk to the team</Link></li></ul></div>
        <div className="catalog-footer-office"><b>Visit the office</b><p>Bukhari Commercial, DHA Phase 6<br />Karachi, Pakistan</p><p>Monday to Saturday<br />10:00 AM to 8:00 PM</p></div>
      </div>
      <div className="catalog-shell catalog-fineprint">© {new Date().getFullYear()} DHA Karachi Villas. Property availability is confirmed by the team before a viewing.</div>
    </footer>
  )
}
