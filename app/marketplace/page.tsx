"use client"

import { useState, useEffect } from 'react'
import { marketplaceApi } from '@/lib/api/client'
import { PropertyCard } from '@/components/marketplace/property-card'
import { Button } from '@/components/ui/button'
import { Search, Filter, Grid, List, Home } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/lib/hooks/use-auth'

export default function Marketplace() {
  const { user } = useAuth()
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('active')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchListings()
  }, [searchTerm, filterType, filterStatus, page])

  const fetchListings = async () => {
    try {
      setLoading(true)
      setError(null)
      const params: any = {
        page: page.toString(),
        limit: '20',
        status: filterStatus,
      }

      if (searchTerm) params.search = searchTerm
      if (filterType !== 'all') params.type = filterType

      const response = await marketplaceApi.getListings(params)
      setListings(response.listings || [])
      setTotalPages(response.pagination?.pages || 1)
    } catch (err) {
      console.error('Failed to fetch listings', err)
      setError('Failed to load properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredListings = listings.filter(listing =>
    listing.property_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.property_description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
              <p className="text-muted-foreground">Discover and invest in premium property NFTs</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={viewMode} onValueChange={(value: 'grid' | 'list') => setViewMode(value)}>
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">
                    <Grid className="h-4 w-4 mr-2" /> Grid
                  </SelectItem>
                  <SelectItem value="list">
                    <List className="h-4 w-4 mr-2" /> List
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">Filters</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={fetchListings}>
                <Filter className="h-4 w-4 mr-2" /> Clear Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Properties</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Property Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Listing Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Active" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={fetchListings} className="w-full">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="mt-4">
            <CardContent className="py-4">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{listings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Fixed Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {listings.filter(l => l.listing_type === 'fixed_price').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {listings.filter(l => l.listing_type === 'auction').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Available Properties ({filteredListings.length})
            </h2>
            {user && (
              <Button onClick={() => router.push('/create-listing')}>
                + List Your Property
              </Button>
            )}
          </div>

          {filteredListings.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {filteredListings.map((listing) => {
                const firstImage = listing.property_images && listing.property_images.length > 0 ? listing.property_images[0] : '/placeholder.jpg';
                const isVerified = listing.verification_status === 'verified';
                const isAuction = listing.listing_type === 'auction';
                const price = `${listing.price} ETH`;
                const currentBid = isAuction ? (listing.current_bid ? `${listing.current_bid} ETH` : "No bids yet") : undefined;
                const auctionEndTime = isAuction ? listing.end_time : undefined;
                const assessedValue = listing.assessed_value ? `$${listing.assessed_value.toLocaleString()}` : 'N/A';

                return (
                  <PropertyCard
                    key={listing.id}
                    id={listing.property_id}
                    title={listing.property_title || 'Untitled Property'}
                    location={listing.address || 'Unknown Location'}
                    price={price}
                    assessedValue={assessedValue}
                    image={firstImage}
                    isVerified={isVerified}
                    isAuction={isAuction}
                    auctionEndTime={auctionEndTime}
                    currentBid={currentBid}
                  />
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Home className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button onClick={fetchListings} variant="outline">
                  Refresh
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Button
                  key={p}
                  variant={p === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
