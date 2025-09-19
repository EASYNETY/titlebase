import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await verifyJWT(token)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Mock analytics data - replace with actual database queries
    const analytics = {
      overview: {
        totalProperties: 1234,
        activeUsers: 5678,
        totalVolume: 12500000,
        revenue: 125000,
      },
      volumeData: [
        { month: "Jan", volume: 2400000, transactions: 45 },
        { month: "Feb", volume: 1800000, transactions: 38 },
        { month: "Mar", volume: 3200000, transactions: 62 },
        { month: "Apr", volume: 2800000, transactions: 55 },
        { month: "May", volume: 4100000, transactions: 78 },
        { month: "Jun", volume: 3600000, transactions: 69 },
      ],
      categoryData: [
        { category: "Residential", count: 456, value: 8500000 },
        { category: "Commercial", count: 123, value: 12300000 },
        { category: "Industrial", count: 67, value: 4200000 },
        { category: "Land", count: 234, value: 2800000 },
      ],
      userGrowth: [
        { month: "Jan", users: 1200, active: 890 },
        { month: "Feb", users: 1450, active: 1020 },
        { month: "Mar", users: 1780, active: 1340 },
        { month: "Apr", users: 2100, active: 1580 },
        { month: "May", users: 2650, active: 1920 },
        { month: "Jun", users: 3200, active: 2340 },
      ],
    }

    return NextResponse.json({ analytics })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
