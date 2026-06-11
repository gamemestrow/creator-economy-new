'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Plus, Play, Zap } from 'lucide-react'

const triggers = [
  {
    id: 1,
    name: 'User Signup',
    status: 'Active',
    executions: 324,
  },
  {
    id: 2,
    name: 'Course Purchase',
    status: 'Active',
    executions: 156,
  },
  {
    id: 3,
    name: 'Membership Expiry',
    status: 'Draft',
    executions: 0,
  },
]

export default function TriggersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Triggers</h1>
          <p className="text-muted-foreground">
            Manage automation triggers across your platform
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Trigger
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Triggers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{triggers.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Triggers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">480</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trigger Library</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {triggers.map((trigger) => (
              <div
                key={trigger.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Bell className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">{trigger.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {trigger.executions} executions
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Test
                  </Button>

                  <Button variant="outline" size="sm">
                    <Zap className="mr-2 h-4 w-4" />
                    Configure
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