import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, DollarSign, Users, Shield, Headphones } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Property Search",
    description: "Find your perfect home with our advanced search filters and personalized recommendations.",
  },
  {
    icon: DollarSign,
    title: "Market Analysis",
    description: "Get accurate property valuations and market insights to make informed decisions.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Work with experienced real estate professionals who know the local market.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Safe and secure property transactions with full legal support and documentation.",
  },
  {
    icon: Home,
    title: "Property Management",
    description: "Comprehensive property management services for landlords and investors.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you throughout your property journey.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Our Services</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive real estate services to help you buy, sell, or rent properties with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-slate-200">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
