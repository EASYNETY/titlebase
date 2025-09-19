import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"
import { paymentProcessor } from "@/lib/services/payment-processor"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await verifyJWT(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { amount, currency, recipient, propertyId, paymentMethod, escrowPeriod } = body

    // Validate payment request
    if (!amount || !currency || !recipient || !propertyId || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const paymentRequest = {
      amount,
      currency,
      recipient,
      propertyId,
      paymentMethod,
      escrowPeriod,
    }

    let result
    if (paymentMethod === "crypto") {
      result = await paymentProcessor.processCryptoPayment(paymentRequest)
    } else {
      result = await paymentProcessor.processFiatPayment(paymentRequest)
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // Store payment record in database
    const paymentRecord = {
      id: result.paymentId,
      userId: user.id,
      propertyId,
      amount,
      currency,
      paymentMethod,
      status: "completed",
      transactionHash: result.transactionHash,
      escrowId: result.escrowId,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ payment: paymentRecord, result })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
