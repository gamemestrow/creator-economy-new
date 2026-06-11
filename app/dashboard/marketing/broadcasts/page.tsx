
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Send,
  Plus,
  Users,
  Mail,
  MessageSquare,
  TrendingUp,
  Eye,
} from 'lucide-react'

const broadcasts = [
  {
    id: 1,
    title: 'Course Launch Announcement',
    audience: 'All Members',
    sent: 5240,
    openRate: '68%',
    status: 'Sent',
  },
  {
    id: 2,
    title: 'Weekend Webinar Reminder',
    audience: 'Premium Members',
    sent: 1280,
    openRate: '74%',
    status: 'Scheduled',
  },
  {
    id: 3,
    title: 'Community Challenge Update',
    audience: 'Active Users',
    sent: 3420,
    openRate: '59%',
    status: 'Draft',
  },
]

export default function BroadcastsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Broadcasts</h1>
          <p className="text-muted-foreground">
            Send announcements and updates to your audience
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Broadcast
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Broadcasts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">125K</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">67%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">18%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Broadcasts</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {broadcasts.map((broadcast) => (
              <div
                key={broadcast.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Send className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">
                      {broadcast.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Audience: {broadcast.audience}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Sent to {broadcast.sent.toLocaleString()} users
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {broadcast.openRate}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Open Rate
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
            <CardTitle>Audience Channels</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>Email</span>
              </div>
              <span className="font-semibold">8,420 Users</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                <span>WhatsApp</span>
              </div>
              <span className="font-semibold">5,380 Users</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span>Push Notifications</span>
              </div>
              <span className="font-semibold">3,210 Users</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Broadcast Performance</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>24% increase in engagement</span>
            </div>

            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-blue-500" />
              <span>84,000 message opens this month</span>
            </div>

            <div className="flex items-center gap-3">
              <Send className="h-5 w-5 text-purple-500" />
              <span>42 broadcasts sent this month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
