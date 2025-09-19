"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Server,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Shield,
} from "lucide-react"

export function SystemManagement() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshMetrics = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold text-green-600">Online</span>
            </div>
            <p className="text-xs text-muted-foreground">Uptime: 99.9%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold text-green-600">Healthy</span>
            </div>
            <p className="text-xs text-muted-foreground">Response: 12ms</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="text-lg font-semibold text-orange-600">Warning</span>
            </div>
            <p className="text-xs text-muted-foreground">High load detected</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold text-green-600">Secure</span>
            </div>
            <p className="text-xs text-muted-foreground">All checks passed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>
          <Button onClick={handleRefreshMetrics} disabled={isRefreshing} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Usage</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Avg (24h)</span>
                    <div className="font-medium">45%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Peak (24h)</span>
                    <div className="font-medium">89%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="h-5 w-5" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Usage</span>
                    <span className="font-medium">12.4 GB / 16 GB</span>
                  </div>
                  <Progress value={77.5} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Available</span>
                    <div className="font-medium">3.6 GB</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cached</span>
                    <div className="font-medium">2.1 GB</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Storage Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Storage</span>
                    <span className="font-medium">245 GB / 500 GB</span>
                  </div>
                  <Progress value={49} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>File Storage</span>
                    <span className="font-medium">1.2 TB / 2 TB</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Network Traffic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Inbound</span>
                    <div className="font-medium">125 MB/s</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Outbound</span>
                    <div className="font-medium">89 MB/s</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total (24h)</span>
                    <div className="font-medium">2.4 TB</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Peak</span>
                    <div className="font-medium">450 MB/s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Logs</CardTitle>
              <CardDescription>Latest system events and errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { level: "info", message: "Database backup completed successfully", time: "2 minutes ago" },
                  { level: "warning", message: "High CPU usage detected on server-02", time: "5 minutes ago" },
                  { level: "error", message: "Failed to connect to external API", time: "12 minutes ago" },
                  { level: "info", message: "User authentication service restarted", time: "1 hour ago" },
                  { level: "info", message: "Scheduled maintenance completed", time: "2 hours ago" },
                ].map((log, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Badge
                      className={
                        log.level === "error"
                          ? "bg-red-100 text-red-800"
                          : log.level === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {log.level}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Maintenance Mode</AlertTitle>
            <AlertDescription>
              Use these controls carefully. Maintenance mode will temporarily disable user access to the platform.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>Control platform availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Enable Maintenance Mode
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Restart Application Servers
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Clear Application Cache
                </Button>
                <Button variant="destructive" className="w-full">
                  Emergency Shutdown
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Operations</CardTitle>
                <CardDescription>Database maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Run Database Backup
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Optimize Database
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Check Database Integrity
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  View Backup History
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground">Currently online</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">API Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45.2K</div>
                <p className="text-sm text-muted-foreground">Last hour</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">0.02%</div>
                <p className="text-sm text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
