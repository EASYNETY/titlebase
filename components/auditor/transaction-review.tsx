"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, Search, Clock, CheckCircle, XCircle } from "lucide-react"

export default function TransactionReview() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Transaction Review Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Review and verify platform transactions for compliance and accuracy.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Review Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>TXN-001234</TableCell>
                  <TableCell>Property Purchase</TableCell>
                  <TableCell className="font-medium">$150,000</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Search className="h-4 w-4 text-yellow-600" />
                      Under Review
                    </div>
                  </TableCell>
                  <TableCell>Approve / Reject</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TXN-001235</TableCell>
                  <TableCell>Bid Placement</TableCell>
                  <TableCell className="font-medium">$25,000</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Approved
                    </div>
                  </TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TXN-001236</TableCell>
                  <TableCell>Escrow Release</TableCell>
                  <TableCell className="font-medium">$75,000</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Pending
                    </div>
                  </TableCell>
                  <TableCell>Verify Release</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TXN-001237</TableCell>
                  <TableCell>Refund</TableCell>
                  <TableCell className="font-medium">$5,000</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Rejected
                    </div>
                  </TableCell>
                  <TableCell>Disputed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}