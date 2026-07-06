'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  UserPlus,
  Users,
  TrendingUp,
  Mail,
  Phone,
  Search,
} from 'lucide-react'

const leads = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    source: 'Facebook Ads',
    status: 'Hot',
  },
  {
    id: 2,
    name: 'Priya Verma',
    email: 'priya@example.com',
    source: 'Instagram',
    status: 'Warm',
  },
  {
    id: 3,
    name: 'Aman Gupta',
    email: 'aman@example.com',
    source: 'Website',
    status: 'Cold',
  },
]

export default function LeadsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track potential customers
          </p>
        </div>

        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,284</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hot Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-500">128</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">324</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">25%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Pipeline</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />

                  <div>
                    <h3 className="font-semibold">{lead.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {lead.email}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Source: {lead.source}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>

                  <Button variant="outline" size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>

                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Sources</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Facebook Ads</span>
              <span className="font-semibold">542 Leads</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Instagram</span>
              <span className="font-semibold">384 Leads</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Google Search</span>
              <span className="font-semibold">214 Leads</span>
            </div>

            <div className="flex justify-between">
              <span>Website Organic</span>
              <span className="font-semibold">144 Leads</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
