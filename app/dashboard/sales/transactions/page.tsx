'use client'

import {
  CreditCard,
  IndianRupee,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Search,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function TransactionsPage() {
  const transactions = [
    {
      id: 'TXN-845921',
      customer: 'Rahul Sharma',
      product: 'React Mastery Course',
      amount: '₹4,999',
      status: 'Success',
      date: '12 Jun 2026',
      method: 'UPI',
    },
    {
      id: 'TXN-845922',
      customer: 'Priya Singh',
      product: 'Creator Membership',
      amount: '₹999',
      status: 'Pending',
      date: '12 Jun 2026',
      method: 'Card',
    },
    {
      id: 'TXN-845923',
      customer: 'Aman Verma',
      product: 'Growth Bundle',
      amount: '₹7,499',
      status: 'Failed',
      date: '11 Jun 2026',
      method: 'Net Banking',
    },
    {
      id: 'TXN-845924',
      customer: 'Neha Gupta',
      product: 'Community Access',
      amount: '₹1,999',
      status: 'Success',
      date: '11 Jun 2026',
      method: 'UPI',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Track all payments, refunds and transaction activity.
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Transactions
        </Button>
      </div>

      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <IndianRupee className="h-5 w-5 text-green-600" />
            <h2 className="mt-4 text-3xl font-bold">₹8.4L</h2>
            <p className="text-muted-foreground">
              Total Revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <h2 className="mt-4 text-3xl font-bold">1,248</h2>
            <p className="text-muted-foreground">
              Total Transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="mt-4 text-3xl font-bold">1,171</h2>
            <p className="text-muted-foreground">
              Successful Payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="mt-4 text-3xl font-bold">43</h2>
            <p className="text-muted-foreground">
              Pending Payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Transaction ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {transaction.id}
                    </td>

                    <td>{transaction.customer}</td>

                    <td>{transaction.product}</td>

                    <td>{transaction.amount}</td>

                    <td>{transaction.method}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          transaction.status === 'Success'
                            ? 'bg-green-100 text-green-700'
                            : transaction.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td>{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Breakdown */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between rounded-lg border p-4">
              <span>UPI</span>
              <span className="font-bold">58%</span>
            </div>

            <div className="flex justify-between rounded-lg border p-4">
              <span>Credit/Debit Card</span>
              <span className="font-bold">24%</span>
            </div>

            <div className="flex justify-between rounded-lg border p-4">
              <span>Net Banking</span>
              <span className="font-bold">12%</span>
            </div>

            <div className="flex justify-between rounded-lg border p-4">
              <span>Wallet</span>
              <span className="font-bold">6%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Health</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Success Rate
              </div>

              <h3 className="mt-2 text-2xl font-bold">
                93.8%
              </h3>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                Failed Transactions
              </div>

              <h3 className="mt-2 text-2xl font-bold">
                34
              </h3>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                Pending Reviews
              </div>

              <h3 className="mt-2 text-2xl font-bold">
                43
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}