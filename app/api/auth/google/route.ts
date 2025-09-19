import { NextRequest, NextResponse } from "next/server"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "your-google-client-id"
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000"

const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${GOOGLE_CLIENT_ID}&` +
  `redirect_uri=${encodeURIComponent(NEXTAUTH_URL + '/api/auth/google/callback')}&` +
  `scope=email%20profile&` +
  `response_type=code&` +
  `access_type=offline&` +
  `prompt=consent`

export async function GET(request: NextRequest) {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "your-google-client-id") {
    return NextResponse.json({ error: "Google OAuth not configured. Please set GOOGLE_CLIENT_ID in .env" }, { status: 500 })
  }
  return NextResponse.redirect(googleOAuthURL)
}