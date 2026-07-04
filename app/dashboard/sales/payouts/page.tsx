'use client'

import {
  IndianRupee,
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Banknote,
  TrendingUp,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function PayoutsPage() {
  const payouts = [
    {
      id: 'PAY-1001',
      creator: 'Rahul Sharma',
      amount: '₹45,000',
      status: 'Completed',
      method: 'Bank Transfer',
      date: '12 Jun 2026',
    },
    {
      id: 'PAY-1002',
      creator: 'Priya Singh',
      amount: '₹22,500',
      status: 'Pending',
      method: 'UPI',
      date: '11 Jun 2026',
    },
    {
      id: 'PAY-1003',
      creator: 'Aman Verma',
      amount: '₹15,800',
      status: 'Processing',
      method: 'Bank Transfer',
      date: '10 Jun 2026',
    },
    {
      id: 'PAY-1004',
      creator: 'Neha Gupta',
      amount: '₹38,200',
      status: 'Completed',
      method: 'Bank Transfer',
      date: '09 Jun 2026',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payouts</h1>
          <p className="text-muted-foreground">
            Manage creator earnings, withdrawals and payout settlements.
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Payouts
        </Button>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <IndianRupee className="h-5 w-5 text-green-600" />
            <h2 className="mt-4 text-3xl font-bold">
              ₹18.4L
            </h2>
            <p className="text-muted-foreground">
              Total Paid Out
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Wallet className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-3xl font-bold">
              ₹2.7L
            </h2>
            <p className="text-muted-foreground">
              Pending Payouts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="mt-4 text-3xl font-bold">
              1,284
            </h2>
            <p className="text-muted-foreground">
              Successful Transfers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="mt-4 text-3xl font-bold">
              48
            </h2>
            <p className="text-muted-foreground">
              Awaiting Approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payout Volume</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <TrendingUp className="mx-auto mb-3 h-10 w-10" />
                <p className="font-medium">
                  Payout Analytics Chart
                </p>
                <p className="text-sm text-muted-foreground">
                  Integrate Recharts or Chart.js
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout Overview</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 flex justify-between">
              <span>Today's Payouts</span>
              <strong>₹84,500</strong>
            </div>

            <div className="rounded-lg border p-4 flex justify-between">
              <span>This Week</span>
              <strong>₹4.8L</strong>
            </div>

            <div className="rounded-lg border p-4 flex justify-between">
              <span>This Month</span>
              <strong>₹18.4L</strong>
            </div>

            <div className="rounded-lg border p-4 flex justify-between">
              <span>Average Payout</span>
              <strong>₹14,320</strong>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout Table */}

      <Card>
        <CardHeader>
          <CardTitle>Recent Payouts</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Payout ID</th>
                  <th className="pb-3">Creator</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {payouts.map((payout) => (
                  <tr
                    key={payout.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {payout.id}
                    </td>

                    <td>{payout.creator}</td>

                    <td>{payout.amount}</td>

                    <td>{payout.method}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          payout.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : payout.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {payout.status}
                      </span>
                    </td>

                    <td>{payout.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Settlement Stats */}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <Banknote className="h-5 w-5 text-green-600" />
            <h3 className="mt-3 text-2xl font-bold">
              ₹2.7L
            </h3>
            <p className="text-muted-foreground">
              Pending Settlements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <CheckCircle className="h-5 w-5 text-primary" />
            <h3 className="mt-3 text-2xl font-bold">
              98.4%
            </h3>
            <p className="text-muted-foreground">
              Success Rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <h3 className="mt-3 text-2xl font-bold">
              12
            </h3>
            <p className="text-muted-foreground">
              Failed Transfers
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}