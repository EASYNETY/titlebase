"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Eye, EyeOff, Crown } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"

export default function SuperAdminLoginPage() {
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
      // Redirect handled in hook to /super-admin
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Super Admin Login</CardTitle>
          <CardDescription className="text-center">
            Access the super admin control center for full system management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin}>
            <div className="space-y-2">
              <Input
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
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Logging in..." : "Login as Super Admin"}
            </Button>
          </form>
          <div className="text-center text-xs text-muted-foreground">
            For demo access, try password: admin123
          </div>
        </CardContent>
      </Card>
    </div>
  )
}