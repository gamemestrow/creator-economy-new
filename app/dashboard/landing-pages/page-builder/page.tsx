'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Layout,
  Plus,
  Eye,
  Globe,
  Edit,
  Copy,
  Trash2,
  TrendingUp,
} from 'lucide-react'

const pages = [
  {
    id: 1,
    name: 'Home Page',
    url: '/',
    visitors: '12.4K',
    status: 'Published',
  },
  {
    id: 2,
    name: 'Course Landing Page',
    url: '/course-growth',
    visitors: '8.2K',
    status: 'Published',
  },
  {
    id: 3,
    name: 'Webinar Registration',
    url: '/webinar-registration',
    visitors: '3.1K',
    status: 'Draft',
  },
  {
    id: 4,
    name: 'Membership Sales Page',
    url: '/membership',
    visitors: '5.7K',
    status: 'Published',
  },
]

export default function PageBuilderPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Page Builder</h1>
          <p className="text-muted-foreground">
            Create landing pages, sales pages and funnels
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Page
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">58K</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2.4K</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pages Library</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Layout className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">
                      {page.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {page.url}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {page.visitors} visitors
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button size="sm" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>

                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
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
            <CardTitle>Templates</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="border rounded-lg p-3">
              Landing Page Template
            </div>

            <div className="border rounded-lg p-3">
              Webinar Registration Template
            </div>

            <div className="border rounded-lg p-3">
              Sales Funnel Template
            </div>

            <div className="border rounded-lg p-3">
              Membership Page Template
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-500" />
              <span>58,000 page visits</span>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>22% conversion increase</span>
            </div>

            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-purple-500" />
              <span>Top page: Course Landing Page</span>
            </div>

            <div className="flex items-center gap-3">
              <Layout className="h-5 w-5 text-orange-500" />
              <span>24 pages currently active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
