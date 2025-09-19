"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function CustomerService() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            Customer Service Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Manage customer support tickets and inquiries.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>TKT-001</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Billing Issue</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Resolved
                    </div>
                  </TableCell>
                  <TableCell>Close</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TKT-002</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Technical Support</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      In Progress
                    </div>
                  </TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TKT-003</TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>Account Access</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      Urgent
                    </div>
                  </TableCell>
                  <TableCell>Escalate</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TKT-004</TableCell>
                  <TableCell>Alice Brown</TableCell>
                  <TableCell>Feature Request</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      Open
                    </div>
                  </TableCell>
                  <TableCell>Respond</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}