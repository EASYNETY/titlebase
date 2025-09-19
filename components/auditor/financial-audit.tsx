"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, CheckCircle, AlertCircle } from "lucide-react"

export default function FinancialAudit() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Financial Audit Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Comprehensive financial review of platform transactions, revenue streams, and asset valuations.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Platform Revenue</TableCell>
                  <TableCell className="font-medium">$1,250,000</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Verified
                    </div>
                  </TableCell>
                  <TableCell>Review Complete</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transaction Fees</TableCell>
                  <TableCell className="font-medium">$45,200</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      Pending
                    </div>
                  </TableCell>
                  <TableCell>Finalize Audit</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset Valuation</TableCell>
                  <TableCell className="font-medium">$326,000,000</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Verified
                    </div>
                  </TableCell>
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