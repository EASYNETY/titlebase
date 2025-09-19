"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, ArrowUpRight, Eye, Plus } from "lucide-react"

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

const topPerformingProperties = [
  {
    id: 1,
    name: "Luxury Apartment Complex",
    location: "Downtown Miami",
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
    invested: 16000,
    currentValue: 17920,
    monthlyDividend: 224,
    roi: 12.0,
    type: "Commercial",
  },
]

export function UserPortfolio() {
  return (
    <div className="space-y-6">
      {/* Portfolio Performance Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Portfolio Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                returns: { label: "Total Returns", color: "hsl(var(--chart-1))" },
                dividends: { label: "Dividends", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyReturnsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="returns"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="dividends"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                residential: { label: "Residential", color: "#3b82f6" },
                commercial: { label: "Commercial", color: "#1e40af" },
                industrial: { label: "Industrial", color: "#60a5fa" },
                mixed: { label: "Mixed-Use", color: "#93c5fd" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
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

      {/* Top Performing Properties */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Top Performing Properties</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Explore More
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformingProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{property.name}</h4>
                    <Badge variant="secondary">{property.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{property.location}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Invested</span>
                      <div className="font-medium">${property.invested.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Value</span>
                      <div className="font-medium text-green-600">${property.currentValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly Dividend</span>
                      <div className="font-medium">${property.monthlyDividend}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ROI</span>
                      <div className="font-medium text-green-600">{property.roi}%</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Performance</span>
                      <span className="text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +${property.currentValue - property.invested}
                      </span>
                    </div>
                    <Progress value={property.roi} className="h-2" />
                  </div>
                </div>

                <div className="ml-6">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
