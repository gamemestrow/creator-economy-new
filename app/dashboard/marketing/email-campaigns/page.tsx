'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Mail,
  Plus,
  Send,
  Users,
  Eye,
  MousePointer,
  TrendingUp,
  Calendar,
} from 'lucide-react'

const campaigns = [
  {
    id: 1,
    name: 'Course Launch Campaign',
    audience: 'All Subscribers',
    sent: 5420,
    openRate: '68%',
    clickRate: '22%',
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Membership Promotion',
    audience: 'Premium Leads',
    sent: 2180,
    openRate: '72%',
    clickRate: '28%',
    status: 'Running',
  },
  {
    id: 3,
    name: 'Webinar Registration Drive',
    audience: 'Inactive Users',
    sent: 1450,
    openRate: '55%',
    clickRate: '18%',
    status: 'Draft',
  },
]

export default function EmailCampaignsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Campaigns</h1>
          <p className="text-muted-foreground">
            Create, manage and track email marketing campaigns
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">36</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emails Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">124K</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">65%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">21%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Mail className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">
                      {campaign.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {campaign.audience}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {campaign.sent.toLocaleString()} emails sent
                    </p>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="font-semibold">
                      {campaign.openRate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Open Rate
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="font-semibold">
                      {campaign.clickRate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CTR
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="font-semibold">
                      {campaign.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email Metrics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Send className="h-5 w-5 text-blue-500" />
              <span>124,000 emails delivered</span>
            </div>

            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-green-500" />
              <span>80,600 total opens</span>
            </div>

            <div className="flex items-center gap-3">
              <MousePointer className="h-5 w-5 text-purple-500" />
              <span>26,040 link clicks</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-orange-500" />
              <span>18,500 subscribers reached</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>18% increase in engagement</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span>12 campaigns scheduled this month</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-purple-500" />
              <span>Best campaign open rate: 82%</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-orange-500" />
              <span>Subscriber growth up 14%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
