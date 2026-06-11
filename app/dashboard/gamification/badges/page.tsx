'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Plus, Star, Trophy, Users } from 'lucide-react'

const badges = [
  {
    id: 1,
    name: 'Top Creator',
    earned: 145,
    rarity: 'Legendary',
  },
  {
    id: 2,
    name: 'Course Master',
    earned: 342,
    rarity: 'Epic',
  },
  {
    id: 3,
    name: 'Community Champion',
    earned: 528,
    rarity: 'Rare',
  },
]

export default function BadgesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Badges</h1>
          <p className="text-muted-foreground">
            Reward users with achievements and milestones
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Badge
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Earned Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">86</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,284</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">78%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Badge Library</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Award className="h-10 w-10 text-yellow-500" />

                  <div>
                    <h3 className="font-semibold">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Earned by {badge.earned} users
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Star className="mr-2 h-4 w-4" />
                    View
                  </Button>

                  <Button variant="outline" size="sm">
                    <Trophy className="mr-2 h-4 w-4" />
                    Award
                  </Button>

                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Members
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Badge Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Top Creator Badge Awarded</span>
              <span>12 users</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Course Master Badge Earned</span>
              <span>28 users</span>
            </div>

            <div className="flex justify-between">
              <span>Community Champion Badge Earned</span>
              <span>41 users</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}