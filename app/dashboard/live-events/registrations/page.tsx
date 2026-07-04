'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Users,
  Ticket,
  Video,
  Plus,
  Clock,
  MapPin,
} from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Creator Growth Masterclass',
    date: '25 June 2026',
    attendees: 1240,
    type: 'Online',
  },
  {
    id: 2,
    title: 'Instagram Monetization Workshop',
    date: '30 June 2026',
    attendees: 820,
    type: 'Online',
  },
  {
    id: 3,
    title: 'Community Building Summit',
    date: '5 July 2026',
    attendees: 450,
    type: 'Hybrid',
  },
]

export default function LiveEventRegistrationPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Live Event Registration
          </h1>
          <p className="text-muted-foreground">
            Manage event registrations and attendees
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8,420</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              82%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹4.8L</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <Video className="h-8 w-8 text-primary" />

                  <div>
                    <h3 className="font-semibold">
                      {event.title}
                    </h3>

                    <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </span>

                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="outline">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Registration Statistics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Total Tickets Sold</span>
              <span className="font-semibold">6,840</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Free Registrations</span>
              <span className="font-semibold">1,580</span>
            </div>

            <div className="flex justify-between">
              <span>Average Event Size</span>
              <span className="font-semibold">350</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span>Average watch time: 78 mins</span>
            </div>

            <div className="flex items-center gap-3">
              <Ticket className="h-5 w-5 text-green-500" />
              <span>82% attendance rate</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Users from 18 countries</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-orange-500" />
              <span>1,240 active event members</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}