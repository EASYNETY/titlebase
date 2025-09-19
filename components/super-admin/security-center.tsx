"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle, Eye, Lock, Activity, UserX, Globe, Clock } from "lucide-react"

export function SecurityCenter() {
  const [securityAlerts] = useState([
    {
      id: "1",
      type: "suspicious_login",
      severity: "high",
      message: "Multiple failed login attempts from IP 192.168.1.100",
      timestamp: "2024-01-20 14:30:00",
      status: "active",
    },
    {
      id: "2",
      type: "unusual_activity",
      severity: "medium",
      message: "Large transaction volume detected for user ID 12345",
      timestamp: "2024-01-20 12:15:00",
      status: "investigating",
    },
    {
      id: "3",
      type: "permission_change",
      severity: "low",
      message: "Admin permissions modified for user sarah@realtyshare.com",
      timestamp: "2024-01-20 09:45:00",
      status: "resolved",
    },
  ])

  const getSeverityBadge = (severity: string) => {
    const config = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
    }
    return <Badge className={config[severity as keyof typeof config]}>{severity}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <p className="text-xs text-muted-foreground">Excellent security</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">High Priority Security Alert</AlertTitle>
            <AlertDescription className="text-red-700">
              Multiple suspicious login attempts detected. Immediate attention required.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Recent Security Alerts</CardTitle>
              <CardDescription>Monitor and respond to security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium capitalize">{alert.type.replace("_", " ")}</TableCell>
                      <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                      <TableCell className="max-w-md">{alert.message}</TableCell>
                      <TableCell className="text-sm">{alert.timestamp}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            alert.status === "active"
                              ? "bg-red-100 text-red-800"
                              : alert.status === "investigating"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Resolve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Complete log of administrative actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    action: "User role modified",
                    user: "john@realtyshare.com",
                    target: "sarah@realtyshare.com",
                    timestamp: "2024-01-20 14:30:00",
                    ip: "192.168.1.50",
                  },
                  {
                    action: "Property approved",
                    user: "mike@realtyshare.com",
                    target: "Property #12345",
                    timestamp: "2024-01-20 13:15:00",
                    ip: "192.168.1.75",
                  },
                  {
                    action: "System settings changed",
                    user: "john@realtyshare.com",
                    target: "Maintenance mode",
                    timestamp: "2024-01-20 12:00:00",
                    ip: "192.168.1.50",
                  },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">
                        By {log.user} on {log.target}
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{log.timestamp}</p>
                      <p>IP: {log.ip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Access Restrictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">IP Whitelist Enabled</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2FA Required</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Timeout</span>
                    <Badge className="bg-blue-100 text-blue-800">30 min</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max Login Attempts</span>
                    <Badge className="bg-blue-100 text-blue-800">5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Geographic Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { country: "United States", sessions: 1205, status: "allowed" },
                    { country: "Canada", sessions: 42, status: "allowed" },
                    { country: "United Kingdom", sessions: 18, status: "allowed" },
                    { country: "Unknown", sessions: 3, status: "blocked" },
                  ].map((location) => (
                    <div key={location.country} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">{location.country}</span>
                        <p className="text-xs text-muted-foreground">{location.sessions} sessions</p>
                      </div>
                      <Badge
                        className={
                          location.status === "allowed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {location.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Real-time Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Monitoring</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Scan</span>
                    <span className="text-sm text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Threats Blocked</span>
                    <span className="text-sm font-medium">247</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Firewall Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">WAF Protection</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">DDoS Protection</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rate Limiting</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SSL/TLS Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Certificate Valid</span>
                    <Badge className="bg-green-100 text-green-800">Yes</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Expires</span>
                    <span className="text-sm text-muted-foreground">90 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Grade</span>
                    <Badge className="bg-green-100 text-green-800">A+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
