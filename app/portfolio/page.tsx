"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, Home, Coins, Calendar, Filter, ArrowUpRight, LucidePieChart } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"

// Mock data for charts
const monthlyReturnsData = [
  { month: "Jan", returns: 2400, dividends: 1200 },
  { month: "Feb", returns: 2600, dividends: 1400 },
  { month: "Mar", returns: 2800, dividends: 1600 },
  { month: "Apr", returns: 3200, dividends: 1800 },
  { month: "May", returns: 2900, dividends: 1500 },
  { month: "Jun", returns: 3400, dividends: 2000 },
]

const portfolioAllocation = [
  { name: "Residential", value: 45, color: "#3b82f6" },
  { name: "Commercial", value: 30, color: "#1e40af" },
  { name: "Industrial", value: 15, color: "#60a5fa" },
  { name: "Mixed-Use", value: 10, color: "#93c5fd" },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Investment Dashboard</h1>
            <p className="text-slate-600">Track your fractional real estate investments and returns</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Portfolio Summary - Enhanced with ROI metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$245,680</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% ($27,340) from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Dividends</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <div className="text-xs text-slate-600 mt-1">Across 4 property types</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14.8%</div>
              <div className="text-xs text-slate-600 mt-1">Annualized return</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Returns & Dividends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyReturnsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="returns" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="dividends" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucidePieChart className="h-5 w-5" />
                Portfolio Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={portfolioAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {portfolioAllocation.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="investments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="income">Income Tracking</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="investments" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  id: 1,
                  name: "Luxury Apartment Complex",
                  location: "Downtown Miami",
                  shares: 2500,
                  totalShares: 100000,
                  invested: 12500,
                  currentValue: 14200,
                  monthlyDividend: 185,
                  roi: 13.6,
                  type: "Residential",
                },
                {
                  id: 2,
                  name: "Office Building",
                  location: "Austin, TX",
                  shares: 1800,
                  totalShares: 75000,
                  invested: 9000,
                  currentValue: 10350,
                  monthlyDividend: 142,
                  roi: 15.0,
                  type: "Commercial",
                },
                {
                  id: 3,
                  name: "Shopping Center",
                  location: "Phoenix, AZ",
                  shares: 3200,
                  totalShares: 120000,
                  invested: 16000,
                  currentValue: 17920,
                  monthlyDividend: 224,
                  roi: 12.0,
                  type: "Commercial",
                },
                {
                  id: 4,
                  name: "Industrial Warehouse",
                  location: "Denver, CO",
                  shares: 1500,
                  totalShares: 80000,
                  invested: 7500,
                  currentValue: 8625,
                  monthlyDividend: 98,
                  roi: 15.0,
                  type: "Industrial",
                },
              ].map((investment) => (
                <Card key={investment.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{investment.name}</h3>
                          <Badge variant="secondary">{investment.type}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{investment.location}</p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Shares Owned</span>
                            <div className="font-medium">{investment.shares.toLocaleString()}</div>
                            <div className="text-xs text-slate-500">
                              {((investment.shares / investment.totalShares) * 100).toFixed(2)}% ownership
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-600">Invested</span>
                            <div className="font-medium">${investment.invested.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-600">Current Value</span>
                            <div className="font-medium text-green-600">
                              ${investment.currentValue.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-600">Monthly Dividend</span>
                            <div className="font-medium">${investment.monthlyDividend}</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>ROI: {investment.roi}%</span>
                            <span className="text-green-600">+${investment.currentValue - investment.invested}</span>
                          </div>
                          <Progress value={investment.roi} className="h-2" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:ml-6">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Claim Dividend
                        </Button>
                        <Button size="sm" variant="outline">
                          Buy More Shares
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Income Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyReturnsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="dividends" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Income Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">This Month</span>
                    <span className="font-bold text-green-600">$2,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Last Month</span>
                    <span className="font-medium">$2,260</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">YTD Total</span>
                    <span className="font-bold">$14,720</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Projected Annual</span>
                    <span className="font-bold text-blue-600">$29,400</span>
                  </div>
                  <Button className="w-full mt-4">Withdraw Available Funds</Button>
                </CardContent>
              </Card>
            </div>

            {/* Income by Property */}
            <Card>
              <CardHeader>
                <CardTitle>Income by Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Luxury Apartment Complex", income: 185, percentage: 30.6 },
                    { name: "Shopping Center", income: 224, percentage: 37.1 },
                    { name: "Office Building", income: 142, percentage: 23.5 },
                    { name: "Industrial Warehouse", income: 98, percentage: 16.2 },
                  ].map((property, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{property.name}</span>
                          <span className="text-sm font-bold">${property.income}</span>
                        </div>
                        <Progress value={property.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Best Performer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Office Building</div>
                  <div className="text-sm text-slate-600">Austin, TX</div>
                  <div className="mt-2 text-lg font-semibold">+15.0% ROI</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,095</div>
                  <div className="text-sm text-green-600">+14.8% overall</div>
                  <div className="mt-2 text-sm text-slate-600">Since inception</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dividend Yield</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">11.2%</div>
                  <div className="text-sm text-slate-600">Annualized</div>
                  <div className="mt-2 text-sm text-green-600">Above market average</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Share Purchase",
                      property: "Industrial Warehouse",
                      amount: "$7,500",
                      shares: "1,500 shares",
                      date: "2024-01-15",
                      status: "Completed",
                    },
                    {
                      type: "Dividend Payment",
                      property: "Luxury Apartment Complex",
                      amount: "$185",
                      date: "2024-01-10",
                      status: "Completed",
                    },
                    {
                      type: "Share Sale",
                      property: "Office Building",
                      amount: "$2,300",
                      shares: "400 shares",
                      date: "2024-01-05",
                      status: "Completed",
                    },
                    {
                      type: "Dividend Payment",
                      property: "Shopping Center",
                      amount: "$224",
                      date: "2024-01-01",
                      status: "Completed",
                    },
                  ].map((tx, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div className="flex-1">
                        <div className="font-medium">{tx.type}</div>
                        <div className="text-sm text-slate-600">{tx.property}</div>
                        <div className="text-xs text-slate-500">{tx.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{tx.amount}</div>
                        {tx.shares && <div className="text-xs text-slate-600">{tx.shares}</div>}
                        <Badge variant="secondary" className="text-xs mt-1">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
