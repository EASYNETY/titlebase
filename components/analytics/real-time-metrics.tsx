"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Activity, TrendingUp, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

interface RealTimeMetric {
  id: string
  name: string
  value: number
  change: number
  status: "healthy" | "warning" | "critical"
  unit: string
  target?: number
}

interface SystemHealth {
  api: "healthy" | "degraded" | "down"
  blockchain: "healthy" | "degraded" | "down"
  database: "healthy" | "degraded" | "down"
  payments: "healthy" | "degraded" | "down"
}

const initialMetrics: RealTimeMetric[] = [
  { id: "active_users", name: "Active Users", value: 1247, change: 5.2, status: "healthy", unit: "" },
  { id: "transactions_per_min", name: "Transactions/Min", value: 23, change: -2.1, status: "healthy", unit: "" },
  { id: "avg_response_time", name: "Avg Response Time", value: 145, change: 8.3, status: "warning", unit: "ms" },
  { id: "revenue_per_hour", name: "Revenue/Hour", value: 2847, change: 12.5, status: "healthy", unit: "$" },
  { id: "conversion_rate", name: "Conversion Rate", value: 3.8, change: 0.5, status: "healthy", unit: "%" },
  { id: "error_rate", name: "Error Rate", value: 0.12, change: -0.03, status: "healthy", unit: "%" },
]

const generateTimeSeriesData = (points = 20) => {
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(Date.now() - (points - i) * 60000).toLocaleTimeString(),
    value: Math.floor(Math.random() * 100) + 50,
    transactions: Math.floor(Math.random() * 50) + 10,
    users: Math.floor(Math.random() * 200) + 1000,
  }))
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>(initialMetrics)
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData())
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    api: "healthy",
    blockchain: "healthy",
    database: "healthy",
    payments: "healthy",
  })
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Simulate real-time metric updates
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 20,
          status: Math.random() > 0.9 ? "warning" : Math.random() > 0.95 ? "critical" : "healthy",
        })),
      )

      // Update time series data
      setTimeSeriesData((prev) => {
        const newData = [...prev.slice(1)]
        newData.push({
          time: new Date().toLocaleTimeString(),
          value: Math.floor(Math.random() * 100) + 50,
          transactions: Math.floor(Math.random() * 50) + 10,
          users: Math.floor(Math.random() * 200) + 1000,
        })
        return newData
      })

      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-green-600"
      case "degraded":
        return "text-yellow-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Live Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            <span className="font-medium">{isLive ? "Live" : "Paused"}</span>
          </div>
          <span className="text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
            {isLive ? "Pause" : "Resume"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMetrics(initialMetrics)
              setTimeSeriesData(generateTimeSeriesData())
              setLastUpdate(new Date())
            }}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Health
          </CardTitle>
          <CardDescription>Real-time system component status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(systemHealth).map(([component, status]) => (
              <div key={component} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  {getStatusIcon(status)}
                  <span className="font-medium capitalize">{component}</span>
                </div>
                <Badge className={getStatusColor(status)}>{status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-Time Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              {getStatusIcon(metric.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.unit === "$" && "$"}
                {Math.round(metric.value).toLocaleString()}
                {metric.unit !== "$" && metric.unit}
              </div>
              <div
                className={`flex items-center text-xs mt-1 ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}
              >
                <TrendingUp className={`h-3 w-3 mr-1 ${metric.change < 0 ? "rotate-180" : ""}`} />
                {metric.change > 0 ? "+" : ""}
                {metric.change.toFixed(1)}%
              </div>
              {metric.target && (
                <div className="mt-2">
                  <Progress value={(metric.value / metric.target) * 100} className="h-1" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Target: {metric.target.toLocaleString()}
                    {metric.unit}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-Time Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Activity</CardTitle>
            <CardDescription>Real-time platform activity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Activity",
                  color: "hsl(var(--chart-1))",
                },
                transactions: {
                  label: "Transactions",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                  <Line
                    type="monotone"
                    dataKey="transactions"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Real-time user engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Active Users",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alert Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Current system alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.filter((m) => m.status !== "healthy").length === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>All systems operating normally</span>
              </div>
            ) : (
              metrics
                .filter((m) => m.status !== "healthy")
                .map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(metric.status)}
                      <div>
                        <div className="font-medium">{metric.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Current: {Math.round(metric.value).toLocaleString()}
                          {metric.unit}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
