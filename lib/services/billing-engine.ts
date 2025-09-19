import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  stripePriceId: string
}

export interface BillingCycle {
  id: string
  userId: string
  subscriptionId: string
  amount: number
  currency: string
  status: "pending" | "paid" | "failed" | "overdue"
  dueDate: Date
  paidAt?: Date
  invoiceId?: string
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: ["Basic property browsing", "Limited analytics", "Community support"],
    stripePriceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    interval: "month",
    features: [
      "Advanced analytics",
      "Priority investment opportunities",
      "Portfolio insights",
      "Email support",
      "Investment calculator",
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "month",
    features: [
      "All Pro features",
      "White-label solutions",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "Advanced reporting",
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
  },
]

export class BillingEngine {
  async createSubscription(userId: string, planId: string, paymentMethodId: string) {
    try {
      const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId)
      if (!plan || plan.id === "free") {
        throw new Error("Invalid subscription plan")
      }

      // Create Stripe customer
      const customer = await stripe.customers.create({
        metadata: { userId },
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId },
      })

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: plan.stripePriceId }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      })

      return {
        subscriptionId: subscription.id,
        customerId: customer.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        status: subscription.status,
      }
    } catch (error) {
      console.error("Subscription creation error:", error)
      throw error
    }
  }

  async updateSubscription(subscriptionId: string, newPlanId: string) {
    try {
      const plan = SUBSCRIPTION_PLANS.find((p) => p.id === newPlanId)
      if (!plan) throw new Error("Invalid plan")

      const subscription = await stripe.subscriptions.retrieve(subscriptionId)

      await stripe.subscriptions.update(subscriptionId, {
        items: [
          {
            id: subscription.items.data[0].id,
            price: plan.stripePriceId,
          },
        ],
        proration_behavior: "create_prorations",
      })

      return { success: true }
    } catch (error) {
      console.error("Subscription update error:", error)
      throw error
    }
  }

  async cancelSubscription(subscriptionId: string, immediately = false) {
    try {
      if (immediately) {
        await stripe.subscriptions.cancel(subscriptionId)
      } else {
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        })
      }
      return { success: true }
    } catch (error) {
      console.error("Subscription cancellation error:", error)
      throw error
    }
  }

  async processInvestmentPayment(amount: number, currency: string, paymentMethodId: string, propertyId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
        metadata: {
          type: "property_investment",
          propertyId,
        },
      })

      return {
        success: paymentIntent.status === "succeeded",
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret,
      }
    } catch (error) {
      console.error("Investment payment error:", error)
      throw error
    }
  }

  async generateInvoice(userId: string, amount: number, description: string, metadata: any = {}) {
    try {
      // Get or create customer
      const customers = await stripe.customers.list({ limit: 1, metadata: { userId } })
      let customerId = customers.data[0]?.id

      if (!customerId) {
        const customer = await stripe.customers.create({ metadata: { userId } })
        customerId = customer.id
      }

      // Create invoice
      const invoice = await stripe.invoices.create({
        customer: customerId,
        collection_method: "send_invoice",
        days_until_due: 30,
        metadata,
      })

      // Add invoice item
      await stripe.invoiceItems.create({
        customer: customerId,
        invoice: invoice.id,
        amount: Math.round(amount * 100),
        currency: "usd",
        description,
      })

      // Finalize and send invoice
      const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id)
      await stripe.invoices.sendInvoice(invoice.id)

      return {
        invoiceId: finalizedInvoice.id,
        invoiceUrl: finalizedInvoice.hosted_invoice_url,
        invoicePdf: finalizedInvoice.invoice_pdf,
      }
    } catch (error) {
      console.error("Invoice generation error:", error)
      throw error
    }
  }

  async handleWebhook(event: Stripe.Event) {
    try {
      switch (event.type) {
        case "invoice.payment_succeeded":
          await this.handleSuccessfulPayment(event.data.object as Stripe.Invoice)
          break
        case "invoice.payment_failed":
          await this.handleFailedPayment(event.data.object as Stripe.Invoice)
          break
        case "customer.subscription.updated":
          await this.handleSubscriptionUpdate(event.data.object as Stripe.Subscription)
          break
        case "customer.subscription.deleted":
          await this.handleSubscriptionCancellation(event.data.object as Stripe.Subscription)
          break
      }
    } catch (error) {
      console.error("Webhook handling error:", error)
      throw error
    }
  }

  private async handleSuccessfulPayment(invoice: Stripe.Invoice) {
    // Update payment status in database
    // Send confirmation email
    // Update user subscription status
    console.log("Payment succeeded for invoice:", invoice.id)
  }

  private async handleFailedPayment(invoice: Stripe.Invoice) {
    // Update payment status
    // Send failure notification
    // Implement retry logic
    console.log("Payment failed for invoice:", invoice.id)
  }

  private async handleSubscriptionUpdate(subscription: Stripe.Subscription) {
    // Update user subscription in database
    console.log("Subscription updated:", subscription.id)
  }

  private async handleSubscriptionCancellation(subscription: Stripe.Subscription) {
    // Update user subscription status
    // Send cancellation confirmation
    console.log("Subscription cancelled:", subscription.id)
  }
}

export const billingEngine = new BillingEngine()
