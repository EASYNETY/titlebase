"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, DollarSign, Shield, Bell } from "lucide-react"

export function PlatformSettings() {
  const [settings, setSettings] = useState({
    platformName: "TitleBase",
    maintenanceMode: false,
    newUserRegistration: true,
    kycRequired: true,
    emailNotifications: true,
    smsNotifications: false,
    marketplaceFee: "1.0",
    minimumInvestment: "100",
    maxPropertiesPerUser: "50",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Platform Configuration
              </CardTitle>
              <CardDescription>Basic platform settings and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={settings.platformName}
                    onChange={(e) => handleSettingChange("platformName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="UTC">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable user access</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to register</p>
                  </div>
                  <Switch
                    checked={settings.newUserRegistration}
                    onCheckedChange={(checked) => handleSettingChange("newUserRegistration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>KYC Required</Label>
                    <p className="text-sm text-muted-foreground">Require KYC verification for investments</p>
                  </div>
                  <Switch
                    checked={settings.kycRequired}
                    onCheckedChange={(checked) => handleSettingChange("kycRequired", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                <Textarea
                  id="maintenanceMessage"
                  placeholder="Message to display during maintenance"
                  defaultValue="We're currently performing scheduled maintenance. Please check back soon."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Marketplace Settings
              </CardTitle>
              <CardDescription>Configure marketplace fees and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marketplaceFee">Marketplace Fee (%)</Label>
                  <Input
                    id="marketplaceFee"
                    type="number"
                    step="0.1"
                    value={settings.marketplaceFee}
                    onChange={(e) => handleSettingChange("marketplaceFee", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumInvestment">Minimum Investment ($)</Label>
                  <Input
                    id="minimumInvestment"
                    type="number"
                    value={settings.minimumInvestment}
                    onChange={(e) => handleSettingChange("minimumInvestment", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxProperties">Max Properties per User</Label>
                  <Input
                    id="maxProperties"
                    type="number"
                    value={settings.maxPropertiesPerUser}
                    onChange={(e) => handleSettingChange("maxPropertiesPerUser", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Property Categories</h4>
                <div className="grid grid-cols-2 gap-4">
                  {["Residential", "Commercial", "Industrial", "Land"].map((category) => (
                    <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{category}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Payment Methods</h4>
                <div className="grid grid-cols-2 gap-4">
                  {["Cryptocurrency", "Bank Transfer", "Credit Card", "Wire Transfer"].map((method) => (
                    <div key={method} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{method}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground">Restrict admin access by IP</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout inactive sessions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
                <Textarea id="allowedIPs" placeholder="Enter IP addresses, one per line" rows={4} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send browser push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  {[
                    "New user registrations",
                    "Property submissions",
                    "KYC applications",
                    "Large transactions",
                    "System errors",
                    "Security alerts",
                  ].map((type) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm">{type}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Manage external service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {[
                  { name: "Stripe", description: "Payment processing", status: "Connected" },
                  { name: "AWS S3", description: "File storage", status: "Connected" },
                  { name: "SendGrid", description: "Email delivery", status: "Connected" },
                  { name: "Twilio", description: "SMS notifications", status: "Disconnected" },
                  { name: "DocuSign", description: "Document signing", status: "Connected" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm ${integration.status === "Connected" ? "text-green-600" : "text-red-600"}`}
                      >
                        {integration.status}
                      </span>
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save All Settings</Button>
      </div>
    </div>
  )
}
