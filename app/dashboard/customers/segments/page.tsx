'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  UserPlus,
  Target,
  TrendingUp,
  Filter,
  Plus,
} from 'lucide-react'

const segments = [
  {
    id: 1,
    name: 'Premium Members',
    users: 1245,
    growth: '+12%',
  },
  {
    id: 2,
    name: 'Course Buyers',
    users: 3482,
    growth: '+18%',
  },
  {
    id: 3,
    name: 'Inactive Users',
    users: 856,
    growth: '-5%',
  },
  {
    id: 4,
    name: 'High Value Customers',
    users: 324,
    growth: '+24%',
  },
]

export default function SegmentsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audience Segments</h1>
          <p className="text-muted-foreground">
            Organize and target users based on behavior and activity
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Segment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">15,842</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">10,428</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">16%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Segment Library</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {segments.map((segment) => (
              <div
                key={segment.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />

                  <div>
                    <h3 className="font-semibold">{segment.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {segment.users.toLocaleString()} users
                    </p>

                    <p
                      className={`text-xs mt-1 ${
                        segment.growth.startsWith('+')
                          ? 'text-green-600'
                          : 'text-red-500'
                      }`}
                    >
                      {segment.growth} this month
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Target className="mr-2 h-4 w-4" />
                    Target
                  </Button>

                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <Button variant="outline" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Users
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segment Performance</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Premium Members Conversion Rate</span>
              <span className="font-semibold">34%</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Course Buyers Engagement</span>
              <span className="font-semibold">82%</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Inactive User Reactivation</span>
              <span className="font-semibold">18%</span>
            </div>

            <div className="flex justify-between">
              <span>High Value Customer Retention</span>
              <span className="font-semibold">91%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audience Insights</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <p>
              Premium members generated 62% of total revenue this month.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}