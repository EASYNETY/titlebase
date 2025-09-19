"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, CheckCircle } from "lucide-react"

interface EscrowOptionsProps {
  enabled: boolean
  onEnabledChange: (enabled: boolean) => void
  period: number
  onPeriodChange: (period: number) => void
}

export function EscrowOptions({ enabled, onEnabledChange, period, onPeriodChange }: EscrowOptionsProps) {
  return (
    <Card className={enabled ? "border-blue-200 bg-blue-50" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Escrow Protection</CardTitle>
            <Badge className="bg-green-100 text-green-800">Recommended</Badge>
          </div>
          <Switch checked={enabled} onCheckedChange={onEnabledChange} />
        </div>
        <CardDescription>
          Secure your transaction with smart contract escrow. Funds are held safely until both parties confirm the
          transaction.
        </CardDescription>
      </CardHeader>
      {enabled && (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Escrow Period</label>
            <Select value={period.toString()} onValueChange={(value) => onPeriodChange(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />3 Days - Express
                  </div>
                </SelectItem>
                <SelectItem value="7">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />7 Days - Standard
                  </div>
                </SelectItem>
                <SelectItem value="14">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    14 Days - Extended
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">How Escrow Works:</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Your payment is held securely in a smart contract</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Seller transfers property title and provides documentation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>You confirm receipt and satisfaction with the transaction</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Funds are automatically released to the seller</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
