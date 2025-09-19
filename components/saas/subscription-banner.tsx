"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Crown, Zap, TrendingUp } from "lucide-react"

interface SubscriptionBannerProps {
  userTier?: "free" | "pro" | "enterprise"
}

export function SubscriptionBanner({ userTier = "free" }: SubscriptionBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || userTier !== "free") return null

  return (
    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">Upgrade to Pro</h4>
                <Badge className="bg-amber-100 text-amber-800">Limited Time</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Unlock advanced analytics, priority support, and exclusive investment opportunities
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-4 mr-4">
              <div className="flex items-center gap-1 text-sm">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Advanced Analytics</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Priority Access</span>
              </div>
            </div>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
              Upgrade Now
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setDismissed(true)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
