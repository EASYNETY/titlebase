"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FileCheck, AlertTriangle, TrendingUp, Download, Shield } from "lucide-react"

const auditData = [
  { month: "Jan", completed: 45, pending: 12, issues: 3 },
  { month: "Feb", completed: 52, pending: 8, issues: 2 },
  { month: "Mar", completed: 48, pending: 15, issues: 5 },
  { month: "Apr", completed: 61, pending: 9, issues: 1 },
  { month: "May", completed: 58, pending: 11, issues: 4 },
  { month: "Jun", completed: 67, pending: 7, issues: 2 },
]

const complianceData = [
  { name: "Compliant", value: 892, color: "#10b981" },
  { name: "Minor Issues", value: 45, color: "#f59e0b" },
  { name: "Major Issues", value: 12, color: "#ef4444" },
  { name: "Under Review", value: 28, color: "#3b82f6" },
]

const recentAudits = [
  {
    id: "AUD-001",
    propertyId: "PROP-001",
    propertyName: "Sunset Villa",
    auditType: "Financial Compliance",
    status: "completed",
    score: 98,
    completedDate: "2024-01-15",
    auditor: "Sarah Johnson",
  },
  {
    id: "AUD-002",
    propertyId: "PROP-002",
    propertyName: "Ocean View Condo",
    auditType: "Legal Compliance",
    status: "in_progress",
    score: null,
    completedDate: null,
    auditor: "Michael Chen",
  },
  {
    id: "AUD-003",
    propertyId: "PROP-003",
    propertyName: "Mountain Retreat",
    auditType: "Operational Audit",
    status: "completed",
    score: 85,
    completedDate: "2024-01-12",
    auditor: "Emily Davis",
  },
]

export function AuditReports() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audits Completed</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground">Overall compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Audit Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.5</div>
            <p className="text-xs text-muted-foreground">Out of 100</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Audit Activity</CardTitle>
            <CardDescription>Audit completion trends and issue tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                completed: { label: "Completed", color: "hsl(var(--chart-1))" },
                pending: { label: "Pending", color: "hsl(var(--chart-2))" },
                issues: { label: "Issues", color: "hsl(var(--chart-3))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={auditData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="completed" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="pending" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="issues" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Overall compliance distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                compliant: { label: "Compliant", color: "#10b981" },
                minor: { label: "Minor Issues", color: "#f59e0b" },
                major: { label: "Major Issues", color: "#ef4444" },
                review: { label: "Under Review", color: "#3b82f6" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audits</CardTitle>
          <CardDescription>Latest audit reports and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAudits.map((audit) => (
              <div key={audit.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <h4 className="font-medium">{audit.propertyName}</h4>
                    <Badge variant={audit.status === "completed" ? "default" : "secondary"}>
                      {audit.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>ID: {audit.id}</span>
                    <span>Type: {audit.auditType}</span>
                    <span>Auditor: {audit.auditor}</span>
                    {audit.completedDate && (
                      <span>Completed: {new Date(audit.completedDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  {audit.score && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Score:</span>
                      <Progress value={audit.score} className="w-24" />
                      <span className="text-sm font-medium">{audit.score}/100</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  {audit.status === "completed" && (
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
