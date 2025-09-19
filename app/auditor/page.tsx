"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RoleGuard } from "@/lib/auth/role-guard"
import { FinancialAudit } from "@/components/auditor/financial-audit"
import { TransactionReview } from "@/components/auditor/transaction-review"
import { RiskAssessment } from "@/components/auditor/risk-assessment"
import { AuditReports } from "@/components/auditor/audit-reports"
import { Calculator, Activity, AlertTriangle, FileBarChart, DollarSign, TrendingUp } from "lucide-react"

export default function AuditorDashboard() {
  return (
    <RoleGuard requiredRoles={["auditor", "admin", "super_admin"]} showUnauthorized>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Auditor Dashboard</h1>
                <p className="text-slate-600">Financial oversight, risk assessment, and audit management</p>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800 px-3 py-1">
              <Calculator className="w-4 h-4 mr-1" />
              Auditor
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$326M</div>
                <p className="text-xs text-muted-foreground">Assets under management</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.8M</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">7</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,247</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="financial" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Financial Audit
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="risk" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Risk Assessment
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileBarChart className="h-4 w-4" />
                Audit Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="financial">
              <Suspense fallback={<div>Loading financial audit...</div>}>
                <FinancialAudit />
              </Suspense>
            </TabsContent>

            <TabsContent value="transactions">
              <Suspense fallback={<div>Loading transaction review...</div>}>
                <TransactionReview />
              </Suspense>
            </TabsContent>

            <TabsContent value="risk">
              <Suspense fallback={<div>Loading risk assessment...</div>}>
                <RiskAssessment />
              </Suspense>
            </TabsContent>

            <TabsContent value="reports">
              <Suspense fallback={<div>Loading audit reports...</div>}>
                <AuditReports />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  )
}
