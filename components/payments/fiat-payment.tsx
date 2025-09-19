"use client"

import { useState } from "react"
import { paymentsApi } from "@/lib/api/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, Building, CheckCircle, AlertCircle, Smartphone, Banknote } from "lucide-react"

interface FiatPaymentProps {
  amount: string
  propertyId: string
  escrowEnabled: boolean
  onPaymentComplete: (result: any) => void
}

export function FiatPayment({ amount, propertyId, escrowEnabled, onPaymentComplete }: FiatPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentStatus("processing")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const result = {
        success: true,
        paymentId: `fiat_${paymentMethod}_${Date.now()}`,
        method: paymentMethod,
        amount,
        escrowEnabled,
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

  if (paymentStatus === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Payment Successful!</p>
              <p className="text-sm text-green-700">
                Your payment has been processed successfully. You will receive a confirmation email shortly.
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
                There was an error processing your payment. Please check your payment details and try again.
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
      <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="credit_card" className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            <span className="hidden sm:inline">Cards</span>
          </TabsTrigger>
          <TabsTrigger value="bank_transfer" className="flex items-center gap-1">
            <Building className="h-3 w-3" />
            <span className="hidden sm:inline">Bank</span>
          </TabsTrigger>
          <TabsTrigger value="digital_wallet" className="flex items-center gap-1">
            <Smartphone className="h-3 w-3" />
            <span className="hidden sm:inline">Digital</span>
          </TabsTrigger>
          <TabsTrigger value="mobile_payment" className="flex items-center gap-1">
            <Banknote className="h-3 w-3" />
            <span className="hidden sm:inline">Mobile</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="credit_card" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Credit & Debit Cards
              </CardTitle>
              <CardDescription>Secure payment via Stripe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button variant="outline" className="h-12 bg-transparent">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🍎</span>
                    <span className="text-sm">Apple Pay</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔵</span>
                    <span className="text-sm">Google Pay</span>
                  </div>
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardholder">Cardholder Name</Label>
                <Input id="cardholder" placeholder="John Doe" />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="outline" className="text-xs">
                  Visa
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Mastercard
                </Badge>
                <Badge variant="outline" className="text-xs">
                  American Express
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Discover
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank_transfer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="w-4 h-4" />
                Bank Transfer Options
              </CardTitle>
              <CardDescription>Direct bank transfers for larger transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transfer-type">Transfer Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transfer method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ach">ACH Transfer (US) - 1-3 business days</SelectItem>
                    <SelectItem value="sepa">SEPA Transfer (EU) - Same day</SelectItem>
                    <SelectItem value="swift">SWIFT Wire - 1-2 business days</SelectItem>
                    <SelectItem value="faster_payments">Faster Payments (UK) - Instant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input id="account-number" placeholder="123456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routing-number">Routing/Sort Code</Label>
                <Input id="routing-number" placeholder="021000021" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-type">Account Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-holder">Account Holder Name</Label>
                <Input id="account-holder" placeholder="John Doe" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="digital_wallet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Digital Wallets
              </CardTitle>
              <CardDescription>Popular digital payment platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full h-12 justify-start bg-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💙</span>
                  <div className="text-left">
                    <div className="font-medium">PayPal</div>
                    <div className="text-xs text-muted-foreground">Pay with your PayPal balance or linked accounts</div>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full h-12 justify-start bg-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💰</span>
                  <div className="text-left">
                    <div className="font-medium">Venmo</div>
                    <div className="text-xs text-muted-foreground">Social payments made easy</div>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full h-12 justify-start bg-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💚</span>
                  <div className="text-left">
                    <div className="font-medium">Cash App</div>
                    <div className="text-xs text-muted-foreground">Send and receive money instantly</div>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full h-12 justify-start bg-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔵</span>
                  <div className="text-left">
                    <div className="font-medium">Zelle</div>
                    <div className="text-xs text-muted-foreground">Bank-to-bank transfers</div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile_payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Banknote className="w-4 h-4" />
                Mobile Payment Solutions
              </CardTitle>
              <CardDescription>Tap-to-pay and mobile-first options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 bg-transparent">
                  <div className="text-center">
                    <div className="text-lg mb-1">🍎</div>
                    <div className="text-sm font-medium">Apple Pay</div>
                    <div className="text-xs text-muted-foreground">Touch/Face ID</div>
                  </div>
                </Button>

                <Button variant="outline" className="h-16 bg-transparent">
                  <div className="text-center">
                    <div className="text-lg mb-1">🤖</div>
                    <div className="text-sm font-medium">Google Pay</div>
                    <div className="text-xs text-muted-foreground">Fingerprint</div>
                  </div>
                </Button>
              </div>

              <Button variant="outline" className="w-full h-12 justify-start bg-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📱</span>
                  <div className="text-left">
                    <div className="font-medium">Samsung Pay</div>
                    <div className="text-xs text-muted-foreground">Works with most card readers</div>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full h-12 justify-start bg-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💳</span>
                  <div className="text-left">
                    <div className="font-medium">Buy Now, Pay Later</div>
                    <div className="text-xs text-muted-foreground">Klarna, Afterpay, Affirm</div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="font-semibold">${amount}</span>
          </div>
          <div className="flex justify-between">
            <span>Processing Fee</span>
            <span>
              {paymentMethod === "credit_card" && "2.9% + $0.30"}
              {paymentMethod === "bank_transfer" && "$5.00"}
              {paymentMethod === "digital_wallet" && "3.5%"}
              {paymentMethod === "mobile_payment" && "2.9%"}
            </span>
          </div>
          {escrowEnabled && (
            <div className="flex justify-between">
              <span>Escrow Protection</span>
              <span className="text-green-600">Free</span>
            </div>
          )}
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
            {paymentMethod === "credit_card" && <CreditCard className="mr-2 h-4 w-4" />}
            {paymentMethod === "bank_transfer" && <Building className="mr-2 h-4 w-4" />}
            {paymentMethod === "digital_wallet" && <Smartphone className="mr-2 h-4 w-4" />}
            {paymentMethod === "mobile_payment" && <Banknote className="mr-2 h-4 w-4" />}
            Pay ${amount}
          </>
        )}
      </Button>

      {/* Security Notice */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Your payment information is encrypted and secure</p>
        <p>• Processing times vary by payment method</p>
        {escrowEnabled && <p>• Funds will be held in escrow until transaction completion</p>}
        <p>• All transactions are PCI DSS compliant</p>
      </div>
    </div>
  )
}
