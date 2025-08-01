import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ContactFormSection } from "@/components/contact-form-section" // New import
import { ContactSection } from "@/components/contact-section" // Existing, but now only info cards

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProperties />
      <ContactFormSection /> {/* Moved here */}
      <ServicesSection />
      <AboutSection />
      <ContactSection /> {/* Remaining contact info cards */}
    </main>
  )
}
