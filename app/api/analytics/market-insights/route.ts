import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "30d"
    const region = searchParams.get("region") || "all"

    // Mock market insights data - replace with actual analytics queries
    const marketInsights = {
      marketTrends: [
        { month: "Jul", avgPrice: 285000, volume: 45, appreciation: 2.1 },
        { month: "Aug", avgPrice: 292000, volume: 52, appreciation: 2.5 },
        { month: "Sep", avgPrice: 298000, volume: 48, appreciation: 2.1 },
        { month: "Oct", avgPrice: 305000, volume: 61, appreciation: 2.3 },
        { month: "Nov", avgPrice: 312000, volume: 58, appreciation: 2.3 },
        { month: "Dec", avgPrice: 318000, volume: 67, appreciation: 1.9 },
      ],
      regionPerformance: [
        { region: "San Francisco", avgPrice: 850000, growth: 8.5, volume: 125, yield: 4.2 },
        { region: "Austin", avgPrice: 420000, growth: 12.3, volume: 89, yield: 6.8 },
        { region: "Miami", avgPrice: 380000, growth: 15.2, volume: 76, yield: 7.1 },
        { region: "Denver", avgPrice: 520000, growth: 9.8, volume: 54, yield: 5.9 },
        { region: "Phoenix", avgPrice: 310000, growth: 18.7, volume: 92, yield: 8.2 },
      ],
      propertyTypes: [
        { type: "Residential", count: 456, avgYield: 6.8, totalValue: 125000000, growth: 12.5 },
        { type: "Commercial", count: 123, avgYield: 8.2, totalValue: 89000000, growth: 15.8 },
        { type: "Industrial", count: 67, avgYield: 9.1, totalValue: 45000000, growth: 22.3 },
        { type: "Mixed-Use", count: 89, avgYield: 7.5, totalValue: 67000000, growth: 18.9 },
      ],
      riskMetrics: [
        { metric: "Portfolio Volatility", value: 12.5, trend: "down", benchmark: 15.2 },
        { metric: "Sharpe Ratio", value: 1.85, trend: "up", benchmark: 1.42 },
        { metric: "Max Drawdown", value: 8.3, trend: "down", benchmark: 12.1 },
        { metric: "Beta", value: 0.78, trend: "stable", benchmark: 1.0 },
      ],
    }

    return NextResponse.json({ marketInsights })
  } catch (error) {
    console.error("Market insights API error:", error)
    return NextResponse.json({ error: "Failed to fetch market insights" }, { status: 500 })
  }
}
