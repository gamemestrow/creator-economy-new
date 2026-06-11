'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Plus, Users, Calendar, Target, Play } from 'lucide-react'

const challenges = [
  {
    id: 1,
    name: '30-Day Content Challenge',
    participants: 1245,
    progress: '78%',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Course Completion Sprint',
    participants: 856,
    progress: '65%',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Community Growth Challenge',
    participants: 432,
    progress: '22%',
    status: 'Draft',
  },
]

export default function ChallengesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Challenges</h1>
          <p className="text-muted-foreground">
            Boost engagement with gamified community challenges
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Challenge
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2,533</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">71%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Challenge Library</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Trophy className="h-10 w-10 text-yellow-500" />

                  <div>
                    <h3 className="font-semibold">{challenge.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {challenge.participants} participants
                    </p>

                    <p className="text-xs text-green-600 mt-1">
                      Progress: {challenge.progress}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Manage
                  </Button>

                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Members
                  </Button>

                  <Button variant="outline" size="sm">
                    <Target className="mr-2 h-4 w-4" />
                    Results
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Challenges</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span>Creator Growth Marathon</span>
              <Calendar className="h-4 w-4" />
            </div>

            <div className="flex items-center justify-between border-b pb-2">
              <span>Membership Retention Challenge</span>
              <Calendar className="h-4 w-4" />
            </div>

            <div className="flex items-center justify-between">
              <span>100-Day Consistency Challenge</span>
              <Calendar className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Priya Sharma</span>
              <span>1,240 pts</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Rahul Verma</span>
              <span>1,110 pts</span>
            </div>

            <div className="flex justify-between">
              <span>Ankit Singh</span>
              <span>980 pts</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}