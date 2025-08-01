"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { Edit, Trash2, Plus, X, Upload, Search, Lock } from "lucide-react"

interface Property {
  id: string
  title: string
  price: number
  location: string
  image: string | null
  images: string[]
  type: string
  status: string
  category: string
  description: string
  bedrooms: number | null
  bathrooms: number | null
  area: string | null
  building_size: string | null
  lease_term: string | null
  features: string[]
  created_at: string
}

interface EditFormData {
  id: string
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

export default function AdminListingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [allProperties, setAllProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [filters, setFilters] = useState({
    search: "",
    category: "all-categories",
    propertyType: "all-types",
    status: "all-status",
  })
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [editFormData, setEditFormData] = useState<EditFormData>({
    id: "",
    title: "",
    price: "",
    location: "",
    type: "",
    otherType: "",
    status: "",
    category: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    buildingSize: "",
    features: [],
  })
  const [newFeature, setNewFeature] = useState("")
  const [editImages, setEditImages] = useState<File[]>([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching properties:", error)
        toast({
          title: "Error Loading Properties",
          description: "Failed to load properties. Please refresh the page.",
          variant: "destructive",
        })
        return
      }

      const formattedProperties = data || []
      setAllProperties(formattedProperties)
      setFilteredProperties(formattedProperties)
      setProperties(formattedProperties)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error Loading Properties",
        description: "An unexpected error occurred while loading properties.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "Farhan777*&#@") {
      setIsAuthenticated(true)
      setPasswordError("")
    } else {
      setPasswordError("Incorrect password. Please try again.")
      setPassword("")
    }
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)

    const standardResidentialTypes = [
      "plot",
      "house",
      "apartment",
      "penthouse",
      "townhouse",
      "duplex",
      "portion",
      "building",
    ]
    const standardCommercialTypes = ["plot", "building", "showroom", "shop", "office", "warehouse"]
    const allStandardTypes = [...new Set([...standardResidentialTypes, ...standardCommercialTypes])]
    const isOtherType = !allStandardTypes.includes(property.type.toLowerCase())

    setEditFormData({
      id: property.id,
      title: property.title,
      price: property.price.toString(),
      location: property.location,
      type: isOtherType ? "other" : property.type,
      otherType: isOtherType ? property.type : "",
      status: property.status,
      category: property.category,
      description: property.description,
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      area: property.area || "",
      buildingSize: property.building_size || "",
      features: property.features || [],
    })
    setEditImages([])
    setIsEditDialogOpen(true)

    toast({
      title: "Edit Mode Activated",
      description: `Now editing "${property.title}". Make your changes and save.`,
      variant: "default",
    })
  }

  const handleEditInputChange = (field: keyof EditFormData, value: string) => {
    setEditFormData((prev) => {
      const newState = { ...prev, [field]: value }
      if (field === "type" && value !== "other") {
        newState.otherType = ""
      }
      if (field === "category") {
        newState.type = ""
        newState.otherType = ""
      }
      return newState
    })
  }

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setEditImages(selectedFiles)
      toast({
        title: "New Images Selected",
        description: `${selectedFiles.length} new image(s) ready for upload.`,
        variant: "default",
      })
    }
  }

  const removeEditImage = (index: number) => {
    setEditImages((prev) => prev.filter((_, i) => i !== index))
    toast({
      title: "Image Removed",
      description: "Image has been removed from the upload queue.",
      variant: "default",
    })
  }

  const addEditFeature = () => {
    if (newFeature.trim() && !editFormData.features.includes(newFeature.trim())) {
      setEditFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
      toast({
        title: "Feature Added",
        description: `"${newFeature.trim()}" has been added to the property features.`,
        variant: "default",
      })
    } else if (editFormData.features.includes(newFeature.trim())) {
      toast({
        title: "Duplicate Feature",
        description: "This feature has already been added.",
        variant: "destructive",
      })
    }
  }

  const removeEditFeature = (feature: string) => {
    setEditFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }))
    toast({
      title: "Feature Removed",
      description: `"${feature}" has been removed from the property features.`,
      variant: "default",
    })
  }

  const validateEditForm = (): boolean => {
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
      if (!editFormData[field as keyof EditFormData]) {
        toast({
          title: "Missing Required Field",
          description: `Please fill in the ${label} field.`,
          variant: "destructive",
        })
        return false
      }
    }

    if (editFormData.type === "other" && !editFormData.otherType.trim()) {
      toast({
        title: "Missing Required Field",
        description: "Please specify the property type for 'Other'.",
        variant: "destructive",
      })
      return false
    }

    if (editFormData.price && isNaN(Number(editFormData.price))) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid numeric price.",
        variant: "destructive",
      })
      return false
    }

    if (editFormData.bedrooms && isNaN(Number(editFormData.bedrooms))) {
      toast({
        title: "Invalid Bedrooms",
        description: "Please enter a valid number for bedrooms.",
        variant: "destructive",
      })
      return false
    }

    if (editFormData.bathrooms && isNaN(Number(editFormData.bathrooms))) {
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

  const deleteImagesFromStorage = async (imageUrls: string[]) => {
    const deletionResults = await Promise.allSettled(
      imageUrls.map(async (imageUrl) => {
        if (!imageUrl) return { status: "fulfilled", value: "skipped" }

        const response = await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to delete image")
        }
        return response.json()
      }),
    )

    const failedDeletions = deletionResults.filter((r) => r.status === "rejected")
    if (failedDeletions.length > 0) {
      console.error(`${failedDeletions.length} image(s) failed to delete.`)
      toast({
        title: "Image Deletion Incomplete",
        description: `${failedDeletions.length} image(s) could not be deleted. Please check the console and storage bucket.`,
        variant: "destructive",
      })
    }
  }

  const handleUpdate = async () => {
    if (!validateEditForm() || !editingProperty) {
      return
    }

    setUpdateLoading(true)

    try {
      toast({
        title: "Updating Property",
        description: "Processing changes and uploading new images...",
        variant: "default",
      })

      let newImageUrls: string[] = []
      if (editImages.length > 0) {
        newImageUrls = await uploadImages(editImages)
        toast({
          title: "Images Uploaded",
          description: `Successfully uploaded ${newImageUrls.length} new image(s).`,
          variant: "default",
        })
      }

      const existingImages = editingProperty.images || []
      const allImages = [...existingImages, ...newImageUrls]

      const updatedData = {
        title: editFormData.title,
        price: Number.parseFloat(editFormData.price),
        location: editFormData.location,
        type: editFormData.type === "other" ? editFormData.otherType : editFormData.type,
        status: editFormData.status,
        category: editFormData.category,
        description: editFormData.description,
        bedrooms: editFormData.bedrooms ? Number.parseInt(editFormData.bedrooms) : null,
        bathrooms: editFormData.bathrooms ? Number.parseInt(editFormData.bathrooms) : null,
        area: editFormData.area || null,
        building_size: editFormData.buildingSize || null,
        features: editFormData.features,
        image: allImages[0] || null,
        images: allImages,
      }

      const { error } = await supabase.from("properties").update(updatedData).eq("id", editingProperty.id)

      if (error) {
        console.error("Error updating property:", error)
        toast({
          title: "Failed to Update Property",
          description: "There was an error updating the property. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Property Updated Successfully!",
        description: `"${editFormData.title}" has been updated with your changes.`,
        variant: "default",
      })

      setIsEditDialogOpen(false)
      setEditingProperty(null)
      fetchProperties()
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error Updating Property",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleDelete = async (property: Property) => {
    try {
      toast({
        title: "Deleting Property",
        description: "Removing property and associated images...",
        variant: "default",
      })

      const imagesToDelete = property.images || []
      if (property.image && !imagesToDelete.includes(property.image)) {
        imagesToDelete.push(property.image)
      }

      if (imagesToDelete.length > 0) {
        await deleteImagesFromStorage(imagesToDelete)
      }

      const { error } = await supabase.from("properties").delete().eq("id", property.id)

      if (error) {
        console.error("Error deleting property:", error)
        toast({
          title: "Failed to Delete Property",
          description: "There was an error deleting the property. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Property Deleted Successfully!",
        description: `"${property.title}" and all associated images have been permanently removed.`,
        variant: "default",
      })

      fetchProperties()
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error Deleting Property",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
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

    setProperties(filtered)
    setFilteredProperties(filtered)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all-categories",
      propertyType: "all-types",
      status: "all-status",
    })
    setProperties(allProperties)
    setFilteredProperties(allProperties)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <Card className="w-full max-w-md border-0 bg-white rounded-2xl shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access Required</h1>
              <p className="text-slate-600">Please enter the admin password to continue</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1 rounded-xl border-slate-300 focus:border-primary focus:ring-primary"
                  required
                />
                {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-red-500 hover:from-red-600 hover:to-red-500 text-white rounded-xl py-3 font-semibold shadow-lg"
              >
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600">Loading properties...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Property Listings</h1>
          <p className="text-slate-600 mt-2">Manage your property listings</p>
        </div>
        <Button
          onClick={() => (window.location.href = "/add-property")}
          className="bg-primary hover:bg-primary/90 text-white rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <Card
        className="mb-8 border-0 bg-white rounded-2xl"
        style={{
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-1">
              <label className="text-sm font-medium mb-2 block text-slate-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by title or location..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10 border-slate-300 focus:border-primary focus:ring-primary rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-slate-700">Category</label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary rounded-xl">
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
              <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
                <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary rounded-xl">
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
                <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary rounded-xl">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(filters.search ||
            filters.propertyType !== "all-types" ||
            filters.status !== "all-status" ||
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

      <div className="mb-4 flex justify-between items-center">
        <p className="text-slate-600">
          Showing {properties.length} of {allProperties.length} properties
        </p>
      </div>

      {properties.length === 0 ? (
        <Card className="border-0 bg-white rounded-2xl shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Properties Found</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first property listing.</p>
              <Button
                onClick={() => (window.location.href = "/add-property")}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Property
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="border-0 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={property.image || "/placeholder.svg?height=200&width=300"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-slate-700">
                    {property.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90 text-slate-700 border-slate-300">
                    ID: {property.id}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{property.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">PKR {property.price.toLocaleString()}</p>
                  <p className="text-slate-600 mb-2">{property.location}</p>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {property.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">
                      {property.type}
                    </Badge>
                  </div>
                </div>

                {property.category === "residential" && (
                  <div className="flex gap-4 text-sm text-slate-600 mb-4">
                    {property.bedrooms && <span>{property.bedrooms} beds</span>}
                    {property.bathrooms && <span>{property.bathrooms} baths</span>}
                    {property.area && <span>{property.area}</span>}
                  </div>
                )}

                {property.category === "commercial" && (
                  <div className="flex gap-4 text-sm text-slate-600 mb-4">
                    {property.building_size && <span>{property.building_size}</span>}
                  </div>
                )}

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{property.description}</p>

                {property.features && property.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {property.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{property.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(property)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-slate-300 hover:bg-slate-50 rounded-xl"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50 rounded-xl bg-transparent"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Property</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{property.title}"? This action cannot be undone and will
                          permanently remove the property and all associated images.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(property)}
                          className="bg-red-600 hover:bg-red-700 rounded-xl"
                        >
                          Delete Property
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Property</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-id" className="text-sm font-medium">
                      Property ID
                    </Label>
                    <Input id="edit-id" value={editFormData.id} disabled className="bg-slate-50 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="edit-title" className="text-sm font-medium">
                      Property Title *
                    </Label>
                    <Input
                      id="edit-title"
                      value={editFormData.title}
                      onChange={(e) => handleEditInputChange("title", e.target.value)}
                      placeholder="Enter property title"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-price" className="text-sm font-medium">
                      Price (PKR) *
                    </Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={editFormData.price}
                      onChange={(e) => handleEditInputChange("price", e.target.value)}
                      placeholder="Enter price"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-location" className="text-sm font-medium">
                      Location *
                    </Label>
                    <Input
                      id="edit-location"
                      value={editFormData.location}
                      onChange={(e) => handleEditInputChange("location", e.target.value)}
                      placeholder="Enter location"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-category" className="text-sm font-medium">
                      Category *
                    </Label>
                    <Select
                      value={editFormData.category}
                      onValueChange={(value) => handleEditInputChange("category", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-type" className="text-sm font-medium">
                      Property Type *
                    </Label>
                    <Select value={editFormData.type} onValueChange={(value) => handleEditInputChange("type", value)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>{getPropertyTypeOptions(editFormData.category)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-status" className="text-sm font-medium">
                      Status *
                    </Label>
                    <Select
                      value={editFormData.status}
                      onValueChange={(value) => handleEditInputChange("status", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {editFormData.type === "other" && (
                  <div>
                    <Label htmlFor="edit-otherType" className="text-sm font-medium">
                      Specify Other Type *
                    </Label>
                    <Input
                      id="edit-otherType"
                      value={editFormData.otherType}
                      onChange={(e) => handleEditInputChange("otherType", e.target.value)}
                      placeholder="e.g., Farmhouse"
                      className="rounded-xl"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editFormData.category === "residential" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="edit-bedrooms" className="text-sm font-medium">
                        Bedrooms
                      </Label>
                      <Input
                        id="edit-bedrooms"
                        type="number"
                        value={editFormData.bedrooms}
                        onChange={(e) => handleEditInputChange("bedrooms", e.target.value)}
                        placeholder="Number of bedrooms"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-bathrooms" className="text-sm font-medium">
                        Bathrooms
                      </Label>
                      <Input
                        id="edit-bathrooms"
                        type="number"
                        value={editFormData.bathrooms}
                        onChange={(e) => handleEditInputChange("bathrooms", e.target.value)}
                        placeholder="Number of bathrooms"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-area" className="text-sm font-medium">
                        Area
                      </Label>
                      <Input
                        id="edit-area"
                        value={editFormData.area}
                        onChange={(e) => handleEditInputChange("area", e.target.value)}
                        placeholder="e.g., 1200 sq ft"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {editFormData.category === "commercial" && (
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="edit-buildingSize" className="text-sm font-medium">
                        Building Size
                      </Label>
                      <Input
                        id="edit-buildingSize"
                        value={editFormData.buildingSize}
                        onChange={(e) => handleEditInputChange("buildingSize", e.target.value)}
                        placeholder="e.g., 5000 sq ft"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Property Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingProperty?.images && editingProperty.images.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Current Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {editingProperty.images.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={`Current ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="edit-images" className="text-sm font-medium">
                    Add New Images (Max 15 total)
                  </Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-primary transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label
                          htmlFor="edit-images"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80"
                        >
                          <span>Upload new files</span>
                          <input
                            id="edit-images"
                            name="edit-images"
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*"
                            onChange={handleEditImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB each</p>
                    </div>
                  </div>
                </div>

                {editImages.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">New Images to Upload</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {editImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image) || "/placeholder.svg"}
                            alt={`New ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeEditImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature or amenity"
                    className="rounded-xl"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addEditFeature()
                      }
                    }}
                  />
                  <Button type="button" onClick={addEditFeature} className="bg-primary hover:bg-primary/90 rounded-xl">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {editFormData.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {editFormData.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1 rounded-full"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeEditFeature(feature)}
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

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="edit-description" className="text-sm font-medium">
                    Property Description *
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={editFormData.description}
                    onChange={(e) => handleEditInputChange("description", e.target.value)}
                    placeholder="Describe the property in detail..."
                    rows={6}
                    className="mt-1 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateLoading}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl"
              >
                {updateLoading ? "Updating..." : "Update Property"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
