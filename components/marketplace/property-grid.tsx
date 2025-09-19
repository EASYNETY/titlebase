"use client"

import { PropertyCard } from "./property-card"

interface Property {
  id: string
  title: string
  location: string
  price: string
  assessedValue: string
  image: string
  isVerified: boolean
  isAuction: boolean
  auctionEndTime?: string
  currentBid?: string
}

interface PropertyGridProps {
  properties: Property[]
  loading?: boolean
}

export function PropertyGrid({ properties, loading }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg h-48 mb-4"></div>
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded w-3/4"></div>
              <div className="bg-muted h-3 rounded w-1/2"></div>
              <div className="bg-muted h-6 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">🏠</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No properties found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or check back later for new listings.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  )
}
