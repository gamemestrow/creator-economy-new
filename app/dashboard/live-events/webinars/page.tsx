'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Video,
  Calendar,
  Users,
  Plus,
  Clock,
  TrendingUp,
  PlayCircle,
  Download,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import CreateWebinerModel from '@/components/creator/CreateWebinerModel'
import { createAnEvent } from '@/lib/firestore/events'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useCreatorEvent } from '@/lib/hooks/use-creator-data'

const webinars = [
  {
    id: 1,
    title: 'Creator Growth Blueprint',
    date: '15 Jun 2026',
    attendees: 1250,
    duration: '90 mins',
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Instagram Monetization Masterclass',
    date: '20 Jun 2026',
    attendees: 840,
    duration: '60 mins',
    status: 'Live',
  },
  {
    id: 3,
    title: 'Community Building Secrets',
    date: '05 Jun 2026',
    attendees: 620,
    duration: '75 mins',
    status: 'Completed',
  },
]

interface UserData {
  name: string
  email: string
}


export default function WebinarsPage() {

  const [isModelOpen, setisModelOpen] = useState(false)

const { loading: authLoading, user, authorized } = useRequireRole(['creator', 'attendee'])
const [userData, setUserData] = useState<UserData | null>(null)
// const { events, loading, error, refresh: fetchEvent } = useCreatorEvent(user?.uid || '')

useEffect(() => {
  if (user && authorized) {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', user.uid)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        const data = userDocSnap.data()
        setUserData({
          name: data.name || user.displayName || 'Creator',
          email: user.email || '',
        })
      }
    }

    fetchUserData()
  }
}, [user, authorized])

// --- guard before rendering the form ---
if (authLoading) {
  return <div>Loading...</div>
}

if (!user || !authorized) {
  return <div>You must be signed in to create an event.</div>
}

  const onSubmit = (data: any) => {
    createAnEvent(data)
    setisModelOpen(false)
  }
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webinars</h1>
          <p className="text-muted-foreground">
            Manage live webinars, registrations and attendee engagement
          </p>
        </div>

        <Button onClick={() => setisModelOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Webinar
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Webinars</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">18.4K</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">81%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹8.2L</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming & Recent Webinars</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Video className="h-8 w-8 text-blue-500" />

                  <div>
                    <h3 className="font-semibold">{webinar.title}</h3>

                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {webinar.date}
                      </span>

                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {webinar.attendees}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {webinar.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="outline">
                  {webinar.status}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Webinar Analytics</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <span>18,400 total registrations</span>
            </div>

            <div className="flex items-center gap-3">
              <PlayCircle className="h-5 w-5 text-green-500" />
              <span>14,900 attendees joined live</span>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <span>32% increase in registrations</span>
            </div>

            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-orange-500" />
              <span>4,200 webinar recording downloads</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Webinar</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">
                Creator Growth Blueprint
              </h3>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Registrations</span>
                  <span>2,450</span>
                </div>

                <div className="flex justify-between">
                  <span>Attendance</span>
                  <span>1,980</span>
                </div>

                <div className="flex justify-between">
                  <span>Conversion Rate</span>
                  <span>38%</span>
                </div>

                <div className="flex justify-between">
                  <span>Revenue</span>
                  <span>₹2.4L</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <CreateWebinerModel creatorId={user?.uid} creatorName={userData?.name} onSubmit={onSubmit} onCancel={() => setisModelOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}