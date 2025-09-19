import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Forward wallet connection requests to the backend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address } = body

    if (!address) {
      return NextResponse.json({ error: "Address required" }, { status: 400 })
    }

    // Forward to backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const response = await fetch(`${backendUrl}/api/auth/wallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    // Store token in cookie for frontend use
    if (data.token) {
      const cookieStore = await cookies()
      cookieStore.set("auth-token", data.token, {
        httpOnly: false, // Allow frontend access
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Wallet auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
