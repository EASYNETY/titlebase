"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Home, Users, Activity, Target } from "lucide-react"

const marketTrends = [
  { month: "Jul", avgPrice: 285000, volume: 45, appreciation: 2.1 },
  { month: "Aug", avgPrice: 292000, volume: 52, appreciation: 2.5 },
  { month: "Sep", avgPrice: 298000, volume: 48, appreciation: 2.1 },
  { month: "Oct", avgPrice: 305000, volume: 61, appreciation: 2.3 },
  { month: "Nov", avgPrice: 312000, volume: 58, appreciation: 2.3 },
  { month: "Dec", avgPrice: 318000, volume: 67, appreciation: 1.9 },
]

const regionPerformance = [
  { region: "San Francisco", avgPrice: 850000, growth: 8.5, volume: 125, yield: 4.2 },
  { region: "Austin", avgPrice: 420000, growth: 12.3, volume: 89, yield: 6.8 },
  { region: "Miami", avgPrice: 380000, growth: 15.2, volume: 76, yield: 7.1 },
  { region: "Denver", avgPrice: 520000, growth: 9.8, volume: 54, yield: 5.9 },
  { region: "Phoenix", avgPrice: 310000, growth: 18.7, volume: 92, yield: 8.2 },
]

const propertyTypeAnalysis = [
  { type: "Residential", count: 456, avgYield: 6.8, totalValue: 125000000, growth: 12.5 },
  { type: "Commercial", count: 123, avgYield: 8.2, totalValue: 89000000, growth: 15.8 },
  { type: "Industrial", count: 67, avgYield: 9.1, totalValue: 45000000, growth: 22.3 },
  { type: "Mixed-Use", count: 89, avgYield: 7.5, totalValue: 67000000, growth: 18.9 },
]

const investorBehavior = [
  { segment: "Retail Investors", count: 2340, avgInvestment: 15000, retention: 78 },
  { segment: "Institutional", count: 45, avgInvestment: 250000, retention: 95 },
  { segment: "High Net Worth", count: 156, avgInvestment: 85000, retention: 89 },
  { segment: "First-Time", count: 890, avgInvestment: 8500, retention: 65 },
]

const riskMetrics = [
  { metric: "Portfolio Volatility", value: 12.5, trend: "down", benchmark: 15.2 },
  { metric: "Sharpe Ratio", value: 1.85, trend: "up", benchmark: 1.42 },
  { metric: "Max Drawdown", value: 8.3, trend: "down", benchmark: 12.1 },
  { metric: "Beta", value: 0.78, trend: "stable", benchmark: 1.0 },
]

export function MarketInsights() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Market Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$326M</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +14.2% YTD
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Property Value</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$318K</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +11.6% YoY
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,431</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23.8% growth
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Yield</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.4%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Above market
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="regions">Regional Analysis</TabsTrigger>
          <TabsTrigger value="types">Property Types</TabsTrigger>
          <TabsTrigger value="investors">Investor Behavior</TabsTrigger>
          <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Price Appreciation Trends</CardTitle>
                <CardDescription>Average property values and market appreciation</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    avgPrice: {
                      label: "Avg Price ($)",
                      color: "hsl(var(--chart-1))",
                    },
                    appreciation: {
                      label: "Appreciation (%)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketTrends}>
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="avgPrice"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.6}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="appreciation"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trading Volume</CardTitle>
                <CardDescription>Monthly transaction volume and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    volume: {
                      label: "Volume",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketTrends}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="volume" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Market performance by geographic region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionPerformance.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{region.region}</h4>
                        <Badge variant={region.growth > 10 ? "default" : "secondary"}>
                          {region.growth > 0 ? "+" : ""}
                          {region.growth}% growth
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">${region.avgPrice.toLocaleString()}</span>
                          <div>Avg. Price</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{region.volume}</span>
                          <div>Properties</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{region.yield}%</span>
                          <div>Avg. Yield</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Property Type Distribution</CardTitle>
                <CardDescription>Portfolio composition by property type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Properties",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={propertyTypeAnalysis}>
                      <XAxis dataKey="type" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yield vs Growth Analysis</CardTitle>
                <CardDescription>Property type performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    avgYield: {
                      label: "Avg Yield (%)",
                      color: "hsl(var(--chart-5))",
                    },
                    growth: {
                      label: "Growth (%)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={propertyTypeAnalysis}>
                      <XAxis dataKey="avgYield" name="Yield" />
                      <YAxis dataKey="growth" name="Growth" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Scatter dataKey="growth" fill="hsl(var(--chart-5))" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investor Segmentation</CardTitle>
              <CardDescription>Analysis of investor behavior and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investorBehavior.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{segment.segment}</h4>
                        <Badge variant={segment.retention > 80 ? "default" : "secondary"}>
                          {segment.retention}% retention
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">{segment.count.toLocaleString()}</span>
                          <div>Investors</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">${segment.avgInvestment.toLocaleString()}</span>
                          <div>Avg. Investment</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Portfolio risk metrics and benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTrendIcon(metric.trend)}
                        <h4 className="font-medium">{metric.metric}</h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold">{metric.value}</span>
                          <div className="text-sm text-muted-foreground">Current</div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-medium text-muted-foreground">{metric.benchmark}</span>
                          <div className="text-sm text-muted-foreground">Benchmark</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
