'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DollarSign,
  Users,
  TrendingUp,
  Wallet,
  Percent,
  Gift,
  ArrowUpRight,
} from 'lucide-react'

const affiliates = [
  {
    id: 1,
    name: 'Rahul Sharma',
    referrals: 124,
    commission: '₹45,600',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Priya Singh',
    referrals: 87,
    commission: '₹28,400',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Aman Verma',
    referrals: 42,
    commission: '₹12,900',
    status: 'Pending',
  },
]

export default function CommissionTrackingPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Commission Tracking
          </h1>
          <p className="text-muted-foreground">
            Track affiliate earnings, referrals and payouts
          </p>
        </div>

        <Button>
          Generate Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹8.4L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,284</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Affiliate Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">96</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-500">
              ₹72K
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Affiliates</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {affiliates.map((affiliate) => (
              <div
                key={affiliate.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {affiliate.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {affiliate.referrals} referrals
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {affiliate.commission}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {affiliate.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Commission Overview</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span>₹8.4L total commissions generated</span>
            </div>

            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-blue-500" />
              <span>₹72K awaiting payout</span>
            </div>

            <div className="flex items-center gap-3">
              <Percent className="h-5 w-5 text-purple-500" />
              <span>Average commission rate 20%</span>
            </div>

            <div className="flex items-center gap-3">
              <Gift className="h-5 w-5 text-orange-500" />
              <span>96 active affiliate partners</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>34% commission growth this month</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <span>1,284 successful referrals</span>
            </div>

            <div className="flex items-center gap-3">
              <ArrowUpRight className="h-5 w-5 text-purple-500" />
              <span>Top affiliate generated ₹45,600</span>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <span>₹2.1L paid this month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}