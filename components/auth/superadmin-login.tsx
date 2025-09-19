"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Shield, Crown, AlertCircle, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"

interface SuperAdminLoginProps {
  isOpen: boolean
  onClose: () => void
}

export function SuperAdminLogin({ isOpen, onClose }: SuperAdminLoginProps) {
  const { loginAsSuperAdmin, isLoading } = useAuth()
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!password) {
      setError("Please enter the superadmin password")
      return
    }

    try {
      await loginAsSuperAdmin(password)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    }
  }

  const handleDemoLogin = async () => {
    setError("")
    try {
      await loginAsSuperAdmin("admin123")
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo login failed")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <Crown className="w-6 h-6" />
            SuperAdmin Access
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Demo Access Card */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                Demo Access
              </CardTitle>
              <CardDescription className="text-blue-700">
                Quick access for testing (OAuth client IDs not required)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleDemoLogin} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
                {isLoading ? "Logging in..." : "Login as Demo SuperAdmin"}
              </Button>
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or use credentials</span>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">SuperAdmin Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter superadmin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Logging in..." : "Login as SuperAdmin"}
            </Button>
          </form>

          {/* Info */}
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium mb-1">SuperAdmin Capabilities:</p>
              <ul className="space-y-1">
                <li>• Full system management access</li>
                <li>• User role and permission management</li>
                <li>• Platform settings configuration</li>
                <li>• Security and compliance oversight</li>
                <li>• Analytics and reporting access</li>
              </ul>
            </div>
            <p className="text-center">OAuth integration can be configured later with client IDs</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
