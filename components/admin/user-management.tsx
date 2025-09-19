"use client"

import { useState, useEffect } from "react"
import { adminApi, kycApi } from "@/lib/api/client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Search, Filter, Eye, Shield, ShieldCheck, ShieldX } from "lucide-react"

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [kycFilter, setKycFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reason, setReason] = useState("");

  const loadUsers = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getUsers({ page, limit: 10 });
      setUsers(response.users);
      setTotalPages(response.pagination.pages);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    loadUsers(page);
  };

  const getKycBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Shield className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <ShieldX className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getAccountTypeBadge = (type?: string) => {
    return type === "smart" ? (
      <Badge className="bg-blue-100 text-blue-800">Smart Account</Badge>
    ) : (
      <Badge variant="outline">Wallet</Badge>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage users and KYC verification</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={kycFilter} onValueChange={setKycFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by KYC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All KYC Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-red-500">
                      Error loading users: {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  users.filter((user: any) => {
                    const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      user.wallet_address?.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesFilter = kycFilter === "all" || user.kyc_status === kycFilter;
                    return matchesSearch && matchesFilter;
                  }).map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32&query=user avatar`} />
                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.email}</p>
                            <p className="text-sm text-muted-foreground">Joined {user.joinedAt}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {user.wallet_address}
                      </TableCell>
                      <TableCell>{getKycBadge(user.kyc_status)}</TableCell>
                      <TableCell>{getAccountTypeBadge(user.account_type)}</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>$0</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>User Details</DialogTitle>
                              <DialogDescription>Review and manage user account</DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p>{selectedUser.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                                    <p className="font-mono text-sm">{selectedUser.wallet_address}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">KYC Status</p>
                                    {getKycBadge(selectedUser.kyc_status)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                                    {getAccountTypeBadge(selectedUser.account_type)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Properties Owned</p>
                                    <p>0</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                                    <p>$0</p>
                                  </div>
                                </div>
                                {selectedUser.kyc_status === 'pending' && (
                                  <div>
                                    <Label>Rejection Reason (if rejecting)</Label>
                                    <Textarea
                                      placeholder="Enter reason for rejection..."
                                      value={reason}
                                      onChange={(e) => setReason(e.target.value)}
                                    />
                                  </div>
                                )}
                                <div className="flex gap-2">
                                  <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={async () => {
                                      try {
                                        await kycApi.approveKyc(selectedUser.id, true);
                                        alert('KYC verified successfully');
                                        setSelectedUser(null);
                                        setReason("");
                                        loadUsers(currentPage);
                                      } catch (err: any) {
                                        alert('Failed to verify KYC: ' + err.message);
                                      }
                                    }}
                                    disabled={selectedUser.kyc_status !== 'pending'}
                                  >
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    Verify KYC
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={async () => {
                                      if (!reason && selectedUser.kyc_status === 'pending') {
                                        alert('Please provide a rejection reason');
                                        return;
                                      }
                                      try {
                                        await kycApi.approveKyc(selectedUser.id, false, reason);
                                        alert('KYC rejected successfully');
                                        setSelectedUser(null);
                                        setReason("");
                                        loadUsers(currentPage);
                                      } catch (err: any) {
                                        alert('Failed to reject KYC: ' + err.message);
                                      }
                                    }}
                                    disabled={selectedUser.kyc_status !== 'pending'}
                                  >
                                    <ShieldX className="mr-2 h-4 w-4" />
                                    Reject KYC
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-md">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = currentPage <= 3 ? i + 1 : currentPage + i - 3;
                  if (pageNum <= totalPages) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
