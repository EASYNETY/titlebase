"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Send, Calendar, DollarSign } from "lucide-react"

interface Invoice {
  id: string
  number: string
  amount: number
  status: "draft" | "sent" | "paid" | "overdue"
  dueDate: string
  createdAt: string
  description: string
  recipientEmail: string
}

export function InvoiceGenerator() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      number: "INV-001",
      amount: 2500,
      status: "paid",
      dueDate: "2024-01-15",
      createdAt: "2023-12-15",
      description: "Property investment consultation",
      recipientEmail: "investor@example.com",
    },
    {
      id: "2",
      number: "INV-002",
      amount: 1200,
      status: "sent",
      dueDate: "2024-02-01",
      createdAt: "2024-01-01",
      description: "Monthly management fee",
      recipientEmail: "client@example.com",
    },
  ])

  const [newInvoice, setNewInvoice] = useState({
    amount: "",
    description: "",
    recipientEmail: "",
    dueDate: "",
  })

  const [isCreating, setIsCreating] = useState(false)

  const handleCreateInvoice = async () => {
    setIsCreating(true)
    try {
      // Mock invoice creation - replace with actual API call
      const invoice: Invoice = {
        id: Date.now().toString(),
        number: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
        amount: Number.parseFloat(newInvoice.amount),
        status: "draft",
        dueDate: newInvoice.dueDate,
        createdAt: new Date().toISOString().split("T")[0],
        description: newInvoice.description,
        recipientEmail: newInvoice.recipientEmail,
      }

      setInvoices([...invoices, invoice])
      setNewInvoice({ amount: "", description: "", recipientEmail: "", dueDate: "" })
    } catch (error) {
      console.error("Failed to create invoice:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleSendInvoice = async (invoiceId: string) => {
    try {
      // Mock sending invoice - replace with actual API call
      setInvoices(invoices.map((inv) => (inv.id === invoiceId ? { ...inv, status: "sent" as const } : inv)))
    } catch (error) {
      console.error("Failed to send invoice:", error)
    }
  }

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Create New Invoice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create New Invoice
          </CardTitle>
          <CardDescription>Generate professional invoices for your services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientEmail">Recipient Email</Label>
            <Input
              id="recipientEmail"
              type="email"
              placeholder="client@example.com"
              value={newInvoice.recipientEmail}
              onChange={(e) => setNewInvoice({ ...newInvoice, recipientEmail: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the services or products..."
              value={newInvoice.description}
              onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
            />
          </div>
          <Button
            onClick={handleCreateInvoice}
            disabled={isCreating || !newInvoice.amount || !newInvoice.recipientEmail}
            className="w-full"
          >
            {isCreating ? "Creating..." : "Create Invoice"}
          </Button>
        </CardContent>
      </Card>

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Manage and track your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{invoice.number}</h4>
                      <p className="text-sm text-muted-foreground">{invoice.recipientEmail}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">${invoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created: {new Date(invoice.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{invoice.description}</p>

                <Separator className="mb-4" />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  {invoice.status === "draft" && (
                    <Button size="sm" onClick={() => handleSendInvoice(invoice.id)}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Invoice
                    </Button>
                  )}
                  {invoice.status === "sent" && (
                    <Button variant="outline" size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Resend
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
