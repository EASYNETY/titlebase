import { type NextRequest, NextResponse } from "next/server"

// Forward properties requests to the backend
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

    const response = await fetch(`${backendUrl}/api/properties${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
      headers: {
        'Authorization': request.headers.get('authorization') || '',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Properties API error:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

    const response = await fetch(`${backendUrl}/api/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Create property error:", error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
