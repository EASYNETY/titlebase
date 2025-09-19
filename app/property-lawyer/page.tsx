"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/lib/auth/role-guard"
import { PropertyVerification } from "@/components/property-lawyer/property-verification"
import { LegalDocuments } from "@/components/property-lawyer/legal-documents"
import { ComplianceReports } from "@/components/property-lawyer/compliance-reports"
import { LegalAnalytics } from "@/components/property-lawyer/legal-analytics"
import { Scale, FileText, Shield, BarChart3, AlertTriangle, CheckCircle } from "lucide-react"

export default function PropertyLawyerDashboard() {
  return (
    <RoleGuard requiredRoles={["property_lawyer", "admin", "super_admin"]} showUnauthorized>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 text-white">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Property Lawyer Dashboard</h1>
                <p className="text-slate-600">Legal verification, compliance, and document management</p>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-800 px-3 py-1">
              <Scale className="w-4 h-4 mr-1" />
              Property Lawyer
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">47</div>
                <p className="text-xs text-muted-foreground">Properties awaiting review</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified Properties</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">1,189</div>
                <p className="text-xs text-muted-foreground">This month: 127</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Legal Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">Total managed</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98.2%</div>
                <p className="text-xs text-muted-foreground">Excellent compliance</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="verification" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="verification" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Property Verification
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Legal Documents
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="verification">
              <Suspense fallback={<div>Loading property verification...</div>}>
                <PropertyVerification />
              </Suspense>
            </TabsContent>

            <TabsContent value="documents">
              <Suspense fallback={<div>Loading legal documents...</div>}>
                <LegalDocuments />
              </Suspense>
            </TabsContent>

            <TabsContent value="compliance">
              <Suspense fallback={<div>Loading compliance reports...</div>}>
                <ComplianceReports />
              </Suspense>
            </TabsContent>

            <TabsContent value="analytics">
              <Suspense fallback={<div>Loading analytics...</div>}>
                <LegalAnalytics />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  )
}
