"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsOverview } from "@/components/admin/analytics-overview"
import { RevenueTracking } from "@/components/admin/revenue-tracking"
import { DistributionManagement } from "@/components/admin/distribution-management"
import { MarketInsights } from "@/components/analytics/market-insights"
import { RealTimeMetrics } from "@/components/analytics/real-time-metrics"
import { AdvancedAnalytics } from "@/components/analytics/advanced-analytics"
import { BarChart3, TrendingUp, Activity, Target, Zap, Brain } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
            <p className="text-slate-600">Comprehensive insights and performance metrics</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$326M</div>
              <p className="text-xs text-muted-foreground">+14.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">735</div>
              <p className="text-xs text-muted-foreground">+8.7% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Yield</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.4%</div>
              <p className="text-xs text-muted-foreground">Above market average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,431</div>
              <p className="text-xs text-muted-foreground">+23.8% growth rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="distributions" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Distributions
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Market
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Real-time
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AnalyticsOverview />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueTracking />
          </TabsContent>

          <TabsContent value="distributions">
            <DistributionManagement />
          </TabsContent>

          <TabsContent value="market">
            <MarketInsights />
          </TabsContent>

          <TabsContent value="realtime">
            <RealTimeMetrics />
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
