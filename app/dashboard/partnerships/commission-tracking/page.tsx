'use client'

import {
  IndianRupee,
  Users,
  TrendingUp,
  Wallet,
  Download,
  CheckCircle,
  Clock,
  Percent,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import DownloadCsvButton from '@/components/downloadCSVbutton'

export default function CommissionTrackingPage() {
  const commissions = [
    {
      id: 'COM-1001',
      partner: 'Rahul Sharma',
      product: 'React Mastery Course',
      saleAmount: '₹4,999',
      commission: '₹1,000',
      rate: '20%',
      status: 'Paid',
    },
    {
      id: 'COM-1002',
      partner: 'Priya Singh',
      product: 'Creator Membership',
      saleAmount: '₹999',
      commission: '₹200',
      rate: '20%',
      status: 'Pending',
    },
    {
      id: 'COM-1003',
      partner: 'Aman Verma',
      product: 'Growth Bundle',
      saleAmount: '₹7,499',
      commission: '₹1,500',
      rate: '20%',
      status: 'Paid',
    },
    {
      id: 'COM-1004',
      partner: 'Neha Gupta',
      product: 'Community Access',
      saleAmount: '₹1,999',
      commission: '₹400',
      rate: '20%',
      status: 'Pending',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Commission Tracking
          </h1>
          <p className="text-muted-foreground">
            Monitor affiliate earnings, commissions and payouts.
          </p>
        </div>

        <DownloadCsvButton data={commissions} fileName='commissions' />
      </div>

      {/* KPI Cards */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <IndianRupee className="h-5 w-5 text-green-600" />
            <h2 className="mt-4 text-3xl font-bold">
              ₹8.4L
            </h2>
            <p className="text-muted-foreground">
              Total Commissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-3xl font-bold">
              342
            </h2>
            <p className="text-muted-foreground">
              Active Partners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Wallet className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-3xl font-bold">
              ₹92K
            </h2>
            <p className="text-muted-foreground">
              Pending Commissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <h2 className="mt-4 text-3xl font-bold">
              ₹42L
            </h2>
            <p className="text-muted-foreground">
              Revenue Generated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Commission Performance
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed">
              Commission Analytics Chart
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Commission Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 flex justify-between">
              <span>This Month</span>
              <strong>₹1.8L</strong>
            </div>

            <div className="rounded-lg border p-4 flex justify-between">
              <span>Paid Out</span>
              <strong>₹7.5L</strong>
            </div>

            <div className="rounded-lg border p-4 flex justify-between">
              <span>Pending</span>
              <strong>₹92K</strong>
            </div>

            <div className="rounded-lg border p-4 flex justify-between">
              <span>Avg Commission</span>
              <strong>₹2,450</strong>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Table */}

      <Card>
        <CardHeader>
          <CardTitle>
            Partner Commissions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Partner</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Sale</th>
                  <th className="pb-3">Rate</th>
                  <th className="pb-3">Commission</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {commissions.map((commission) => (
                  <tr
                    key={commission.id}
                    className="border-b"
                  >
                    <td className="py-4">
                      {commission.id}
                    </td>

                    <td>{commission.partner}</td>

                    <td>{commission.product}</td>

                    <td>{commission.saleAmount}</td>

                    <td>{commission.rate}</td>

                    <td>{commission.commission}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          commission.status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {commission.status}
                      </span>
                    </td>
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
            <Percent className="h-5 w-5 text-primary" />
            <h3 className="mt-3 text-2xl font-bold">
              20%
            </h3>
            <p className="text-muted-foreground">
              Average Commission Rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="mt-3 text-2xl font-bold">
              ₹7.5L
            </h3>
            <p className="text-muted-foreground">
              Paid Commissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Clock className="h-5 w-5 text-orange-500" />
            <h3 className="mt-3 text-2xl font-bold">
              ₹92K
            </h3>
            <p className="text-muted-foreground">
              Awaiting Settlement
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
