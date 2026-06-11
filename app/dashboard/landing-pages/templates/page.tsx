'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LayoutTemplate,
  Plus,
  Eye,
  Copy,
  Star,
  TrendingUp,
  Globe,
  Users,
} from 'lucide-react'

const templates = [
  {
    id: 1,
    name: 'Course Sales Page',
    category: 'Sales',
    usage: '1,240',
    status: 'Popular',
  },
  {
    id: 2,
    name: 'Webinar Registration',
    category: 'Events',
    usage: '980',
    status: 'Trending',
  },
  {
    id: 3,
    name: 'Membership Landing Page',
    category: 'Membership',
    usage: '760',
    status: 'Popular',
  },
  {
    id: 4,
    name: 'Lead Magnet Funnel',
    category: 'Marketing',
    usage: '540',
    status: 'New',
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Templates Library
          </h1>

          <p className="text-muted-foreground">
            Ready-to-use templates for courses, funnels,
            webinars and memberships
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Templates</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">48</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Templates</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Uses</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">18K</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              24%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Marketplace</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="rounded-xl border p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">
                    {template.name}
                  </h3>

                  <span className="text-xs rounded-full bg-blue-100 px-3 py-1">
                    {template.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Category: {template.category}
                </p>

                <p className="text-sm text-muted-foreground">
                  Used {template.usage} times
                </p>

                <div className="mt-4 flex gap-2">
                  <Button size="sm">
                    Use Template
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
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
            <CardTitle>
              Recently Used Templates
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border rounded-lg p-3">
              <span>Course Launch Funnel</span>
              <Button size="sm">Edit</Button>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <span>Creator Webinar Page</span>
              <Button size="sm">Edit</Button>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <span>Membership Sales Page</span>
              <Button size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Template Analytics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <LayoutTemplate className="h-5 w-5 text-blue-500" />
              <span>48 templates available</span>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>24% average conversion rate</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-purple-500" />
              <span>18,000 template deployments</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-orange-500" />
              <span>Top template: Course Sales Page</span>
            </div>

            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>12 featured templates</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}