"use client"

import { useState, useEffect } from "react"
import { adminApi, propertiesApi } from "@/lib/api/client"
import { Switch } from "@/components/ui/switch"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Filter, Eye, CheckCircle, XCircle, AlertTriangle, Edit } from "lucide-react"

export function PropertyManagement() {
  const [properties, setProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    address: '', 
    description: '', 
    property_type: '',
    square_footage: '',
    bedrooms: '',
    bathrooms: '',
    year_built: '',
    lot_size: '',
    images: '',
    documents: ''
  });
  const [editFormData, setEditFormData] = useState({ 
    id: '',
    title: '', 
    address: '', 
    description: '', 
    property_type: '',
    square_footage: '',
    bedrooms: '',
    bathrooms: '',
    year_built: '',
    lot_size: '',
    images: '',
    documents: ''
  });

  const refreshProperties = async () => {
    try {
      const response = await adminApi.getProperties({ page: currentPage, limit: 10 });
      const typedResponse = response as any;
      setProperties(typedResponse.properties);
      setTotalPages(typedResponse.pagination.pages);
    } catch (err: any) {
      console.error('Failed to refresh properties:', err);
    }
  };

  const loadProperties = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getProperties({ page, limit: 10 });
      const typedResponse = response as any;
      setProperties(typedResponse.properties);
      setTotalPages(typedResponse.pagination.pages);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreate = async (data: any) => {
    try {
      const createData = {
        title: data.title,
        description: data.description,
        address: data.address,
        property_type: data.property_type,
        square_footage: data.square_footage ? parseInt(data.square_footage) : undefined,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : undefined,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : undefined,
        year_built: data.year_built ? parseInt(data.year_built) : undefined,
        lot_size: data.lot_size ? parseInt(data.lot_size) : undefined,
        images: data.images ? data.images.split(',').map((url: string) => url.trim()) : undefined,
        documents: data.documents ? data.documents.split(',').map((url: string) => url.trim()) : undefined,
      };
      await adminApi.createProperty(createData);
      setShowCreateDialog(false);
      setFormData({ 
        title: '', address: '', description: '', property_type: '',
        square_footage: '', bedrooms: '', bathrooms: '', year_built: '', lot_size: '',
        images: '', documents: ''
      });
      await refreshProperties();
      alert('Property created successfully');
    } catch (err: any) {
      alert(`Failed to create property: ${err.message}`);
    }
  };

  const handleEdit = (property: any) => {
    setEditFormData({
      id: property.id,
      title: property.title || '',
      address: property.address || '',
      description: property.description || '',
      property_type: property.property_type || '',
      square_footage: property.square_footage || '',
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      year_built: property.year_built || '',
      lot_size: property.lot_size || '',
      images: property.images ? property.images.join(', ') : '',
      documents: property.documents ? property.documents.join(', ') : '',
    });
    setShowEditDialog(true);
  };

  const handleUpdate = async (data: any) => {
    try {
      const updateData = {
        title: data.title,
        description: data.description,
        address: data.address,
        property_type: data.property_type,
        square_footage: data.square_footage ? parseInt(data.square_footage) : undefined,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : undefined,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : undefined,
        year_built: data.year_built ? parseInt(data.year_built) : undefined,
        lot_size: data.lot_size ? parseInt(data.lot_size) : undefined,
        images: data.images ? data.images.split(',').map((url: string) => url.trim()) : undefined,
        documents: data.documents ? data.documents.split(',').map((url: string) => url.trim()) : undefined,
      };
      await propertiesApi.updateProperty(editFormData.id, updateData);
      setShowEditDialog(false);
      await refreshProperties();
      alert('Property updated successfully');
    } catch (err: any) {
      alert(`Failed to update property: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    try {
      await propertiesApi.deleteProperty(id);
      await refreshProperties();
      alert('Property deleted successfully');
    } catch (err: any) {
      alert(`Failed to delete property: ${err.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "sold":
        return <Badge className="bg-blue-100 text-blue-800">Sold</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const renderForm = (isEdit: boolean = false, data: any, setData: any, onSubmit: any) => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Property title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="property_type">Property Type</Label>
          <Input
            id="property_type"
            placeholder="e.g., Apartment, House"
            value={data.property_type}
            onChange={(e) => setData({ ...data, property_type: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Property address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="square_footage">Square Footage</Label>
          <Input
            id="square_footage"
            type="number"
            placeholder="e.g., 2000"
            value={data.square_footage}
            onChange={(e) => setData({ ...data, square_footage: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            placeholder="e.g., 3"
            value={data.bedrooms}
            onChange={(e) => setData({ ...data, bedrooms: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            placeholder="e.g., 2"
            value={data.bathrooms}
            onChange={(e) => setData({ ...data, bathrooms: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="year_built">Year Built</Label>
          <Input
            id="year_built"
            type="number"
            placeholder="e.g., 2020"
            value={data.year_built}
            onChange={(e) => setData({ ...data, year_built: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="lot_size">Lot Size (sq ft)</Label>
          <Input
            id="lot_size"
            type="number"
            placeholder="e.g., 5000"
            value={data.lot_size}
            onChange={(e) => setData({ ...data, lot_size: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Property description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="images">Images (comma-separated URLs)</Label>
          <Textarea
            id="images"
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            value={data.images}
            onChange={(e) => setData({ ...data, images: e.target.value })}
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="documents">Documents (comma-separated URLs)</Label>
          <Textarea
            id="documents"
            placeholder="https://example.com/doc1.pdf, https://example.com/doc2.pdf"
            value={data.documents}
            onChange={(e) => setData({ ...data, documents: e.target.value })}
            rows={2}
          />
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={() => isEdit ? setShowEditDialog(false) : setShowCreateDialog(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            const requiredFields = ['title', 'description', 'address', 'property_type'];
            const missing = requiredFields.filter(field => !data[field]);
            if (missing.length > 0) {
              alert(`Please fill all required fields: ${missing.join(', ')}`);
              return;
            }
            isEdit ? onSubmit(editFormData) : onSubmit(formData);
          }}
        >
          {isEdit ? 'Update Property' : 'Create Property'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Property Management</CardTitle>
              <CardDescription>Manage and verify property listings</CardDescription>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              Add New Property
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Properties Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Loading properties...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-red-500">
                      Error loading properties: {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  properties
                    .filter((property: any) => {
                      const matchesSearch = searchTerm === '' ||
                        (property.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (property.address || '').toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesFilter = statusFilter === "all" || property.status === statusFilter;
                      return matchesSearch && matchesFilter;
                    })
                    .map((property: any) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="font-mono text-sm">{property.owner_username || property.owner}</TableCell>
                        <TableCell>${parseFloat(property.price || '0').toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(property.status || 'active')}</TableCell>
                        <TableCell>{getVerificationBadge(property.verification_status || 'pending')}</TableCell>
                        <TableCell>{property.address}</TableCell>
                        <TableCell>{property.created_at ? new Date(property.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell>
                          {property.is_featured ? (
                            <Badge variant="default" className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          ) : (
                            <Badge variant="secondary">Not Featured</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(property)}>
                              <Edit className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(property.id)}>
                              Delete
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedProperty(property)}
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center py-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* View Dialog */}
          <Dialog open={selectedProperty !== null} onOpenChange={() => { setSelectedProperty(null); setNotes(''); }}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Property Details</DialogTitle>
                <DialogDescription>Review and manage property listing</DialogDescription>
              </DialogHeader>
              {selectedProperty && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Title</Label>
                      <Input value={selectedProperty.title || ''} readOnly />
                    </div>
                    <div>
                      <Label>Property Type</Label>
                      <Input value={selectedProperty.property_type || ''} readOnly />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Input value={selectedProperty.address || ''} readOnly />
                    </div>
                    <div>
                      <Label>Square Footage</Label>
                      <Input value={selectedProperty.square_footage || ''} readOnly />
                    </div>
                    <div>
                      <Label>Bedrooms</Label>
                      <Input value={selectedProperty.bedrooms || ''} readOnly />
                    </div>
                    <div>
                      <Label>Bathrooms</Label>
                      <Input value={selectedProperty.bathrooms || ''} readOnly />
                    </div>
                    <div>
                      <Label>Year Built</Label>
                      <Input value={selectedProperty.year_built || ''} readOnly />
                    </div>
                    <div>
                      <Label>Lot Size</Label>
                      <Input value={selectedProperty.lot_size || ''} readOnly />
                    </div>
                    <div>
                      <Label>Owner</Label>
                      <Input value={selectedProperty.owner || ''} readOnly />
                    </div>
                    <div>
                      <Label>Created At</Label>
                      <Input value={selectedProperty.createdAt ? new Date(selectedProperty.createdAt).toLocaleDateString() : 'N/A'} readOnly />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea value={selectedProperty.description || ''} readOnly rows={3} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Images</Label>
                      <div className="border rounded-md p-2 bg-muted/50">
                        {selectedProperty.images && selectedProperty.images.length > 0 ? (
                          <ul className="text-sm space-y-1">
                            {selectedProperty.images.map((img: string, idx: number) => (
                              <li key={idx}>
                                <a href={img} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {img}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">No images</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Documents</Label>
                      <div className="border rounded-md p-2 bg-muted/50">
                        {selectedProperty.documents && selectedProperty.documents.length > 0 ? (
                          <ul className="text-sm space-y-1">
                            {selectedProperty.documents.map((doc: string, idx: number) => (
                              <li key={idx}>
                                <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {doc}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">No documents</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Verification Status</Label>
                    <Select value={selectedProperty.verification_status || 'pending'} onValueChange={() => {}}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Verified</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={selectedProperty.is_featured || false}
                      onCheckedChange={async (checked) => {
                        try {
                          await propertiesApi.updateProperty(selectedProperty.id, { is_featured: checked });
                          alert('Featured status updated');
                          await refreshProperties();
                          setSelectedProperty({ ...selectedProperty, is_featured: checked });
                        } catch (err: any) {
                          alert('Failed to update featured status: ' + err.message);
                        }
                      }}
                    />
                    <Label htmlFor="featured">Featured on Homepage</Label>
                  </div>
                  <div>
                    <Label>Admin Notes</Label>
                    <Textarea
                      placeholder="Add verification notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={async () => {
                        try {
                          await adminApi.updatePropertyStatus(selectedProperty.id, 'approved', notes);
                          alert('Property approved successfully');
                          setSelectedProperty(null);
                          setNotes("");
                          await refreshProperties();
                        } catch (err: any) {
                          alert('Failed to approve property: ' + err.message);
                        }
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        try {
                          await adminApi.updatePropertyStatus(selectedProperty.id, 'rejected', notes);
                          alert('Property rejected successfully');
                          setSelectedProperty(null);
                          setNotes("");
                          await refreshProperties();
                        } catch (err: any) {
                          alert('Failed to reject property: ' + err.message);
                        }
                      }}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Create Dialog */}
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Property</DialogTitle>
                <DialogDescription>Add a new property listing with all details</DialogDescription>
              </DialogHeader>
              {renderForm(false, formData, setFormData, handleCreate)}
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Edit Property</DialogTitle>
                <DialogDescription>Update the property details</DialogDescription>
              </DialogHeader>
              {renderForm(true, editFormData, setEditFormData, handleUpdate)}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
