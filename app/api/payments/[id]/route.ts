import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"
import { paymentProcessor } from "@/lib/services/payment-processor"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Get payment status
    const status = await paymentProcessor.getPaymentStatus(id)

    // Mock payment data - replace with actual database query
    const payment = {
      id,
      userId: user.id,
      propertyId: "1",
      amount: "250000",
      currency: "USDC",
      paymentMethod: "crypto",
      status: status.status,
      transactionHash: status.transactionHash,
      escrowId: status.escrowId,
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:05:00Z",
    }

    return NextResponse.json({ payment })
  } catch (error) {
    console.error("Get payment error:", error)
    return NextResponse.json({ error: "Failed to fetch payment" }, { status: 500 })
  }
}
