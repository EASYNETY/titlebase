import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/config/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const propertyId = searchParams.get("propertyId")

    if (propertyId) {
      // Get investments for a specific property
      const investments = await db.query("SELECT * FROM investments WHERE property_id = ? ORDER BY created_at DESC", [
        propertyId,
      ])
      return NextResponse.json({ investments })
    }

    if (userId) {
      // Get user's investments
      const investments = await db.query(
        `
        SELECT i.*, p.title, p.location, p.total_value, p.share_price
        FROM investments i
        JOIN properties p ON i.property_id = p.id
        WHERE i.user_id = ?
        ORDER BY i.created_at DESC
      `,
        [userId],
      )
      return NextResponse.json({ investments })
    }

    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  } catch (error) {
    console.error("Error fetching investments:", error)
    return NextResponse.json({ error: "Failed to fetch investments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, propertyId, amount, shares } = body

    // Validate investment
    const property = await db.query("SELECT * FROM properties WHERE id = ?", [propertyId])
    if (!property.length) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    const prop = property[0]
    if (amount < prop.min_investment || amount > prop.max_investment) {
      return NextResponse.json({ error: "Investment amount outside allowed range" }, { status: 400 })
    }

    // Check available shares
    const existingInvestments = await db.query(
      "SELECT SUM(shares) as total_shares FROM investments WHERE property_id = ?",
      [propertyId],
    )
    const soldShares = existingInvestments[0]?.total_shares || 0
    const availableShares = prop.total_shares - soldShares

    if (shares > availableShares) {
      return NextResponse.json({ error: "Not enough shares available" }, { status: 400 })
    }

    // Create investment record
    const investmentId = await db.query(
      `
      INSERT INTO investments (user_id, property_id, amount, shares, share_price, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `,
      [userId, propertyId, amount, shares, prop.share_price],
    )

    return NextResponse.json({
      success: true,
      investmentId: investmentId.insertId,
      message: "Investment created successfully",
    })
  } catch (error) {
    console.error("Error creating investment:", error)
    return NextResponse.json({ error: "Failed to create investment" }, { status: 500 })
  }
}
