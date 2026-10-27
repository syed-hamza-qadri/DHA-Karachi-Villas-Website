import Link from "next/link"

export function Footer() {
  return (
    <footer className="catalog-footer">
      <div className="catalog-shell catalog-footer-grid">
        <div><strong>DHA <span>KARACHI VILLAS</span></strong><p>Managing Your Space</p><p>Buy property in DHA Karachi with confidence. We offer luxury villas, plots for sale, and smart real estate investment options in DHA. Trusted for houses for sale and rent in DHA Karachi.</p><p>Bukhari Commercial, DHA Phase 6, Karachi, Pakistan<br /><a href="tel:+923111468222">+92 3 111 468 222</a><br /><a href="mailto:dhakarachivillas@gmail.com">dhakarachivillas@gmail.com</a></p></div>
        <div><b>Company</b><ul><li><Link href="/about">About Us</Link></li><li><Link href="/about">Our Story</Link></li><li><Link href="/properties">Properties</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
        <div><b>Services</b><ul><li><Link href="/properties?status=for-sale">Buy Property</Link></li><li><Link href="/contact">Sell Property</Link></li><li><Link href="/properties?status=for-rent">Rent Property</Link></li><li><Link href="/admin/listings">Property Management</Link></li></ul><p>Monday to Saturday<br />10:00 AM to 8:00 PM</p></div>
      </div>
      <div className="catalog-shell catalog-fineprint">© {new Date().getFullYear()} DHA Karachi Villas. All rights reserved.</div>
    </footer>
  )
}
