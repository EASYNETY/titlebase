"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExternalLink, AlertTriangle, CheckCircle } from "lucide-react"

export function WalletConnectSetup() {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  const isConfigured = projectId && projectId !== "2f05a7cdc1588bc900adc5b17a2b8e32"

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isConfigured ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          )}
          WalletConnect Configuration
        </CardTitle>
        <CardDescription>
          {isConfigured
            ? "WalletConnect is properly configured"
            : "WalletConnect needs to be configured to avoid origin allowlist errors"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConfigured && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You're using a temporary Project ID. Please configure your own WalletConnect project to avoid errors.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <h3 className="font-semibold">Setup Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              Go to{" "}
              <Button variant="link" className="p-0 h-auto" asChild>
                <a href="https://cloud.walletconnect.com" target="_blank" rel="noopener noreferrer">
                  WalletConnect Cloud <ExternalLink className="h-3 w-3 inline ml-1" />
                </a>
              </Button>
            </li>
            <li>Create a new project or select an existing one</li>
            <li>Copy your Project ID</li>
            <li>
              Add these domains to your allowlist:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>
                  <code>http://localhost:3000</code> (development)
                </li>
                <li>
                  <code>https://preview-titlebasenftmarketplace-*.vusercontent.net</code> (v0 preview)
                </li>
                <li>Your production domain (when deployed)</li>
              </ul>
            </li>
            <li>
              Update <code>NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID</code> in your <code>.env.local</code> file
            </li>
          </ol>
        </div>

        <div className="bg-muted p-3 rounded-md">
          <p className="text-sm font-medium mb-1">Current Project ID:</p>
          <code className="text-xs bg-background px-2 py-1 rounded">{projectId || "Not set"}</code>
        </div>
      </CardContent>
    </Card>
  )
}
