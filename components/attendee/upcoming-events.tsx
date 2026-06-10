'use client'

import { useState } from 'react'
import {
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  MessageSquare,
  Users,
} from 'lucide-react'
import { Event } from '@/lib/firestore'
import { useUpcomingEvents } from '@/lib/hooks/use-attendee-data'
import { useRegisterForEvent, useCancelEventRegistration } from '@/lib/hooks/use-attendee-mutations'
import { isUserRegisteredForEvent } from '@/lib/firestore/events'
import { useEffect } from 'react'

interface UpcomingEventsProps {
  userId: string
}

export function UpcomingEvents({ userId }: UpcomingEventsProps) {
  const { events, loading, error } = useUpcomingEvents()
  const { register } = useRegisterForEvent()
  const { cancel } = useCancelEventRegistration()
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set())
  const [registeringEventId, setRegisteringEventId] = useState<string | null>(null)

  useEffect(() => {
    const checkRegistrations = async () => {
      const registeredIds = new Set<string>()
      for (const event of events) {
        const isRegistered = await isUserRegisteredForEvent(userId, event.eventId)
        if (isRegistered) {
          registeredIds.add(event.eventId)
        }
      }
      setRegisteredEvents(registeredIds)
    }

    if (events.length > 0 && userId) {
      checkRegistrations()
    }
  }, [events, userId])

  const handleRegister = async (eventId: string) => {
    try {
      setRegisteringEventId(eventId)
      await register(userId, eventId)
      setRegisteredEvents((prev) => new Set([...prev, eventId]))
    } catch (err) {
      console.error('Registration failed:', err)
    } finally {
      setRegisteringEventId(null)
    }
  }

  const handleCancel = async (eventId: string) => {
    try {
      setRegisteringEventId(eventId)
      await cancel(userId, eventId)
      setRegisteredEvents((prev) => {
        const newSet = new Set(prev)
        newSet.delete(eventId)
        return newSet
      })
    } catch (err) {
      console.error('Cancellation failed:', err)
    } finally {
      setRegisteringEventId(null)
    }
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-900">Failed to load events</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900">Upcoming Events</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl border border-gray-200 bg-white animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900">Upcoming Events</h2>
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <MessageSquare className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 font-medium text-gray-900">No upcoming events</h3>
          <p className="text-sm text-gray-600">
            Check back soon for upcoming webinars and workshops from creators.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
        <a href="/attendee/events" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All →
        </a>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const isRegistered = registeredEvents.has(event.eventId)
          const isRegistering = registeringEventId === event.eventId
          const eventDate = new Date(event.date.seconds * 1000)
          const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
          const formattedTime = eventDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })

          return (
            <div
              key={event.eventId}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* Event Thumbnail */}
                <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-blue-100 flex items-center justify-center">
                  {event.thumbnail ? (
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Calendar className="h-8 w-8 text-gray-400" />
                  )}
                </div>

                {/* Event Info */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-[#2563EB]">
                      {event.eventType}
                    </span>
                  </div>

                  <p className="mb-3 line-clamp-1 text-sm text-gray-600">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formattedDate}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {formattedTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      {event.currentAttendees || 0} attending
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  onClick={() =>
                    isRegistered
                      ? handleCancel(event.eventId)
                      : handleRegister(event.eventId)
                  }
                  disabled={isRegistering}
                  className={`flex-shrink-0 rounded-lg px-4 py-2 font-medium transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                    isRegistered
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-[#2563EB] text-white hover:bg-blue-700'
                  }`}
                >
                  {isRegistering ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isRegistered ? (
                    'Registered'
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
