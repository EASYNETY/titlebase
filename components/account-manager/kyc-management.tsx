"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, FileText } from "lucide-react"

const mockKYCApplications = [
  {
    id: "1",
    userId: "user_123",
    name: "John Smith",
    email: "john.smith@email.com",
    status: "pending",
    submittedAt: "2024-01-20 14:30",
    documents: ["passport", "proof_of_address"],
    riskLevel: "low",
    notes: "",
  },
  {
    id: "2",
    userId: "user_456",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    status: "under_review",
    submittedAt: "2024-01-19 16:45",
    documents: ["drivers_license", "bank_statement"],
    riskLevel: "medium",
    notes: "Additional verification required for address",
  },
  {
    id: "3",
    userId: "user_789",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    status: "approved",
    submittedAt: "2024-01-18 09:15",
    documents: ["passport", "utility_bill"],
    riskLevel: "low",
    notes: "All documents verified successfully",
  },
]

export function KYCManagement() {
  const [applications, setApplications] = useState(mockKYCApplications)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800", icon: Clock },
      under_review: { label: "Under Review", className: "bg-blue-100 text-blue-800", icon: Eye },
      approved: { label: "Approved", className: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800", icon: XCircle },
    }

    const { label, className, icon: Icon } = config[status as keyof typeof config] || config.pending

    return (
      <Badge className={className}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    )
  }

  const getRiskBadge = (risk: string) => {
    const config = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    return <Badge className={config[risk as keyof typeof config]}>{risk.toUpperCase()}</Badge>
  }

  const handleApprove = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: "approved", notes: "KYC approved by account manager" } : app,
      ),
    )
  }

  const handleReject = (applicationId: string, reason: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status: "rejected", notes: reason } : app)),
    )
  }

  return (
    <div className="space-y-6">
      {/* KYC Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter((app) => app.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Require action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {applications.filter((app) => app.status === "approved").length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* KYC Applications */}
      <Card>
        <CardHeader>
          <CardTitle>KYC Applications</CardTitle>
          <CardDescription>Review and manage user verification requests</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&query=user avatar`} />
                          <AvatarFallback>{application.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{application.name}</p>
                          <p className="text-sm text-muted-foreground">{application.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>{getRiskBadge(application.riskLevel)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {application.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{application.submittedAt}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                            <Eye className="mr-1 h-4 w-4" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>KYC Application Review</DialogTitle>
                            <DialogDescription>Review and approve or reject this KYC application</DialogDescription>
                          </DialogHeader>
                          {selectedApplication && (
                            <div className="space-y-6">
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                  <p>{selectedApplication.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                                  <p>{selectedApplication.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                                  {getStatusBadge(selectedApplication.status)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                                  {getRiskBadge(selectedApplication.riskLevel)}
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Documents</p>
                                <div className="grid gap-2 md:grid-cols-2">
                                  {selectedApplication.documents.map((doc: string, index: number) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                      <span className="capitalize">{doc.replace("_", " ")}</span>
                                      <Button size="sm" variant="outline">
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
                                <Textarea
                                  placeholder="Add review notes..."
                                  defaultValue={selectedApplication.notes}
                                  rows={3}
                                />
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApprove(selectedApplication.id)}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve KYC
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleReject(selectedApplication.id, "Documents require additional verification")
                                  }
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject KYC
                                </Button>
                                <Button variant="outline">Request More Info</Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
