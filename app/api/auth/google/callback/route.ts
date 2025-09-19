import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXTAUTH_URL}/auth/callback/google`,
      }),
    })

    const tokens = await tokenResponse.json()

    // Get user info
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })

    const googleUser = await userResponse.json()

    // Create or find user in database
    const userData = {
      id: `google_${googleUser.id}`,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
      provider: "social",
      socialProvider: "google",
      isKYCVerified: false,
      isWhitelisted: false,
    }

    // Create JWT token
    const token = jwt.sign(userData, process.env.JWT_SECRET!, { expiresIn: "7d" })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    })

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Google auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
