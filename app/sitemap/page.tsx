import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Briefcase, BarChart3, User, Shield, CreditCard, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Sitemap - TitleBase",
  description: "Complete navigation guide for TitleBase - New Zealand's premier real estate NFT marketplace",
}

const siteStructure = [
  {
    category: "Main Pages",
    icon: Home,
    pages: [
      { name: "Home", href: "/", description: "Welcome to TitleBase marketplace" },
      { name: "Marketplace", href: "/marketplace", description: "Browse available properties" },
      { name: "Auctions", href: "/auctions", description: "Live property auctions" },
      { name: "Property Details", href: "/property/[id]", description: "Individual property information" },
    ],
  },
  {
    category: "User Dashboard",
    icon: User,
    requiresAuth: true,
    pages: [
      { name: "Profile", href: "/profile", description: "Manage your account settings" },
      { name: "Portfolio", href: "/portfolio", description: "Your property investments" },
      { name: "Transactions", href: "/transactions", description: "Transaction history and records" },
      { name: "Smart Account", href: "/smart-account", description: "Smart contract wallet management" },
      { name: "Wallet Setup", href: "/wallet-setup", description: "Configure your crypto wallets" },
    ],
  },
  {
    category: "Analytics & Insights",
    icon: BarChart3,
    requiresAuth: true,
    pages: [
      { name: "Analytics Dashboard", href: "/analytics", description: "Market insights and performance metrics" },
      { name: "Market Insights", href: "/analytics?tab=market", description: "Real estate market analysis" },
      { name: "Real-time Metrics", href: "/analytics?tab=realtime", description: "Live market data" },
    ],
  },
  {
    category: "Professional Dashboards",
    icon: Briefcase,
    requiresRole: true,
    pages: [
      { name: "User Dashboard", href: "/user", description: "General user interface", role: "user" },
      {
        name: "Account Manager",
        href: "/account-manager",
        description: "Client relationship management",
        role: "account_manager",
      },
      {
        name: "Property Lawyer",
        href: "/property-lawyer",
        description: "Legal documentation and compliance",
        role: "property_lawyer",
      },
      {
        name: "Auditor Dashboard",
        href: "/auditor",
        description: "Financial auditing and verification",
        role: "auditor",
      },
      {
        name: "Compliance Dashboard",
        href: "/compliance",
        description: "Regulatory compliance monitoring",
        role: "compliance",
      },
      { name: "Front Office", href: "/front-office", description: "Customer service interface", role: "front_office" },
    ],
  },
  {
    category: "Administration",
    icon: Shield,
    requiresRole: true,
    pages: [
      { name: "Admin Dashboard", href: "/admin", description: "System administration", role: "admin" },
      { name: "Super Admin", href: "/super-admin", description: "Full system control", role: "super_admin" },
    ],
  },
  {
    category: "Billing & Payments",
    icon: CreditCard,
    requiresAuth: true,
    pages: [{ name: "Billing", href: "/billing", description: "Subscription and payment management" }],
  },
  {
    category: "Support & Help",
    icon: HelpCircle,
    pages: [
      { name: "Help Center", href: "/help", description: "Frequently asked questions and guides" },
      { name: "Contact Support", href: "/support", description: "Get help from our team" },
      { name: "API Documentation", href: "/docs", description: "Developer resources and API guides" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-balance mb-4">Site Navigation</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Complete guide to all pages and features available on TitleBase - New Zealand's premier real estate NFT
            marketplace
          </p>
        </div>

        <div className="grid gap-8">
          {siteStructure.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.category} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    {section.category}
                    {section.requiresAuth && (
                      <Badge variant="outline" className="text-xs">
                        Login Required
                      </Badge>
                    )}
                    {section.requiresRole && (
                      <Badge variant="secondary" className="text-xs">
                        Role-Based Access
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {section.category === "Main Pages" && "Core marketplace functionality and property browsing"}
                    {section.category === "User Dashboard" && "Personal account management and portfolio tracking"}
                    {section.category === "Analytics & Insights" && "Market data and investment performance analysis"}
                    {section.category === "Professional Dashboards" &&
                      "Specialized interfaces for different user roles"}
                    {section.category === "Administration" && "System management and administrative controls"}
                    {section.category === "Billing & Payments" && "Financial management and subscription services"}
                    {section.category === "Support & Help" && "Documentation and customer support resources"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {section.pages.map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        className="group block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{page.name}</h3>
                          {page.role && (
                            <Badge variant="outline" className="text-xs ml-2">
                              {page.role.replace("_", " ")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground text-pretty">{page.description}</p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Quick Navigation Tips</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">For New Users:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • Start with the{" "}
                  <Link href="/marketplace" className="text-primary hover:underline">
                    Marketplace
                  </Link>{" "}
                  to browse properties
                </li>
                <li>
                  • Check out live{" "}
                  <Link href="/auctions" className="text-primary hover:underline">
                    Auctions
                  </Link>{" "}
                  for investment opportunities
                </li>
                <li>
                  • Complete your{" "}
                  <Link href="/profile" className="text-primary hover:underline">
                    Profile
                  </Link>{" "}
                  setup for full access
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">For Investors:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • Monitor your{" "}
                  <Link href="/portfolio" className="text-primary hover:underline">
                    Portfolio
                  </Link>{" "}
                  performance
                </li>
                <li>
                  • Use{" "}
                  <Link href="/analytics" className="text-primary hover:underline">
                    Analytics
                  </Link>{" "}
                  for market insights
                </li>
                <li>
                  • Track all{" "}
                  <Link href="/transactions" className="text-primary hover:underline">
                    Transactions
                  </Link>{" "}
                  and payments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
