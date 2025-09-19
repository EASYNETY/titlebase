import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Shield, Zap, Copy, ExternalLink, RefreshCw } from "lucide-react"

export default function SmartAccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Smart Account</h1>
          <p className="text-slate-600">Manage your account abstraction wallet and gasless transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Smart Account Address</p>
                    <p className="text-sm text-slate-600 font-mono">0x1234567890abcdef1234567890abcdef12345678</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$12,450</div>
                    <div className="text-sm text-slate-600">USDC Balance</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">47</div>
                    <div className="text-sm text-slate-600">Gasless Transactions</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">$0.00</div>
                    <div className="text-sm text-slate-600">Gas Fees Saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="transactions" className="space-y-6">
              <TabsList>
                <TabsTrigger value="transactions">Recent Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="recovery">Recovery</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Smart Account Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: "Property Purchase", amount: "$75,000", date: "2024-01-15", gasless: true },
                        { type: "Bid Placement", amount: "$65,000", date: "2024-01-12", gasless: true },
                        { type: "Distribution Claim", amount: "$450", date: "2024-01-10", gasless: true },
                        { type: "Fractional Purchase", amount: "$3,500", date: "2024-01-08", gasless: true },
                      ].map((tx, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{tx.type}</div>
                            <div className="text-sm text-slate-600">{tx.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{tx.amount}</div>
                            {tx.gasless && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Gasless
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Gasless Transactions</p>
                        <p className="text-sm text-slate-600">Enable gasless transactions for marketplace activities</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-approve Small Transactions</p>
                        <p className="text-sm text-slate-600">Automatically approve transactions under $100</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Session Keys</p>
                        <p className="text-sm text-slate-600">Manage temporary signing keys for enhanced security</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recovery" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Account Recovery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="font-medium text-yellow-800">Social Recovery Enabled</p>
                      <p className="text-sm text-yellow-700">
                        Your account can be recovered using your social login credentials
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Recovery Email</Label>
                      <Input defaultValue="john.doe@example.com" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Backup Phrase</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Click to reveal backup phrase" disabled />
                        <Button variant="outline">Reveal</Button>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Update Recovery Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Wallet className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Balance
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">KYC Status</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Account Type</span>
                  <Badge className="bg-blue-100 text-blue-800">Smart Account</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network</span>
                  <Badge className="bg-purple-100 text-purple-800">Base</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
