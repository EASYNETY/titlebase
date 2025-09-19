"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, ArrowRight } from "lucide-react"

export function FeatureAnnouncement() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">New: AI-Powered Property Insights</h4>
                <Badge className="bg-blue-100 text-blue-800">Just Released</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Get intelligent market analysis and investment recommendations powered by AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
              Try It Now
              <ArrowRight className="w-4 h-4" />
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
