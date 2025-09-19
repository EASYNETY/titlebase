"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function ComplianceReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-600" />
            Compliance Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Generate and manage compliance reports for property legal compliance.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Title Compliance</TableCell>
                  <TableCell>Sunset Villa</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Complete
                    </div>
                  </TableCell>
                  <TableCell>2024-01-16</TableCell>
                  <TableCell>Download</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Zoning Report</TableCell>
                  <TableCell>Ocean View Condo</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Pending
                    </div>
                  </TableCell>
                  <TableCell>2024-01-17</TableCell>
                  <TableCell>Generate</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax Compliance</TableCell>
                  <TableCell>Mountain Retreat</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      Issues
                    </div>
                  </TableCell>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>Review</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Environmental Report</TableCell>
                  <TableCell>Luxury Townhouse</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Complete
                    </div>
                  </TableCell>
                  <TableCell>2024-01-14</TableCell>
                  <TableCell>Archive</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}