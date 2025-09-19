"use client"

import { useState, useCallback } from "react"
import { useAuth } from "./use-auth"

interface Bid {
  id: string
  tokenId: string
  amount: string
  bidder: string
  status: string
  createdAt: string
  expiresAt?: string
}

interface BidResponse {
  bid: Bid
}

interface BidsResponse {
  bids: Bid[]
}

export function useBidding() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const placeBid = useCallback(
    async (tokenId: string, amount: string, duration?: number): Promise<Bid | null> => {
      if (!user?.token) {
        setError("Authentication required")
        return null
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/marketplace/bids", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            tokenId,
            amount,
            duration: duration || 7,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to place bid")
        }

        const data: BidResponse = await response.json()
        console.log("[v0] Bid placed successfully:", data.bid)
        return data.bid
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to place bid"
        setError(errorMessage)
        console.error("[v0] Bid placement error:", err)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [user?.token],
  )

  const getBids = useCallback(async (tokenId?: string, bidder?: string): Promise<Bid[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (tokenId) params.append("tokenId", tokenId)
      if (bidder) params.append("bidder", bidder)

      const response = await fetch(`/api/marketplace/bids?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch bids")
      }

      const data: BidsResponse = await response.json()
      return data.bids
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch bids"
      setError(errorMessage)
      console.error("[v0] Fetch bids error:", err)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getUserBids = useCallback(async (): Promise<Bid[]> => {
    if (!user?.address) {
      setError("User address not available")
      return []
    }

    return getBids(undefined, user.address)
  }, [user?.address, getBids])

  const getPropertyBids = useCallback(
    async (tokenId: string): Promise<Bid[]> => {
      return getBids(tokenId)
    },
    [getBids],
  )

  return {
    placeBid,
    getBids,
    getUserBids,
    getPropertyBids,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
