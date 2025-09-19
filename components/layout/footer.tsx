import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Mail, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-lg">TitleBase</span>
            </div>
            <p className="text-muted-foreground mb-6 text-pretty">
              New Zealand's premier real estate NFT marketplace. Democratizing property investment through blockchain
              technology and fractional ownership.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="font-semibold">Stay Updated</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="text-muted-foreground hover:text-primary transition-colors">
                  Live Auctions
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-muted-foreground hover:text-primary transition-colors">
                  Market Analytics
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">
                  Site Navigation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Profile Settings
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  My Portfolio
                </Link>
              </li>
              <li>
                <Link href="/transactions" className="text-muted-foreground hover:text-primary transition-colors">
                  Transaction History
                </Link>
              </li>
              <li>
                <Link href="/wallet-setup" className="text-muted-foreground hover:text-primary transition-colors">
                  Wallet Setup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-muted-foreground hover:text-primary transition-colors">
                  Legal & Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} TitleBase. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Auckland, New Zealand</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>hello@titlebase.nz</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
