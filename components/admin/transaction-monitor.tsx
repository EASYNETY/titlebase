"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react"

const mockTransactions = [
  {
    id: "1",
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    type: "sale",
    property: "Luxury Downtown Condo",
    from: "0x1234...5678",
    to: "0x9876...5432",
    amount: "$250,000",
    fee: "$2,500",
    status: "confirmed",
    timestamp: "2024-01-20 14:30:00",
    blockNumber: 12345678,
  },
  {
    id: "2",
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    type: "listing",
    property: "Suburban Family Home",
    from: "0x2345...6789",
    to: "Marketplace",
    amount: "$180,000",
    fee: "$0",
    status: "confirmed",
    timestamp: "2024-01-20 12:15:00",
    blockNumber: 12345677,
  },
  {
    id: "3",
    hash: "0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    type: "bid",
    property: "Commercial Office Space",
    from: "0x3456...7890",
    to: "0x4567...8901",
    amount: "$420,000",
    fee: "$0",
    status: "pending",
    timestamp: "2024-01-20 16:45:00",
    blockNumber: 12345679,
  },
]

export function TransactionMonitor() {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "listing":
        return <Minus className="h-4 w-4 text-blue-600" />
      case "bid":
        return <TrendingDown className="h-4 w-4 text-orange-600" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "sale":
        return <Badge className="bg-green-100 text-green-800">Sale</Badge>
      case "listing":
        return <Badge className="bg-blue-100 text-blue-800">Listing</Badge>
      case "bid":
        return <Badge className="bg-orange-100 text-orange-800">Bid</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume (24h)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">+8% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12K</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Monitor all marketplace transactions in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(tx.type)}
                        {getTypeBadge(tx.type)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{tx.property}</TableCell>
                    <TableCell className="font-mono text-sm">{tx.from}</TableCell>
                    <TableCell className="font-mono text-sm">{tx.to}</TableCell>
                    <TableCell className="font-semibold">{tx.amount}</TableCell>
                    <TableCell>{tx.fee}</TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    <TableCell className="text-sm">{tx.timestamp}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://basescan.org/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-4 w-4" />
                          View
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
