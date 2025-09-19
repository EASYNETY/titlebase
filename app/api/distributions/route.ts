import { type NextRequest, NextResponse } from "next/server"
import { incomeDistributionEngine } from "@/lib/services/income-distribution-engine"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId")
    const investorAddress = searchParams.get("investorAddress")
    const type = searchParams.get("type") || "all"

    if (propertyId && type === "schedule") {
      // Get distribution schedule for property
      const metrics = await incomeDistributionEngine.calculateYieldMetrics(propertyId, "monthly")
      return NextResponse.json({ metrics })
    }

    if (investorAddress && type === "history") {
      // Get investor distribution history
      const history = await incomeDistributionEngine.getInvestorDistributionHistory(investorAddress)
      return NextResponse.json({ history })
    }

    if (type === "metrics") {
      // Get platform distribution metrics
      const metrics = await incomeDistributionEngine.getDistributionMetrics()
      return NextResponse.json({ metrics })
    }

    return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 })
  } catch (error) {
    console.error("Error fetching distributions:", error)
    return NextResponse.json({ error: "Failed to fetch distributions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, propertyId, totalRevenue, distributionType, scheduledDate } = body

    if (action === "schedule") {
      // Schedule new distribution
      const schedule = await incomeDistributionEngine.scheduleDistribution(
        propertyId,
        totalRevenue,
        distributionType,
        scheduledDate ? new Date(scheduledDate) : undefined,
      )

      return NextResponse.json({
        success: true,
        distributionId: schedule.id,
        schedule,
      })
    }

    if (action === "process") {
      // Process existing distribution
      const { distributionId } = body
      const payouts = await incomeDistributionEngine.processDistribution(distributionId)

      return NextResponse.json({
        success: true,
        payouts,
        processedCount: payouts.length,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error processing distribution:", error)
    return NextResponse.json({ error: "Failed to process distribution" }, { status: 500 })
  }
}
