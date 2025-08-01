"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { Upload, X, Plus } from "lucide-react"

interface FormData {
  id?: string
  title: string
  price: string
  location: string
  type: string
  otherType: string
  status: string
  category: string
  description: string
  bedrooms: string
  bathrooms: string
  area: string
  buildingSize: string
  features: string[]
}

export default function AddPropertyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    location: "",
    type: "",
    otherType: "",
    status: "",
    category: "residential", // Set residential as default
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    buildingSize: "",
    features: [],
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const newState = { ...prev, [field]: value }
      // If type is changed from 'other' to something else, clear otherType
      if (field === "type" && value !== "other") {
        newState.otherType = ""
      }
      // If category changes, reset property type
      if (field === "category") {
        newState.type = ""
        newState.otherType = ""
      }
      return newState
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      if (selectedFiles.length > 15) {
        toast({
          title: "Too Many Images",
          description: "You can upload a maximum of 15 images per property.",
          variant: "destructive",
        })
        return
      }
      setImages(selectedFiles)
      toast({
        title: "Images Selected",
        description: `${selectedFiles.length} image(s) ready for upload.`,
        variant: "default",
      })
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    toast({
      title: "Image Removed",
      description: "Image has been removed from the upload queue.",
      variant: "default",
    })
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
      toast({
        title: "Feature Added",
        description: `"${newFeature.trim()}" has been added to the property features.`,
        variant: "default",
      })
    } else if (formData.features.includes(newFeature.trim())) {
      toast({
        title: "Duplicate Feature",
        description: "This feature has already been added.",
        variant: "destructive",
      })
    }
  }

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }))
    toast({
      title: "Feature Removed",
      description: `"${feature}" has been removed from the property features.`,
      variant: "default",
    })
  }

  const validateForm = (): boolean => {
    const requiredFields = [
      { field: "title", label: "Property Title" },
      { field: "price", label: "Price" },
      { field: "location", label: "Location" },
      { field: "category", label: "Category" },
      { field: "type", label: "Property Type" },
      { field: "status", label: "Status" },
      { field: "description", label: "Description" },
    ]

    for (const { field, label } of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast({
          title: "Missing Required Field",
          description: `Please fill in the ${label} field.`,
          variant: "destructive",
        })
        return false
      }
    }

    if (formData.type === "other" && !formData.otherType.trim()) {
      toast({
        title: "Missing Required Field",
        description: "Please specify the property type for 'Other'.",
        variant: "destructive",
      })
      return false
    }

    if (formData.price && isNaN(Number(formData.price))) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid numeric price.",
        variant: "destructive",
      })
      return false
    }

    if (formData.bedrooms && isNaN(Number(formData.bedrooms))) {
      toast({
        title: "Invalid Bedrooms",
        description: "Please enter a valid number for bedrooms.",
        variant: "destructive",
      })
      return false
    }

    if (formData.bathrooms && isNaN(Number(formData.bathrooms))) {
      toast({
        title: "Invalid Bathrooms",
        description: "Please enter a valid number for bathrooms.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      return data.url
    })

    return Promise.all(uploadPromises)
  }

  const checkPropertyIdExists = async (id: string): Promise<boolean> => {
    const { data, error } = await supabase.from("properties").select("id").eq("id", id).single()

    return !error && data !== null
  }

  const generatePropertyId = async (): Promise<string> => {
    let id: string
    let exists: boolean

    do {
      const prefix = "PROP"
      const suffix = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")
      id = `${prefix}${suffix}`
      exists = await checkPropertyIdExists(id)
    } while (exists)

    return id
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      let propertyId = formData.id?.trim()

      if (propertyId) {
        const exists = await checkPropertyIdExists(propertyId)
        if (exists) {
          toast({
            title: "Property ID Already Exists",
            description: `Property ID "${propertyId}" is already in use. Please choose a different ID or leave blank for auto-generation.`,
            variant: "destructive",
          })
          setLoading(false)
          return
        }
      } else {
        propertyId = await generatePropertyId()
      }

      toast({
        title: "Processing Property",
        description: "Uploading images and saving property details...",
        variant: "default",
      })

      let imageUrls: string[] = []
      if (images.length > 0) {
        imageUrls = await uploadImages(images)
        toast({
          title: "Images Uploaded",
          description: `Successfully uploaded ${imageUrls.length} image(s).`,
          variant: "default",
        })
      }

      const propertyData = {
        id: propertyId,
        title: formData.title,
        price: Number.parseFloat(formData.price),
        location: formData.location,
        image: imageUrls[0] || null,
        images: imageUrls,
        type: formData.type === "other" ? formData.otherType : formData.type,
        status: formData.status,
        category: formData.category,
        description: formData.description,
        bedrooms: formData.bedrooms ? Number.parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? Number.parseInt(formData.bathrooms) : null,
        area: formData.area || null,
        building_size: formData.buildingSize || null,
        features: formData.features,
      }

      const { error } = await supabase.from("properties").insert([propertyData])

      if (error) {
        console.error("Error inserting property:", error)
        toast({
          title: "Failed to Add Property",
          description: "There was an error saving the property. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Property Added Successfully!",
        description: `Property "${formData.title}" (ID: ${propertyId}) has been added to your listings.`,
        variant: "default",
      })

      setTimeout(() => {
        router.push("/properties")
      }, 2000)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error Adding Property",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getPropertyTypeOptions = () => {
    if (formData.category === "residential") {
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
    } else if (formData.category === "commercial") {
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
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-slate-900">Add New Property</h1>
          <p className="text-slate-600">Fill in the details below to add a new property to your listings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="border-0 bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="id" className="text-sm font-medium text-slate-700">
                    Property ID (Optional)
                  </Label>
                  <Input
                    id="id"
                    type="text"
                    value={formData.id || ""}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                    placeholder="Enter custom property ID"
                    className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Leave blank for auto-generation. Can contain letters, numbers, and hyphens.
                  </p>
                </div>
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                    Property Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter property title"
                    required
                    className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price" className="text-sm font-medium text-slate-700">
                    Price (PKR) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="Enter price"
                    required
                    className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-slate-700">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location"
                    required
                    className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type" className="text-sm font-medium text-slate-700">
                    Property Type *
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>{getPropertyTypeOptions()}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-slate-700">
                    Status *
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="For Sale">For Sale</SelectItem>
                      <SelectItem value="For Rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formData.type === "other" && (
                <div>
                  <Label htmlFor="otherType" className="text-sm font-medium text-slate-700">
                    Specify Other Type *
                  </Label>
                  <Input
                    id="otherType"
                    value={formData.otherType}
                    onChange={(e) => handleInputChange("otherType", e.target.value)}
                    placeholder="e.g., Farmhouse"
                    required
                    className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.category === "residential" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="bedrooms" className="text-sm font-medium text-slate-700">
                      Bedrooms
                    </Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                      placeholder="Number of bedrooms"
                      className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms" className="text-sm font-medium text-slate-700">
                      Bathrooms
                    </Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                      placeholder="Number of bathrooms"
                      className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area" className="text-sm font-medium text-slate-700">
                      Area
                    </Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                      placeholder="e.g., 1200 sq ft"
                      className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                    />
                  </div>
                </div>
              )}

              {formData.category === "commercial" && (
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="buildingSize" className="text-sm font-medium text-slate-700">
                      Building Size
                    </Label>
                    <Input
                      id="buildingSize"
                      value={formData.buildingSize}
                      onChange={(e) => handleInputChange("buildingSize", e.target.value)}
                      placeholder="e.g., 5000 sq ft"
                      className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Property Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="images" className="text-sm font-medium text-slate-700">
                  Upload Images (Max 15)
                </Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-primary transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="flex text-sm text-slate-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                      >
                        <span>Upload files</span>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Features & Amenities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature or amenity"
                  className="border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addFeature()
                    }
                  }}
                />
                <Button type="button" onClick={addFeature} className="bg-primary hover:bg-primary/90 rounded-xl">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1 rounded-full"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="ml-2 text-slate-500 hover:text-slate-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                  Property Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the property in detail..."
                  required
                  rows={6}
                  className="mt-1 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium"
            >
              {loading ? "Adding Property..." : "Add Property"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
