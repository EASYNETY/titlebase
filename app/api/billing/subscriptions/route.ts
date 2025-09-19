import { type NextRequest, NextResponse } from "next/server"
import { billingEngine, SUBSCRIPTION_PLANS } from "@/lib/services/billing-engine"
import { getServerSession } from "next-auth"

export async function GET() {
  try {
    return NextResponse.json({ plans: SUBSCRIPTION_PLANS })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { planId, paymentMethodId } = await request.json()

    const result = await billingEngine.createSubscription(session.user.id, planId, paymentMethodId)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Subscription creation error:", error)
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}
