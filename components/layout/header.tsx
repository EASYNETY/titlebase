"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { UserMenu } from "@/components/auth/user-menu"
import { LoginModal } from "@/components/auth/login-modal"
import { notificationsApi } from "@/lib/api/client"

export function Header() {
  const { isAuthenticated } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState<any[]>([])
  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([])
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const resp: any = await notificationsApi.getNotifications({ limit: 10 })
        const items = resp?.notifications ?? resp ?? []
        if (!cancelled) setNotifications(items)
      } catch (e) {
        console.error("Failed to load notifications", e)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [isAuthenticated])

  const markAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    } catch (e) {
      console.error("markAsRead failed", e)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:block">TitleBase</span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search properties, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Search */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="w-5 h-5" />
              </Button>

              {/* Notifications */}
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <Badge className="pointer-events-none absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-3 border-b">
                      <h4 className="font-medium">Notifications</h4>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-3 text-sm text-muted-foreground">No notifications</div>
                      ) : (
                        notifications.map((n: any) => (
                          <DropdownMenuItem
                            key={n.id}
                            className="p-3 cursor-pointer"
                            onClick={() => markAsRead(n.id)}
                          >
                            <div className="flex items-start gap-3 w-full">
                              <div className={`w-2 h-2 rounded-full mt-2 ${!n.read ? "bg-primary" : "bg-muted"}`} />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{n.title || n.message || "Notification"}</p>
                                {n.time && <p className="text-xs text-muted-foreground">{n.time}</p>}
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={async () => {
                          try {
                            const resp: any = await notificationsApi.getNotifications({ limit: 20 })
                            setNotifications(resp?.notifications ?? resp ?? [])
                          } catch {}
                        }}
                      >
                        Refresh
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* User Menu or Login */}
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button onClick={() => setShowLogin(true)} size="sm">
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  )
}
