"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/lib/auth/role-guard"
import { CustomerService } from "@/components/front-office/customer-service"
import { LiveChat } from "@/components/front-office/live-chat"
import { UserOnboarding } from "@/components/front-office/user-onboarding"
import { FrontOfficeAnalytics } from "@/components/front-office/front-office-analytics"
import { MessageSquare, UserPlus, BarChart3, Phone, Clock, CheckCircle } from "lucide-react"

export default function FrontOfficeDashboard() {
  return (
    <RoleGuard requiredRoles={["front_office", "admin", "super_admin"]} showUnauthorized>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Front Office Dashboard</h1>
                <p className="text-slate-600">Customer service, live chat, and user onboarding</p>
              </div>
            </div>
            <Badge className="bg-indigo-100 text-indigo-800 px-3 py-1">
              <Phone className="w-4 h-4 mr-1" />
              Front Office
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Currently online</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users Today</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">47</div>
                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2m</div>
                <p className="text-xs text-muted-foreground">Target: 2m</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">96.8%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="chat" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Live Chat
              </TabsTrigger>
              <TabsTrigger value="service" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Customer Service
              </TabsTrigger>
              <TabsTrigger value="onboarding" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                User Onboarding
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Suspense fallback={<div>Loading live chat...</div>}>
                <LiveChat />
              </Suspense>
            </TabsContent>

            <TabsContent value="service">
              <Suspense fallback={<div>Loading customer service...</div>}>
                <CustomerService />
              </Suspense>
            </TabsContent>

            <TabsContent value="onboarding">
              <Suspense fallback={<div>Loading user onboarding...</div>}>
                <UserOnboarding />
              </Suspense>
            </TabsContent>

            <TabsContent value="analytics">
              <Suspense fallback={<div>Loading analytics...</div>}>
                <FrontOfficeAnalytics />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  )
}
