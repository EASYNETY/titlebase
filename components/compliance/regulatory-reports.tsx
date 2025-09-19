"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function RegulatoryReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            Regulatory Reports Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Generate and manage regulatory reports for platform compliance requirements.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Monthly AML Report</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Submitted
                    </div>
                  </TableCell>
                  <TableCell>2024-01-31</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>Download</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quarterly Financial Report</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Pending
                    </div>
                  </TableCell>
                  <TableCell>2024-03-15</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Generate</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Annual KYC Report</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      Overdue
                    </div>
                  </TableCell>
                  <TableCell>2024-01-30</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Urgent</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transaction Monitoring Report</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Submitted
                    </div>
                  </TableCell>
                  <TableCell>2024-02-15</TableCell>
                  <TableCell>Yes</TableCell>
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