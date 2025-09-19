"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, User } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { useAccount, useConnect, useDisconnect } from "wagmi"

export default function AdminLoginPage() {
  const router = useRouter()
  const { loginWithWallet, isLoading } = useAuth()
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [selectedRole] = useState("admin") // Fixed to admin role

  const handleWalletLogin = async () => {
    if (!isConnected) {
      const connector = connectors[0]
      if (connector) {
        await connect({ connector })
      }
      return
    }

    try {
      await loginWithWallet(selectedRole)
      // Redirect handled in hook
    } catch (error) {
      console.error("Admin login failed:", error)
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Access the admin dashboard to manage platform operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button
              onClick={handleWalletLogin}
              disabled={isLoading || !connectors.length}
              className="w-full"
              variant={isConnected ? "default" : "outline"}
            >
              {isLoading ? (
                "Connecting..."
              ) : isConnected ? (
                "Login as Admin"
              ) : (
                "Connect Wallet"
              )}
            </Button>
            {isConnected && (
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="w-full"
              >
                Change Wallet
              </Button>
            )}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Select admin role during connection to access dashboard
          </div>
        </CardContent>
      </Card>
    </div>
  )
}