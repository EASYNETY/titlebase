"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi"
import { useRouter } from "next/navigation"
import { socialProviders } from "@/lib/auth/social-providers"
import { authApi } from "@/lib/api/client"

export type UserRole =
  | "super_admin"
  | "admin"
  | "account_manager"
  | "property_lawyer"
  | "auditor"
  | "compliance_officer"
  | "front_office"
  | "user"

export interface Permission {
  permission: string
  resource: string
  action: "create" | "read" | "update" | "delete" | "approve" | "reject" | "export"
}

interface User {
  id: string
  address?: string
  email?: string
  name?: string
  avatar?: string
  provider: "wallet" | "social" | "superadmin"
  socialProvider?: string
  isKYCVerified: boolean
  isWhitelisted: boolean
  smartAccountAddress?: string
  role: UserRole
  permissions: Permission[]
  department?: string
  isActive: boolean
  lastLogin?: string
  token?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isConnected: boolean
  isNewUser: boolean
  login: (provider: string) => Promise<void>
  loginWithWallet: (role?: string) => Promise<void>
  loginAsSuperAdmin: (password: string) => Promise<void>
  logout: () => Promise<void>
  createSmartAccount: () => Promise<string>
  updateKYCStatus: (verified: boolean) => void
  hasRole: (roles: UserRole | UserRole[]) => boolean
  hasPermission: (permission: string, resource?: string, action?: string) => boolean
  canAccess: (requiredRoles: UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)
  const [error, setError] = useState<any>(null)
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const response = await authApi.getSession() as any
        const userData = response as User
        setUser(userData)

        // Handle role-based redirection if user is logged in but on wrong page
        const currentPath = window.location.pathname
        if (response.redirectUrl && !currentPath.startsWith(response.redirectUrl) && currentPath !== '/') {
          // Only redirect if we're not already on the correct dashboard
          const expectedPath = response.redirectUrl
          if (currentPath !== expectedPath) {
            window.location.href = expectedPath
            return
          }
        }
      } catch (error) {
        console.error("Session check failed:", error)
        setError(error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  useEffect(() => {
    if (error) {
      setUser(null)
    }
  }, [error])

  useEffect(() => {
    // Handle wallet connection
    if (isConnected && address && !user) {
      handleWalletAuth(address)
    }
  }, [isConnected, address, user])

  const handleWalletAuth = async (walletAddress: string, role?: string) => {
    try {
      // Fetch nonce from backend
      const nonceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/nonce?address=${walletAddress}`)
      if (!nonceResponse.ok) {
        throw new Error('Failed to fetch nonce')
      }
      const { nonce } = await nonceResponse.json()

      // Sign message
      const { signMessageAsync } = useSignMessage()
      const signature = await signMessageAsync({ message: nonce })

      // Login with signature
      const response = await authApi.login(walletAddress, role, nonce, signature) as any
      const userData = response.user as User
      const token = response.token
      if (token) {
        localStorage.setItem('auth-token', token)
      }
      setUser({ ...userData, token })
      setIsLoading(false)
      setError(null)

      // Handle role-based redirection
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl
      }
    } catch (error) {
      console.error("Wallet auth failed:", error)
      setError(error)
      setIsLoading(false)
    }
  }

  const login = async (providerId: string) => {
    setIsLoading(true)
    try {
      const provider = socialProviders[providerId]
      if (!provider) throw new Error("Invalid provider")

      // Check if OAuth is configured
      const hasConfig =
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !== "your_google_client_id"

      if (!hasConfig) {
        throw new Error("OAuth client IDs not configured. Please set up OAuth credentials.")
      }

      if (providerId === 'google') {
        // Use backend API to get auth URL
        const { authUrl } = await authApi.getGoogleAuthUrl() as any
        window.location.href = authUrl
      } else {
        // For other providers, use the original method
        window.location.href = provider.getAuthUrl()
      }
    } catch (error) {
      console.error("Social login failed:", error)
      setIsLoading(false)
      setError(error)
      throw error
    }
  }

  const loginWithWallet = async (role?: string) => {
    setIsLoading(true)
    try {
      const walletConnectConnector = connectors.find(c => c.id === 'walletConnect')
      if (walletConnectConnector) {
        connect({ connector: walletConnectConnector })
      } else {
        throw new Error('WalletConnect connector not found. Ensure WalletConnect is configured in wagmi.')
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const loginAsSuperAdmin = async (password: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.superAdminLogin(password) as any
      const userData = response.user as User
      const token = response.token
      if (token) {
        localStorage.setItem('auth-token', token)
      }
      setUser({ ...userData, token })
      console.log("[v0] SuperAdmin login successful:", userData.role)

      // Handle role-based redirection
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl
      }
    } catch (error) {
      console.error("SuperAdmin login failed:", error)
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
      setUser(null)
      localStorage.removeItem('auth-token')
      if (isConnected) {
        disconnect()
      }
      setIsLoading(false)
      window.location.href = '/login'
    } catch (error) {
      console.error("Logout failed:", error)
      setIsLoading(false)
    }
  }

  const createSmartAccount = async (): Promise<string> => {
    if (!user) throw new Error("User not authenticated")

    try {
      const smartAccountAddress = await authApi.createSmartAccount() as string

      setUser((prev) => (prev ? { ...prev, smartAccountAddress } : null))

      return smartAccountAddress
    } catch (error) {
      console.error("Smart account creation failed:", error)
      throw error
    }
  }

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.role)
  }

  const hasPermission = (permission: string, resource = "all", action = "read"): boolean => {
    if (!user?.permissions) return false

    // SuperAdmin has all permissions
    if (user.role === "super_admin") return true

    return user.permissions.some(
      (p) => p.permission === permission && (p.resource === resource || p.resource === "all") && p.action === action,
    )
  }

  const canAccess = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false
    return requiredRoles.includes(user.role)
  }

  const updateKYCStatus = (verified: boolean) => {
    setUser((prev) => (prev ? { ...prev, isKYCVerified: verified } : null))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isConnected,
        isNewUser,
        login,
        loginWithWallet,
        loginAsSuperAdmin,
        logout,
        createSmartAccount,
        updateKYCStatus,
        hasRole,
        hasPermission,
        canAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
