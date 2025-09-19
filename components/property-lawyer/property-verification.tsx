"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Scale, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function PropertyVerification() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-600" />
            Property Verification Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Verify property titles, documents, and legal status for marketplace listings.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property ID</TableHead>
                  <TableHead>Property Name</TableHead>
                  <TableHead>Verification Status</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>PROP-001</TableCell>
                  <TableCell>Sunset Villa</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Verified
                    </div>
                  </TableCell>
                  <TableCell>Title Deed, Survey</TableCell>
                  <TableCell>Approved</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PROP-002</TableCell>
                  <TableCell>Ocean View Condo</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Pending
                    </div>
                  </TableCell>
                  <TableCell>Submitted - Review</TableCell>
                  <TableCell>Review Docs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PROP-003</TableCell>
                  <TableCell>Mountain Retreat</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      Issues Found
                    </div>
                  </TableCell>
                  <TableCell>Disputed Title</TableCell>
                  <TableCell>Resolve</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PROP-004</TableCell>
                  <TableCell>Luxury Townhouse</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Verified
                    </div>
                  </TableCell>
                  <TableCell>Full Legal Clearance</TableCell>
                  <TableCell>Publish</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}