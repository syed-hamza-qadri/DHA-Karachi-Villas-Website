"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { MapPin, Bed, Bath, Square, Eye, Star, Search, Filter, Tag, ChevronLeft, ChevronRight, X } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { supabase, type Property } from "@/lib/supabase"

export function FeaturedProperties() {
  const router = useRouter()
  const [allProperties, setAllProperties] = useState<Property[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
  const [filters, setFilters] = useState({
    search: "",
    category: "all-categories",
    propertyType: "all-types",
    status: "all-status",
    priceRange: "",
    bedrooms: "any",
  })

  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({})

  // Fetch properties from Supabase
  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8) // Show only 8 featured properties

      if (error) {
        console.error("Error fetching properties:", error)
        return
      }

      const formattedProperties: Property[] = data.map((property) => ({
        id: property.id,
        title: property.title,
        price: property.price,
        location: property.location,
        image: property.image,
        images: property.images || [property.image],
        type: property.type,
        status: property.status as "For Sale" | "For Rent",
        category: property.category as "residential" | "commercial",
        description: property.description,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        buildingSize: property.building_size,
        totalFloors: property.total_floors,
        parkingSpaces: property.parking_spaces,
        zoning: property.zoning,
        leaseTerm: property.lease_term,
        features: property.features || [],
        created_at: property.created_at,
      }))

      setAllProperties(formattedProperties)
      setProperties(formattedProperties)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPropertyTypeOptions = (category: string) => {
    if (category === "residential") {
      return (
        <>
          <SelectItem value="plot">Plot</SelectItem>
          <SelectItem value="house">House</SelectItem>
          <SelectItem value="apartment">Apartment</SelectItem>
          <SelectItem value="penthouse">Penthouse</SelectItem>
          <SelectItem value="townhouse">Town House</SelectItem>
          <SelectItem value="duplex">Duplex</SelectItem>
          <SelectItem value="portion">Portion</SelectItem>
          <SelectItem value="building">Building</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </>
      )
    } else if (category === "commercial") {
      return (
        <>
          <SelectItem value="plot">Plot</SelectItem>
          <SelectItem value="building">Building</SelectItem>
          <SelectItem value="showroom">Showroom</SelectItem>
          <SelectItem value="shop">Shop</SelectItem>
          <SelectItem value="office">Office</SelectItem>
          <SelectItem value="warehouse">Warehouse</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </>
      )
    }
    return (
      <>
        <SelectItem value="plot">Plot</SelectItem>
        <SelectItem value="house">House</SelectItem>
        <SelectItem value="apartment">Apartment</SelectItem>
        <SelectItem value="penthouse">Penthouse</SelectItem>
        <SelectItem value="townhouse">Town House</SelectItem>
        <SelectItem value="duplex">Duplex</SelectItem>
        <SelectItem value="portion">Portion</SelectItem>
        <SelectItem value="building">Building</SelectItem>
        <SelectItem value="showroom">Showroom</SelectItem>
        <SelectItem value="shop">Shop</SelectItem>
        <SelectItem value="office">Office</SelectItem>
        <SelectItem value="warehouse">Warehouse</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </>
    )
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }

    if (key === "category" && value !== filters.category) {
      newFilters.propertyType = "all-types"
    }

    setFilters(newFilters)

    let filtered = allProperties

    if (newFilters.search) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
          property.location.toLowerCase().includes(newFilters.search.toLowerCase()),
      )
    }

    if (newFilters.category && newFilters.category !== "all-categories") {
      filtered = filtered.filter((property) => property.category === newFilters.category)
    }

    if (newFilters.propertyType && newFilters.propertyType !== "all-types") {
      filtered = filtered.filter((property) => property.type.toLowerCase() === newFilters.propertyType.toLowerCase())
    }

    if (newFilters.status && newFilters.status !== "all-status") {
      filtered = filtered.filter((property) => property.status.toLowerCase().replace(" ", "-") === newFilters.status)
    }

    if (newFilters.bedrooms && newFilters.bedrooms !== "any" && newFilters.category === "residential") {
      filtered = filtered.filter(
        (property) => property.bedrooms && property.bedrooms >= Number.parseInt(newFilters.bedrooms),
      )
    }

    setProperties(filtered)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all-categories",
      propertyType: "all-types",
      status: "all-status",
      priceRange: "",
      bedrooms: "any",
    })
    setProperties(allProperties)
  }

  const handleContactAgent = (property: Property) => {
    const phoneNumber = "+923111468222"
    const message = `Hi! I'm interested in the property "${property.title}" (ID: ${property.id}) located at ${property.location}. Price: Rs ${formatPrice(property.price)}. Could you please provide more details?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleScheduleTour = (propertyId: number) => {
    setOpenDialogs((prev) => ({ ...prev, [propertyId]: false }))

    setTimeout(() => {
      router.push("/#contact-form")
      setTimeout(() => {
        const contactSection = document.getElementById("contact-form")
        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }, 100)
    }, 300)
  }

  const openImagePreview = (images: string[], startIndex = 0) => {
    setPreviewImages(images)
    setCurrentPreviewIndex(startIndex)
    setImagePreviewOpen(true)
  }

  const closeImagePreview = () => {
    setImagePreviewOpen(false)
    setPreviewImages([])
    setCurrentPreviewIndex(0)

    // Remove the history state if it exists
    if (window.history.state?.imagePreview) {
      window.history.back()
    }
  }

  const nextPreviewImage = () => {
    setCurrentPreviewIndex((prev) => (prev + 1) % previewImages.length)
  }

  const prevPreviewImage = () => {
    setCurrentPreviewIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length)
  }

  // Handle browser back button for image preview
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (imagePreviewOpen) {
        event.preventDefault()
        closeImagePreview()
      }
    }

    if (imagePreviewOpen) {
      // Push a new state when image preview opens
      window.history.pushState({ imagePreview: true }, "", window.location.href)
      window.addEventListener("popstate", handlePopState)
    }

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [imagePreviewOpen])

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30">
        <div className="container px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading properties...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30">
      <div className="container px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            Premium Collection
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-slate-800">
            Featured Properties
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium properties available for sale and rent
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-slate-800">
                Showing {properties.length} of {allProperties.length} properties
              </h3>
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl px-6 py-2 font-semibold transition-all duration-300 bg-transparent"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <Card
              className="mb-8 border-0 bg-white rounded-2xl transition-all duration-500 ease-in-out"
              style={{
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
              }}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                  <div className="lg:col-span-2">
                    <label className="text-sm font-medium mb-2 block text-slate-700">Search Properties</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search by title or location..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                        className="pl-10 border-slate-300 focus:border-primary focus:ring-primary rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">Category</label>
                    <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                      <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary rounded-xl h-12">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-categories">All Categories</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">Property Type</label>
                    <Select
                      value={filters.propertyType}
                      onValueChange={(value) => handleFilterChange("propertyType", value)}
                    >
                      <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary rounded-xl h-12">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-types">All Types</SelectItem>
                        {getPropertyTypeOptions(filters.category)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700">Status</label>
                    <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                      <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary rounded-xl h-12">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-status">All Status</SelectItem>
                        <SelectItem value="for-sale">For Sale</SelectItem>
                        <SelectItem value="for-rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {filters.category !== "commercial" && (
                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700">Bedrooms</label>
                      <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
                        <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary rounded-xl h-12">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                          <SelectItem value="6">6+</SelectItem>
                          <SelectItem value="7">7+</SelectItem>
                          <SelectItem value="8">8+</SelectItem>
                          <SelectItem value="9">9+</SelectItem>
                          <SelectItem value="10">10+</SelectItem>
                          <SelectItem value="11">11+</SelectItem>
                          <SelectItem value="12">12+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Clear Filters Button */}
                {(filters.search ||
                  filters.propertyType !== "all-types" ||
                  filters.status !== "all-status" ||
                  filters.bedrooms !== "any" ||
                  filters.category !== "all-categories") && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={clearFilters}
                      variant="ghost"
                      className="text-slate-600 hover:text-primary hover:bg-primary/10 rounded-xl"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden transition-all duration-500 hover:-translate-y-2 bg-white border-0 rounded-3xl shadow-medium hover:shadow-card-hover"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={property.images?.[0] || property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={property.status === "For Sale" ? "default" : "secondary"}
                    className={
                      property.status === "For Sale"
                        ? "bg-gradient-to-r from-primary to-red-500 text-white shadow-lg rounded-full px-3 py-1"
                        : "bg-white/90 text-slate-700 shadow-lg backdrop-blur-sm rounded-full px-3 py-1"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-sm text-slate-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {property.title}
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">Rs {formatPrice(property.price)}</p>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  {property.category === "residential" && (
                    <>
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        {property.bedrooms} bed
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property.bathrooms} bath
                      </div>
                    </>
                  )}
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {property.category === "residential" ? property.area : property.buildingSize}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Dialog
                  open={openDialogs[property.id] || false}
                  onOpenChange={(open) => setOpenDialogs((prev) => ({ ...prev, [property.id]: open }))}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-red-500 hover:from-red-600 hover:to-red-500 text-white rounded-2xl py-3 font-semibold shadow-red-glow transition-all duration-300"
                      onClick={() => {
                        setSelectedProperty(property)
                        setOpenDialogs((prev) => ({ ...prev, [property.id]: true }))
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl-soft">
                    <DialogHeader className="text-left px-2 sm:px-6">
                      <DialogTitle className="text-slate-800 text-xl sm:text-2xl pr-8">
                        {selectedProperty?.title}
                      </DialogTitle>
                      {selectedProperty && (
                        <div className="text-slate-500 text-sm font-medium">Property ID: {selectedProperty.id}</div>
                      )}
                    </DialogHeader>
                    {selectedProperty && (
                      <div className="space-y-4 sm:space-y-6 px-2 sm:px-6 pb-6">
                        {/* Image Carousel */}
                        {selectedProperty.images && selectedProperty.images.length > 1 ? (
                          <Carousel className="w-full">
                            <CarouselContent>
                              {selectedProperty.images.map((imageUrl, index) => (
                                <CarouselItem key={index}>
                                  <div className="relative">
                                    <Image
                                      src={imageUrl || "/placeholder.svg"}
                                      alt={`${selectedProperty.title} - Image ${index + 1}`}
                                      width={600}
                                      height={400}
                                      className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-2xl shadow-large cursor-pointer"
                                      onClick={() => openImagePreview(selectedProperty.images!, index)}
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                          </Carousel>
                        ) : (
                          <Image
                            src={selectedProperty.images?.[0] || selectedProperty.image || "/placeholder.svg"}
                            alt={selectedProperty.title}
                            width={600}
                            height={400}
                            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-2xl shadow-large cursor-pointer"
                            onClick={() => openImagePreview(selectedProperty.images || [selectedProperty.image], 0)}
                          />
                        )}

                        {/* Price and Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div className="bg-red-50 p-4 sm:p-6 rounded-2xl">
                            <p className="text-sm text-slate-500 mb-2">Price</p>
                            <p className="text-2xl sm:text-3xl font-bold text-primary">
                              Rs {formatPrice(selectedProperty.price)}
                            </p>
                          </div>
                          <div className="bg-red-50 p-4 sm:p-6 rounded-2xl">
                            <p className="text-sm text-slate-500 mb-2">Status</p>
                            <Badge
                              variant={selectedProperty.status === "For Sale" ? "default" : "secondary"}
                              className={
                                selectedProperty.status === "For Sale"
                                  ? "bg-gradient-to-r from-primary to-red-500 text-white"
                                  : "bg-slate-100 text-slate-700"
                              }
                            >
                              {selectedProperty.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center text-slate-500 bg-slate-50 p-3 sm:p-4 rounded-2xl">
                          <MapPin className="h-4 sm:h-5 w-4 sm:w-5 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base">{selectedProperty.location}</span>
                        </div>

                        {/* Category and Property Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl">
                            <div className="flex items-center mb-2">
                              <Tag className="h-4 w-4 mr-2 text-primary" />
                              <p className="text-sm text-slate-500">Category</p>
                            </div>
                            <p className="text-base sm:text-lg font-semibold text-slate-800 capitalize">
                              {selectedProperty.category}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl">
                            <p className="text-sm text-slate-500 mb-2">Property Type</p>
                            <p className="text-base sm:text-lg font-semibold text-slate-800 capitalize">
                              {selectedProperty.type}
                            </p>
                          </div>
                        </div>

                        {/* Property Details */}
                        {selectedProperty.category === "residential" ? (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                            <div className="bg-red-50 p-3 sm:p-6 rounded-2xl text-center">
                              <Bed className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 sm:mb-3 text-primary" />
                              <p className="text-base sm:text-lg font-semibold text-slate-800">
                                {selectedProperty.bedrooms}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600">Bedrooms</p>
                            </div>
                            <div className="bg-red-50 p-3 sm:p-6 rounded-2xl text-center">
                              <Bath className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 sm:mb-3 text-primary" />
                              <p className="text-base sm:text-lg font-semibold text-slate-800">
                                {selectedProperty.bathrooms}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600">Bathrooms</p>
                            </div>
                            <div className="bg-red-50 p-3 sm:p-6 rounded-2xl text-center">
                              <Square className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 sm:mb-3 text-primary" />
                              <p className="text-base sm:text-lg font-semibold text-slate-800">
                                {selectedProperty.area}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600">Area</p>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-3 sm:gap-4">
                            <div className="bg-red-50 p-3 sm:p-4 rounded-2xl text-center">
                              <Square className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-primary" />
                              <p className="text-base sm:text-lg font-semibold text-slate-800">
                                {selectedProperty.buildingSize}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600">Building Size</p>
                            </div>
                          </div>
                        )}

                        {/* Features & Amenities */}
                        <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl">
                          <div className="flex items-center mb-3 sm:mb-4">
                            <Star className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-primary" />
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800">Features & Amenities</h3>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {selectedProperty.features.map((feature, index) => (
                              <div
                                key={index}
                                className="bg-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm text-slate-700 border border-slate-200"
                              >
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">
                            Description
                          </h3>
                          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                            {selectedProperty.description}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <Button
                            onClick={() => handleContactAgent(selectedProperty)}
                            className="flex-1 bg-gradient-to-r from-primary to-red-500 hover:from-red-600 hover:to-red-500 rounded-2xl py-3 shadow-red-glow text-sm sm:text-base"
                          >
                            Contact Agent
                          </Button>
                          <Button
                            onClick={() => handleScheduleTour(selectedProperty.id)}
                            variant="outline"
                            className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-2xl py-3 transition-all duration-300 bg-transparent text-sm sm:text-base"
                          >
                            Schedule Tour
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Image Preview Modal */}
        <Dialog open={imagePreviewOpen} onOpenChange={closeImagePreview}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/90 border-0">
            <div className="relative w-full h-[95vh] flex items-center justify-center">
              {previewImages.length > 0 && (
                <>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={previewImages[currentPreviewIndex] || "/placeholder.svg"}
                      alt={`Preview ${currentPreviewIndex + 1}`}
                      width={800}
                      height={800}
                      className="max-w-full max-h-full object-contain"
                      style={{ aspectRatio: "1/1" }}
                    />
                  </div>

                  {/* Navigation Buttons */}
                  {previewImages.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                        onClick={prevPreviewImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                        onClick={nextPreviewImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  {previewImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentPreviewIndex + 1} / {previewImages.length}
                    </div>
                  )}

                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={closeImagePreview}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {properties.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No properties found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent rounded-xl"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* View All Properties Button */}
        <div className="text-center mt-12 md:mt-16">
          <Link href="/properties">
            <Button className="bg-gradient-to-r from-primary to-red-500 hover:from-red-600 hover:to-red-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-red-glow transition-all duration-300">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
