"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function UserOnboarding() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-green-600" />
            User Onboarding Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Manage new user onboarding and verification processes.
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Onboarding Step</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>NEW-001</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>KYC Verification</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Complete
                    </div>
                  </TableCell>
                  <TableCell>Activate Account</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NEW-002</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Email Verification</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Pending
                    </div>
                  </TableCell>
                  <TableCell>Send Reminder</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NEW-003</TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>Document Upload</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      Incomplete
                    </div>
                  </TableCell>
                  <TableCell>Notify User</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NEW-004</TableCell>
                  <TableCell>Alice Brown</TableCell>
                  <TableCell>Profile Setup</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Complete
                    </div>
                  </TableCell>
                  <TableCell>Finalize</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}