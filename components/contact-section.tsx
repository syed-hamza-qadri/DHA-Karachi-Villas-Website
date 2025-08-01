"use client"

import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+92 3 111 468 222"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["dhakarachivillas@gmail.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Bukhari Commercial", "DHA Phase 6, Karachi, Pakistan"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday", "10:00 AM - 8:00 PM"],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-red-50/30 via-white to-red-50/50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Information
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">Get In Touch</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to find your dream property in DHA Karachi? Contact our expert team today for personalized assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="border-0 shadow-medium hover:shadow-card-hover transition-all duration-300 rounded-2xl bg-white"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-red-glow">
                    <info.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-slate-900 text-lg">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600 mb-1 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
