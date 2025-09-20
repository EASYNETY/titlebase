import type { Metadata } from "next"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, LifeBuoy, BookOpen } from "lucide-react"
import { ContactForm } from "@/components/support/contact-form"

export const metadata: Metadata = {
  title: "Support | TitleBase",
  description: "Help Center and Support resources for TitleBase users.",
}

export default function SupportPage() {
  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Support</h1>
        <p className="text-muted-foreground">
          Welcome to TitleBase Support. Explore guides, FAQs, and get in touch with our team.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Card id="help">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LifeBuoy className="w-5 h-5" />
              Help Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Browse common topics and quick-start guides for investing, auctions, wallet setup, and security.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <Link href="/docs#getting-started" className="text-primary hover:underline">
                  Getting started with TitleBase
                </Link>
              </li>
              <li>
                <Link href="/docs#auctions" className="text-primary hover:underline">
                  How auctions and bidding work
                </Link>
              </li>
              <li>
                <Link href="/docs#wallet" className="text-primary hover:underline">
                  Wallet setup and troubleshooting
                </Link>
              </li>
              <li>
                <Link href="/docs#security" className="text-primary hover:underline">
                  Account security best practices
                </Link>
              </li>
            </ul>
            <div>
              <Link href="/docs">
                <Button variant="secondary" className="mt-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Open Documentation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card id="contact">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Need more help? Send us a message and our team will get back to you.
            </p>
            {/* Client component handles interactivity to satisfy Next.js RSC rules */}
            <ContactForm />
            <Separator />
            <p className="text-xs text-muted-foreground">
              Or email us directly at{" "}
              <a href="mailto:hello@titlebase.nz" className="text-primary hover:underline">
                hello@titlebase.nz
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}