import { type NextRequest, NextResponse } from "next/server"
import { billingEngine } from "@/lib/services/billing-engine"
import { getServerSession } from "next-auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { planId } = await request.json()
    const result = await billingEngine.updateSubscription(params.id, planId)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { immediately } = await request.json()
    const result = await billingEngine.cancelSubscription(params.id, immediately)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
  }
}
