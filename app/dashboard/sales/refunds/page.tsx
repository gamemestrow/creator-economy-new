'use client'

import {
  RotateCcw,
  IndianRupee,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  TrendingDown,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function RefundsPage() {
  const refunds = [
    {
      id: 'REF-1001',
      customer: 'Rahul Sharma',
      product: 'React Mastery Course',
      amount: '₹4,999',
      reason: 'Duplicate Purchase',
      status: 'Approved',
      date: '12 Jun 2026',
    },
    {
      id: 'REF-1002',
      customer: 'Priya Singh',
      product: 'Creator Membership',
      amount: '₹999',
      reason: 'Subscription Cancellation',
      status: 'Pending',
      date: '11 Jun 2026',
    },
    {
      id: 'REF-1003',
      customer: 'Aman Verma',
      product: 'Growth Bundle',
      amount: '₹7,499',
      reason: 'Course Not Needed',
      status: 'Rejected',
      date: '10 Jun 2026',
    },
    {
      id: 'REF-1004',
      customer: 'Neha Gupta',
      product: 'Community Access',
      amount: '₹1,999',
      reason: 'Technical Issue',
      status: 'Approved',
      date: '09 Jun 2026',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Refunds</h1>
          <p className="text-muted-foreground">
            Manage refund requests, approvals and refund analytics.
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Refunds
        </Button>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <IndianRupee className="h-5 w-5 text-red-500" />
            <h2 className="mt-4 text-3xl font-bold">
              ₹1.82L
            </h2>
            <p className="text-muted-foreground">
              Total Refunded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <RotateCcw className="h-5 w-5 text-blue-600" />
            <h2 className="mt-4 text-3xl font-bold">
              248
            </h2>
            <p className="text-muted-foreground">
              Refund Requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="mt-4 text-3xl font-bold">
              18
            </h2>
            <p className="text-muted-foreground">
              Pending Reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <TrendingDown className="h-5 w-5 text-green-600" />
            <h2 className="mt-4 text-3xl font-bold">
              2.4%
            </h2>
            <p className="text-muted-foreground">
              Refund Rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Refund Analytics */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Refund Trends
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed">
              Refund Analytics Chart
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Refund Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between rounded-lg border p-4">
              <span>This Week</span>
              <strong>₹28,400</strong>
            </div>

            <div className="flex justify-between rounded-lg border p-4">
              <span>This Month</span>
              <strong>₹1.82L</strong>
            </div>

            <div className="flex justify-between rounded-lg border p-4">
              <span>Approved</span>
              <strong>196</strong>
            </div>

            <div className="flex justify-between rounded-lg border p-4">
              <span>Rejected</span>
              <strong>34</strong>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refund Table */}

      <Card>
        <CardHeader>
          <CardTitle>
            Refund Requests
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Refund ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Reason</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {refunds.map((refund) => (
                  <tr
                    key={refund.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {refund.id}
                    </td>

                    <td>{refund.customer}</td>

                    <td>{refund.product}</td>

                    <td>{refund.amount}</td>

                    <td>{refund.reason}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          refund.status === 'Approved'
                            ? 'bg-green-100 text-green-700'
                            : refund.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {refund.status}
                      </span>
                    </td>

                    <td>{refund.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="mt-3 text-2xl font-bold">
              196
            </h3>
            <p className="text-muted-foreground">
              Approved Refunds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h3 className="mt-3 text-2xl font-bold">
              18
            </h3>
            <p className="text-muted-foreground">
              Pending Requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="mt-3 text-2xl font-bold">
              248
            </h3>
            <p className="text-muted-foreground">
              Customers Requested Refunds
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}