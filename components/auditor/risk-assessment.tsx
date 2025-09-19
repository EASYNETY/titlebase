"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Shield, TrendingDown, BarChart3 } from "lucide-react"

export default function RiskAssessment() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Risk Assessment Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Identify and manage risks associated with platform operations and investments.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Market Volatility</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4 text-orange-600" />
                      Medium
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">72</TableCell>
                  <TableCell>Monitoring</TableCell>
                  <TableCell>Mitigate</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Regulatory Changes</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-yellow-600" />
                      High
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">85</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Review Policy</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Liquidity Risk</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      High
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">91</TableCell>
                  <TableCell>Critical</TableCell>
                  <TableCell>Immediate Action</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Operational Risk</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-green-600" />
                      Low
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">45</TableCell>
                  <TableCell>Stable</TableCell>
                  <TableCell>Continue Monitoring</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}