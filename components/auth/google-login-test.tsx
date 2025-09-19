"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { socialProviders } from "@/lib/auth/social-providers"
import { useAuth } from "@/lib/hooks/use-auth"

export function GoogleLoginTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const { user, login } = useAuth()

  const testGoogleLogin = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      console.log("[v0] Starting Google OAuth test")

      // Get Google auth URL
      const authUrl = socialProviders.google.getAuthUrl()
      console.log("[v0] Generated auth URL:", authUrl)

      // Open popup for OAuth
      const popup = window.open(authUrl, "google-oauth", "width=500,height=600,scrollbars=yes,resizable=yes")

      // Listen for the callback
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          setIsLoading(false)
          console.log("[v0] OAuth popup closed")
        }
      }, 1000)

      // Listen for message from popup
      const messageListener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return

        if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
          console.log("[v0] Google auth success:", event.data.user)
          setTestResult({ success: true, user: event.data.user })
          popup?.close()
          clearInterval(checkClosed)
          setIsLoading(false)
          window.removeEventListener("message", messageListener)
        } else if (event.data.type === "GOOGLE_AUTH_ERROR") {
          console.log("[v0] Google auth error:", event.data.error)
          setTestResult({ success: false, error: event.data.error })
          popup?.close()
          clearInterval(checkClosed)
          setIsLoading(false)
          window.removeEventListener("message", messageListener)
        }
      }

      window.addEventListener("message", messageListener)
    } catch (error) {
      console.error("[v0] Google login test error:", error)
      setTestResult({ success: false, error: error.message })
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">🔍 Google Login Test</CardTitle>
        <CardDescription>Test Google OAuth integration with your credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong>Client ID:</strong> {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.slice(0, 20)}...
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Status:</strong> {user ? `Logged in as ${user.name}` : "Not logged in"}
          </p>
        </div>

        <Button onClick={testGoogleLogin} disabled={isLoading} className="w-full">
          {isLoading ? "Testing Google Login..." : "Test Google Login"}
        </Button>

        {testResult && (
          <div className="space-y-2">
            <Badge variant={testResult.success ? "default" : "destructive"}>
              {testResult.success ? "Success" : "Failed"}
            </Badge>

            {testResult.success ? (
              <div className="p-3 bg-green-50 rounded-lg text-sm">
                <p>
                  <strong>Name:</strong> {testResult.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {testResult.user?.email}
                </p>
                <p>
                  <strong>Provider:</strong> {testResult.user?.socialProvider}
                </p>
              </div>
            ) : (
              <div className="p-3 bg-red-50 rounded-lg text-sm text-red-700">
                <strong>Error:</strong> {testResult.error}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
