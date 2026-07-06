'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Funnel,
  Plus,
  Users,
  Eye,
  MousePointer,
  ShoppingCart,
  TrendingUp,
  DollarSign,
} from 'lucide-react'

const funnels = [
  {
    id: 1,
    name: 'Course Sales Funnel',
    visitors: '12,450',
    conversions: '428',
    revenue: '₹3.2L',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Webinar Funnel',
    visitors: '8,240',
    conversions: '310',
    revenue: '₹1.8L',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Membership Funnel',
    visitors: '4,120',
    conversions: '142',
    revenue: '₹95K',
    status: 'Draft',
  },
]

export default function FunnelsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funnels</h1>
          <p className="text-muted-foreground">
            Build and optimize your sales funnels
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Funnel
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Funnels</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">84K</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">3,240</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹12.4L</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Funnels</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {funnels.map((funnel) => (
              <div
                key={funnel.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Funnel className="h-8 w-8 text-primary" />

                  <div>
                    <h3 className="font-semibold">
                      {funnel.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {funnel.visitors} visitors
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Revenue: {funnel.revenue}
                    </p>
                  </div>
                </div>

                <Button variant="outline">
                  {funnel.status}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funnel Performance</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4 text-center">
              <Eye className="mx-auto mb-2 h-6 w-6" />
              <p className="text-sm text-muted-foreground">Visitors</p>
              <p className="text-2xl font-bold">84K</p>
            </div>

            <div className="rounded-lg border p-4 text-center">
              <MousePointer className="mx-auto mb-2 h-6 w-6" />
              <p className="text-sm text-muted-foreground">Clicks</p>
              <p className="text-2xl font-bold">28K</p>
            </div>

            <div className="rounded-lg border p-4 text-center">
              <ShoppingCart className="mx-auto mb-2 h-6 w-6" />
              <p className="text-sm text-muted-foreground">Purchases</p>
              <p className="text-2xl font-bold">3,240</p>
            </div>

            <div className="rounded-lg border p-4 text-center">
              <DollarSign className="mx-auto mb-2 h-6 w-6" />
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold">₹12.4L</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Landing Page Conversion</span>
              <span className="font-semibold">34%</span>
            </div>

            <div className="flex justify-between">
              <span>Checkout Conversion</span>
              <span className="font-semibold">21%</span>
            </div>

            <div className="flex justify-between">
              <span>Upsell Acceptance</span>
              <span className="font-semibold">17%</span>
            </div>

            <div className="flex justify-between">
              <span>Overall Conversion</span>
              <span className="font-semibold">8.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>28% increase in conversions</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span>84,000 funnel visitors</span>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <span>₹12.4L generated this month</span>
            </div>

            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-orange-500" />
              <span>3,240 successful purchases</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}