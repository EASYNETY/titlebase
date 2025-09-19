"use client"

import { useState } from "react"
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
import {
  Search,
  Bell,
  HelpCircle,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Shield,
  Users,
  Briefcase,
  Phone,
  Scale,
  FileCheck,
  Building,
} from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { LoginModal } from "@/components/auth/login-modal"

export function SaaSHeader() {
  const { isAuthenticated, user, hasRole, hasPermission } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications] = useState([
    { id: 1, title: "New distribution payment", time: "2 min ago", unread: true },
    { id: 2, title: "Property valuation updated", time: "1 hour ago", unread: true },
    { id: 3, title: "Auction ending soon", time: "3 hours ago", unread: false },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const getRoleBasedNavigation = () => {
    const navItems = []

    // Standard user navigation
    navItems.push(
      <Link key="marketplace" href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
        Marketplace
      </Link>,
      <Link key="auctions" href="/auctions" className="text-sm font-medium hover:text-primary transition-colors">
        Auctions
      </Link>,
    )

    // Portfolio for authenticated users
    if (isAuthenticated) {
      navItems.push(
        <Link key="portfolio" href="/portfolio" className="text-sm font-medium hover:text-primary transition-colors">
          Portfolio
        </Link>,
      )
    }

    // Analytics dropdown with role-based items
    const analyticsItems = []
    analyticsItems.push(
      <DropdownMenuItem key="dashboard" asChild>
        <Link href="/analytics">Dashboard</Link>
      </DropdownMenuItem>,
    )

    if (hasPermission("view_market_insights")) {
      analyticsItems.push(
        <DropdownMenuItem key="market" asChild>
          <Link href="/analytics?tab=market">Market Insights</Link>
        </DropdownMenuItem>,
      )
    }

    if (hasPermission("view_realtime_metrics")) {
      analyticsItems.push(
        <DropdownMenuItem key="realtime" asChild>
          <Link href="/analytics?tab=realtime">Real-time Metrics</Link>
        </DropdownMenuItem>,
      )
    }

    navItems.push(
      <DropdownMenu key="analytics">
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
          Analytics
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>{analyticsItems}</DropdownMenuContent>
      </DropdownMenu>,
    )

    // Admin navigation
    if (hasRole(["admin", "super_admin"])) {
      navItems.push(
        <DropdownMenu key="admin">
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
            Admin
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Shield className="w-4 h-4 mr-2" />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
            {hasRole("super_admin") && (
              <DropdownMenuItem asChild>
                <Link href="/super-admin">
                  <Shield className="w-4 h-4 mr-2" />
                  Super Admin
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>,
      )
    }

    return navItems
  }

  const getRoleBasedUserMenu = () => {
    const menuItems = []

    // Standard user items
    menuItems.push(
      <DropdownMenuItem key="profile" asChild>
        <Link href="/profile">Profile Settings</Link>
      </DropdownMenuItem>,
      <DropdownMenuItem key="portfolio" asChild>
        <Link href="/portfolio">My Portfolio</Link>
      </DropdownMenuItem>,
      <DropdownMenuItem key="transactions" asChild>
        <Link href="/transactions">Transaction History</Link>
      </DropdownMenuItem>,
    )

    menuItems.push(<DropdownMenuSeparator key="sep1" />)

    // Role-specific dashboard links
    if (hasRole("account_manager")) {
      menuItems.push(
        <DropdownMenuItem key="account-manager" asChild>
          <Link href="/account-manager">
            <Users className="w-4 h-4 mr-2" />
            Account Manager
          </Link>
        </DropdownMenuItem>,
      )
    }

    if (hasRole("property_lawyer")) {
      menuItems.push(
        <DropdownMenuItem key="property-lawyer" asChild>
          <Link href="/property-lawyer">
            <Scale className="w-4 h-4 mr-2" />
            Legal Dashboard
          </Link>
        </DropdownMenuItem>,
      )
    }

    if (hasRole("auditor")) {
      menuItems.push(
        <DropdownMenuItem key="auditor" asChild>
          <Link href="/auditor">
            <FileCheck className="w-4 h-4 mr-2" />
            Audit Dashboard
          </Link>
        </DropdownMenuItem>,
      )
    }

    if (hasRole("compliance")) {
      menuItems.push(
        <DropdownMenuItem key="compliance" asChild>
          <Link href="/compliance">
            <Building className="w-4 h-4 mr-2" />
            Compliance Dashboard
          </Link>
        </DropdownMenuItem>,
      )
    }

    if (hasRole("front_office")) {
      menuItems.push(
        <DropdownMenuItem key="front-office" asChild>
          <Link href="/front-office">
            <Phone className="w-4 h-4 mr-2" />
            Front Office
          </Link>
        </DropdownMenuItem>,
      )
    }

    if (hasRole("user")) {
      menuItems.push(
        <DropdownMenuItem key="user-dashboard" asChild>
          <Link href="/user">
            <Briefcase className="w-4 h-4 mr-2" />
            User Dashboard
          </Link>
        </DropdownMenuItem>,
      )
    }

    // Standard items
    menuItems.push(
      <DropdownMenuItem key="smart-account" asChild>
        <Link href="/smart-account">Smart Account</Link>
      </DropdownMenuItem>,
      <DropdownMenuItem key="settings">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </DropdownMenuItem>,
    )

    menuItems.push(<DropdownMenuSeparator key="sep2" />)

    menuItems.push(
      <DropdownMenuItem key="logout">
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </DropdownMenuItem>,
    )

    return menuItems
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">T</span>
                </div>
                <span className="font-bold text-lg text-foreground hidden sm:block">TitleBase</span>
              </Link>

              {/* Main Navigation - Hidden on mobile */}
              <nav className="hidden lg:flex items-center gap-6">{getRoleBasedNavigation()}</nav>
            </div>

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
            <div className="flex items-center gap-2">
              {/* Mobile Search */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="w-5 h-5" />
              </Button>

              {/* Help */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Help Center</DropdownMenuItem>
                  <DropdownMenuItem>Contact Support</DropdownMenuItem>
                  <DropdownMenuItem>API Documentation</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Feature Requests</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
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
                      {notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                          <div className="flex items-start gap-3 w-full">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? "bg-primary" : "bg-muted"}`}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <div className="p-3 border-t">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* User Menu or Login */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium">{user?.name || "User"}</span>
                      {user?.role && (
                        <Badge variant="outline" className="hidden sm:block text-xs">
                          {user.role.replace("_", " ")}
                        </Badge>
                      )}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">{getRoleBasedUserMenu()}</DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowLogin(true)}>
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => setShowLogin(true)}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  )
}
