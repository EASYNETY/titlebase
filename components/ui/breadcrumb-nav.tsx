"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname if items not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname)

  if (breadcrumbs.length <= 1) return null

  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground mb-6", className)}>
      <Link href="/" className="flex items-center hover:text-primary transition-colors">
        <Home className="w-4 h-4" />
      </Link>

      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-1">
          <ChevronRight className="w-4 h-4" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  // Route name mappings
  const routeNames: Record<string, string> = {
    marketplace: "Marketplace",
    auctions: "Auctions",
    portfolio: "Portfolio",
    analytics: "Analytics",
    profile: "Profile",
    transactions: "Transactions",
    admin: "Admin",
    "super-admin": "Super Admin",
    "account-manager": "Account Manager",
    "property-lawyer": "Property Lawyer",
    auditor: "Auditor",
    compliance: "Compliance",
    "front-office": "Front Office",
    user: "User Dashboard",
    billing: "Billing",
    "smart-account": "Smart Account",
    "wallet-setup": "Wallet Setup",
    property: "Property",
    sitemap: "Site Navigation",
    help: "Help Center",
    support: "Support",
    docs: "Documentation",
  }

  let currentPath = ""

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

    breadcrumbs.push({
      label,
      href: currentPath,
    })
  })

  return breadcrumbs
}
