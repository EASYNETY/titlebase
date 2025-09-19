"use client"

import { useState } from "react"
import { SaaSHeader } from "@/components/layout/saas-header"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Gavel, TrendingUp, Search, Filter } from "lucide-react"
import { BidModal } from "@/components/marketplace/bid-modal"

const mockAuctions = [
  {
    id: "auction-1",
    title: "Luxury Auckland Penthouse",
    location: "Viaduct Harbour, Auckland",
    image: "/luxury-auckland-penthouse.png",
    currentBid: "4.2 ETH",
    reservePrice: "3.8 ETH",
    auctionEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
    bidCount: 12,
    isVerified: true,
  },
  {
    id: "auction-2",
    title: "Wellington Waterfront Apartment",
    location: "Oriental Bay, Wellington",
    image: "/wellington-waterfront-apartment.png",
    currentBid: "2.8 ETH",
    reservePrice: "2.5 ETH",
    auctionEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours
    bidCount: 8,
    isVerified: true,
  },
  {
    id: "auction-3",
    title: "Christchurch Historic Villa",
    location: "Fendalton, Christchurch",
    image: "/christchurch-historic-villa.png",
    currentBid: "3.5 ETH",
    reservePrice: "3.2 ETH",
    auctionEndTime: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(), // 18 hours
    bidCount: 15,
    isVerified: true,
  },
  {
    id: "auction-4",
    title: "Queenstown Mountain Lodge",
    location: "Kelvin Heights, Queenstown",
    image: "/queenstown-mountain-lodge.png",
    currentBid: "1.9 ETH",
    reservePrice: "1.8 ETH",
    auctionEndTime: new Date(Date.now() + 30 * 60 * 60 * 1000).toISOString(), // 30 hours
    bidCount: 6,
    isVerified: false,
  },
  {
    id: "auction-5",
    title: "Hamilton Family Home",
    location: "Hillcrest, Hamilton",
    image: "/hamilton-family-home.png",
    currentBid: "1.4 ETH",
    reservePrice: "1.2 ETH",
    auctionEndTime: new Date(Date.now() + 45 * 60 * 60 * 1000).toISOString(), // 45 hours
    bidCount: 4,
    isVerified: true,
  },
  {
    id: "auction-6",
    title: "Tauranga Beach House",
    location: "Mount Maunganui, Tauranga",
    image: "/tauranga-beach-house.png",
    currentBid: "2.1 ETH",
    reservePrice: "1.9 ETH",
    auctionEndTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // 72 hours
    bidCount: 9,
    isVerified: true,
  },
]

export default function AuctionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAuction, setSelectedAuction] = useState<(typeof mockAuctions)[0] | null>(null)
  const [showBidModal, setShowBidModal] = useState(false)

  const formatTimeRemaining = (endTime: string) => {
    const now = new Date()
    const end = new Date(endTime)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Auction Ended"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h left`
    }

    return `${hours}h ${minutes}m left`
  }

  const handlePlaceBid = (auction: (typeof mockAuctions)[0]) => {
    setSelectedAuction(auction)
    setShowBidModal(true)
  }

  const filteredAuctions = mockAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      <SaaSHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">Live Auctions</h1>
            <p className="text-muted-foreground">Bid on premium title-backed properties across New Zealand</p>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search auctions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{filteredAuctions.length}</div>
              <div className="text-sm text-muted-foreground">Live Auctions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredAuctions.reduce((sum, auction) => sum + auction.bidCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Bids</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">18.2 ETH</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">2h 15m</div>
              <div className="text-sm text-muted-foreground">Next Ending</div>
            </CardContent>
          </Card>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-slate-100 relative">
                {/* Time remaining badge */}
                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimeRemaining(auction.auctionEndTime)}
                </Badge>

                {/* Verification badge */}
                {auction.isVerified && (
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white">Verified</Badge>
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                  <Gavel className="w-12 h-12 text-slate-400" />
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{auction.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{auction.location}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Bid</span>
                    <span className="font-bold text-lg text-primary">{auction.currentBid}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reserve Price</span>
                    <span className="text-sm">{auction.reservePrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Bids</span>
                    <span className="text-sm font-medium">{auction.bidCount}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => handlePlaceBid(auction)}>
                    Place Bid
                  </Button>
                  <Button variant="outline" size="icon">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <Gavel className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No auctions found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or check back later for new auctions.
            </p>
          </div>
        )}
      </main>

      <MobileNav />

      {selectedAuction && (
        <BidModal
          isOpen={showBidModal}
          onClose={() => {
            setShowBidModal(false)
            setSelectedAuction(null)
          }}
          property={{
            id: selectedAuction.id,
            title: selectedAuction.title,
            currentBid: selectedAuction.currentBid,
            reservePrice: selectedAuction.reservePrice,
            auctionEndTime: selectedAuction.auctionEndTime,
            minBidIncrement: 0.05,
          }}
        />
      )}
    </div>
  )
}
