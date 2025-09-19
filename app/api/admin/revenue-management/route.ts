import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (type === "streams") {
      // Get revenue streams
      const streams = [
        {
          id: "1",
          name: "Marketplace Fees",
          type: "marketplace_fee",
          rate: 1.0,
          rateType: "percentage",
          revenue: 125000,
          transactions: 1250,
          isActive: true,
        },
        {
          id: "2",
          name: "Pro Subscriptions",
          type: "subscription",
          rate: 29,
          rateType: "fixed",
          revenue: 34500,
          transactions: 1190,
          isActive: true,
        },
      ]
      return NextResponse.json({ streams })
    }

    if (type === "commissions") {
      // Get commission rules
      const rules = [
        {
          id: "1",
          name: "Residential Properties",
          propertyType: "residential",
          feeRate: 1.0,
          minimumFee: 100,
          maximumFee: 10000,
          isActive: true,
          createdAt: "2024-01-01",
        },
      ]
      return NextResponse.json({ rules })
    }

    if (type === "payouts") {
      // Get payout information
      const payouts = {
        pending: 45200,
        completed: 128500,
        failed: 2100,
        nextRun: "2024-02-01T09:00:00Z",
        totalRecipients: 1247,
      }
      return NextResponse.json({ payouts })
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
  } catch (error) {
    console.error("Revenue management API error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { type, id, updates } = body

    if (type === "stream") {
      // Update revenue stream
      console.log(`Updating revenue stream ${id}:`, updates)
      return NextResponse.json({ success: true })
    }

    if (type === "commission") {
      // Update commission rule
      console.log(`Updating commission rule ${id}:`, updates)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  } catch (error) {
    console.error("Revenue management update error:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { action } = body

    if (action === "process_payouts") {
      // Process pending payouts
      console.log("Processing pending payouts...")
      return NextResponse.json({
        success: true,
        processed: 45200,
        recipients: 1247,
      })
    }

    if (action === "generate_report") {
      // Generate revenue report
      const report = {
        reportId: `report_${Date.now()}`,
        generatedAt: new Date().toISOString(),
        downloadUrl: "/api/admin/reports/revenue-report.pdf",
      }
      return NextResponse.json({ report })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Revenue management action error:", error)
    return NextResponse.json({ error: "Failed to process action" }, { status: 500 })
  }
}
