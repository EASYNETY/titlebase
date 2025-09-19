"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Verified, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
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
  className?: string
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  assessedValue,
  image,
  isVerified,
  isAuction,
  auctionEndTime,
  currentBid,
  className,
}: PropertyCardProps) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)

  const formatTimeRemaining = (endTime: string) => {
    const now = new Date()
    const end = new Date(endTime)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Ended"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h`
    }

    return `${hours}h ${minutes}m`
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    if (
      e.target instanceof Element && 
      (e.target.closest('button') || e.target.closest('a'))
    ) {
      return
    }
    
    router.push(`/property/${id}`)
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/property/${id}`)
  }

  return (
    <Card 
      className={cn("overflow-hidden hover:shadow-lg transition-shadow cursor-pointer", className)}
      onClick={handleCardClick}
    >
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={240}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.src = "/placeholder.svg"
          }}
        />

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isVerified && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              <Verified className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {isAuction && (
            <Badge variant="destructive">
              <Clock className="w-3 h-3 mr-1" />
              Auction
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorited(!isFavorited)
          }}
        >
          <Heart className={cn("w-4 h-4", isFavorited ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Location */}
          <div>
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Price Information */}
          <div className="space-y-1">
            {isAuction ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Bid</span>
                  {auctionEndTime && (
                    <span className="text-sm font-medium text-destructive">{formatTimeRemaining(auctionEndTime)}</span>
                  )}
                </div>
                <div className="text-xl font-bold text-primary">{currentBid || "No bids yet"}</div>
              </>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">Fixed Price</span>
                <div className="text-xl font-bold text-primary">{price}</div>
              </>
            )}
            <div className="text-sm text-muted-foreground">Assessed Value:NZD {assessedValue}</div>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full" 
            variant={isAuction ? "destructive" : "default"}
            onClick={handleActionClick}
          >
            {isAuction ? "Place Bid" : "Buy Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}