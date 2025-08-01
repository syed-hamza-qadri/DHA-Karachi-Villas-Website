"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Search, User, Phone, Mail } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: Search },
    { name: "About", href: "/about", icon: User },
    { name: "Contact", href: "/contact", icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl shadow-soft border-orange-100">
      <div className="container flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-500 rounded-xl flex items-center justify-center shadow-red-glow">
            <Home className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
            DHA Karachi Villas
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-all duration-300 hover:text-primary text-slate-700 hover:scale-105 transform relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Contact Info - Right Corner */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-3 text-sm text-slate-600 bg-red-50 px-4 py-2 rounded-xl shadow-soft">
            <Phone className="h-4 w-4 text-primary" />
            <span className="font-medium">+92 3 111 468 222</span>
          </div>
          <div className="h-6 w-px bg-slate-300" />
          <div className="flex items-center space-x-3 text-sm text-slate-600 bg-red-50 px-4 py-2 rounded-xl shadow-soft">
            <Mail className="h-4 w-4 text-primary" />
            <span className="font-medium">dhakarachivillas@gmail.com</span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-slate-700 hover:bg-orange-50 rounded-xl">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] rounded-l-3xl shadow-xl-soft">
            <div className="mt-8">
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-4 text-base font-medium transition-all duration-300 hover:text-primary py-4 px-4 rounded-2xl hover:bg-red-50 text-slate-700 shadow-soft hover:shadow-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-6 w-6" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
