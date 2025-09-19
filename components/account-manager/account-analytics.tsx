"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, UserCheck, MessageSquare } from "lucide-react"

const userGrowthData = [
  { month: "Jan", newUsers: 245, kycApproved: 198, supportTickets: 45 },
  { month: "Feb", newUsers: 289, kycApproved: 234, supportTickets: 52 },
  { month: "Mar", newUsers: 324, kycApproved: 267, supportTickets: 38 },
  { month: "Apr", newUsers: 378, kycApproved: 312, supportTickets: 41 },
  { month: "May", newUsers: 412, kycApproved: 345, supportTickets: 29 },
  { month: "Jun", newUsers: 456, kycApproved: 389, supportTickets: 33 },
]

const kycStatusData = [
  { name: "Approved", value: 8934, color: "#10b981" },
  { name: "Pending", value: 247, color: "#f59e0b" },
  { name: "Under Review", value: 89, color: "#3b82f6" },
  { name: "Rejected", value: 45, color: "#ef4444" },
]

const supportCategoryData = [
  { category: "KYC Issues", tickets: 45, resolved: 38 },
  { category: "Financial", tickets: 32, resolved: 28 },
  { category: "Technical", tickets: 28, resolved: 25 },
  { category: "General", tickets: 15, resolved: 14 },
]

export function AccountAnalytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+18.2%</div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KYC Approval Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Support tickets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4.8/5</div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth & KYC Trends</CardTitle>
            <CardDescription>Monthly user registration and KYC approval trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                newUsers: {
                  label: "New Users",
                  color: "hsl(var(--chart-1))",
                },
                kycApproved: {
                  label: "KYC Approved",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="newUsers"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="kycApproved"
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
            <CardTitle>KYC Status Distribution</CardTitle>
            <CardDescription>Current KYC application status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                approved: { label: "Approved", color: "#10b981" },
                pending: { label: "Pending", color: "#f59e0b" },
                under_review: { label: "Under Review", color: "#3b82f6" },
                rejected: { label: "Rejected", color: "#ef4444" },
              }}
              className="h-[300px]"
            >
              <div className="space-y-4">
                {kycStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets by Category</CardTitle>
          <CardDescription>Current support ticket distribution and resolution rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supportCategoryData.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{category.category}</h4>
                  <p className="text-sm text-muted-foreground">
                    {category.resolved}/{category.tickets} resolved (
                    {Math.round((category.resolved / category.tickets) * 100)}%)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{category.tickets}</div>
                  <div className="text-sm text-muted-foreground">Total tickets</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
