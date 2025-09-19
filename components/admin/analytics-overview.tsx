"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const volumeData = [
  { month: "Jan", volume: 2400000, transactions: 45 },
  { month: "Feb", volume: 1800000, transactions: 38 },
  { month: "Mar", volume: 3200000, transactions: 62 },
  { month: "Apr", volume: 2800000, transactions: 55 },
  { month: "May", volume: 4100000, transactions: 78 },
  { month: "Jun", volume: 3600000, transactions: 69 },
]

const categoryData = [
  { category: "Residential", count: 456, value: 8500000 },
  { category: "Commercial", count: 123, value: 12300000 },
  { category: "Industrial", count: 67, value: 4200000 },
  { category: "Land", count: 234, value: 2800000 },
]

const userGrowthData = [
  { month: "Jan", users: 1200, active: 890 },
  { month: "Feb", users: 1450, active: 1020 },
  { month: "Mar", users: 1780, active: 1340 },
  { month: "Apr", users: 2100, active: 1580 },
  { month: "May", users: 2650, active: 1920 },
  { month: "Jun", users: 3200, active: 2340 },
]

export function AnalyticsOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Trading Volume */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Trading Volume & Transactions</CardTitle>
          <CardDescription>Monthly trading volume and transaction count</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              volume: {
                label: "Volume ($)",
                color: "hsl(var(--chart-1))",
              },
              transactions: {
                label: "Transactions",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="volume"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="transactions"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Property Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Property Categories</CardTitle>
          <CardDescription>Distribution by property type</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Properties",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* User Growth */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Total and active users over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: {
                label: "Total Users",
                color: "hsl(var(--chart-4))",
              },
              active: {
                label: "Active Users",
                color: "hsl(var(--chart-5))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-4))" }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-5))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Important marketplace metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Avg. Property Value</p>
              <p className="text-2xl font-bold">$285K</p>
              <p className="text-xs text-green-600">+5.2% vs last month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Time to Sale</p>
              <p className="text-2xl font-bold">18 days</p>
              <p className="text-xs text-green-600">-3 days vs last month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">78%</p>
              <p className="text-xs text-green-600">+2.1% vs last month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">User Retention</p>
              <p className="text-2xl font-bold">65%</p>
              <p className="text-xs text-green-600">+1.8% vs last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
