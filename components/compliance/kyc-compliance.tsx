"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserCheck, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function KYCCompliance() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-indigo-600" />
            KYC Compliance Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Manage and monitor user KYC verification status and compliance.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>USER-001</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Verified
                    </div>
                  </TableCell>
                  <TableCell>Passport, Address Proof</TableCell>
                  <TableCell>View Profile</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USER-002</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Pending
                    </div>
                  </TableCell>
                  <TableCell>Submitted - Under Review</TableCell>
                  <TableCell>Review Documents</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USER-003</TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      Rejected
                    </div>
                  </TableCell>
                  <TableCell>Invalid ID</TableCell>
                  <TableCell>Request Resubmit</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USER-004</TableCell>
                  <TableCell>Alice Brown</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Verified
                    </div>
                  </TableCell>
                  <TableCell>Driver's License</TableCell>
                  <TableCell>Approved</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}