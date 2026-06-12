'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Plus,
  MessageSquare,
  UserPlus,
  TrendingUp,
  Crown,
  Activity,
  Globe,
} from 'lucide-react'

const communities = [
  {
    id: 1,
    name: 'Creator Growth Club',
    members: 4250,
    posts: 1280,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Instagram Mastermind',
    members: 1840,
    posts: 640,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Premium Coaching Community',
    members: 780,
    posts: 320,
    status: 'Private',
  },
]

export default function CommunitiesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Communities
          </h1>

          <p className="text-muted-foreground">
            Manage member communities, engagement and discussions
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Community
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Communities</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Members</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">8,420</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posts This Month</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">2,180</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Rate</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              78%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community List</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {communities.map((community) => (
              <div
                key={community.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">
                      {community.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {community.members.toLocaleString()} Members
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {community.posts} Posts
                    </p>
                  </div>
                </div>

                <Button variant="outline">
                  {community.status}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Community Analytics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <span>8,420 active members</span>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <span>2,180 posts this month</span>
            </div>

            <div className="flex items-center gap-3">
              <UserPlus className="h-5 w-5 text-purple-500" />
              <span>840 new members joined</span>
            </div>

            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-orange-500" />
              <span>78% engagement rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>32% growth this month</span>
            </div>

            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span>Top Community: Creator Growth Club</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-500" />
              <span>Members from 24 countries</span>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              <span>12,400 total discussions</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
