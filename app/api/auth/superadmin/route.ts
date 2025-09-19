import { type NextRequest, NextResponse } from "next/server"

const DEMO_CREDENTIALS = {
  username: "demo",
  password: "demo123",
}

const SUPERADMIN_CREDENTIALS = {
  username: process.env.SUPERADMIN_USERNAME || "admin",
  password: process.env.SUPERADMIN_PASSWORD || "admin123",
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password required" }, { status: 400 })
    }

    // Check demo credentials
    const isDemoLogin = username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password

    // Check superadmin credentials
    const isSuperAdminLogin =
      username === SUPERADMIN_CREDENTIALS.username && password === SUPERADMIN_CREDENTIALS.password

    if (!isDemoLogin && !isSuperAdminLogin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Create superadmin user data
    const userData = {
      id: `superadmin_${username}`,
      name: isDemoLogin ? "Demo SuperAdmin" : "System Administrator",
      email: isDemoLogin ? "demo@titlebase.com" : "admin@titlebase.com",
      provider: "superadmin" as const,
      isKYCVerified: true,
      isWhitelisted: true,
      role: "super_admin" as const,
      permissions: [
        // Full system access permissions
        { permission: "system", resource: "all", action: "create" as const },
        { permission: "system", resource: "all", action: "read" as const },
        { permission: "system", resource: "all", action: "update" as const },
        { permission: "system", resource: "all", action: "delete" as const },
        { permission: "users", resource: "all", action: "create" as const },
        { permission: "users", resource: "all", action: "read" as const },
        { permission: "users", resource: "all", action: "update" as const },
        { permission: "users", resource: "all", action: "delete" as const },
        { permission: "properties", resource: "all", action: "create" as const },
        { permission: "properties", resource: "all", action: "read" as const },
        { permission: "properties", resource: "all", action: "update" as const },
        { permission: "properties", resource: "all", action: "delete" as const },
        { permission: "transactions", resource: "all", action: "read" as const },
        { permission: "analytics", resource: "all", action: "read" as const },
        { permission: "settings", resource: "all", action: "update" as const },
      ],
      department: "System Administration",
      isActive: true,
      lastLogin: new Date().toISOString(),
    }

    const token = `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Just return the user data with token for client-side storage

    return NextResponse.json({ ...userData, token })
  } catch (error) {
    console.error("SuperAdmin auth error:", error)
    return NextResponse.json(
      {
        message: "Authentication failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
