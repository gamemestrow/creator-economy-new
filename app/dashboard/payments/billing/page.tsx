'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CreditCard,
  DollarSign,
  Receipt,
  Calendar,
  Download,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

export default function BillingPage() {
  const invoices = [
    {
      id: 'INV-1001',
      date: '12 Jun 2026',
      amount: '₹99',
      status: 'Paid',
    },
    {
      id: 'INV-1002',
      date: '12 May 2026',
      amount: '₹99',
      status: 'Paid',
    },
    {
      id: 'INV-1003',
      date: '12 Apr 2026',
      amount: '₹99',
      status: 'Paid',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground">
            Manage subscriptions, invoices, payment methods and billing history.
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Reports
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Current Plan
                </p>
                <h2 className="text-2xl font-bold">Growth</h2>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Monthly Cost
                </p>
                <h2 className="text-2xl font-bold">₹99</h2>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Invoices
                </p>
                <h2 className="text-2xl font-bold">24</h2>
              </div>
              <Receipt className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Next Billing
                </p>
                <h2 className="text-2xl font-bold">12 Jul</h2>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    Growth Plan
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced creator tools & automation
                  </p>
                </div>

                <div className="text-right">
                  <h3 className="text-2xl font-bold">
                    ₹99/mo
                  </h3>
                  <p className="text-green-600 text-sm">
                    Active Subscription
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Unlimited Courses
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Communities
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Automation Workflows
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Analytics Suite
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button>
                  Upgrade Plan
                </Button>

                <Button variant="outline">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="font-medium">
                Visa ending in 4242
              </p>
              <p className="text-sm text-muted-foreground">
                Expires 08/2028
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="font-medium">
                PayPal Account
              </p>
              <p className="text-sm text-muted-foreground">
                Connected
              </p>
            </div>

            <Button className="w-full">
              Update Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Invoice</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4">{invoice.id}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.amount}</td>
                    <td>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <Button size="sm" variant="ghost">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-600" />
              <div>
                <p className="font-medium">
                  Next invoice scheduled
                </p>
                <p className="text-sm text-muted-foreground">
                  Your next billing cycle starts on July 12, 2026.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
