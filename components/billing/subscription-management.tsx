"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Crown, Zap } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: string
  features: string[]
  popular?: boolean
}

interface UserSubscription {
  id: string
  planId: string
  status: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

export function SubscriptionManagement() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>("")

  useEffect(() => {
    fetchPlans()
    fetchCurrentSubscription()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/billing/subscriptions")
      const data = await response.json()
      setPlans(data.plans)
    } catch (error) {
      console.error("Failed to fetch plans:", error)
    }
  }

  const fetchCurrentSubscription = async () => {
    try {
      // Mock current subscription - replace with actual API call
      setCurrentSubscription({
        id: "sub_123",
        planId: "free",
        status: "active",
        currentPeriodEnd: "2024-02-01",
        cancelAtPeriodEnd: false,
      })
    } catch (error) {
      console.error("Failed to fetch subscription:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId)
    setUpgradeDialogOpen(true)
  }

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return

    try {
      const response = await fetch(`/api/billing/subscriptions/${currentSubscription.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ immediately: false }),
      })

      if (response.ok) {
        await fetchCurrentSubscription()
      }
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading subscription details...</div>
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold capitalize">{currentSubscription.planId} Plan</h3>
                  <Badge
                    className={
                      currentSubscription.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {currentSubscription.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentSubscription.cancelAtPeriodEnd
                    ? `Cancels on ${new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}`
                    : `Renews on ${new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}`}
                </p>
              </div>
              {currentSubscription.planId !== "free" && !currentSubscription.cancelAtPeriodEnd && (
                <Button variant="outline" onClick={handleCancelSubscription}>
                  Cancel Subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.id === "pro" && <Zap className="h-5 w-5 text-amber-500" />}
                {plan.id === "enterprise" && <Crown className="h-5 w-5 text-purple-500" />}
                {plan.name}
              </CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">${plan.price}</span>
                {plan.price > 0 && <span className="text-muted-foreground">/{plan.interval}</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Separator />
              <Button
                className="w-full"
                variant={currentSubscription?.planId === plan.id ? "outline" : "default"}
                disabled={currentSubscription?.planId === plan.id}
                onClick={() => handleUpgrade(plan.id)}
              >
                {currentSubscription?.planId === plan.id ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade Subscription</DialogTitle>
            <DialogDescription>
              Complete your payment to upgrade to the {plans.find((p) => p.id === selectedPlan)?.name} plan
            </DialogDescription>
          </DialogHeader>
          <Elements stripe={stripePromise}>
            <PaymentForm
              planId={selectedPlan}
              onSuccess={() => {
                setUpgradeDialogOpen(false)
                fetchCurrentSubscription()
              }}
            />
          </Elements>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PaymentForm({ planId, onSuccess }: { planId: string; onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)

    try {
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) return

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      })

      if (error) {
        console.error("Payment method creation failed:", error)
        return
      }

      const response = await fetch("/api/billing/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          paymentMethodId: paymentMethod.id,
        }),
      })

      const result = await response.json()

      if (result.clientSecret) {
        const { error: confirmError } = await stripe.confirmCardPayment(result.clientSecret)
        if (!confirmError) {
          onSuccess()
        }
      }
    } catch (error) {
      console.error("Payment processing error:", error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
            },
          }}
        />
      </div>
      <Button type="submit" disabled={!stripe || processing} className="w-full">
        {processing ? "Processing..." : "Complete Upgrade"}
      </Button>
    </form>
  )
}
