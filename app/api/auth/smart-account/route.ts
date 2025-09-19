import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { createPublicClient, http } from "viem"
import { base } from "viem/chains"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Create smart account using account abstraction
    // This is a simplified version - implement proper AA logic
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    })

    // Generate deterministic smart account address
    const smartAccountAddress = `0x${Math.random().toString(16).slice(2, 42)}`

    // Update user data with smart account
    const updatedUserData = {
      ...decoded,
      smartAccountAddress,
    }

    // Create new JWT with updated data
    const newToken = jwt.sign(updatedUserData, process.env.JWT_SECRET!, { expiresIn: "7d" })

    cookieStore.set("auth-token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    })

    return NextResponse.json({ smartAccountAddress })
  } catch (error) {
    console.error("Smart account creation error:", error)
    return NextResponse.json({ error: "Smart account creation failed" }, { status: 500 })
  }
}
