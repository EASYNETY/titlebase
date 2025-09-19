import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Mock property data - replace with actual database query
    const property = {
      id,
      title: "Luxury Downtown Condo",
      description: "Modern 2BR/2BA condo in the heart of downtown with stunning city views",
      price: "250000",
      location: "Downtown, Miami",
      category: "residential",
      images: ["/luxury-condo-exterior.png", "/modern-living-room.png", "/kitchen-granite-counters.png"],
      tokenId: "1",
      contractAddress: "0x1234567890123456789012345678901234567890",
      owner: "0x0987654321098765432109876543210987654321",
      status: "active",
      verificationStatus: "verified",
      titleInfo: {
        deedNumber: "DEED-001",
        legalDescription: "Lot 1, Block A, Downtown Condos Subdivision",
        recordedDate: "2024-01-15",
        county: "Miami-Dade",
        parcelId: "PAR-001-2024",
      },
      details: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        yearBuilt: 2020,
        propertyType: "Condominium",
        lotSize: "N/A",
      },
      auction: null,
      listing: {
        type: "fixed",
        startTime: "2024-01-20T00:00:00Z",
        endTime: null,
        minBid: null,
      },
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error("Get property error:", error)
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await verifyJWT(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { id } = params
    const updates = await request.json()

    // Update property (mock implementation)
    const updatedProperty = {
      id,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ property: updatedProperty })
  } catch (error) {
    console.error("Update property error:", error)
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
  }
}
