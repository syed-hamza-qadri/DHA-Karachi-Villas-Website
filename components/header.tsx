"use client"

import Link from "next/link"
import { Building2, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const navigation = [
  { href: "/properties", label: "Properties" },
  { href: "/properties?area=DHA%20Phase%206", label: "Areas" },
  { href: "/contact", label: "List a property" },
  { href: "/about", label: "How it works" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <header className={`catalog-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="catalog-shell catalog-header-inner">
        <Link className="catalog-brand" href="/" onClick={() => setOpen(false)}><span><Building2 size={17} /></span>DHA KARACHI VILLAS</Link>
        <button className="catalog-menu" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open}>{open ? <X size={21} /> : <Menu size={22} />}</button>
        <nav className={`catalog-nav${open ? " is-open" : ""}`} aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link href="/contact" className="catalog-nav-cta" onClick={() => setOpen(false)}>Talk to us</Link>
        </nav>
      </div>
    </header>
  )
}
