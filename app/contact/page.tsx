"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Building, Sparkles, Loader2 } from "lucide-react"
import { sendContactEmail } from "@/lib/send-email"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    propertyType: "",
    customPropertyType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const propertyTypes = [
    "Plot",
    "House",
    "Apartment",
    "Penthouse",
    "Town House",
    "Duplex",
    "Portion",
    "Building",
    "Showroom",
    "Shop",
    "Office",
    "Warehouse",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        toast({
          title: "Message Sent Successfully! ✅",
          description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
          duration: 5000,
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          purpose: "",
          propertyType: "",
          customPropertyType: "",
          message: "",
        })
      } else {
        toast({
          title: "Failed to Send Message ❌",
          description: "There was an error sending your message. Please try again or call us directly.",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: "Failed to Send Message ❌",
        description: "There was an error sending your message. Please try again or call us directly.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+92 3 111 468 222"],
      description: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["dhakarachivillas@gmail.com"],
      description: "Send us your queries anytime",
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: ["Bukhari Commercial", "DHA Phase 6, Karachi, Pakistan"],
      description: "Visit our office for consultation",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday", "10:00 AM - 8:00 PM"],
      description: "We're here when you need us",
    },
  ]

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
              <span className="text-white drop-shadow-sm">Contact DHA Karachi Villas</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl">Get in Touch with</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text drop-shadow-2xl font-extrabold">
                DHA Property Experts
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              <span className="text-white/95 drop-shadow-lg">
                Ready to buy, sell, or rent property in DHA Karachi? Our expert team is here to help you with
                confidence.
              </span>
              <br className="hidden md:block" />
              <span className="text-red-300 drop-shadow-lg font-semibold">
                Contact us today for personalized assistance with luxury villas, plots, and smart real estate
                investments.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-900">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600 text-sm font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-slate-200 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="border-slate-300 focus:border-primary focus:ring-primary"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="border-slate-300 focus:border-primary focus:ring-primary"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="border-slate-300 focus:border-primary focus:ring-primary"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700">Purpose</Label>
                      <Select
                        value={formData.purpose}
                        onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary">
                          <SelectValue placeholder="Buy/Sale/Rent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="sale">Sale</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-700">Property Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            propertyType: value,
                            customPropertyType: value === "other" ? formData.customPropertyType : "",
                          })
                        }
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem
                              key={type.toLowerCase().replace(" ", "-")}
                              value={type.toLowerCase().replace(" ", "-")}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.propertyType === "other" && (
                    <div>
                      <Label htmlFor="customPropertyType" className="text-slate-700">
                        Please specify property type *
                      </Label>
                      <Input
                        id="customPropertyType"
                        value={formData.customPropertyType}
                        onChange={(e) => setFormData({ ...formData, customPropertyType: e.target.value })}
                        placeholder="Enter property type"
                        className="border-slate-300 focus:border-primary focus:ring-primary"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col">
                    <Label htmlFor="message" className="text-slate-700 mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention your property description here..."
                      className="border-slate-300 focus:border-primary focus:ring-primary flex-1 min-h-[200px] resize-none"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Information */}
            <div className="space-y-6 flex flex-col">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Visit Our Office</h3>
                <p className="text-slate-600 mb-6">
                  Located in the heart of DHA Phase 6, our office is easily accessible for in-person consultations and
                  property viewings in DHA Karachi.
                </p>
              </div>

              <Card className="border-slate-200 flex-1">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2 text-slate-900">DHA Karachi Villas Office</h4>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                          <span>Bukhari Commercial, DHA Phase 6, Karachi, Pakistan</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-slate-400" />
                          <span>+92 3 111 468 222</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-slate-400" />
                          <span>dhakarachivillas@gmail.com</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-slate-400" />
                          <span>Monday - Saturday: 10:00 AM - 8:00 PM
</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="border-slate-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 text-slate-900">Our Services</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">BUY</span>
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">SELL</span>
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">RENT</span>
                  </div>
                  <p className="text-slate-600 text-sm mt-4">
                    Specializing in luxury villas, plots for sale, and smart real estate investment options in DHA
                    Karachi.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Don't wait any longer. Contact DHA Karachi Villas today and let us help you find the perfect property in DHA
            with complete confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+923111468222">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Now: +92 3 111 468 222
              </Button>
            </a>
            <a href="https://wa.me/923111468222" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp: +92 3 111 468 222
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
