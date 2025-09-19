"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/lib/auth/role-guard"
import { ComplianceMonitoring } from "@/components/compliance/compliance-monitoring"
import { RegulatoryReports } from "@/components/compliance/regulatory-reports"
import { KYCCompliance } from "@/components/compliance/kyc-compliance"
import { ComplianceAnalytics } from "@/components/compliance/compliance-analytics"
import { ShieldCheck, FileText, UserCheck, BarChart3, AlertTriangle, CheckCircle } from "lucide-react"

export default function ComplianceDashboard() {
  return (
    <RoleGuard requiredRoles={["compliance_officer", "admin", "super_admin"]} showUnauthorized>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Compliance Dashboard</h1>
                <p className="text-slate-600">Regulatory compliance, monitoring, and reporting</p>
              </div>
            </div>
            <Badge className="bg-indigo-100 text-indigo-800 px-3 py-1">
              <ShieldCheck className="w-4 h-4 mr-1" />
              Compliance Officer
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">96.8%</div>
                <p className="text-xs text-muted-foreground">Excellent compliance</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">12</div>
                <p className="text-xs text-muted-foreground">Require resolution</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">KYC Compliance</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.4%</div>
                <p className="text-xs text-muted-foreground">Users verified</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports Due</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="monitoring" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="monitoring" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Monitoring
              </TabsTrigger>
              <TabsTrigger value="kyc" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                KYC Compliance
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Regulatory Reports
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring">
              <Suspense fallback={<div>Loading compliance monitoring...</div>}>
                <ComplianceMonitoring />
              </Suspense>
            </TabsContent>

            <TabsContent value="kyc">
              <Suspense fallback={<div>Loading KYC compliance...</div>}>
                <KYCCompliance />
              </Suspense>
            </TabsContent>

            <TabsContent value="reports">
              <Suspense fallback={<div>Loading regulatory reports...</div>}>
                <RegulatoryReports />
              </Suspense>
            </TabsContent>

            <TabsContent value="analytics">
              <Suspense fallback={<div>Loading compliance analytics...</div>}>
                <ComplianceAnalytics />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  )
}
