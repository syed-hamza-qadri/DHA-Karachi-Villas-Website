import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/about" },
      { name: "Properties", href: "/properties" },
      { name: "Contact", href: "/contact" },
    ],
    services: [
      { name: "Buy Property", href: "/properties" },
      { name: "Sell Property", href: "/contact" }, // Changed to /contact
      { name: "Rent Property", href: "/properties" },
      { name: "Property Management", href: "/admin/listings" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/pakistanholdings", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/dhakarachivillas", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="text-xl font-bold">DHA Karachi Villas</span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">Managing Your Space</p>
            <p className="text-slate-400 mb-6 max-w-md">
              Buy property in DHA Karachi with confidence. We offer luxury villas, plots for sale, and smart real estate
              investment options in DHA. Trusted for houses for sale and rent in DHA Karachi.
            </p>

            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Bukhari Commercial, DHA Phase 6, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+92 3 111 468 222</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>dhakarachivillas@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} DHA Karachi Villas. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
