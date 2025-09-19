import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { tokenId: string } }) {
  try {
    const { tokenId } = params

    // Mock metadata - replace with actual metadata storage
    const metadata = {
      name: `Title NFT #${tokenId}`,
      description: "A blockchain-verified real estate title NFT representing ownership of physical property",
      image: `/placeholder.svg?height=400&width=400&query=property title document`,
      external_url: `${process.env.NEXT_PUBLIC_APP_URL}/property/${tokenId}`,
      attributes: [
        {
          trait_type: "Property Type",
          value: "Residential",
        },
        {
          trait_type: "Location",
          value: "Miami, FL",
        },
        {
          trait_type: "Verification Status",
          value: "Verified",
        },
        {
          trait_type: "Deed Number",
          value: "DEED-001",
        },
        {
          trait_type: "County",
          value: "Miami-Dade",
        },
      ],
      properties: {
        title_info: {
          deed_number: "DEED-001",
          legal_description: "Lot 1, Block A, Downtown Condos Subdivision",
          recorded_date: "2024-01-15",
          county: "Miami-Dade",
          parcel_id: "PAR-001-2024",
        },
        property_details: {
          address: "123 Downtown Ave, Miami, FL 33101",
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1200,
          year_built: 2020,
          property_type: "Condominium",
        },
      },
    }

    return NextResponse.json(metadata)
  } catch (error) {
    console.error("Metadata error:", error)
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 })
  }
}
