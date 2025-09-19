"use client"

import type React from "react"

import { useAuth } from "@/lib/hooks/use-auth"

interface PermissionGuardProps {
  children: React.ReactNode
  permission: string
  resource: string
  action: string
  fallback?: React.ReactNode
}

export function PermissionGuard({ children, permission, resource, action, fallback = null }: PermissionGuardProps) {
  const { hasPermission } = useAuth()

  if (!hasPermission(permission, resource, action)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
