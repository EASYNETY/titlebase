"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Eye, Search, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

const legalDocuments = [
  {
    id: "DOC-001",
    title: "Property Title Deed - Sunset Villa",
    type: "Title Deed",
    status: "verified",
    propertyId: "PROP-001",
    uploadDate: "2024-01-15",
    verifiedDate: "2024-01-16",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "DOC-002",
    title: "Purchase Agreement - Ocean View Condo",
    type: "Purchase Agreement",
    status: "pending_review",
    propertyId: "PROP-002",
    uploadDate: "2024-01-14",
    verifiedDate: null,
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: "DOC-003",
    title: "Property Survey - Mountain Retreat",
    type: "Survey Report",
    status: "requires_revision",
    propertyId: "PROP-003",
    uploadDate: "2024-01-13",
    verifiedDate: null,
    size: "5.2 MB",
    format: "PDF",
  },
  {
    id: "DOC-004",
    title: "Zoning Certificate - Downtown Loft",
    type: "Zoning Certificate",
    status: "verified",
    propertyId: "PROP-004",
    uploadDate: "2024-01-12",
    verifiedDate: "2024-01-13",
    size: "0.8 MB",
    format: "PDF",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "pending_review":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "requires_revision":
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return <FileText className="h-4 w-4 text-gray-600" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Verified
        </Badge>
      )
    case "pending_review":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Pending Review
        </Badge>
      )
    case "requires_revision":
      return (
        <Badge variant="destructive" className="bg-red-100 text-red-800">
          Requires Revision
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export function LegalDocuments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredDocuments = legalDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.propertyId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Document Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search documents by title or property ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending_review">Pending Review</SelectItem>
                <SelectItem value="requires_revision">Requires Revision</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Title Deed">Title Deed</SelectItem>
                <SelectItem value="Purchase Agreement">Purchase Agreement</SelectItem>
                <SelectItem value="Survey Report">Survey Report</SelectItem>
                <SelectItem value="Zoning Certificate">Zoning Certificate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Documents ({filteredDocuments.length})</CardTitle>
          <CardDescription>Review and verify property legal documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(doc.status)}
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Property: {doc.propertyId}</span>
                      <span>Type: {doc.type}</span>
                      <span>Size: {doc.size}</span>
                      <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                      {doc.verifiedDate && <span>Verified: {new Date(doc.verifiedDate).toLocaleDateString()}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(doc.status)}
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
