"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Search, Gavel, Briefcase, User, BarChart3 } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"

export function MobileNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/marketplace", label: "Browse", icon: Search },
    { href: "/auctions", label: "Auctions", icon: Gavel },
    ...(isAuthenticated
      ? [
          { href: "/portfolio", label: "Portfolio", icon: Briefcase },
          { href: "/analytics", label: "Analytics", icon: BarChart3 },
        ]
      : []),
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border backdrop-blur-lg bg-card/95">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
