'use client'

import {
  Users,
  IndianRupee,
  RefreshCcw,
  AlertCircle,
  CheckCircle,
  Calendar,
  Download,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SubscriptionsPage() {
  const subscriptions = [
    {
      id: 'SUB-1001',
      customer: 'Rahul Sharma',
      plan: 'Pro Membership',
      amount: '₹999/month',
      status: 'Active',
      renewal: '25 Jun 2026',
    },
    {
      id: 'SUB-1002',
      customer: 'Priya Singh',
      plan: 'Elite Membership',
      amount: '₹1,999/month',
      status: 'Active',
      renewal: '30 Jun 2026',
    },
    {
      id: 'SUB-1003',
      customer: 'Aman Verma',
      plan: 'Community Plus',
      amount: '₹499/month',
      status: 'Expired',
      renewal: '-',
    },
    {
      id: 'SUB-1004',
      customer: 'Neha Gupta',
      plan: 'Creator Pro',
      amount: '₹2,999/month',
      status: 'Pending',
      renewal: '18 Jun 2026',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Subscriptions
          </h1>
          <p className="text-muted-foreground">
            Manage recurring memberships and subscription revenue.
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-3xl font-bold">
              2,481
            </h2>
            <p className="text-muted-foreground">
              Active Subscribers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <IndianRupee className="h-5 w-5 text-green-600" />
            <h2 className="mt-4 text-3xl font-bold">
              ₹12.8L
            </h2>
            <p className="text-muted-foreground">
              Monthly Recurring Revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <RefreshCcw className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-3xl font-bold">
              89%
            </h2>
            <p className="text-muted-foreground">
              Renewal Rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <h2 className="mt-4 text-3xl font-bold">
              4.2%
            </h2>
            <p className="text-muted-foreground">
              Churn Rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Renewal */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Subscription Revenue
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed">
              Revenue Chart Placeholder
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Upcoming Renewals
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 flex justify-between">
              <span>Today</span>
              <strong>28 Renewals</strong>
            </div>

            <div className="rounded-lg border p-4 flex justify-between">
              <span>This Week</span>
              <strong>146 Renewals</strong>
            </div>

            <div className="rounded-lg border p-4 flex justify-between">
              <span>This Month</span>
              <strong>732 Renewals</strong>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Table */}

      <Card>
        <CardHeader>
          <CardTitle>
            Active Subscriptions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Renewal</th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="border-b"
                  >
                    <td className="py-4">
                      {subscription.id}
                    </td>

                    <td>{subscription.customer}</td>

                    <td>{subscription.plan}</td>

                    <td>{subscription.amount}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          subscription.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : subscription.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {subscription.status}
                      </span>
                    </td>

                    <td>{subscription.renewal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Insights */}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="mt-3 text-2xl font-bold">
              2,481
            </h3>
            <p className="text-muted-foreground">
              Active Plans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="mt-3 text-2xl font-bold">
              732
            </h3>
            <p className="text-muted-foreground">
              Renewals This Month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h3 className="mt-3 text-2xl font-bold">
              104
            </h3>
            <p className="text-muted-foreground">
              Cancelled Plans
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}