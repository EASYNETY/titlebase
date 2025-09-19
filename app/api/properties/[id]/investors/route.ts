import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/config/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const propertyId = params.id

    // Get investor summary
    const investors = await db.query(
      `
      SELECT 
        i.user_id,
        u.wallet_address,
        SUM(i.shares) as total_shares,
        SUM(i.amount) as total_invested,
        (SUM(i.shares) * 100.0 / p.total_shares) as ownership_percentage
      FROM investments i
      JOIN users u ON i.user_id = u.id
      JOIN properties p ON i.property_id = p.id
      WHERE i.property_id = ? AND i.status = 'completed'
      GROUP BY i.user_id, u.wallet_address, p.total_shares
      ORDER BY total_shares DESC
    `,
      [propertyId],
    )

    // Get investment statistics
    const stats = await db.query(
      `
      SELECT 
        COUNT(DISTINCT user_id) as total_investors,
        SUM(shares) as total_shares_sold,
        SUM(amount) as total_invested,
        p.total_shares,
        (SUM(shares) * 100.0 / p.total_shares) as funding_percentage
      FROM investments i
      JOIN properties p ON i.property_id = p.id
      WHERE i.property_id = ? AND i.status = 'completed'
      GROUP BY p.total_shares
    `,
      [propertyId],
    )

    return NextResponse.json({
      investors,
      stats: stats[0] || {
        total_investors: 0,
        total_shares_sold: 0,
        total_invested: 0,
        funding_percentage: 0,
      },
    })
  } catch (error) {
    console.error("Error fetching investors:", error)
    return NextResponse.json({ error: "Failed to fetch investors" }, { status: 500 })
  }
}
