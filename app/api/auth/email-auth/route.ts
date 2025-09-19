import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

    const response = await fetch(`${backendUrl}/api/auth/email-auth`, {
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

    // Store token in cookie
    if (data.token) {
      const response = NextResponse.json(data)
      response.cookies.set("auth-token", data.token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      })
      return response
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Email auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}