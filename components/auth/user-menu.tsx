"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/hooks/use-auth"
import { KYCModal } from "./kyc-modal"

export function UserMenu() {
  const { user, logout } = useAuth()
  const [showKYC, setShowKYC] = useState(false)

  if (!user) return null

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.address?.slice(2, 4).toUpperCase() || "??"

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || "User"} />
              <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-none">{user.name || "Anonymous User"}</p>
                <div className="flex gap-1">
                  {user.isKYCVerified && (
                    <Badge variant="secondary" className="text-xs">
                      KYC ✓
                    </Badge>
                  )}
                  {user.isWhitelisted && (
                    <Badge variant="outline" className="text-xs">
                      Whitelisted
                    </Badge>
                  )}
                </div>
              </div>

              {user.email && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}

              {user.address && (
                <p className="text-xs leading-none text-muted-foreground font-mono">
                  {user.address.slice(0, 6)}...{user.address.slice(-4)}
                </p>
              )}

              {user.smartAccountAddress && (
                <div className="text-xs text-muted-foreground">
                  <p>Smart Account:</p>
                  <p className="font-mono">
                    {user.smartAccountAddress.slice(0, 6)}...{user.smartAccountAddress.slice(-4)}
                  </p>
                </div>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => (window.location.href = "/marketplace")}>Marketplace</DropdownMenuItem>
          <DropdownMenuItem onClick={() => (window.location.href = "/portfolio")}>Portfolio</DropdownMenuItem>
          <DropdownMenuItem onClick={() => (window.location.href = "/transactions")}>Transactions</DropdownMenuItem>
          <DropdownMenuItem onClick={() => (window.location.href = "/billing")}>Billing</DropdownMenuItem>
          <DropdownMenuItem onClick={() => (window.location.href = "/support")}>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => (window.location.href = "/user/settings")}>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />

          {!user.isKYCVerified && (
            <DropdownMenuItem onClick={() => setShowKYC(true)}>Complete KYC Verification</DropdownMenuItem>
          )}

          {!user.smartAccountAddress && (
            <DropdownMenuItem onClick={() => (window.location.href = "/smart-account")}>
              Create Smart Account
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={logout} className="text-destructive">
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <KYCModal isOpen={showKYC} onClose={() => setShowKYC(false)} />
    </>
  )
}
