'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  UserPlus,
  UserCheck,
  TrendingUp,
  Activity,
  Download,
} from 'lucide-react'

export default function UserAnalyticsPage() {
  const users = [
    {
      segment: 'New Users',
      count: 1250,
      growth: '+18%',
    },
    {
      segment: 'Active Users',
      count: 8420,
      growth: '+12%',
    },
    {
      segment: 'Premium Members',
      count: 1860,
      growth: '+9%',
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Analytics</h1>
          <p className="text-muted-foreground">
            Understand your audience growth and behavior
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Analytics
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-3xl font-bold">12,450</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              <span className="text-3xl font-bold">1,250</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              <span className="text-3xl font-bold">8,420</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-3xl font-bold">74%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Segments</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">{user.segment}</h3>
                    <p className="text-sm text-muted-foreground">
                      Audience category
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">{user.count}</p>
                  <p className="text-sm text-green-600">{user.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Activity Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Course Enrollments</span>
              <span className="font-semibold">4,862</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Membership Purchases</span>
              <span className="font-semibold">1,734</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Community Engagements</span>
              <span className="font-semibold">9,214</span>
            </div>

            <div className="flex justify-between">
              <span>Live Event Participants</span>
              <span className="font-semibold">1,128</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}