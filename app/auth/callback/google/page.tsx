"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { socialProviders } from "@/lib/auth/social-providers"

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      const error = searchParams.get("error")

      console.log("[v0] Google callback - code:", code, "error:", error)

      if (error) {
        console.error("[v0] Google OAuth error:", error)
        window.opener?.postMessage(
          {
            type: "GOOGLE_AUTH_ERROR",
            error: error,
          },
          window.location.origin,
        )
        window.close()
        return
      }

      if (code) {
        try {
          console.log("[v0] Processing Google OAuth code")
          const result = await socialProviders.google.handleCallback(code)
          console.log("[v0] Google OAuth result:", result)

          if (result.error) {
            window.opener?.postMessage(
              {
                type: "GOOGLE_AUTH_ERROR",
                error: result.error,
              },
              window.location.origin,
            )
          } else {
            window.opener?.postMessage(
              {
                type: "GOOGLE_AUTH_SUCCESS",
                user: result,
              },
              window.location.origin,
            )
          }
        } catch (error) {
          console.error("[v0] Google callback error:", error)
          window.opener?.postMessage(
            {
              type: "GOOGLE_AUTH_ERROR",
              error: error.message,
            },
            window.location.origin,
          )
        }
      }

      window.close()
    }

    handleCallback()
  }, [searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Processing Google authentication...</p>
      </div>
    </div>
  )
}
