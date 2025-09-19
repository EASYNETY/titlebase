"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, Wallet, CheckCircle, AlertCircle } from "lucide-react"
import { SUPPORTED_TOKENS } from "@/lib/config/payments"
import { useAuth } from "@/lib/hooks/use-auth"
import { WalletSelection } from "./wallet-selection"

interface CryptoPaymentProps {
  amount: string
  recipient: string
  propertyId: string
  fractions: number
  totalFractions: number
  escrowEnabled: boolean
  escrowPeriod: number
  onPaymentComplete: (result: any) => void
}

export function CryptoPayment({
  amount,
  recipient,
  propertyId,
  escrowEnabled,
  escrowPeriod,
  onPaymentComplete,
}: CryptoPaymentProps) {
  const { user, isConnected } = useAuth()
  const [selectedToken, setSelectedToken] = useState("USDC")
  const [selectedWallet, setSelectedWallet] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [showWalletSelection, setShowWalletSelection] = useState(!isConnected)

  const handleWalletSelect = async (walletId: string) => {
    setSelectedWallet(walletId)
    setIsConnecting(true)

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShowWalletSelection(false)
      console.log("[v0] Connected to wallet:", walletId)
    } catch (error) {
      console.error("[v0] Wallet connection failed:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handlePayment = async () => {
    if (!isConnected && !selectedWallet) {
      setShowWalletSelection(true)
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const result = {
        success: true,
        transactionHash: `0x${Math.random().toString(16).slice(2).padStart(64, "0")}`,
        paymentId: `crypto_${Date.now()}`,
        escrowId: escrowEnabled ? `escrow_${Date.now()}` : undefined,
        token: selectedToken,
        amount,
        wallet: selectedWallet,
      }

      setPaymentStatus("success")
      onPaymentComplete(result)
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("error")
    } finally {
      setIsProcessing(false)
    }
  }

  if (showWalletSelection) {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="font-medium">Connect Your Wallet</h3>
          <p className="text-sm text-muted-foreground">Choose your preferred wallet to complete the crypto payment</p>
        </div>

        <WalletSelection
          onWalletSelect={handleWalletSelect}
          isConnecting={isConnecting}
          selectedWallet={selectedWallet}
        />

        <Button variant="outline" onClick={() => setShowWalletSelection(false)} className="w-full bg-transparent">
          Back to Payment Options
        </Button>
      </div>
    )
  }

  if (paymentStatus === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Payment Successful!</p>
              <p className="text-sm text-green-700">
                Your transaction has been submitted to the blockchain. You will receive a confirmation shortly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (paymentStatus === "error") {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Payment Failed</p>
              <p className="text-sm text-red-700">
                There was an error processing your payment. Please try again or contact support.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-3 bg-transparent"
            onClick={() => {
              setPaymentStatus("idle")
              setIsProcessing(false)
            }}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Connected Wallet Info */}
      {(isConnected || selectedWallet) && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">
                  Wallet Connected: {selectedWallet || "MetaMask"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWalletSelection(true)}
                className="bg-transparent"
              >
                Change Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Token Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Payment Token</label>
        <Select value={selectedToken} onValueChange={setSelectedToken}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SUPPORTED_TOKENS).map(([key, token]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {token.symbol === "ETH"
                      ? "⚡"
                      : token.symbol === "USDC"
                        ? "🔵"
                        : token.symbol === "USDT"
                          ? "🟢"
                          : "💰"}
                  </span>
                  <span>{token.symbol}</span>
                  <span className="text-muted-foreground">- {token.name}</span>
                  {key === "USDC" && <Badge className="bg-blue-100 text-blue-800 text-xs">Recommended</Badge>}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="font-semibold">
              ${amount} ({selectedToken})
            </span>
          </div>
          <div className="flex justify-between">
            <span>Network</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">Base Network</span>
              <Badge className="bg-blue-100 text-blue-800 text-xs">Low Fees</Badge>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Recipient</span>
            <span className="font-mono text-sm">
              {recipient.slice(0, 6)}...{recipient.slice(-4)}
            </span>
          </div>
          {escrowEnabled && (
            <div className="flex justify-between">
              <span>Escrow Period</span>
              <Badge className="bg-blue-100 text-blue-800">{escrowPeriod} days</Badge>
            </div>
          )}
          <Separator />
          <div className="flex justify-between">
            <span>Estimated Gas Fee</span>
            <span className="text-sm text-green-600">~$0.05</span>
          </div>
        </CardContent>
      </Card>

      {/* Supported Networks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Supported Networks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 border rounded">
              <span className="text-lg">🔵</span>
              <div>
                <div className="text-sm font-medium">Base</div>
                <div className="text-xs text-muted-foreground">Low fees</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded opacity-50">
              <span className="text-lg">⚡</span>
              <div>
                <div className="text-sm font-medium">Ethereum</div>
                <div className="text-xs text-muted-foreground">Coming soon</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded opacity-50">
              <span className="text-lg">🟣</span>
              <div>
                <div className="text-sm font-medium">Polygon</div>
                <div className="text-xs text-muted-foreground">Coming soon</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded opacity-50">
              <span className="text-lg">☀️</span>
              <div>
                <div className="text-sm font-medium">Solana</div>
                <div className="text-xs text-muted-foreground">Coming soon</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Pay with {selectedToken}
          </>
        )}
      </Button>

      {/* Transaction Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Transaction will be processed on Base network for low fees</p>
        <p>• Gas fees will be calculated automatically</p>
        <p>• You will receive a confirmation once the transaction is mined</p>
        {escrowEnabled && <p>• Funds will be held in escrow for {escrowPeriod} days for buyer protection</p>}
        <p>• All transactions are secured by blockchain technology</p>
      </div>
    </div>
  )
}
