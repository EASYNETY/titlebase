import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"

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
    const { tokenId, amount, duration } = body

    // Validate bid data
    if (!tokenId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create bid (mock implementation)
    const bid = {
      id: Date.now().toString(),
      tokenId,
      amount,
      duration,
      bidder: user.address,
      status: "active",
      createdAt: new Date().toISOString(),
      expiresAt: duration ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString() : null,
    }

    return NextResponse.json({ bid }, { status: 201 })
  } catch (error) {
    console.error("Create bid error:", error)
    return NextResponse.json({ error: "Failed to create bid" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tokenId = searchParams.get("tokenId")
    const bidder = searchParams.get("bidder")

    // Mock bids data
    const bids = [
      {
        id: "1",
        tokenId: "1",
        amount: "240000",
        bidder: "0x1234567890123456789012345678901234567890",
        status: "active",
        createdAt: "2024-01-20T10:00:00Z",
        expiresAt: "2024-01-27T10:00:00Z",
      },
    ]

    let filteredBids = bids
    if (tokenId) filteredBids = filteredBids.filter((bid) => bid.tokenId === tokenId)
    if (bidder) filteredBids = filteredBids.filter((bid) => bid.bidder === bidder)

    return NextResponse.json({ bids: filteredBids })
  } catch (error) {
    console.error("Get bids error:", error)
    return NextResponse.json({ error: "Failed to fetch bids" }, { status: 500 })
  }
}
