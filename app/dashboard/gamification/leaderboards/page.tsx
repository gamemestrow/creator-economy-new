'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Crown, Medal, Users, TrendingUp, Download } from 'lucide-react'

const leaderboard = [
  {
    rank: 1,
    name: 'Priya Sharma',
    points: 12450,
    badge: 'Gold',
  },
  {
    rank: 2,
    name: 'Rahul Verma',
    points: 11280,
    badge: 'Silver',
  },
  {
    rank: 3,
    name: 'Ankit Singh',
    points: 10450,
    badge: 'Bronze',
  },
  {
    rank: 4,
    name: 'Neha Gupta',
    points: 9850,
    badge: 'Top Contributor',
  },
  {
    rank: 5,
    name: 'Aman Kumar',
    points: 9210,
    badge: 'Rising Star',
  },
]

export default function LeaderboardsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leaderboards</h1>
          <p className="text-muted-foreground">
            Track top-performing members and community champions
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Rankings
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5,240</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Competitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">3,184</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Challenges Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12,450</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">89%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  {user.rank === 1 ? (
                    <Crown className="h-10 w-10 text-yellow-500" />
                  ) : (
                    <Trophy className="h-10 w-10 text-amber-500" />
                  )}

                  <div>
                    <h3 className="font-semibold">
                      #{user.rank} {user.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {user.badge}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    {user.points.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard Statistics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Weekly Winners</span>
              <span className="font-semibold">52</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Monthly Champions</span>
              <span className="font-semibold">12</span>
            </div>

            <div className="flex justify-between">
              <span>Hall of Fame Members</span>
              <span className="font-semibold">38</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>3,184 active competitors this month</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>22% growth in participation</span>
            </div>

            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5" />
              <span>1,240 badges awarded this month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}