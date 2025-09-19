"use client"

import { useState, useEffect } from "react"
import { paymentsApi } from "@/lib/api/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { CryptoPayment } from "./crypto-payment"
import { FiatPayment } from "./fiat-payment"
import { EscrowOptions } from "./escrow-options"
import { CreditCard, Wallet, Shield } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  property: {
    id: string
    title: string
    price: string
    seller: string
    image: string
    assessed_value?: number
    total_fractions?: number
    min_fraction?: number
    max_fraction?: number
  }
  onPaymentComplete: (paymentResult: any) => void
}

export function PaymentModal({ open, onOpenChange, property, onPaymentComplete }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<"crypto" | "fiat">("fiat")
  const [escrowEnabled, setEscrowEnabled] = useState(true)
  const [escrowPeriod, setEscrowPeriod] = useState(7)
  const [selectedFractions, setSelectedFractions] = useState(property.max_fraction || 100) // Default max allowed
  const [paymentOptions, setPaymentOptions] = useState<any[]>([])
  const [loadingOptions, setLoadingOptions] = useState(true)

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      if (open) {
        try {
          const response = await paymentsApi.getPaymentOptions()
          setPaymentOptions(response.paymentOptions || [])
        } catch (error) {
          console.error('Failed to fetch payment options:', error)
        } finally {
          setLoadingOptions(false)
        }
      }
    }

    fetchPaymentOptions()
  }, [open])

  const cleanPrice = property.price.replace(/[$,]/g, "")
  const fullEthPrice = Number.parseFloat(cleanPrice)
  const totalFractions = property.total_fractions || 1000
  const pricePerFraction = fullEthPrice / totalFractions
  const selectedFractionPrice = selectedFractions * pricePerFraction
  const selectedFractionFee = selectedFractionPrice * 0.01
  const selectedFractionTotal = selectedFractionPrice + selectedFractionFee

  const fullAssessedValue = property.assessed_value || 0
  const assessedPerFraction = fullAssessedValue / totalFractions
  const selectedFiatValue = selectedFractions * assessedPerFraction

  const marketplaceFee = selectedFractionFee.toFixed(4)
  const totalEthAmount = selectedFractionTotal.toFixed(4)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Purchase</DialogTitle>
          <DialogDescription>Choose your payment method and complete the transaction</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">Seller: {property.seller}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Verified Title</Badge>
                    <Badge className="bg-blue-100 text-blue-800">KYC Verified</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fraction Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Fractional Ownership</CardTitle>
              <p className="text-sm text-muted-foreground">Select the number of fractions to purchase (1-{property.max_fraction} of {totalFractions} total)</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={property.min_fraction || 1}
                    max={property.max_fraction || 100}
                    value={selectedFractions}
                    onChange={(e) => setSelectedFractions(Math.max(property.min_fraction || 1, Math.min(property.max_fraction || 100, Number(e.target.value))))}
                    className="w-20"
                  />
                  <span>fractions of {property.title}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  You are purchasing {selectedFractions} fractions ({(selectedFractions / totalFractions * 100).toFixed(2)}%). This entitles you to {selectedFiatValue.toLocaleString()} USD value and proportional rental income.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Full Assessed Value</span>
                <span className="font-semibold line-through text-muted-foreground">${fullAssessedValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Your Share Value ({(selectedFractions / totalFractions * 100).toFixed(2)}%)</span>
                <span className="font-semibold">${selectedFiatValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ETH Cost ({selectedFractions} fractions)</span>
                <span className="font-semibold">{totalEthAmount} ETH</span>
              </div>
              <div className="flex justify-between">
                <span>Marketplace Fee (1% of ETH)</span>
                <span>{marketplaceFee} ETH</span>
              </div>
              {escrowEnabled && (
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Escrow Protection
                  </span>
                  <span className="text-green-600">Free</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total ETH Amount</span>
                <span>{totalEthAmount} ETH</span>
              </div>
            </CardContent>
          </Card>

          {/* Escrow Options */}
          <EscrowOptions
            enabled={escrowEnabled}
            onEnabledChange={setEscrowEnabled}
            period={escrowPeriod}
            onPeriodChange={setEscrowPeriod}
          />

          {/* Available Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingOptions ? (
                <div className="text-center py-4">Loading payment options...</div>
              ) : paymentOptions.length > 0 ? (
                <div className="space-y-4">
                  {paymentOptions.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{option.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {option.type.toUpperCase()} - {option.currency} via {option.provider}
                        </p>
                        {option.fee_percentage > 0 && (
                          <p className="text-xs text-muted-foreground">Fee: {option.fee_percentage * 100}%</p>
                        )}
                      </div>
                      <Badge variant={option.is_active ? "default" : "secondary"}>{option.is_active ? "Active" : "Inactive"}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">No payment options available</div>
              )}
            </CardContent>
          </Card>
        
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="crypto" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Cryptocurrency
                  </TabsTrigger>
                  <TabsTrigger value="fiat" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Traditional Payment
                  </TabsTrigger>
                </TabsList>
             
                <TabsContent value="crypto" className="mt-6">
                  <CryptoPayment
                    amount={totalEthAmount}
                    recipient={property.seller}
                    propertyId={property.id}
                    fractions={selectedFractions}
                    totalFractions={totalFractions}
                    escrowEnabled={escrowEnabled}
                    escrowPeriod={escrowPeriod}
                    onPaymentComplete={(result) => onPaymentComplete({ ...result, fractions: selectedFractions })}
                  />
                </TabsContent>
             
                <TabsContent value="fiat" className="mt-6">
                  <FiatPayment
                    amount={selectedFiatValue.toLocaleString()}
                    propertyId={property.id}
                    fractions={selectedFractions}
                    totalFractions={totalFractions}
                    escrowEnabled={escrowEnabled}
                    onPaymentComplete={(result) => onPaymentComplete({ ...result, fractions: selectedFractions })}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-blue-900">Secure Transaction</p>
                  <p className="text-sm text-blue-700">
                    Your payment is protected by blockchain technology and smart contract escrow. Funds are only
                    released when both parties confirm the transaction or after the escrow period expires. You will receive fractional NFT tokens representing your ownership share.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
