"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShieldCheck, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function ComplianceMonitoring() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            Compliance Monitoring Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Real-time monitoring of compliance status across all platform activities and users.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compliance Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users/Users</TableHead>
                  <TableHead>Last Check</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>KYC Verification</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Compliant
                    </div>
                  </TableCell>
                  <TableCell>892 / 1000</TableCell>
                  <TableCell>2 hours ago</TableCell>
                  <TableCell>View Details</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transaction Monitoring</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Monitoring
                    </div>
                  </TableCell>
                  <TableCell>15,247 transactions</TableCell>
                  <TableCell>5 minutes ago</TableCell>
                  <TableCell>Review Logs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Regulatory Reporting</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      Pending
                    </div>
                  </TableCell>
                  <TableCell>3 reports due</TableCell>
                  <TableCell>1 day ago</TableCell>
                  <TableCell>Generate Report</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>AML Screening</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Compliant
                    </div>
                  </TableCell>
                  <TableCell>100% screened</TableCell>
                  <TableCell>Real-time</TableCell>
                  <TableCell>All Clear</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}