import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"
import { paymentProcessor } from "@/lib/services/payment-processor"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await verifyJWT(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { reason } = body

    if (!reason) {
      return NextResponse.json({ error: "Dispute reason is required" }, { status: 400 })
    }

    const success = await paymentProcessor.disputeEscrow(id, reason)

    if (!success) {
      return NextResponse.json({ error: "Failed to create dispute" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Dispute created successfully" })
  } catch (error) {
    console.error("Escrow dispute error:", error)
    return NextResponse.json({ error: "Failed to create dispute" }, { status: 500 })
  }
}
