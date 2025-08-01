import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Why Choose DHA Karachi Villas?</h2>
            <p className="text-lg text-slate-600 mb-6">
              Buy property in DHA Karachi with confidence. We offer luxury villas, plots for sale, and smart real estate
              investment options in DHA. Trusted for houses for sale and rent in DHA Karachi with 100% recommendation
              rate from our clients.
            </p>
            <p className="text-slate-600 mb-8">
              Located in Bukhari Commercial DHA Phase 6, Karachi, we specialize in managing your space with premium real
              estate solutions. Our expertise in DHA properties ensures you get the best investment opportunities in
              Karachi's most prestigious residential areas.
            </p>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Our Services:</h3>
              <div className="flex flex-wrap gap-4">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">BUY</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">SELL</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">RENT</span>
              </div>
            </div>
            <Link href="/about">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Learn More About Us
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000043929.jpg-gnZXQTzPLmaa9foYZ3ZDFtG1o7KfOf.jpeg"
              alt="DHA Karachi Villas - Managing Your Space"
              width={500}
              height={300}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
