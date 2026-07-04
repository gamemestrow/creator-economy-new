'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Star,
  Trophy,
  TrendingUp,
  Users,
  Award,
  Plus,
  Zap,
} from 'lucide-react'

const xpLevels = [
  {
    level: 'Beginner',
    xpRequired: '0 XP',
    users: 542,
  },
  {
    level: 'Intermediate',
    xpRequired: '1,000 XP',
    users: 1284,
  },
  {
    level: 'Advanced',
    xpRequired: '5,000 XP',
    users: 624,
  },
  {
    level: 'Expert',
    xpRequired: '10,000 XP',
    users: 148,
  },
]

export default function XPSystemPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">XP System</h1>
          <p className="text-muted-foreground">
            Reward users for activity, learning, and engagement
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create XP Rule
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total XP Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2.4M</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">2,598</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average XP</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4,280</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Level Ups Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">84</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>XP Rules</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-3">
              <span>Complete Course</span>
              <span className="font-semibold">+500 XP</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Attend Live Event</span>
              <span className="font-semibold">+250 XP</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Create Community Post</span>
              <span className="font-semibold">+50 XP</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Daily Login</span>
              <span className="font-semibold">+10 XP</span>
            </div>

            <div className="flex justify-between">
              <span>Refer a Friend</span>
              <span className="font-semibold">+1000 XP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Level Distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {xpLevels.map((level, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Trophy className="h-8 w-8 text-yellow-500" />

                  <div>
                    <h3 className="font-semibold">{level.level}</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlocks at {level.xpRequired}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {level.users.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Users
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
            <CardTitle>Top XP Earners</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Priya Sharma</span>
              <span>18,450 XP</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Rahul Verma</span>
              <span>16,890 XP</span>
            </div>

            <div className="flex justify-between">
              <span>Ankit Singh</span>
              <span>15,720 XP</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>XP Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span>2,598 active users earning XP</span>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>31% increase in engagement</span>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>1,240 achievements unlocked</span>
            </div>

            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary" />
              <span>84 users leveled up today</span>
            </div>

            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-orange-500" />
              <span>2.4 million XP awarded overall</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}