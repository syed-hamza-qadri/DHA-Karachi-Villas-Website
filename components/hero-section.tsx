"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  const [filters, setFilters] = useState({
    purpose: "",
    location: "",
    propertyType: "",
    priceRange: "",
    area: "",
  })

  const handleSearch = () => {
    // Handle search functionality
    console.log("Search filters:", filters)
  }

  return (
    <section
      className="relative min-h-[75vh] md:min-h-[650px] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(30, 41, 59, 0.65), rgba(185, 28, 28, 0.25)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000043929.jpg-gnZXQTzPLmaa9foYZ3ZDFtG1o7KfOf.jpeg')`,
      }}
    >
      {/* Enhanced background overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-red-900/40"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-700/20 rounded-full animate-float blur-sm"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-white/15 rounded-full animate-float blur-sm"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-red-600/25 rounded-full animate-float blur-sm"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 container px-4 text-center text-white">
        <div className="pt-8 md:pt-12 pb-8 md:pb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold mb-8 shadow-xl border border-white/20">
            <Sparkles className="h-5 w-5 mr-2 text-red-300" />
            <span className="text-white drop-shadow-sm">DHA Karachi Villas</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-10 leading-tight">
            <span className="text-white drop-shadow-2xl">Buy Property in DHA Karachi with</span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text drop-shadow-2xl font-extrabold">
              Complete Confidence
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
            <span className="text-white/95 drop-shadow-lg">
              We offer luxury villas, plots for sale, and smart real estate investment options in DHA.
            </span>
            <br className="hidden md:block" />
            <span className="text-red-300 drop-shadow-lg font-semibold">
              Trusted for houses for sale and rent in DHA Karachi.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
