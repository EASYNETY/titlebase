import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const kycData = await request.json()

    // Store KYC data in database
    // This is a placeholder - implement your database logic
    console.log("KYC submission for user:", decoded.id, kycData)

    // In a real implementation, you would:
    // 1. Store KYC data securely
    // 2. Trigger verification process
    // 3. Integrate with KYC provider (Jumio, Onfido, etc.)
    // 4. Update user status when verified

    // For demo purposes, immediately mark as verified
    const updatedUserData = {
      ...decoded,
      isKYCVerified: true,
    }

    const newToken = jwt.sign(updatedUserData, process.env.JWT_SECRET!, { expiresIn: "7d" })

    cookieStore.set("auth-token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("KYC submission error:", error)
    return NextResponse.json({ error: "KYC submission failed" }, { status: 500 })
  }
}
