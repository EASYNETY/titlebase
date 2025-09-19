"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { socialProviders } from "@/lib/auth/social-providers"
import { SuperAdminLogin } from "./superadmin-login"
import { AlertCircle, Eye, EyeOff } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, loginWithWallet, isLoading, loginAsSuperAdmin } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [showSuperAdmin, setShowSuperAdmin] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setUsername('')
    setError(null)
    setShowPassword(false)
  }

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab)
    resetForm()
  }
  
  const handleClose = () => {
    onClose()
    resetForm()
    setShowSuperAdmin(false)
  }

  const handleSocialLogin = async (providerId: string) => {
    setError(null)
    try {
      await login(providerId)
      handleClose()
    } catch (err) {
      setError("Social login failed. Please try again.")
    }
  }

  const handleWalletLogin = async () => {
    setError(null)
    try {
      await loginWithWallet()
      handleClose()
    } catch (err) {
      setError("Wallet connection failed. Please try again.")
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsEmailLoading(true)

    if (activeTab === 'signup' && password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsEmailLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/auth/email-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username,
          isSignup: activeTab === 'signup'
        })
      })
      
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('auth-token', data.token)
        handleClose()
        router.push(data.redirectUrl || '/user')
      } else {
        setError(data.error || 'Authentication failed')
      }
    } catch (err) {
      console.error('Email auth failed:', err)
      setError('An unexpected error occurred.')
    } finally {
      setIsEmailLoading(false)
    }
  }
  
  const handleSuperAdminLogin = async (adminPassword: string) => {
    setError(null)
    try {
        await loginAsSuperAdmin(adminPassword)
        handleClose()
        router.push('/super-admin')
    } catch (err) {
        setError("Invalid Super Admin password.")
    }
  }

  const hasOAuthConfig = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !== "your_google_client_id"

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* ================================================================== */}
      {/* KEY CHANGE 1: Added classes here to control height and layout.     */}
      {/* max-h-[90vh] ensures the modal is never taller than 90% of the     */}
      {/* screen height. flex flex-col prepares it for the scrolling content.*/}
      {/* ================================================================== */}
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        {showSuperAdmin ? (
          <SuperAdminLogin 
            onSubmit={handleSuperAdminLogin}
            onBack={() => {
                setShowSuperAdmin(false)
                setError(null)
            }}
            error={error}
            isLoading={isLoading}
          />
        ) : (
          <>
            {/* The header is now a flex item that does not shrink or grow */}
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="text-center text-2xl font-bold">
                {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
              </DialogTitle>
              <DialogDescription className="text-center">
                {activeTab === 'login' ? 'Sign in to access your dashboard.' : 'Get started in just a few clicks.'}
              </DialogDescription>
            </DialogHeader>

            {/* ================================================================ */}
            {/* KEY CHANGE 2: This div now wraps all the content and scrolls.  */}
            {/* overflow-y-auto adds a scrollbar ONLY when needed.             */}
            {/* flex-grow allows this div to take up all available space.      */}
            {/* The right padding (pr-4) prevents content from hiding under    */}
            {/* the scrollbar.                                                 */}
            {/* ================================================================ */}
            <div className="flex-grow overflow-y-auto p-1 pr-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1 my-4">
                <Button variant={activeTab === 'login' ? 'default' : 'ghost'} onClick={() => handleTabChange('login')}>Sign In</Button>
                <Button variant={activeTab === 'signup' ? 'default' : 'ghost'} onClick={() => handleTabChange('signup')}>Sign Up</Button>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {activeTab === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Your display name" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-7 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {activeTab === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" placeholder="••••••••" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading || isEmailLoading}>
                    {(isLoading || isEmailLoading) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : activeTab === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or</span></div>
              </div>

              {/* Social & Wallet Logins */}
              <div className="space-y-3">
                {Object.values(socialProviders).map((provider) => (
                    <Button key={provider.id} variant="outline" className="w-full justify-center gap-3" onClick={() => handleSocialLogin(provider.id)} disabled={!hasOAuthConfig || isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <span className="text-lg">{provider.icon}</span>
                        Continue with {provider.name}
                    </Button>
                ))}
                <Button variant="outline" className="w-full justify-center gap-3" onClick={handleWalletLogin} disabled={isLoading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4Z"/></svg>
                    Continue with Wallet
                </Button>
              </div>
            </div>

            {/* The footer is also a flex item that does not shrink or grow */}
            <div className="text-center flex-shrink-0 border-t pt-4">
              <Button variant="link" size="sm" className="text-xs text-muted-foreground" onClick={() => setShowSuperAdmin(true)}>
                  Super Admin Login
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}