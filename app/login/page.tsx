"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Eye, EyeOff, Wallet, Crown } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { useConnect, useAccount } from "wagmi"
import { authApi } from "@/lib/api/client"

export default function AuthPage() {
  const router = useRouter()
  const { loginWithWallet, loginAsSuperAdmin, isLoading, isAuthenticated } = useAuth()
  const { connect, connectors } = useConnect()
  const { isConnected } = useAccount()

  const [isSigningUp, setIsSigningUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")

  // State for Super Admin modal/form
  const [showSuperAdminLogin, setShowSuperAdminLogin] = useState(false)
  const [superAdminPassword, setSuperAdminPassword] = useState("")
  const [showSuperPassword, setShowSuperPassword] = useState(false)

  if (isAuthenticated) {
    router.push("/user")
    return null
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Email and password are required.")
      return
    }
    if (isSigningUp && password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      // Use the single, unified endpoint for both login and signup
      const response = await fetch("/api/auth/email-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isSignup: isSigningUp }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("auth-token", data.token)

        // If a new user signed up, create their smart wallet
        if (isSigningUp) {
          const smartAddress = await authApi.createSmartAccount()
          await fetch("/api/auth/smart-account", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.token}` },
            body: JSON.stringify({ smartAccountAddress: smartAddress }),
          })
        }

        const redirectUrl = data.redirectUrl || "/user"
        router.push(redirectUrl)
      } else {
        setError(data.error || "Authentication failed.")
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  const handleWalletLogin = async () => {
    setError("")
    if (!isConnected) {
      const walletConnect = connectors.find(c => c.id === "walletConnect")
      if (walletConnect) {
        await connect({ connector: walletConnect })
      }
      return
    }
    try {
      await loginWithWallet()
      // Successful wallet login will be handled by the useAuth hook's effect
    } catch (err) {
      setError("Wallet login failed. Please try again.")
    }
  }

  const handleSuperAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!superAdminPassword) {
      setError("Password is required")
      return
    }
    try {
      await loginAsSuperAdmin(superAdminPassword)
      router.push("/super-admin") // Redirect on success
    } catch (err) {
      setError("Invalid super admin password")
    }
  }

  const renderSuperAdminForm = () => (
    <div className="space-y-4">
      <h3 className="text-center font-semibold">Super Admin Login</h3>
      <form onSubmit={handleSuperAdminLogin} className="space-y-4">
        <div className="space-y-2 relative">
          <Label htmlFor="super-password">Password</Label>
          <Input
            id="super-password"
            type={showSuperPassword ? "text" : "password"}
            placeholder="Enter super admin password"
            value={superAdminPassword}
            onChange={(e) => setSuperAdminPassword(e.target.value)}
            required
          />
          <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-6 h-9 p-0" onClick={() => setShowSuperPassword(!showSuperPassword)}>
            {showSuperPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login as Super Admin"}
        </Button>
        <Button variant="link" className="w-full" onClick={() => setShowSuperAdminLogin(false)}>
          Back to User Login
        </Button>
      </form>
    </div>
  )

  const renderMainForm = () => (
    <>
      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-6 h-9 p-0" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {isSigningUp && (
          <div className="space-y-2 relative">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-6 h-9 p-0" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (isSigningUp ? "Creating Account..." : "Signing In...") : isSigningUp ? "Create Account" : "Sign In"}
        </Button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button onClick={handleWalletLogin} variant="outline" className="w-full" disabled={isLoading || !connectors.length}>
        <Wallet className="mr-2 h-4 w-4" />
        {isLoading ? "Connecting..." : isConnected ? "Sign In with Wallet" : "Connect Wallet"}
      </Button>

      <p className="px-8 text-center text-sm text-muted-foreground mt-4">
        <button onClick={() => setIsSigningUp(!isSigningUp)} className="underline underline-offset-4 hover:text-primary">
          {isSigningUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </p>

      {/* <div className="text-center mt-4 border-t pt-4">
        <Button variant="link" size="sm" onClick={() => setShowSuperAdminLogin(true)}>
          <Crown className="mr-2 h-4 w-4" /> Super Admin Login
        </Button>
      </div> */}
    </>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🏠</span>
          </div>
          <CardTitle className="text-2xl font-bold">TitleBase</CardTitle>
          <CardDescription>
            {showSuperAdminLogin ? "Access the admin dashboard" : isSigningUp ? "Create your account to get started" : "Sign in to access your dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {showSuperAdminLogin ? renderSuperAdminForm() : renderMainForm()}
        </CardContent>
      </Card>
    </div>
  )
}