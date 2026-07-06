'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Plus,
  Users,
  ClipboardList,
  TrendingUp,
  Eye,
  Send,
  CheckCircle,
} from 'lucide-react'

const forms = [
  {
    id: 1,
    name: 'Webinar Registration Form',
    submissions: 1240,
    conversion: '42%',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Course Enrollment Form',
    submissions: 820,
    conversion: '35%',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Contact Us Form',
    submissions: 340,
    conversion: '18%',
    status: 'Draft',
  },
]

export default function FormsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forms</h1>
          <p className="text-muted-foreground">
            Create forms, capture leads and track submissions
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12,480</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">38%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4,920</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Forms</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {forms.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-primary" />

                  <div>
                    <h3 className="font-semibold">{form.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {form.submissions.toLocaleString()} submissions
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Conversion Rate: {form.conversion}
                    </p>
                  </div>
                </div>

                <Button variant="outline">
                  {form.status}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Form Analytics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span>4,920 leads captured</span>
            </div>

            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-green-500" />
              <span>12,480 total submissions</span>
            </div>

            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-primary" />
              <span>32,000 form views</span>
            </div>

            <div className="flex items-center gap-3">
              <Send className="h-5 w-5 text-orange-500" />
              <span>38% submission rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>24% growth in lead generation</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Top form converts at 42%</span>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <span>18 active forms running</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-orange-500" />
              <span>4,920 new prospects added</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}