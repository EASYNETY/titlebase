import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Code, BookOpen, Server, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "API Documentation | TitleBase",
  description: "REST API reference and usage guidelines for integrating with the TitleBase platform.",
}

export default function ApiDocsPage() {
  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <p className="text-muted-foreground">
          Use the TitleBase REST API to integrate properties, listings, bids, payments, and metadata into your apps.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Base URL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Production</p>
            <code className="block rounded-md bg-muted px-2 py-1 text-xs">
              {process.env.NEXT_PUBLIC_API_URL || "https://lps6mhdyik.execute-api.us-east-1.amazonaws.com"}
            </code>
            <Separator />
            <p>All endpoints are prefixed with <code className="px-1 bg-muted rounded">/api</code></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Auth
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Send a Bearer token in the Authorization header:</p>
            <code className="block rounded-md bg-muted px-2 py-1 text-xs">
              {"Authorization: Bearer <token>"}
            </code>
            <p className="text-xs text-muted-foreground">Tokens are issued after login.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Formats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Requests and responses use JSON:</p>
            <code className="block rounded-md bg-muted px-2 py-1 text-xs">Content-Type: application/json</code>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Endpoints</h2>

        <Card>
          <CardHeader>
            <CardTitle>Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium">GET /api/properties</p>
              <p className="text-muted-foreground">
                Query properties with pagination and filters (status, category, location, featured).
              </p>
            </div>
            <div>
              <p className="font-medium">GET /api/properties/:id</p>
              <p className="text-muted-foreground">Fetch a single property by id.</p>
            </div>
            <div>
              <p className="font-medium">GET /api/properties/:id/investors</p>
              <p className="text-muted-foreground">Returns investors for the specified property.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketplace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium">GET /api/marketplace/listings</p>
              <p className="text-muted-foreground">List active listings. Filter by propertyId or status.</p>
            </div>
            <div>
              <p className="font-medium">POST /api/marketplace/bids</p>
              <p className="text-muted-foreground">Place a bid. Requires authentication.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium">GET /api/payments</p>
              <p className="text-muted-foreground">List user payments (auth required).</p>
            </div>
            <div>
              <p className="font-medium">POST /api/payments/process</p>
              <p className="text-muted-foreground">Process a payment with optional transaction hash.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-2">
        <Separator />
        <p className="text-xs text-muted-foreground">
          See also:{" "}
          <Link href="/legal" className="text-primary hover:underline">
            Legal & Privacy
          </Link>
        </p>
      </section>
    </main>
  )
}