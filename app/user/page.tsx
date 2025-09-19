"use client"

import { useAuth } from "@/lib/hooks/use-auth"
import { marketplaceApi } from "@/lib/api/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Home, ShoppingCart, CreditCard, User, Settings, Gavel } from "lucide-react"
import { useState, useEffect } from "react"

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [bids, setBids] = useState<any[]>([])
  const [loadingBids, setLoadingBids] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchBids = async () => {
        try {
          const response = await marketplaceApi.getBids({ bidderId: user.id })
          setBids(response.bids || [])
        } catch (err) {
          console.error('Failed to fetch bids', err)
        } finally {
          setLoadingBids(false)
        }
      }
      fetchBids()
    }
  }, [user])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">TitleBase Marketplace</h1>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name || user.address?.slice(0, 6) + '...' + user.address?.slice(-4)}
              </span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">User Dashboard</h2>
          <p className="text-muted-foreground">Manage your NFT investments and portfolio</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.00 ETH</div>
              <p className="text-xs text-muted-foreground">Connected wallet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Properties Owned</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">NFT properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Ongoing auctions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">Investment value</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="bids">My Bids</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity</p>
                    <p className="text-sm">Start by exploring properties or connecting your wallet</p>
                  </div>
                </CardContent>
              </Card>
      
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push('/marketplace')}>
                    <Home className="h-4 w-4 mr-2" />
                    Browse Properties
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push('/marketplace')}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Marketplace
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push('/transactions')}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Investment History
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push('/user/settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
      
          <TabsContent value="bids" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bids</CardTitle>
                <CardDescription>Your active and past bids</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingBids ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading bids...</p>
                  </div>
                ) : bids.length > 0 ? (
                  <div className="space-y-4">
                    {bids.map((bid) => (
                      <div key={bid.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h4 className="font-medium">{bid.listing_title}</h4>
                          <p className="text-sm text-muted-foreground">Bid: {bid.amount} ETH</p>
                          <p className="text-sm text-muted-foreground">Status: {bid.status}</p>
                        </div>
                        <Badge variant={bid.status === 'active' ? "default" : "secondary"}>
                          {bid.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bids yet</p>
                    <p className="text-sm">Place bids on auction properties in the marketplace</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Properties</CardTitle>
                <CardDescription>NFT properties you own</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No properties owned yet</p>
                  <p className="text-sm">Browse the marketplace to invest in properties</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Track your investments and returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No investments yet</p>
                  <p className="text-sm">Start investing in property NFTs</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Wallet Address</label>
                    <p className="text-sm text-muted-foreground font-mono">
                      {user.address || 'Not connected'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Account Role</label>
                    <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">KYC Status</label>
                    <Badge variant={user.isKYCVerified ? "default" : "secondary"}>
                      {user.isKYCVerified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Account Status</label>
                    <Badge variant={user.isActive ? "default" : "destructive"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
