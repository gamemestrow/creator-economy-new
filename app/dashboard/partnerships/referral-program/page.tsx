'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Gift,
  Share2,
  TrendingUp,
  DollarSign,
  Copy,
  Award,
  UserPlus,
} from 'lucide-react'

const referrals = [
  {
    id: 1,
    name: 'Rahul Sharma',
    referrals: 24,
    rewards: '₹4,800',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Priya Singh',
    referrals: 18,
    rewards: '₹3,600',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Aman Verma',
    referrals: 12,
    rewards: '₹2,400',
    status: 'Pending',
  },
]

export default function ReferralProgramPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Referral Program
          </h1>
          <p className="text-muted-foreground">
            Grow your community through referrals and rewards
          </p>
        </div>

        <Button>
          <Share2 className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
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
            <CardTitle>Reward Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹2.8L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">96</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              21%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Referral Link</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              readOnly
              value="https://creator-economy.com/ref/creator123"
              className="flex-1 rounded-md border p-2"
            />

            <Button>
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Referrers</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {referral.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {referral.referrals} successful referrals
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {referral.rewards}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {referral.status}
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
            <CardTitle>Program Statistics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span>1,284 referred users joined</span>
            </div>

            <div className="flex items-center gap-3">
              <Gift className="h-5 w-5 text-green-500" />
              <span>₹2.8L rewards distributed</span>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <span>₹12.6L generated through referrals</span>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-orange-500" />
              <span>96 active promoters</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>42% referral growth this month</span>
            </div>

            <div className="flex items-center gap-3">
              <UserPlus className="h-5 w-5 text-primary" />
              <span>280 new members acquired</span>
            </div>

            <div className="flex items-center gap-3">
              <Share2 className="h-5 w-5 text-primary" />
              <span>3,800 referral link clicks</span>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-orange-500" />
              <span>Top promoter earned ₹4,800</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}