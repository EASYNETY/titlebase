import { type NextRequest, NextResponse } from "next/server"
import { incomeDistributionEngine } from "@/lib/services/income-distribution-engine"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const distributionId = params.id

    // Get specific distribution details
    // This would fetch from database in real implementation
    const distribution = {
      id: distributionId,
      propertyId: "prop_123",
      status: "completed",
      amount: 5000,
      investorCount: 25,
      processedAt: new Date().toISOString(),
    }

    return NextResponse.json({ distribution })
  } catch (error) {
    console.error("Error fetching distribution:", error)
    return NextResponse.json({ error: "Failed to fetch distribution" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const distributionId = params.id
    const body = await request.json()
    const { action } = body

    if (action === "process") {
      // Process the distribution
      const payouts = await incomeDistributionEngine.processDistribution(distributionId)

      return NextResponse.json({
        success: true,
        payouts,
        message: "Distribution processed successfully",
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error updating distribution:", error)
    return NextResponse.json({ error: "Failed to update distribution" }, { status: 500 })
  }
}
