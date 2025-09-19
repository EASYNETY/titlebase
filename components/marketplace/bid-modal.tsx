"use client"

import { marketplaceApi } from "@/lib/api/client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Clock, Gavel, AlertCircle, Download } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import jsPDF from 'jspdf'

interface BidModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  property: {
    id: string
    title: string
    currentBid?: string
    reservePrice?: string
    auctionEndTime?: string
    minBidIncrement?: number
  }
}

export function BidModal({ isOpen, onClose, property, onSuccess }: BidModalProps) {
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()
  const [bidAmount, setBidAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const currentBidValue = property.currentBid ? Number.parseFloat(property.currentBid.replace(/[^0-9.]/g, "")) : 0
  const minBidIncrement = property.minBidIncrement || 0.05 // 5% default
  const minBidAmount =
    currentBidValue > 0
      ? currentBidValue * (1 + minBidIncrement)
      : Number.parseFloat(property.reservePrice?.replace(/[^0-9.]/g, "") || "0")

  const formatTimeRemaining = (endTime: string) => {
    const now = new Date()
    const end = new Date(endTime)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return "Auction Ended"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d ${hours % 24}h remaining`
    }

    return `${hours}h ${minutes}m remaining`
  }

  const handleSubmitBid = async () => {
    if (!isAuthenticated) {
      setError("Please sign in to place a bid")
      return
    }

    const bidValue = Number.parseFloat(bidAmount)
    if (bidValue < minBidAmount) {
      setError(`Minimum bid is ${minBidAmount.toFixed(2)} ETH`)
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const result = await marketplaceApi.placeBid({
        listingId: property.id,
        amount: bidValue,
      })
      console.log("[TB] Bid placed successfully:", result)

      toast({
        title: "Bid Placed Successfully",
        description: "You will be contacted if you win the bidding. Download your bid confirmation below.",
        action: (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => generateBidPDF(bidValue, property.title, user?.email || 'User')}
            className="h-6 px-2"
          >
            <Download className="h-3 w-3 mr-1" />
            Download PDF
          </Button>
        ),
      })
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place bid")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="w-5 h-5" />
            Place Bid
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Property Info */}
          <div className="space-y-2">
            <h3 className="font-medium">{property.title}</h3>
            {property.auctionEndTime && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {formatTimeRemaining(property.auctionEndTime)}
              </div>
            )}
          </div>

          <Separator />

          {/* Current Bid Info */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Current Bid</span>
              <span className="font-medium">{property.currentBid || "No bids yet"}</span>
            </div>
            {property.reservePrice && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Reserve Price</span>
                <span className="font-medium">{property.reservePrice}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Minimum Bid</span>
              <span className="font-medium text-primary">{minBidAmount.toFixed(2)} ETH</span>
            </div>
          </div>

          <Separator />

          {/* Bid Input */}
          <div className="space-y-2">
            <Label htmlFor="bidAmount">Your Bid (ETH)</Label>
            <Input
              id="bidAmount"
              type="number"
              step="0.01"
              min={minBidAmount}
              placeholder={`Minimum ${minBidAmount.toFixed(2)} ETH`}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              disabled={isSubmitting}
            />
            {Number.parseFloat(bidAmount) > 0 && (
              <div className="text-xs text-muted-foreground">
                ≈ ${(Number.parseFloat(bidAmount) * 2500).toLocaleString()} USD (estimated)
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Bid Info */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Bidding Information</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Bids are binding and cannot be cancelled</li>
              <li>• If outbid, your funds will be automatically refunded</li>
              <li>• Auction may extend by 15 minutes if bid placed near end</li>
              <li>• 1% marketplace fee applies to winning bids</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitBid}
              disabled={!bidAmount || Number.parseFloat(bidAmount) < minBidAmount || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Placing Bid..." : `Place Bid`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const generateBidPDF = (amount: number, propertyTitle: string, userEmail: string) => {
  const doc = new jsPDF()
  const date = new Date().toLocaleString()

  doc.setFontSize(20)
  doc.text('Bid Confirmation', 20, 20)

  doc.setFontSize(12)
  doc.text(`Property: ${propertyTitle}`, 20, 40)
  doc.text(`Bid Amount: ${amount} ETH`, 20, 50)
  doc.text(`Date: ${date}`, 20, 60)
  doc.text(`User: ${userEmail}`, 20, 70)

  doc.save(`bid-confirmation-${Date.now()}.pdf`)
}
