'use client'

import { Plus, Calendar, Users, Clock, MapPin, MoreHorizontal } from 'lucide-react'

const mockEvents = [
  {
    id: 1,
    title: 'Web Development Workshop',
    date: '2024-06-15',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual',
    attendees: 240,
    capacity: 500,
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'AI Trends 2024 Webinar',
    date: '2024-06-20',
    time: '3:00 PM - 4:30 PM',
    location: 'Virtual',
    attendees: 890,
    capacity: 1000,
    status: 'Upcoming',
  },
  {
    id: 3,
    title: 'Marketing Bootcamp',
    date: '2024-05-30',
    time: '10:00 AM - 6:00 PM',
    location: 'San Francisco, CA',
    attendees: 125,
    capacity: 150,
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Startup Networking Event',
    date: '2024-06-25',
    time: '6:00 PM - 8:00 PM',
    location: 'New York, NY',
    attendees: 320,
    capacity: 400,
    status: 'Upcoming',
  },
]

function EventCard({ event }: { event: any }) {
  const occupancy = ((event.attendees / event.capacity) * 100).toFixed(0)
  
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex-1">{event.title}</h3>
        <button className="p-2 hover:bg-input rounded transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="py-4 border-y border-border mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{event.attendees} / {event.capacity} Attendees</span>
          </div>
          <span className="text-sm font-semibold text-primary">{occupancy}%</span>
        </div>
        <div className="w-full bg-input rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all"
            style={{ width: `${occupancy}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            event.status === 'Upcoming'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {event.status}
        </span>
        <button className="text-primary text-sm font-medium hover:underline">
          Manage →
        </button>
      </div>
    </div>
  )
}

export default function EventsPage() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Live Events</h1>
            <p className="text-muted-foreground mt-2">Manage webinars, workshops, and live sessions</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Events</p>
            <p className="text-3xl font-bold text-foreground">{mockEvents.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Attendees</p>
            <p className="text-3xl font-bold text-foreground">{mockEvents.reduce((sum, e) => sum + e.attendees, 0).toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Upcoming</p>
            <p className="text-3xl font-bold text-foreground">{mockEvents.filter(e => e.status === 'Upcoming').length}</p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}
