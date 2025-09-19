"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { propertiesApi } from "@/lib/api/client"
import { marketplaceApi } from "@/lib/api/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function CreateListingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    address: "",
    property_type: "",
    square_footage: "",
    bedrooms: "",
    bathrooms: "",
    year_built: "",
    lot_size: "",
    images: [] as File[],
  })
  const [listingData, setListingData] = useState({
    listing_type: "fixed_price",
    price: "",
    end_time: "",
  })

  const handlePropertyChange = (field: string, value: string) => {
    setPropertyData(prev => ({ ...prev, [field]: value }))
  }

  const handleListingChange = (field: string, value: string) => {
    setListingData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPropertyData(prev => ({ ...prev, images: Array.from(e.target.files || []) }))
    }
  }

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please sign in to create a listing", variant: "destructive" })
      return
    }

    setLoading(true)

    try {
      // Step 1: Create Property
      const propertyPayload = {
        title: propertyData.title,
        description: propertyData.description,
        address: propertyData.address,
        property_type: propertyData.property_type,
        square_footage: propertyData.square_footage ? parseInt(propertyData.square_footage) : undefined,
        bedrooms: propertyData.bedrooms ? parseInt(propertyData.bedrooms) : undefined,
        bathrooms: propertyData.bathrooms ? parseInt(propertyData.bathrooms) : undefined,
        year_built: propertyData.year_built ? parseInt(propertyData.year_built) : undefined,
        lot_size: propertyData.lot_size ? parseInt(propertyData.lot_size) : undefined,
        images: propertyData.images,
      }

      const propertyResponse = await propertiesApi.createProperty(propertyPayload)
      const propertyId = propertyResponse.id

      // Step 2: Create Listing
      const listingPayload = {
        propertyId,
        price: parseFloat(listingData.price),
        listingType: listingData.listing_type,
        duration: listingData.listing_type === "auction" ? 7 : undefined, // 7 days default
      }

      if (listingData.listing_type === "auction" && listingData.end_time) {
        listingPayload.end_time = listingData.end_time
      }

      await marketplaceApi.createListing(listingPayload)

      toast({ title: "Success", description: "Your property listing has been created!" })
      router.push("/marketplace")
    } catch (error) {
      toast({ title: "Error", description: "Failed to create listing. Please try again.", variant: "destructive" })
      console.error("Create listing error:", error)
    } finally {
      setLoading(false)
    }
  }

  const isPropertyComplete = propertyData.title && propertyData.description && propertyData.address && propertyData.property_type && listingData.price

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Property Listing</h1>
          <p className="text-muted-foreground">Fill in the details below to create your property listing</p>
        </div>

        <Tabs value={step.toString()} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1">Property Details</TabsTrigger>
            <TabsTrigger value="2">Listing Details</TabsTrigger>
            <TabsTrigger value="3">Review & Submit</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                      id="title"
                      value={propertyData.title}
                      onChange={(e) => handlePropertyChange("title", e.target.value)}
                      placeholder="Enter property title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="property_type">Property Type</Label>
                    <Select value={propertyData.property_type} onValueChange={(value) => handlePropertyChange("property_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={propertyData.address}
                      onChange={(e) => handlePropertyChange("address", e.target.value)}
                      placeholder="Enter full address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="square_footage">Square Footage</Label>
                    <Input
                      id="square_footage"
                      type="number"
                      value={propertyData.square_footage}
                      onChange={(e) => handlePropertyChange("square_footage", e.target.value)}
                      placeholder="Enter square footage"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={propertyData.bedrooms}
                      onChange={(e) => handlePropertyChange("bedrooms", e.target.value)}
                      placeholder="Number of bedrooms"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={propertyData.bathrooms}
                      onChange={(e) => handlePropertyChange("bathrooms", e.target.value)}
                      placeholder="Number of bathrooms"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year_built">Year Built</Label>
                    <Input
                      id="year_built"
                      type="number"
                      value={propertyData.year_built}
                      onChange={(e) => handlePropertyChange("year_built", e.target.value)}
                      placeholder="Year built"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lot_size">Lot Size (sq ft)</Label>
                    <Input
                      id="lot_size"
                      type="number"
                      value={propertyData.lot_size}
                      onChange={(e) => handlePropertyChange("lot_size", e.target.value)}
                      placeholder="Lot size in square feet"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={propertyData.description}
                    onChange={(e) => handlePropertyChange("description", e.target.value)}
                    placeholder="Describe the property..."
                    rows={4}
                  />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={() => setStep(2)} disabled={!propertyData.title || !propertyData.address || !propertyData.property_type}>
                    Next: Listing Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="2" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="listing_type">Listing Type</Label>
                    <Select value={listingData.listing_type} onValueChange={(value) => handleListingChange("listing_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select listing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed_price">Fixed Price</SelectItem>
                        <SelectItem value="auction">Auction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={listingData.price}
                      onChange={(e) => handleListingChange("price", e.target.value)}
                      placeholder="Enter listing price"
                    />
                  </div>
                  {listingData.listing_type === "auction" && (
                    <div>
                      <Label htmlFor="end_time">Auction End Time</Label>
                      <Input
                        id="end_time"
                        type="datetime-local"
                        value={listingData.end_time}
                        onChange={(e) => handleListingChange("end_time", e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back: Property Details
                  </Button>
                  <Button type="button" onClick={() => setStep(3)} disabled={!listingData.price}>
                    Next: Review & Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="3" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <p>{propertyData.title || "Not provided"}</p>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <p>{propertyData.address || "Not provided"}</p>
                  </div>
                  <div>
                    <Label>Property Type</Label>
                    <p>{propertyData.property_type || "Not provided"}</p>
                  </div>
                  <div>
                    <Label>Price</Label>
                    <p>${listingData.price || "Not provided"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <p>{propertyData.description || "Not provided"}</p>
                  </div>
                </div>
                <div>
                  <Label>Images</Label>
                  <p>{propertyData.images.length} images selected</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back: Listing Details
                  </Button>
                  <Button onClick={handleSubmit} disabled={!isPropertyComplete || loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Listing...
                      </>
                    ) : (
                      "Create Listing"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}