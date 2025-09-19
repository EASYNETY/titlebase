import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from "lucide-react"

export default function TransactionsPage() {
  const transactions = [
    { id: "1", type: "Purchase", amount: "$75,000", date: "2024-01-15", status: "Completed", property: "Property #1" },
    { id: "2", type: "Distribution", amount: "$450", date: "2024-01-10", status: "Completed", property: "Property #2" },
    { id: "3", type: "Sale", amount: "$82,000", date: "2024-01-05", status: "Completed", property: "Property #3" },
    { id: "4", type: "Purchase", amount: "$3,500", date: "2024-01-01", status: "Completed", property: "Fractional #1" },
    { id: "5", type: "Bid", amount: "$65,000", date: "2023-12-28", status: "Failed", property: "Property #4" },
    { id: "6", type: "Distribution", amount: "$320", date: "2023-12-15", status: "Completed", property: "Property #2" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Transaction History</h1>
          <p className="text-slate-600">View all your marketplace activities and payments</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input placeholder="Search transactions..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="distribution">Distribution</SelectItem>
                  <SelectItem value="bid">Bid</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "Purchase" || transaction.type === "Bid"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {transaction.type === "Purchase" || transaction.type === "Bid" ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.type}</div>
                      <div className="text-sm text-slate-600">{transaction.property}</div>
                      <div className="text-xs text-slate-500">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-medium ${
                        transaction.type === "Purchase" || transaction.type === "Bid"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {transaction.type === "Purchase" || transaction.type === "Bid" ? "-" : "+"}
                      {transaction.amount}
                    </div>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "default"
                          : transaction.status === "Failed"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button variant="outline">Load More Transactions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
