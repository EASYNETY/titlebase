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
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, MessageSquare, Clock, CheckCircle, AlertTriangle, User } from "lucide-react"

const mockTickets = [
  {
    id: "TICK-001",
    userId: "user_123",
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    subject: "Unable to complete KYC verification",
    category: "kyc",
    priority: "high",
    status: "open",
    createdAt: "2024-01-20 14:30",
    lastUpdate: "2024-01-20 15:45",
    description: "I'm having trouble uploading my passport document. The system keeps rejecting it.",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "TICK-002",
    userId: "user_456",
    userName: "Alice Brown",
    userEmail: "alice.brown@email.com",
    subject: "Investment withdrawal not processed",
    category: "financial",
    priority: "medium",
    status: "in_progress",
    createdAt: "2024-01-19 16:20",
    lastUpdate: "2024-01-20 09:15",
    description: "I requested a withdrawal 3 days ago but haven't received the funds yet.",
    assignedTo: "Mike Chen",
  },
  {
    id: "TICK-003",
    userId: "user_789",
    userName: "Robert Wilson",
    userEmail: "robert.w@email.com",
    subject: "Account access issues",
    category: "technical",
    priority: "low",
    status: "resolved",
    createdAt: "2024-01-18 11:30",
    lastUpdate: "2024-01-19 14:20",
    description: "Cannot log in to my account. Password reset doesn't work.",
    assignedTo: "Sarah Johnson",
  },
]

export function SupportTickets() {
  const [tickets, setTickets] = useState(mockTickets)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    const config = {
      open: { label: "Open", className: "bg-red-100 text-red-800", icon: AlertTriangle },
      in_progress: { label: "In Progress", className: "bg-blue-100 text-blue-800", icon: Clock },
      resolved: { label: "Resolved", className: "bg-green-100 text-green-800", icon: CheckCircle },
      closed: { label: "Closed", className: "bg-gray-100 text-gray-800", icon: CheckCircle },
    }

    const { label, className, icon: Icon } = config[status as keyof typeof config] || config.open

    return (
      <Badge className={className}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    return <Badge className={config[priority as keyof typeof config]}>{priority.toUpperCase()}</Badge>
  }

  const getCategoryBadge = (category: string) => {
    const config = {
      kyc: "bg-purple-100 text-purple-800",
      financial: "bg-green-100 text-green-800",
      technical: "bg-blue-100 text-blue-800",
      general: "bg-gray-100 text-gray-800",
    }
    return <Badge className={config[category as keyof typeof config]}>{category.toUpperCase()}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Support Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {tickets.filter((ticket) => ticket.status === "open").length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {tickets.filter((ticket) => ticket.status === "in_progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87.5%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>Manage customer support requests and inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tickets Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.userName}</p>
                        <p className="text-sm text-muted-foreground">{ticket.userEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate">{ticket.subject}</p>
                    </TableCell>
                    <TableCell>{getCategoryBadge(ticket.category)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm">{ticket.assignedTo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket)}>
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Support Ticket Details</DialogTitle>
                            <DialogDescription>Ticket ID: {selectedTicket?.id}</DialogDescription>
                          </DialogHeader>
                          {selectedTicket && (
                            <div className="space-y-6">
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">User</p>
                                  <p>{selectedTicket.userName}</p>
                                  <p className="text-sm text-muted-foreground">{selectedTicket.userEmail}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                                  <p>{selectedTicket.assignedTo}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                                  {getCategoryBadge(selectedTicket.category)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Priority</p>
                                  {getPriorityBadge(selectedTicket.priority)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                                  {getStatusBadge(selectedTicket.status)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                                  <p className="text-sm">{selectedTicket.createdAt}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Subject</p>
                                <p>{selectedTicket.subject}</p>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                                <p className="text-sm bg-muted p-3 rounded-lg">{selectedTicket.description}</p>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Response</p>
                                <Textarea placeholder="Type your response..." rows={4} />
                              </div>

                              <div className="flex gap-2">
                                <Button>Send Response</Button>
                                <Button variant="outline">Mark as Resolved</Button>
                                <Button variant="outline">Escalate</Button>
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
