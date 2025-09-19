"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/lib/auth/role-guard"
import { UserManagement } from "@/components/admin/user-management"
import { KYCManagement } from "@/components/account-manager/kyc-management"
import { SupportTickets } from "@/components/account-manager/support-tickets"
import { AccountAnalytics } from "@/components/account-manager/account-analytics"
import { Users, UserCheck, MessageSquare, BarChart3, AlertCircle, CheckCircle } from "lucide-react"

export default function AccountManagerDashboard() {
  return (
    <RoleGuard requiredRoles={["account_manager", "admin", "super_admin"]} showUnauthorized>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Account Manager Dashboard</h1>
                <p className="text-slate-600">Manage user accounts, KYC, and customer support</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 px-3 py-1">
              <Users className="w-4 h-4 mr-1" />
              Account Manager
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,847</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">247</div>
                <p className="text-xs text-muted-foreground">Require review</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">KYC Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">8,934</div>
                <p className="text-xs text-muted-foreground">This month: 1,247</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">32 open, 57 resolved</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="kyc" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="kyc" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                KYC Management
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Support Tickets
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="kyc">
              <Suspense fallback={<div>Loading KYC management...</div>}>
                <KYCManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="users">
              <Suspense fallback={<div>Loading user management...</div>}>
                <UserManagement />
              </Suspense>
            </TabsContent>

            <TabsContent value="support">
              <Suspense fallback={<div>Loading support tickets...</div>}>
                <SupportTickets />
              </Suspense>
            </TabsContent>

            <TabsContent value="analytics">
              <Suspense fallback={<div>Loading analytics...</div>}>
                <AccountAnalytics />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  )
}
