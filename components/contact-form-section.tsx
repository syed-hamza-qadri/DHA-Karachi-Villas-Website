"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, Loader2 } from "lucide-react"
import { sendContactEmail } from "@/lib/send-email"
import { toast } from "@/hooks/use-toast"

export function ContactFormSection() {
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

  return (
    <section id="contact-form" className="py-16 md:py-20 bg-gradient-to-br from-red-50/30 via-white to-red-50/50">
      <div className="container px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send us a Message
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
            Thinking of Selling or Renting Your Property?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We have a list of eager buyers and tenants waiting. With strong market insights and a trusted reputation,
            we'll get it done quickly and smoothly.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="border-0 shadow-large hover:shadow-xl-soft transition-all duration-300 flex-1 flex flex-col rounded-3xl bg-white max-w-4xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-slate-900 flex items-center text-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-500 rounded-xl flex items-center justify-center mr-4 shadow-red-glow">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                Property Inquiry Form
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-8 pt-0">
              <form onSubmit={handleSubmit} className="space-y-8 flex-1 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 font-semibold mb-3 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="border-slate-200 focus:border-primary focus:ring-primary rounded-xl h-12 shadow-soft hover:shadow-medium transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-semibold mb-3 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="border-slate-200 focus:border-primary focus:ring-primary rounded-xl h-12 shadow-soft hover:shadow-medium transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-slate-700 font-semibold mb-3 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="border-slate-200 focus:border-primary focus:ring-primary rounded-xl h-12 shadow-soft hover:shadow-medium transition-all duration-200"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold mb-3 block">Purpose</Label>
                    <Select
                      value={formData.purpose}
                      onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="border-slate-200 focus:border-primary focus:ring-primary rounded-xl h-12 shadow-soft hover:shadow-medium transition-all duration-200">
                        <SelectValue placeholder="Buy/Sale/Rent" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-large">
                        <SelectItem value="buy">Buy</SelectItem>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-700 font-semibold mb-3 block">Property Type</Label>
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
                      <SelectTrigger className="border-slate-200 focus:border-primary focus:ring-primary rounded-xl h-12 shadow-soft hover:shadow-medium transition-all duration-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-large">
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
                    <Label htmlFor="customPropertyType" className="text-slate-700 font-semibold mb-3 block">
                      Please specify property type *
                    </Label>
                    <Input
                      id="customPropertyType"
                      value={formData.customPropertyType}
                      onChange={(e) => setFormData({ ...formData, customPropertyType: e.target.value })}
                      placeholder="Enter property type"
                      className="border-slate-200 focus:border-primary focus:ring-primary rounded-xl h-12 shadow-soft hover:shadow-medium transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <Label htmlFor="message" className="text-slate-700 font-semibold mb-3 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention your property description here..."
                    className="border-slate-200 focus:border-primary focus:ring-primary flex-1 min-h-[160px] resize-none rounded-xl shadow-soft hover:shadow-medium transition-all duration-200"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-red-500 hover:from-red-600 hover:to-red-500 mt-auto rounded-2xl py-4 text-lg font-semibold shadow-red-glow hover:shadow-card-hover transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
