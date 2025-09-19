"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/hooks/use-auth"
import { RoleGuard } from "@/lib/auth/role-guard"
import { PermissionGuard } from "@/lib/auth/permission-guard"
import {
  Shield,
  Users,
  Scale,
  FileCheck,
  Building,
  Phone,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"

export default function RoleTestPage() {
  const { user, hasRole, hasPermission, isAuthenticated } = useAuth()

  const allRoles = [
    { name: "super_admin", label: "Super Admin", icon: Shield, color: "bg-red-100 text-red-800" },
    { name: "admin", label: "Admin", icon: Shield, color: "bg-orange-100 text-orange-800" },
    { name: "account_manager", label: "Account Manager", icon: Users, color: "bg-green-100 text-green-800" },
    { name: "property_lawyer", label: "Property Lawyer", icon: Scale, color: "bg-blue-100 text-blue-800" },
    { name: "auditor", label: "Auditor", icon: FileCheck, color: "bg-purple-100 text-purple-800" },
    { name: "compliance", label: "Compliance Officer", icon: Building, color: "bg-indigo-100 text-indigo-800" },
    { name: "front_office", label: "Front Office", icon: Phone, color: "bg-cyan-100 text-cyan-800" },
    { name: "user", label: "User", icon: User, color: "bg-gray-100 text-gray-800" },
  ]

  const allPermissions = [
    "manage_users",
    "manage_roles",
    "view_analytics",
    "manage_properties",
    "process_kyc",
    "handle_support",
    "audit_transactions",
    "manage_compliance",
    "view_market_insights",
    "view_realtime_metrics",
    "export_reports",
    "manage_distributions",
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>Please log in to test role-based access control features.</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Role-Based Access Control Test</h1>
            <p className="text-slate-600">Test and verify role-based permissions and access controls</p>
          </div>
        </div>

        {/* Current User Info */}
        <Card>
          <CardHeader>
            <CardTitle>Current User Information</CardTitle>
            <CardDescription>Your current authentication status and role assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="font-mono text-sm">{user?.id || "Not available"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-sm">{user?.email || "Not available"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Primary Role</p>
                <Badge className="mt-1">{user?.role || "No role assigned"}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Authentication</p>
                <Badge className="mt-1 bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Authenticated
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roles">Role Access</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="components">Component Guards</TabsTrigger>
            <TabsTrigger value="navigation">Navigation Test</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access Test</CardTitle>
                <CardDescription>Test access to different role-based dashboards and features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {allRoles.map((role) => {
                    const hasAccess = hasRole(role.name)
                    const Icon = role.icon

                    return (
                      <div key={role.name} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{role.label}</span>
                          </div>
                          {hasAccess ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <Badge className={hasAccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {hasAccess ? "Access Granted" : "Access Denied"}
                        </Badge>
                        {hasAccess && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2 bg-transparent"
                            onClick={() => window.open(`/${role.name.replace("_", "-")}`, "_blank")}
                          >
                            Open Dashboard
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Permission-Based Access Test</CardTitle>
                <CardDescription>Test granular permissions for specific features and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {allPermissions.map((permission) => {
                    const hasAccess = hasPermission(permission)

                    return (
                      <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium text-sm">{permission.replace("_", " ").toUpperCase()}</span>
                        <div className="flex items-center gap-2">
                          {hasAccess ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <Badge className="bg-green-100 text-green-800 text-xs">Allowed</Badge>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-600" />
                              <Badge className="bg-red-100 text-red-800 text-xs">Denied</Badge>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Component Guard Testing</CardTitle>
                <CardDescription>Test role and permission guards on UI components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Super Admin Only */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Super Admin Only Content</h4>
                  <RoleGuard
                    requiredRoles={["super_admin"]}
                    fallback={
                      <Alert>
                        <XCircle className="h-4 w-4" />
                        <AlertTitle>Access Denied</AlertTitle>
                        <AlertDescription>This content is only visible to Super Admins.</AlertDescription>
                      </Alert>
                    }
                  >
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Super Admin Access</AlertTitle>
                      <AlertDescription>You have Super Admin privileges and can see this content!</AlertDescription>
                    </Alert>
                  </RoleGuard>
                </div>

                {/* Admin or Higher */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Admin Level Content</h4>
                  <RoleGuard
                    requiredRoles={["admin", "super_admin"]}
                    fallback={
                      <Alert>
                        <XCircle className="h-4 w-4" />
                        <AlertTitle>Access Denied</AlertTitle>
                        <AlertDescription>This content requires Admin or Super Admin role.</AlertDescription>
                      </Alert>
                    }
                  >
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Admin Access</AlertTitle>
                      <AlertDescription>You have Admin level access to this content!</AlertDescription>
                    </Alert>
                  </RoleGuard>
                </div>

                {/* Permission-Based */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">User Management Permission</h4>
                  <PermissionGuard
                    requiredPermissions={["manage_users"]}
                    fallback={
                      <Alert>
                        <XCircle className="h-4 w-4" />
                        <AlertTitle>Permission Denied</AlertTitle>
                        <AlertDescription>You don't have permission to manage users.</AlertDescription>
                      </Alert>
                    }
                  >
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>User Management Access</AlertTitle>
                      <AlertDescription>You have permission to manage users!</AlertDescription>
                    </Alert>
                  </PermissionGuard>
                </div>

                {/* Multiple Roles */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Customer Service Roles</h4>
                  <RoleGuard
                    requiredRoles={["account_manager", "front_office", "admin"]}
                    fallback={
                      <Alert>
                        <XCircle className="h-4 w-4" />
                        <AlertTitle>Access Denied</AlertTitle>
                        <AlertDescription>This content is for customer service roles only.</AlertDescription>
                      </Alert>
                    }
                  >
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Customer Service Access</AlertTitle>
                      <AlertDescription>You have access to customer service features!</AlertDescription>
                    </Alert>
                  </RoleGuard>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Access Test</CardTitle>
                <CardDescription>Test role-based navigation and dashboard links</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium">Available Dashboards</h4>
                    {allRoles.map((role) => {
                      const hasAccess = hasRole(role.name)
                      const Icon = role.icon

                      if (!hasAccess) return null

                      return (
                        <Button
                          key={role.name}
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => (window.location.href = `/${role.name.replace("_", "-")}`)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {role.label} Dashboard
                        </Button>
                      )
                    })}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Restricted Dashboards</h4>
                    {allRoles.map((role) => {
                      const hasAccess = hasRole(role.name)
                      const Icon = role.icon

                      if (hasAccess) return null

                      return (
                        <Button
                          key={role.name}
                          variant="outline"
                          className="w-full justify-start opacity-50 bg-transparent"
                          disabled
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {role.label} Dashboard (Restricted)
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
