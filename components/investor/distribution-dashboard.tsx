"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts"
import { DollarSign, TrendingUp, Calendar, Download, Clock, CheckCircle, Wallet } from "lucide-react"

interface InvestorDistribution {
  id: string
  propertyName: string
  amount: number
  shares: number
  distributionDate: string
  status: "pending" | "completed" | "claimed"
  transactionHash?: string
  yieldPercentage: number
}

const mockDistributions: InvestorDistribution[] = [
  {
    id: "dist_001",
    propertyName: "Downtown Luxury Condo",
    amount: 125.5,
    shares: 250,
    distributionDate: "2024-01-15",
    status: "completed",
    transactionHash: "0x1234...5678",
    yieldPercentage: 1.2,
  },
  {
    id: "dist_002",
    propertyName: "Commercial Office Space",
    amount: 89.25,
    shares: 180,
    distributionDate: "2024-01-10",
    status: "claimed",
    transactionHash: "0x2345...6789",
    yieldPercentage: 0.9,
  },
  {
    id: "dist_003",
    propertyName: "Industrial Warehouse",
    amount: 67.8,
    shares: 150,
    distributionDate: "2024-02-01",
    status: "pending",
    yieldPercentage: 1.1,
  },
]

const monthlyEarnings = [
  { month: "Sep", earnings: 245.3, yield: 1.8 },
  { month: "Oct", earnings: 289.15, yield: 2.1 },
  { month: "Nov", earnings: 312.45, yield: 2.3 },
  { month: "Dec", earnings: 298.6, yield: 2.2 },
  { month: "Jan", earnings: 282.55, yield: 2.0 },
]

export function InvestorDistributionDashboard() {
  const [distributions, setDistributions] = useState<InvestorDistribution[]>(mockDistributions)
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [pendingClaims, setPendingClaims] = useState(0)

  useEffect(() => {
    const total = distributions.reduce((sum, dist) => sum + dist.amount, 0)
    const pending = distributions.filter((d) => d.status === "completed").length
    setTotalEarnings(total)
    setPendingClaims(pending)
  }, [distributions])

  const handleClaimDistribution = async (distributionId: string) => {
    try {
      // Simulate claiming distribution
      setDistributions((prev) =>
        prev.map((dist) => (dist.id === distributionId ? { ...dist, status: "claimed" } : dist)),
      )
    } catch (error) {
      console.error("Error claiming distribution:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "claimed":
        return <Wallet className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "claimed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Distribution Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All-time distributions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$282.55</div>
            <p className="text-xs text-muted-foreground">2.0% yield</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingClaims}</div>
            <p className="text-xs text-muted-foreground">Ready to claim</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Yield</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
            <p className="text-xs text-muted-foreground">Monthly average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distributions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distributions">My Distributions</TabsTrigger>
          <TabsTrigger value="earnings">Earnings History</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="distributions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Distributions</CardTitle>
              <CardDescription>Your dividend payments and distribution history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {distributions.map((distribution) => (
                  <div key={distribution.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(distribution.status)}
                        <h4 className="font-medium">{distribution.propertyName}</h4>
                        <Badge className={getStatusColor(distribution.status)}>{distribution.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">${distribution.amount}</span>
                          <div>Distribution Amount</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{distribution.shares}</span>
                          <div>Shares</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{distribution.yieldPercentage}%</span>
                          <div>Yield</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{distribution.distributionDate}</span>
                          <div>Date</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      {distribution.status === "completed" && (
                        <Button size="sm" onClick={() => handleClaimDistribution(distribution.id)}>
                          <Wallet className="w-4 h-4 mr-1" />
                          Claim
                        </Button>
                      )}
                      {distribution.transactionHash && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
              <CardDescription>Your distribution earnings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  earnings: {
                    label: "Earnings ($)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyEarnings}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-1))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
              <CardDescription>Distribution amounts by property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {distributions.map((dist, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{dist.propertyName}</span>
                        <span className="text-sm font-bold">${dist.amount}</span>
                      </div>
                      <Progress value={(dist.amount / totalEarnings) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Yield Performance</CardTitle>
                <CardDescription>Monthly yield percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    yield: {
                      label: "Yield (%)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyEarnings}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="yield" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Key performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Best Month</span>
                  <span className="font-bold text-green-600">$312.45 (Nov)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Highest Yield</span>
                  <span className="font-bold text-green-600">2.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Properties</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Monthly</span>
                  <span className="font-bold">$285.61</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projected Annual</span>
                  <span className="font-bold text-blue-600">$3,427.32</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
