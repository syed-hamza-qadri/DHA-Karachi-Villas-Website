import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield, Clock, MapPin, Sparkles } from "lucide-react"

const team = [
  {
    name: "DHA Karachi Villas",
    role: "Real Estate Specialists",
    image: "https://gvitckactendhzpjezgu.supabase.co/storage/v1/object/public/property-images/property-images/1752626165307-r8x5nwjk5l.jpg?height=300&width=300",
    description: "Expert specializing in DHA Karachi properties with years of local market experience.",
  },
]

const values = [
  {
    icon: Shield,
    title: "Trust & Confidence",
    description: "Buy property in DHA Karachi with confidence. We ensure complete transparency in all transactions.",
  },
  {
    icon: Award,
    title: "100% Recommendation",
    description: "Our clients trust us completely - we maintain a 100% recommendation rate with excellent reviews.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "We're always open and available to serve you 24/7 for all your DHA property needs.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section
        className="relative min-h-[60vh] md:min-h-[500px] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
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
          <div className="py-8 md:py-12">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-md rounded-full text-sm font-semibold mb-8 shadow-xl border border-white/20">
              <Sparkles className="h-5 w-5 mr-2 text-red-300" />
              <span className="text-white drop-shadow-sm">About DHA Karachi Villas</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl">Managing Your Space</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text drop-shadow-2xl font-extrabold">
                DHA Karachi Villas
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              <span className="text-white/95 drop-shadow-lg">
                Buy property in DHA Karachi with confidence. We offer luxury villas, plots for sale, and smart real
                estate investment options in DHA.
              </span>
              <br className="hidden md:block" />
              <span className="text-red-300 drop-shadow-lg font-semibold">
                Trusted for houses for sale and rent in DHA Karachi with over 21K satisfied followers.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Our Story</h2>
              <div className="space-y-4 text-slate-600">
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
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  {" "}
                  {/* Added mb-4 here */}
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">BUY</span>
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">SELL</span>
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">RENT</span>
                </div>
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000043929.jpg-gnZXQTzPLmaa9foYZ3ZDFtG1o7KfOf.jpeg"
                alt="DHA Karachi Villa"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-slate-200">
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-semibold text-slate-900">DHA Phase 6</div>
                    <div className="text-sm text-slate-600">Bukhari Commercial</div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-lg font-semibold text-slate-900">Always Open</div>
                    <div className="text-sm text-slate-600">24/7 Service</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Why Choose Us</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that make us the trusted choice for DHA Karachi properties
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Our Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dedicated professionals specializing in DHA Karachi real estate
            </p>
          </div>
          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Property in DHA?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Let our experienced team help you buy, sell, or rent properties in DHA Karachi with complete confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100">
                Browse DHA Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
