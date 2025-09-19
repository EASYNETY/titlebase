"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  DollarSign,
  TrendingUp,
  Percent,
  Calendar,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  RefreshCw,
} from "lucide-react"

interface RevenueStream {
  id: string
  name: string
  type: "marketplace_fee" | "subscription" | "premium_listing" | "transaction_fee"
  rate: number
  rateType: "percentage" | "fixed"
  revenue: number
  transactions: number
  isActive: boolean
}

interface CommissionRule {
  id: string
  name: string
  propertyType: string
  feeRate: number
  minimumFee: number
  maximumFee?: number
  isActive: boolean
  createdAt: string
}

interface PayoutSchedule {
  id: string
  recipientType: "property_owner" | "investor" | "referral_partner"
  recipientId: string
  amount: number
  frequency: "weekly" | "monthly" | "quarterly"
  nextPayoutDate: string
  status: "active" | "paused" | "completed"
}

const mockRevenueStreams: RevenueStream[] = [
  {
    id: "1",
    name: "Marketplace Fees",
    type: "marketplace_fee",
    rate: 1.0,
    rateType: "percentage",
    revenue: 125000,
    transactions: 1250,
    isActive: true,
  },
  {
    id: "2",
    name: "Pro Subscriptions",
    type: "subscription",
    rate: 29,
    rateType: "fixed",
    revenue: 34500,
    transactions: 1190,
    isActive: true,
  },
  {
    id: "3",
    name: "Premium Listings",
    type: "premium_listing",
    rate: 99,
    rateType: "fixed",
    revenue: 15840,
    transactions: 160,
    isActive: true,
  },
]

const mockCommissionRules: CommissionRule[] = [
  {
    id: "1",
    name: "Residential Properties",
    propertyType: "residential",
    feeRate: 1.0,
    minimumFee: 100,
    maximumFee: 10000,
    isActive: true,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Commercial Properties",
    propertyType: "commercial",
    feeRate: 0.75,
    minimumFee: 500,
    maximumFee: 25000,
    isActive: true,
    createdAt: "2024-01-01",
  },
]

const revenueProjectionData = [
  { month: "Jan", actual: 125000, projected: 120000 },
  { month: "Feb", actual: 142000, projected: 135000 },
  { month: "Mar", actual: 158000, projected: 150000 },
  { month: "Apr", actual: 175000, projected: 165000 },
  { month: "May", actual: 192000, projected: 180000 },
  { month: "Jun", actual: 210000, projected: 195000 },
]

export function RevenueManagement() {
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>(mockRevenueStreams)
  const [commissionRules, setCommissionRules] = useState<CommissionRule[]>(mockCommissionRules)
  const [selectedStream, setSelectedStream] = useState<RevenueStream | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const totalRevenue = revenueStreams.reduce((sum, stream) => sum + stream.revenue, 0)
  const totalTransactions = revenueStreams.reduce((sum, stream) => sum + stream.transactions, 0)

  const handleUpdateRevenueStream = async (streamId: string, updates: Partial<RevenueStream>) => {
    try {
      // API call to update revenue stream
      setRevenueStreams((prev) => prev.map((stream) => (stream.id === streamId ? { ...stream, ...updates } : stream)))
    } catch (error) {
      console.error("Failed to update revenue stream:", error)
    }
  }

  const handleUpdateCommissionRule = async (ruleId: string, updates: Partial<CommissionRule>) => {
    try {
      // API call to update commission rule
      setCommissionRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, ...updates } : rule)))
    } catch (error) {
      console.error("Failed to update commission rule:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Streams</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueStreams.filter((s) => s.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Active streams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Commission</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.92%</div>
            <p className="text-xs text-muted-foreground">Weighted average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18%</div>
            <p className="text-xs text-muted-foreground">vs previous month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="streams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="streams">Revenue Streams</TabsTrigger>
          <TabsTrigger value="commissions">Commission Rules</TabsTrigger>
          <TabsTrigger value="payouts">Payout Management</TabsTrigger>
          <TabsTrigger value="forecasting">Revenue Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="streams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Stream Management</CardTitle>
              <CardDescription>Configure and monitor all revenue sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueStreams.map((stream) => (
                  <div key={stream.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{stream.name}</h4>
                        <Badge
                          className={stream.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {stream.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">
                            {stream.rateType === "percentage" ? `${stream.rate}%` : `$${stream.rate}`}
                          </span>
                          <div>Rate</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">${stream.revenue.toLocaleString()}</span>
                          <div>Revenue</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{stream.transactions}</span>
                          <div>Transactions</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">
                            ${(stream.revenue / stream.transactions).toFixed(2)}
                          </span>
                          <div>Avg. per Transaction</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedStream(stream)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateRevenueStream(stream.id, { isActive: !stream.isActive })}
                      >
                        {stream.isActive ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Rules</CardTitle>
              <CardDescription>Manage fee structures by property type</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Type</TableHead>
                    <TableHead>Fee Rate</TableHead>
                    <TableHead>Min Fee</TableHead>
                    <TableHead>Max Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissionRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium capitalize">{rule.propertyType}</TableCell>
                      <TableCell>{rule.feeRate}%</TableCell>
                      <TableCell>${rule.minimumFee}</TableCell>
                      <TableCell>{rule.maximumFee ? `$${rule.maximumFee}` : "No limit"}</TableCell>
                      <TableCell>
                        <Badge className={rule.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateCommissionRule(rule.id, { isActive: !rule.isActive })}
                          >
                            {rule.isActive ? "Disable" : "Enable"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout Management</CardTitle>
              <CardDescription>Manage automated payouts to property owners and investors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Payouts</p>
                        <p className="font-semibold">$45,200</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Completed This Month</p>
                        <p className="font-semibold">$128,500</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Failed Payouts</p>
                        <p className="font-semibold">$2,100</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 mb-4">
                <Button>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Process Pending Payouts
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/admin/revenue-management", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: "generate_report" }),
                      })

                      if (response.ok) {
                        const result = await response.json()
                        // Create download link
                        const link = document.createElement("a")
                        link.href = result.report.downloadUrl
                        link.download = `revenue-report-${Date.now()}.pdf`
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }
                    } catch (error) {
                      console.error("Failed to export report:", error)
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Payout Report
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>• Next automated payout run: Tomorrow at 9:00 AM</p>
                <p>• Total recipients: 1,247 property owners and investors</p>
                <p>• Average processing time: 2-3 business days</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Projections</CardTitle>
                <CardDescription>Actual vs projected revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    actual: {
                      label: "Actual Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    projected: {
                      label: "Projected Revenue",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueProjectionData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-1))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="projected"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "hsl(var(--chart-2))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
                <CardDescription>Next 6 months projection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Q3 2024 Forecast</span>
                    <span className="text-lg font-bold text-green-600">$675K</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Q4 2024 Forecast</span>
                    <span className="text-lg font-bold text-green-600">$820K</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Annual Target</span>
                    <span className="text-lg font-bold text-blue-600">$2.8M</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Key Growth Drivers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Increased subscription conversions (+15%)</li>
                    <li>• Higher transaction volume (+22%)</li>
                    <li>• Premium listing adoption (+8%)</li>
                    <li>• New revenue streams launching Q4</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Revenue Stream Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Revenue Stream</DialogTitle>
            <DialogDescription>Update the configuration for {selectedStream?.name}</DialogDescription>
          </DialogHeader>
          {selectedStream && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rate">Rate</Label>
                <Input id="rate" type="number" step="0.01" defaultValue={selectedStream.rate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateType">Rate Type</Label>
                <Select defaultValue={selectedStream.rateType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
