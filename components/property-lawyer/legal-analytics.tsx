"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export default function LegalAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-600" />
            Legal Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Analytics and insights for legal operations and compliance.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Verification Rate</TableCell>
                  <TableCell>98.2%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      +1.5%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Excellent
                    </div>
                  </TableCell>
                  <TableCell>Monitor</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pending Verifications</TableCell>
                  <TableCell>47</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      -5
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      Moderate
                    </div>
                  </TableCell>
                  <TableCell>Process</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Compliance Score</TableCell>
                  <TableCell>97.5%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      +0.8%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Good
                    </div>
                  </TableCell>
                  <TableCell>Review</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Avg Verification Time</TableCell>
                  <TableCell>2.3 days</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      -0.5 days
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      On Target
                    </div>
                  </TableCell>
                  <TableCell>Optimize</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}