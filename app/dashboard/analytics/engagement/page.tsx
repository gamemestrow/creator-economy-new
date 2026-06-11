'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Heart,
  MessageSquare,
  Eye,
  TrendingUp,
  Download,
} from 'lucide-react'

export default function EngagementAnalyticsPage() {
  const contentPerformance = [
    {
      title: 'Creator Growth Masterclass',
      views: '15.2K',
      engagement: '82%',
    },
    {
      title: 'Instagram Monetization Guide',
      views: '12.8K',
      engagement: '76%',
    },
    {
      title: 'Community Building Workshop',
      views: '9.4K',
      engagement: '71%',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Engagement Analytics</h1>
          <p className="text-muted-foreground">
            Measure audience interaction and content performance
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-2xl font-bold">12,450</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span className="text-2xl font-bold">58K</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="text-2xl font-bold">19.2K</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span className="text-2xl font-bold">5.1K</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-2xl font-bold">78%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {contentPerformance.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.views} Views
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">{item.engagement}</p>
                  <p className="text-sm text-muted-foreground">
                    Engagement Rate
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audience Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Course Completions</span>
              <span className="font-semibold">2,145</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Community Posts</span>
              <span className="font-semibold">4,782</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Live Event Attendance</span>
              <span className="font-semibold">1,028</span>
            </div>

            <div className="flex justify-between">
              <span>Membership Renewals</span>
              <span className="font-semibold">734</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}