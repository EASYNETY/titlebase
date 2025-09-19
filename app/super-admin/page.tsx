"use client"

import { useAuth } from "@/lib/hooks/use-auth"
import { adminApi } from "@/lib/api/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Home,
  BarChart3,
  Settings,
  Shield,
  DollarSign,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Crown,
  Key,
  Database,
  Server,
  Lock
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"

export default function SuperAdminDashboard() {
  const { user, logout } = useAuth()
  const [paymentOptions, setPaymentOptions] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingOption, setEditingOption] = useState(null)
  const [newOption, setNewOption] = useState({
    name: '',
    type: 'crypto',
    currency: '',
    provider: '',
    fee_percentage: 0,
    is_active: true,
    config: {}
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const response = await adminApi.getPaymentOptions()
        setPaymentOptions(response.paymentOptions)
      } catch (error) {
        console.error('Failed to fetch payment options:', error)
      }
    }

    fetchPaymentOptions()
  }, [])

  const handleCreateOption = async () => {
    setIsSubmitting(true)
    try {
      await adminApi.createPaymentOption(newOption)
      setPaymentOptions(prev => [...prev, { ...newOption, id: Date.now().toString() }]) // Temp id
      setNewOption({ name: '', type: 'crypto', currency: '', provider: '', fee_percentage: 0, is_active: true, config: {} })
      setShowAddModal(false)
    } catch (error) {
      console.error('Failed to create payment option:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateOption = async () => {
    setIsSubmitting(true)
    try {
      await adminApi.updatePaymentOption(editingOption.id, editingOption)
      setPaymentOptions(prev => prev.map(opt => opt.id === editingOption.id ? editingOption : opt))
      setShowEditModal(false)
      setEditingOption(null)
    } catch (error) {
      console.error('Failed to update payment option:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteOption = async (id) => {
    try {
      await adminApi.deletePaymentOption(id)
      setPaymentOptions(prev => prev.filter(opt => opt.id !== id))
    } catch (error) {
      console.error('Failed to delete payment option:', error)
    }
  }

  const editOption = (option) => {
    setEditingOption(option)
    setShowEditModal(true)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Crown className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">SuperAdmin Control Center</h1>
              <Badge variant="secondary" className="bg-white text-purple-600">{user.role}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/90">
                Welcome, {user.name || user.address?.slice(0, 6) + '...' + user.address?.slice(-4)}
              </span>
              <Button variant="outline" onClick={logout} className="text-white border-white hover:bg-white hover:text-purple-600">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Shield className="w-8 h-8 text-purple-600" />
            System Administration
          </h2>
          <p className="text-muted-foreground">Complete control over platform infrastructure and operations</p>
        </div>

        {/* Critical System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">System Health</CardTitle>
              <Server className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">98.5%</div>
              <p className="text-xs text-red-600">All systems operational</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Active Sessions</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">1,847</div>
              <p className="text-xs text-blue-600">+23% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Revenue Today</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">$45.2K</div>
              <p className="text-xs text-green-600">+18% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">3</div>
              <p className="text-xs text-orange-600">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">API Calls</CardTitle>
              <Database className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">2.4M</div>
              <p className="text-xs text-purple-600">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="settings">Global Settings</TabsTrigger>
            <TabsTrigger value="payments">Payment Options</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    System Status
                  </CardTitle>
                  <CardDescription>Real-time system health and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Backend API</span>
                      <Badge variant="default" className="bg-green-500">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <Badge variant="default" className="bg-green-500">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Blockchain Node</span>
                      <Badge variant="default" className="bg-green-500">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CDN</span>
                      <Badge variant="default" className="bg-green-500">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Service</span>
                      <Badge variant="secondary">Maintenance</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Critical Actions
                  </CardTitle>
                  <CardDescription>Immediate attention required</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Security Alert: Suspicious Login Attempts
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Server className="h-4 w-4 mr-2" />
                    Database Backup Required
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Review Admin Access Requests
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Process Pending Withdrawals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Security Overview
                  </CardTitle>
                  <CardDescription>Platform security status and threats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Failed Login Attempts</span>
                      <span className="font-medium text-red-600">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Sessions</span>
                      <span className="font-medium">1,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Blocked IPs</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SSL Certificate</span>
                      <Badge variant="default" className="bg-green-500">Valid</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Controls</CardTitle>
                  <CardDescription>Manage security policies and controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Reset All User Passwords
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA for All Admins
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Update Security Policies
                  </Button>
                  <Button className="w-full justify-start" variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency Lockdown
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  User Role Management
                </CardTitle>
                <CardDescription>Assign and manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Crown className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="font-medium">SuperAdmin Users</p>
                        <p className="text-sm text-muted-foreground">Full system access</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default" className="bg-purple-500">1 Active</Badge>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-8 w-8 text-red-600" />
                      <div>
                        <p className="font-medium">Admin Users</p>
                        <p className="text-sm text-muted-foreground">Platform management</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">5 Active</Badge>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">Regular Users</p>
                        <p className="text-sm text-muted-foreground">Standard platform access</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">1,234 Active</Badge>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Controls
                </CardTitle>
                <CardDescription>Platform financial management and controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Revenue Controls</h4>
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Adjust Platform Fees
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Financial Reports
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Revenue Analytics
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Payment Controls</h4>
                    <Button className="w-full justify-start" variant="outline">
                      <Lock className="h-4 w-4 mr-2" />
                      Manage Payment Methods
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Fraud Prevention Settings
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Transaction Monitoring
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Infrastructure Management
                </CardTitle>
                <CardDescription>Server, database, and system infrastructure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Servers</h4>
                    <div className="text-center p-4 border rounded-lg">
                      <Server className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Web Servers</p>
                      <p className="text-xs text-muted-foreground">3/3 Online</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Databases</h4>
                    <div className="text-center p-4 border rounded-lg">
                      <Database className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">MySQL Cluster</p>
                      <p className="text-xs text-muted-foreground">2/2 Online</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Services</h4>
                    <div className="text-center p-4 border rounded-lg">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Microservices</p>
                      <p className="text-xs text-muted-foreground">8/8 Running</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Global Platform Settings
                </CardTitle>
                <CardDescription>Configure system-wide settings and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Platform Configuration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Maintenance Mode</span>
                        <Button variant="outline" size="sm">Toggle</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Registration Open</span>
                        <Badge variant="default" className="bg-green-500">Yes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">KYC Required</span>
                        <Badge variant="default" className="bg-green-500">Yes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Verification</span>
                        <Badge variant="secondary">Optional</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Security Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">2FA Required</span>
                        <Badge variant="secondary">Optional</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Session Timeout</span>
                        <span className="text-sm text-muted-foreground">24 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rate Limiting</span>
                        <Badge variant="default" className="bg-green-500">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">IP Whitelisting</span>
                        <Badge variant="secondary">Disabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-600">Danger Zone</h4>
                      <p className="text-sm text-muted-foreground">Irreversible actions</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="destructive" size="sm">
                        Reset Database
                      </Button>
                      <Button variant="destructive" size="sm">
                        Shutdown System
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Payment Options Management
                </CardTitle>
                <CardDescription>Configure available payment methods for users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Active Payment Methods</h3>
                    <Button onClick={() => setShowAddModal(true)} className="bg-primary">
                      Add New Method
                    </Button>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Currency</TableHead>
                          <TableHead>Fee</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paymentOptions.map((option) => (
                          <TableRow key={option.id}>
                            <TableCell className="font-medium">{option.name}</TableCell>
                            <TableCell>{option.type}</TableCell>
                            <TableCell>{option.currency}</TableCell>
                            <TableCell>{(option.fee_percentage * 100).toFixed(2)}%</TableCell>
                            <TableCell>
                              <Badge variant={option.is_active ? "default" : "secondary"}>
                                {option.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" onClick={() => editOption(option)}>
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteOption(option.id)}>
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
        
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Name" value={newOption.name} onChange={(e) => setNewOption({ ...newOption, name: e.target.value })} />
                  <Select value={newOption.type} onValueChange={(value) => setNewOption({ ...newOption, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="fiat">Fiat</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Currency" value={newOption.currency} onChange={(e) => setNewOption({ ...newOption, currency: e.target.value })} />
                  <Input placeholder="Provider" value={newOption.provider} onChange={(e) => setNewOption({ ...newOption, provider: e.target.value })} />
                  <Input type="number" step="0.01" placeholder="Fee %" value={newOption.fee_percentage} onChange={(e) => setNewOption({ ...newOption, fee_percentage: parseFloat(e.target.value) || 0 })} />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active" checked={newOption.is_active} onCheckedChange={(checked) => setNewOption({ ...newOption, is_active: checked })} />
                    <Label htmlFor="active">Active</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" onClick={() => setShowAddModal(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={handleCreateOption} disabled={isSubmitting}>
                      {isSubmitting ? 'Creating...' : 'Create'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
        
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Payment Method</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Name" value={editingOption?.name || ''} onChange={(e) => setEditingOption({ ...editingOption, name: e.target.value })} />
                  <Select value={editingOption?.type || 'crypto'} onValueChange={(value) => setEditingOption({ ...editingOption, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="fiat">Fiat</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Currency" value={editingOption?.currency || ''} onChange={(e) => setEditingOption({ ...editingOption, currency: e.target.value })} />
                  <Input placeholder="Provider" value={editingOption?.provider || ''} onChange={(e) => setEditingOption({ ...editingOption, provider: e.target.value })} />
                  <Input type="number" step="0.01" placeholder="Fee %" value={editingOption?.fee_percentage || 0} onChange={(e) => setEditingOption({ ...editingOption, fee_percentage: parseFloat(e.target.value) || 0 })} />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active" checked={editingOption?.is_active || false} onCheckedChange={(checked) => setEditingOption({ ...editingOption, is_active: checked })} />
                    <Label htmlFor="active">Active</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" onClick={() => setShowEditModal(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateOption} disabled={isSubmitting}>
                      {isSubmitting ? 'Updating...' : 'Update'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>
          </Tabs>
          </main>
          </div>
          )
        }
