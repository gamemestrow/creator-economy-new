'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Plus, Play, Users, BarChart3 } from 'lucide-react'

const sequences = [
  {
    id: 1,
    name: 'Creator Welcome Series',
    emails: 5,
    subscribers: 1250,
    openRate: '62%',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Course Launch Campaign',
    emails: 8,
    subscribers: 890,
    openRate: '58%',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Membership Upsell',
    emails: 4,
    subscribers: 450,
    openRate: '47%',
    status: 'Draft',
  },
]

export default function EmailSequencesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Sequences</h1>
          <p className="text-muted-foreground">
            Automate onboarding, launches and customer engagement
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Sequence
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Sequences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2,590</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emails Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">18,420</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">56%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sequence Library</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {sequences.map((sequence) => (
              <div
                key={sequence.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Mail className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">{sequence.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {sequence.emails} emails • {sequence.subscribers} subscribers
                    </p>

                    <p className="text-xs text-green-600 mt-1">
                      Open Rate: {sequence.openRate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Launch
                  </Button>

                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Audience
                  </Button>

                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}