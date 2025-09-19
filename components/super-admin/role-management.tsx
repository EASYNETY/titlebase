"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Checkbox } from "@/components/ui/checkbox"
import { UserCheck, Plus, Edit, Trash2, Shield, Crown, Users } from "lucide-react"

const mockAdminUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@realtyshare.com",
    role: "super_admin",
    department: "Executive",
    isActive: true,
    lastLogin: "2024-01-20 14:30",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@realtyshare.com",
    role: "admin",
    department: "Operations",
    isActive: true,
    lastLogin: "2024-01-20 09:15",
    permissions: ["property_management", "user_management", "analytics"],
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@realtyshare.com",
    role: "property_lawyer",
    department: "Legal",
    isActive: true,
    lastLogin: "2024-01-19 16:45",
    permissions: ["property_verification", "legal_documents", "compliance"],
  },
]

export function RoleManagement() {
  const [adminUsers, setAdminUsers] = useState(mockAdminUsers)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { label: "Super Admin", icon: Crown, className: "bg-purple-100 text-purple-800" },
      admin: { label: "Admin", icon: Shield, className: "bg-blue-100 text-blue-800" },
      account_manager: { label: "Account Manager", icon: Users, className: "bg-green-100 text-green-800" },
      property_lawyer: { label: "Property Lawyer", icon: UserCheck, className: "bg-orange-100 text-orange-800" },
      auditor: { label: "Auditor", icon: UserCheck, className: "bg-red-100 text-red-800" },
      compliance_officer: { label: "Compliance", icon: UserCheck, className: "bg-yellow-100 text-yellow-800" },
      front_office: { label: "Front Office", icon: Users, className: "bg-teal-100 text-teal-800" },
    }

    const config = roleConfig[role as keyof typeof roleConfig] || {
      label: role,
      icon: UserCheck,
      className: "bg-gray-100 text-gray-800",
    }
    const Icon = config.icon

    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Role Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admin Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers.length}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers.filter((u) => u.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers.filter((u) => u.role === "super_admin").length}</div>
            <p className="text-xs text-muted-foreground">Highest privilege</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Users Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage administrative users and their roles</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Admin User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Admin User</DialogTitle>
                  <DialogDescription>Add a new administrative user to the platform</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter email" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="account_manager">Account Manager</SelectItem>
                          <SelectItem value="property_lawyer">Property Lawyer</SelectItem>
                          <SelectItem value="auditor">Auditor</SelectItem>
                          <SelectItem value="compliance_officer">Compliance Officer</SelectItem>
                          <SelectItem value="front_office">Front Office</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" placeholder="Enter department" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Property Management",
                        "User Management",
                        "Analytics & Reports",
                        "KYC Management",
                        "Legal Documents",
                        "Compliance Monitoring",
                        "Financial Audit",
                        "Customer Support",
                      ].map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <Checkbox id={permission} />
                          <Label htmlFor={permission} className="text-sm">
                            {permission}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => setIsCreateDialogOpen(false)}>Create User</Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge className={user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
