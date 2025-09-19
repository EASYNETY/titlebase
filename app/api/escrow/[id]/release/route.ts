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

    // Verify user has permission to release escrow (buyer or admin)
    // This would check the escrow record in a real implementation

    const success = await paymentProcessor.releaseEscrow(id)

    if (!success) {
      return NextResponse.json({ error: "Failed to release escrow" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Escrow released successfully" })
  } catch (error) {
    console.error("Escrow release error:", error)
    return NextResponse.json({ error: "Failed to release escrow" }, { status: 500 })
  }
}
