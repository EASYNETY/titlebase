"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Download, Filter, Calendar } from "lucide-react"

const cohortAnalysis = [
  { month: "Jan", newUsers: 245, retained1m: 189, retained3m: 156, retained6m: 134 },
  { month: "Feb", newUsers: 312, retained1m: 267, retained3m: 198, retained6m: 167 },
  { month: "Mar", newUsers: 289, retained1m: 234, retained3m: 201, retained6m: 178 },
  { month: "Apr", newUsers: 356, retained1m: 298, retained3m: 245, retained6m: 189 },
  { month: "May", newUsers: 423, retained1m: 367, retained3m: 289, retained6m: 234 },
  { month: "Jun", newUsers: 398, retained1m: 334, retained3m: 278, retained6m: 223 },
]

const funnelAnalysis = [
  { stage: "Visitors", count: 10000, conversion: 100 },
  { stage: "Sign Ups", count: 2500, conversion: 25 },
  { stage: "KYC Complete", count: 1875, conversion: 18.75 },
  { stage: "First Investment", count: 1125, conversion: 11.25 },
  { stage: "Repeat Investor", count: 675, conversion: 6.75 },
]

const segmentPerformance = [
  { segment: "High Value", users: 156, avgInvestment: 85000, ltv: 125000, churn: 5.2 },
  { segment: "Regular", users: 1234, avgInvestment: 25000, ltv: 45000, churn: 12.8 },
  { segment: "New", users: 2890, avgInvestment: 8500, ltv: 15000, churn: 28.5 },
  { segment: "Dormant", users: 567, avgInvestment: 12000, ltv: 8000, churn: 65.3 },
]

const predictiveMetrics = [
  { metric: "Revenue Forecast", current: 125000, predicted: 156000, confidence: 87 },
  { metric: "User Growth", current: 3431, predicted: 4250, confidence: 92 },
  { metric: "Churn Rate", current: 15.2, predicted: 12.8, confidence: 78 },
  { metric: "Market Share", current: 8.5, predicted: 11.2, confidence: 65 },
]

const competitorAnalysis = [
  { competitor: "Platform A", marketShare: 35, avgYield: 6.2, userSat: 7.8 },
  { competitor: "Platform B", marketShare: 28, avgYield: 7.1, userSat: 8.2 },
  { competitor: "Our Platform", marketShare: 15, avgYield: 7.4, userSat: 8.6 },
  { competitor: "Platform C", marketShare: 12, avgYield: 5.9, userSat: 7.1 },
  { competitor: "Others", marketShare: 10, avgYield: 6.5, userSat: 7.5 },
]

const COLORS = ["#3b82f6", "#1e40af", "#60a5fa", "#93c5fd", "#dbeafe"]

export function AdvancedAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-muted-foreground">Deep insights and predictive analytics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="cohort" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="competitive">Competitive</TabsTrigger>
        </TabsList>

        <TabsContent value="cohort" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Cohort Analysis</CardTitle>
              <CardDescription>User retention patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  newUsers: {
                    label: "New Users",
                    color: "hsl(var(--chart-1))",
                  },
                  retained1m: {
                    label: "1 Month Retention",
                    color: "hsl(var(--chart-2))",
                  },
                  retained3m: {
                    label: "3 Month Retention",
                    color: "hsl(var(--chart-3))",
                  },
                  retained6m: {
                    label: "6 Month Retention",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cohortAnalysis}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="newUsers"
                      stackId="1"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="retained1m"
                      stackId="2"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="retained3m"
                      stackId="3"
                      stroke="hsl(var(--chart-3))"
                      fill="hsl(var(--chart-3))"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="retained6m"
                      stackId="4"
                      stroke="hsl(var(--chart-4))"
                      fill="hsl(var(--chart-4))"
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1-Month Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">76.8%</div>
                <p className="text-sm text-muted-foreground">+5.2% vs last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3-Month Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">68.4%</div>
                <p className="text-sm text-muted-foreground">+3.1% vs last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">6-Month Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">56.1%</div>
                <p className="text-sm text-muted-foreground">+1.8% vs last period</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
              <CardDescription>User journey from visitor to repeat investor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelAnalysis.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{stage.count.toLocaleString()} users</span>
                        <Badge variant="secondary">{stage.conversion}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        style={{ width: `${stage.conversion}%` }}
                      >
                        {stage.conversion}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Segment Performance</CardTitle>
              <CardDescription>Analysis of different user segments and their behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segmentPerformance.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{segment.segment}</h4>
                        <Badge
                          variant={segment.churn < 10 ? "default" : segment.churn < 30 ? "secondary" : "destructive"}
                        >
                          {segment.churn}% churn
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">{segment.users.toLocaleString()}</span>
                          <div>Users</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">${segment.avgInvestment.toLocaleString()}</span>
                          <div>Avg Investment</div>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">${segment.ltv.toLocaleString()}</span>
                          <div>Lifetime Value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics</CardTitle>
              <CardDescription>AI-powered forecasts and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {predictiveMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{metric.metric}</h4>
                      <Badge variant="outline">{metric.confidence}% confidence</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Current</div>
                        <div className="text-xl font-bold">
                          {metric.metric.includes("Rate") || metric.metric.includes("Share")
                            ? `${metric.current}%`
                            : metric.current.toLocaleString()}
                        </div>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-500" />
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Predicted</div>
                        <div className="text-xl font-bold text-green-600">
                          {metric.metric.includes("Rate") || metric.metric.includes("Share")
                            ? `${metric.predicted}%`
                            : metric.predicted.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Share Analysis</CardTitle>
                <CardDescription>Competitive positioning in the market</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    marketShare: {
                      label: "Market Share",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={competitorAnalysis}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="marketShare"
                      >
                        {competitorAnalysis.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {competitorAnalysis.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">
                        {item.competitor}: {item.marketShare}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Metrics</CardTitle>
                <CardDescription>Performance comparison with competitors</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    avgYield: {
                      label: "Avg Yield",
                      color: "hsl(var(--chart-2))",
                    },
                    userSat: {
                      label: "User Satisfaction",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={competitorAnalysis}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="competitor" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Avg Yield"
                        dataKey="avgYield"
                        stroke="hsl(var(--chart-2))"
                        fill="hsl(var(--chart-2))"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="User Satisfaction"
                        dataKey="userSat"
                        stroke="hsl(var(--chart-3))"
                        fill="hsl(var(--chart-3))"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
