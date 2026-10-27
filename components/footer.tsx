import Link from "next/link"

export function Footer() {
  return (
    <footer className="catalog-footer">
      <div className="catalog-shell catalog-footer-grid">
        <div><strong>DHA <span>KARACHI VILLAS</span></strong><p>Karachi property discovery for people who want the essentials clear before the conversation starts.</p><p><a href="tel:+923111468222">+92 3 111 468 222</a><br /><a href="mailto:dhakarachivillas@gmail.com">dhakarachivillas@gmail.com</a></p></div>
        <div><b>Explore</b><ul><li><Link href="/properties?status=for-sale">Buy property</Link></li><li><Link href="/properties?status=for-rent">Rent property</Link></li><li><Link href="/contact">List a property</Link></li><li><Link href="/properties?area=DHA%20Phase%206">DHA properties</Link></li></ul></div>
        <div><b>Visit the office</b><p>Bukhari Commercial, DHA Phase 6<br />Karachi, Pakistan</p><p>Monday to Saturday<br />10:00 AM to 8:00 PM</p><p><Link href="/about">About</Link> <span>·</span> <Link href="/contact">Contact</Link></p></div>
      </div>
      <div className="catalog-shell catalog-fineprint">© {new Date().getFullYear()} DHA Karachi Villas. Property availability is confirmed by the team before a viewing.</div>
    </footer>
  )
}
