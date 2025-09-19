"use client"

import type React from "react"

import { useAuth, type UserRole } from "@/lib/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RoleGuardProps {
  children: React.ReactNode
  requiredRoles: UserRole[]
  fallbackPath?: string
  showUnauthorized?: boolean
}

export function RoleGuard({ children, requiredRoles, fallbackPath = "/", showUnauthorized = false }: RoleGuardProps) {
  const { user, isLoading, canAccess } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !canAccess(requiredRoles)) {
      if (!showUnauthorized) {
        router.push(fallbackPath)
      }
    }
  }, [user, isLoading, canAccess, requiredRoles, router, fallbackPath, showUnauthorized])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!canAccess(requiredRoles)) {
    if (showUnauthorized) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
    return null
  }

  return <>{children}</>
}
