"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Pause,
  Play,
} from "lucide-react"

interface Distribution {
  id: string
  propertyId: string
  propertyTitle: string
  amount: number
  recipientCount: number
  status: "scheduled" | "processing" | "completed" | "failed"
  scheduledDate: string
  completedDate?: string
  distributionType: "rental_income" | "sale_proceeds" | "dividend"
}

interface DistributionRule {
  id: string
  propertyId: string
  propertyTitle: string
  frequency: "monthly" | "quarterly" | "annual"
  percentage: number
  minimumAmount: number
  isActive: boolean
  nextDistribution: string
}

const mockDistributions: Distribution[] = [
  {
    id: "1",
    propertyId: "prop_1",
    propertyTitle: "Luxury Downtown Condo",
    amount: 15000,
    recipientCount: 25,
    status: "completed",
    scheduledDate: "2024-01-15",
    completedDate: "2024-01-15",
    distributionType: "rental_income",
  },
  {
    id: "2",
    propertyId: "prop_2",
    propertyTitle: "Commercial Office Space",
    amount: 32000,
    recipientCount: 48,
    status: "processing",
    scheduledDate: "2024-01-20",
    distributionType: "rental_income",
  },
  {
    id: "3",
    propertyId: "prop_3",
    propertyTitle: "Suburban Family Home",
    amount: 8500,
    recipientCount: 12,
    status: "scheduled",
    scheduledDate: "2024-01-25",
    distributionType: "rental_income",
  },
]

const mockDistributionRules: DistributionRule[] = [
  {
    id: "1",
    propertyId: "prop_1",
    propertyTitle: "Luxury Downtown Condo",
    frequency: "monthly",
    percentage: 85,
    minimumAmount: 1000,
    isActive: true,
    nextDistribution: "2024-02-15",
  },
  {
    id: "2",
    propertyId: "prop_2",
    propertyTitle: "Commercial Office Space",
    frequency: "monthly",
    percentage: 90,
    minimumAmount: 2000,
    isActive: true,
    nextDistribution: "2024-02-20",
  },
]

const distributionTrendData = [
  { month: "Jan", amount: 45000, recipients: 85 },
  { month: "Feb", amount: 52000, recipients: 92 },
  { month: "Mar", amount: 48000, recipients: 88 },
  { month: "Apr", amount: 61000, recipients: 105 },
  { month: "May", amount: 58000, recipients: 98 },
  { month: "Jun", amount: 67000, recipients: 112 },
]

export function DistributionManagement() {
  const [distributions, setDistributions] = useState<Distribution[]>(mockDistributions)
  const [distributionRules, setDistributionRules] = useState<DistributionRule[]>(mockDistributionRules)
  const [selectedDistribution, setSelectedDistribution] = useState<Distribution | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusBadge = (status: Distribution["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Calendar className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getDistributionTypeBadge = (type: Distribution["distributionType"]) => {
    switch (type) {
      case "rental_income":
        return <Badge variant="outline">Rental Income</Badge>
      case "sale_proceeds":
        return <Badge className="bg-purple-100 text-purple-800">Sale Proceeds</Badge>
      case "dividend":
        return <Badge className="bg-blue-100 text-blue-800">Dividend</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const totalDistributed = distributions.filter((d) => d.status === "completed").reduce((sum, d) => sum + d.amount, 0)

  const pendingDistributions = distributions.filter((d) => d.status === "scheduled" || d.status === "processing")

  return (
    <div className="space-y-6">
      {/* Distribution Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distributed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDistributed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Distributions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDistributions.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Across all properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Distribution</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,847</div>
            <p className="text-xs text-muted-foreground">Per recipient</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distributions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distributions">Distributions</TabsTrigger>
          <TabsTrigger value="rules">Distribution Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="distributions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Distribution History</CardTitle>
                  <CardDescription>Manage and monitor property distributions</CardDescription>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Distribution
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Distribution</DialogTitle>
                      <DialogDescription>Set up a new distribution for property investors</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="property">Property</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prop_1">Luxury Downtown Condo</SelectItem>
                            <SelectItem value="prop_2">Commercial Office Space</SelectItem>
                            <SelectItem value="prop_3">Suburban Family Home</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Distribution Amount</Label>
                        <Input id="amount" type="number" placeholder="Enter amount" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Distribution Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rental_income">Rental Income</SelectItem>
                            <SelectItem value="sale_proceeds">Sale Proceeds</SelectItem>
                            <SelectItem value="dividend">Dividend</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Scheduled Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setIsCreateDialogOpen(false)}>Create Distribution</Button>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distributions.map((distribution) => (
                    <TableRow key={distribution.id}>
                      <TableCell className="font-medium">{distribution.propertyTitle}</TableCell>
                      <TableCell>${distribution.amount.toLocaleString()}</TableCell>
                      <TableCell>{distribution.recipientCount}</TableCell>
                      <TableCell>{getDistributionTypeBadge(distribution.distributionType)}</TableCell>
                      <TableCell>{getStatusBadge(distribution.status)}</TableCell>
                      <TableCell>{distribution.scheduledDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedDistribution(distribution)}>
                            <Send className="w-4 h-4" />
                          </Button>
                          {distribution.status === "scheduled" && (
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Rules</CardTitle>
              <CardDescription>Configure automatic distribution schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Distribution %</TableHead>
                    <TableHead>Min. Amount</TableHead>
                    <TableHead>Next Distribution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distributionRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.propertyTitle}</TableCell>
                      <TableCell className="capitalize">{rule.frequency}</TableCell>
                      <TableCell>{rule.percentage}%</TableCell>
                      <TableCell>${rule.minimumAmount.toLocaleString()}</TableCell>
                      <TableCell>{rule.nextDistribution}</TableCell>
                      <TableCell>
                        <Badge className={rule.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {rule.isActive ? "Active" : "Paused"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            {rule.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Trends</CardTitle>
              <CardDescription>Monthly distribution amounts and recipient growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: "Distribution Amount ($)",
                    color: "hsl(var(--chart-1))",
                  },
                  recipients: {
                    label: "Recipients",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={distributionTrendData}>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="amount"
                      stackId="1"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
