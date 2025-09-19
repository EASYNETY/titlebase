"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"
import { marketplaceApi } from "@/lib/api/client"
import { propertiesApi } from "@/lib/api/client"
import { paymentsApi } from "@/lib/api/client"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BidModal } from "@/components/marketplace/bid-modal"
import { PaymentModal } from "@/components/payments/payment-modal"
import { MapPin, Clock, Verified, TrendingUp, FileText, Shield, Heart, Share, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Property {
  id: string
  title: string
  description: string
  address: string
  property_type: string
  square_footage?: number
  bedrooms?: number
  bathrooms?: number
  year_built?: number
  lot_size?: number
  images: string[]
  verification_status: string
}

interface Listing {
  id: string
  property_id: string
  listing_type: 'fixed_price' | 'auction'
  price: string
  currency: string
  start_time: string
  end_time?: string
  status: string
  current_bid?: string
  seller_username: string
  seller_address: string
}

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [property, setProperty] = useState<Property | null>(null)
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [bidAmount, setBidAmount] = useState("")
  const [isFavorited, setIsFavorited] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showBidModal, setShowBidModal] = useState(false)
  const [bidding, setBidding] = useState(false)
  const [buying, setBuying] = useState(false)
  const [payment, setPayment] = useState<any>(null)

  // Fetch property data
  useEffect(() => {
    const propertyId = params.id as string
    if (!propertyId) {
      router.push('/marketplace')
      return
    }

    const fetchProperty = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch property first
        const propertyData = await propertiesApi.getProperty(propertyId) as any
        const fetchedProperty = propertyData.property
        setProperty(fetchedProperty)

        // Fetch active listing for the property
        const listingData = await marketplaceApi.getListings({ propertyId, status: 'active' }) as any
        if (listingData.listings && listingData.listings.length > 0) {
          const fetchedListing = listingData.listings[0]
          setListing(fetchedListing)

          // Combine data
          const combinedProperty = {
            ...fetchedProperty,
            assessed_value: fetchedListing.assessed_value,
            title: fetchedListing.property_title,
            description: fetchedListing.property_description,
            images: fetchedListing.property_images,
            price: fetchedListing.price,
            seller: fetchedListing.seller_username,
            currentBid: fetchedListing.current_bid,
            isAuction: fetchedListing.listing_type === 'auction',
            auctionEndTime: fetchedListing.end_time,
            isVerified: fetchedProperty.verification_status === 'verified',
          }
          setProperty(combinedProperty)
        } else {
          // No active listing, use property data as is
          setProperty({
            ...fetchedProperty,
            isVerified: fetchedProperty.verification_status === 'verified',
          })
        }

      } catch (err) {
        console.error('Error fetching property:', err)
        toast({
          title: 'Error',
          description: 'Property not found',
          variant: 'destructive',
        })
        router.push('/marketplace')
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [params.id, router, toast])

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to purchase',
        variant: 'destructive',
      })
      router.push('/login')
      return
    }

    if (!listing || listing.listing_type !== 'fixed_price') {
      toast({
        title: 'Invalid Listing',
        description: 'This property is not available for direct purchase',
        variant: 'destructive',
      })
      return
    }

    setShowPaymentModal(true)
  }

  const handlePlaceBid = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to place a bid',
        variant: 'destructive',
      })
      router.push('/login')
      return
    }
    if (!listing || listing.listing_type !== 'auction') {
      toast({
        title: 'Invalid Listing',
        description: 'This property is not available for bidding',
        variant: 'destructive',
      })
      return
    }
    setShowBidModal(true)
  }

  const handlePaymentComplete = (paymentResult: any) => {
    setShowPaymentModal(false)
    const params = new URLSearchParams({
      id: paymentResult.id || 'N/A',
      propertyTitle: property.title,
      amount: paymentResult.amount || listing.price,
      fractions: paymentResult.fractions?.toString() || '100',
      totalFractions: '1000',
      seller: listing.seller_username,
    })
    router.push(`/receipt?${params.toString()}`)
    // TODO: Mint fractional tokens
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading property details...</span>
            </div>
          </div>
        </main>
        <MobileNav />
      </div>
    )
  }

  if (error || !property || !listing) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
            <p className="text-muted-foreground mb-4">
              {error || 'The property you are looking for does not exist or has been removed.'}
            </p>
            <Button onClick={() => router.push('/marketplace')}>
              Go Back to Marketplace
            </Button>
          </div>
        </main>
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={property.images?.[selectedImage] || "/placeholder.svg"}
              alt={property.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />

            {/* Action buttons overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsFavorited(!isFavorited)}>
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="secondary" size="sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>

            {/* Verification badge */}
            {property.isVerified && (
              <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                <Verified className="w-3 h-3 mr-1" />
                Verified Title
              </Badge>
            )}
          </div>

          {/* Thumbnail gallery */}
          {property.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`View ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">{listing.price} ETH</div>
              <div className="text-sm text-muted-foreground">Assessed Value: <strong>NZD</strong>{property.assessed_value ? property.assessed_value.toLocaleString() : 'N/A'}</div>
              {listing.listing_type === 'auction' && listing.current_bid && (
                <div className="text-sm text-muted-foreground">Current Bid: {listing.current_bid} ETH</div>
              )}
            </div>

            <div className="flex gap-3">
              {property.isAuction ? (
                <div className="flex gap-2 w-full md:w-auto">
                  <Input
                    placeholder="Enter bid amount (ETH)"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handlePlaceBid} 
                    className="shrink-0"
                    disabled={bidding || !bidAmount}
                  >
                    {bidding ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Placing...
                      </>
                    ) : (
                      'Place Bid'
                    )}
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleBuyNow} 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={buying}
                >
                  {buying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Buy Now'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Property Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="title">Title Info</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{listing.property_description}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Bedrooms</span>
                    <span className="font-medium">{property.bedrooms || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bathrooms</span>
                    <span className="font-medium">{property.bathrooms || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Square Feet</span>
                    <span className="font-medium">{property.square_footage?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year Built</span>
                    <span className="font-medium">{property.year_built || 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Verified className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Title Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Legal Documents Complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Blockchain Secured</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Type</span>
                      <span className="font-medium">{property.property_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bedrooms</span>
                      <span className="font-medium">{property.bedrooms || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bathrooms</span>
                      <span className="font-medium">{property.bathrooms || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Square Feet</span>
                      <span className="font-medium">{property.square_footage?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year Built</span>
                      <span className="font-medium">{property.year_built || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lot Size</span>
                      <span className="font-medium">{property.lot_size || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Full Address</span>
                      <span className="font-medium text-right">{property.address}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="title">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Title Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {property.titleInfo ? (
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Property ID</span>
                      <p className="font-mono text-sm">{property.titleInfo.propertyId}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Legal Description</span>
                      <p className="text-sm">{property.titleInfo.legalDescription}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Jurisdiction</span>
                      <p className="text-sm">{property.titleInfo.jurisdiction}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Document Hash</span>
                      <p className="font-mono text-sm break-all">{property.titleInfo.documentHash}</p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">Verified By</span>
                        <p className="text-sm">{property.titleInfo.verifiedBy}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Verification Date</span>
                        <p className="text-sm">{property.titleInfo.verificationDate}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Title information not available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Price History</CardTitle>
              </CardHeader>
              <CardContent>
                {property.priceHistory && property.priceHistory.length > 0 ? (
                  <div className="space-y-3">
                    {property.priceHistory.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span className="text-sm text-muted-foreground">{entry.date}</span>
                        <span className="font-medium">{entry.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No price history available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Payment Modal */}
      {showBidModal && listing && (
        <BidModal
          isOpen={showBidModal}
          onClose={() => setShowBidModal(false)}
          onSuccess={() => fetchProperty()}
          property={{
            id: listing.id,
            title: property.title,
            currentBid: listing.current_bid,
            reservePrice: listing.price,
            auctionEndTime: listing.end_time,
            minBidIncrement: 0.05,
          }}
        />
      )}

      {showPaymentModal && listing && property && (
        <PaymentModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          property={{
            id: listing.id,
            title: property.title,
            price: listing.price,
            seller: listing.seller_username,
            image: property.images?.[0] || '/placeholder.jpg',
            assessed_value: property.assessed_value || 0,
          }}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      <MobileNav />
    </div>
  )
}