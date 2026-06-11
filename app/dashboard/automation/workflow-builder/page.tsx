'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Play, Settings, Workflow } from 'lucide-react'

const workflows = [
  {
    id: 1,
    name: 'New User Onboarding',
    status: 'Active',
    triggers: 3,
  },
  {
    id: 2,
    name: 'Course Purchase Flow',
    status: 'Active',
    triggers: 5,
  },
  {
    id: 3,
    name: 'Membership Renewal Reminder',
    status: 'Draft',
    triggers: 2,
  },
]

export default function WorkflowBuilderPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflow Builder</h1>
          <p className="text-muted-foreground">
            Create and manage automation workflows
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Workflow
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{workflows.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">1</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow List</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Workflow className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">{workflow.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {workflow.triggers} automation steps
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Run
                  </Button>

                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
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