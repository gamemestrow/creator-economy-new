'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Plus, Play, Users } from 'lucide-react'

const flows = [
  {
    id: 1,
    name: 'Welcome Sequence',
    status: 'Active',
    messages: 5,
    users: 120,
  },
  {
    id: 2,
    name: 'Course Purchase Follow-up',
    status: 'Active',
    messages: 8,
    users: 85,
  },
  {
    id: 3,
    name: 'Abandoned Checkout Recovery',
    status: 'Draft',
    messages: 4,
    users: 0,
  },
]

export default function WhatsAppFlowsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">WhatsApp Flows</h1>
          <p className="text-muted-foreground">
            Manage WhatsApp automation journeys
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Flow
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Flows</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{flows.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Flows</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">205</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flow Library</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {flows.map((flow) => (
              <div
                key={flow.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <MessageCircle className="h-8 w-8 text-green-500" />

                  <div>
                    <h3 className="font-semibold">{flow.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {flow.messages} messages • {flow.users} users
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}