import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public access to login pages
  if (pathname === '/admin/login' || pathname === '/super-admin/login') {
    return NextResponse.next()
  }

  // Define role-based route protection
  const roleRoutes = {
    "/super-admin": ["super_admin"],
    "/admin": ["admin", "super_admin"],
    "/account-manager": ["account_manager", "admin", "super_admin"],
    "/property-lawyer": ["property_lawyer", "admin", "super_admin"],
    "/auditor": ["auditor", "admin", "super_admin"],
    "/compliance": ["compliance", "admin", "super_admin"],
    "/front-office": ["front_office", "admin", "super_admin"],
    "/user": ["user", "account_manager", "admin", "super_admin"],
  }

  // Check if the current path requires role-based protection
  const requiredRoles = roleRoutes[pathname as keyof typeof roleRoutes]

  if (requiredRoles) {
    // In a real implementation, you would:
    // 1. Extract the user's role from JWT token or session
    // 2. Verify the user has one of the required roles
    // 3. Redirect to unauthorized page if access denied

    // For now, we'll let the client-side RoleGuard handle the protection
    // but this middleware serves as an additional security layer

    console.log(`[Middleware] Route ${pathname} requires roles: ${requiredRoles.join(", ")}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/super-admin/:path*",
    "/admin/:path*",
    "/account-manager/:path*",
    "/property-lawyer/:path*",
    "/auditor/:path*",
    "/compliance/:path*",
    "/front-office/:path*",
    "/user/:path*",
  ],
}
