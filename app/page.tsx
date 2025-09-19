"use client"

import { useState, useEffect } from 'react'
import { propertiesApi } from '@/lib/api/client'
import { PropertyCard } from '@/components/marketplace/property-card'
import { Button } from '@/components/ui/button'
import { Home as HomeIcon, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchFeaturedProperties()
  }, [])

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await propertiesApi.getProperties({ status: 'verified', limit: 10 })
      setFeaturedProperties((response as any).properties || [])
    } catch (err) {
      console.error('Failed to fetch featured properties', err)
      setError('Failed to load featured properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading featured properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Invest in Premium Property NFTs
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover fractional ownership opportunities in real estate through secure blockchain technology.
            Start your investment journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="/marketplace">
                Browse Properties
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="/login">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Available Properties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our latest properties available for investment.
          </p>
        </div>

        {error && (
          <Card className="mb-8">
            <CardContent className="py-4">
              <p className="text-destructive text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {featuredProperties.map((property) => {
              // Adapt property to PropertyCard props (since it's from /api/properties, no listing yet)
              const firstImage = property.images && property.images.length > 0 ? property.images[0] : '/placeholder.jpg'
              const isVerified = property.verification_status === 'verified'
              const price = property.listing_price ? `${property.listing_price} ETH` : 'Contact for Price'
              const isAuction = property.listing_type === 'auction'
              const auctionEndTime = property.end_time
              const currentBid = property.listing_price ? `${property.listing_price} ETH` : undefined
              const assessedValue = property.assessed_value || 'N/A'

              return (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title || 'Untitled Property'}
                  location={property.address || 'Unknown Location'}
                  price={price}
                  assessedValue={assessedValue}
                  image={firstImage}
                  isVerified={isVerified}
                  isAuction={isAuction}
                  auctionEndTime={auctionEndTime}
                  currentBid={currentBid}
                />
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <HomeIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Properties Available</h3>
              <p className="text-muted-foreground mb-4">Check back soon for new featured listings</p>
              <Button onClick={fetchFeaturedProperties} variant="outline">
                Refresh
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/marketplace">
              View All Properties
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick Search */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Find Your Next Investment</CardTitle>
              <CardDescription>Search for properties by location or type</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex gap-2 p-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter location or property type..."
                    className="pl-10 pr-4"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        router.push(`/marketplace?search=${e.currentTarget.value}`)
                      }
                    }}
                  />
                </div>
                <Button onClick={() => router.push('/marketplace')}>
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
