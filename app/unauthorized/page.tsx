"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/hooks/use-auth"
import { Shield, ArrowLeft, LogIn } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>You don't have permission to access this resource</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Insufficient Permissions</AlertTitle>
            <AlertDescription>
              {isAuthenticated
                ? `Your current role (${user?.role || "unknown"}) doesn't have access to this page.`
                : "You need to be logged in to access this page."}
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>

            {!isAuthenticated && (
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}

            {isAuthenticated && (
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/role-test">
                  <Shield className="h-4 w-4 mr-2" />
                  Test Role Access
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
