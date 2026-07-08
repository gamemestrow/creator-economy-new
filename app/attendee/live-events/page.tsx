'use client'

import { useState, useEffect } from 'react'
import { Radio, Calendar, Clock, Users, Play, Bell, Mic, Video, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const EVENTS = [
  {
    id: 1, title: 'Advanced React Patterns — Live Workshop', type: 'Workshop',
    speaker: 'Sarah Chen', speakerInitials: 'SC', speakerColor: '#78866B', speakerRole: 'Senior React Engineer',
    date: '2026-07-10', time: '7:00 PM IST', duration: '2h', attendees: 834,
    description: 'Deep dive into render props, compound components, and state machine patterns you can use today.',
    status: 'upcoming', tags: ['React', 'Advanced', 'Patterns'],
  },
  {
    id: 2, title: 'TypeScript Generics Masterclass', type: 'Webinar',
    speaker: 'Rahul Sharma', speakerInitials: 'RS', speakerColor: '#B88A5A', speakerRole: 'TypeScript Expert',
    date: '2026-07-12', time: '5:30 PM IST', duration: '1.5h', attendees: 621,
    description: 'Understand generics, conditional types, and mapped types through real-world examples.',
    status: 'upcoming', tags: ['TypeScript', 'Generics'],
  },
  {
    id: 3, title: 'Career Q&A: Breaking Into Big Tech', type: 'Q&A',
    speaker: 'Priya Nair', speakerInitials: 'PN', speakerColor: '#4F8A5B', speakerRole: 'Staff Engineer @ Google',
    date: '2026-07-08', time: '8:00 PM IST', duration: '1h', attendees: 1204,
    description: 'Open Q&A about cracking FAANG interviews, system design, and career growth strategies.',
    status: 'live', tags: ['Career', 'Interviews', 'FAANG'],
  },
  {
    id: 4, title: 'CSS Architecture & Design Systems', type: 'Workshop',
    speaker: 'Alex Johnson', speakerInitials: 'AJ', speakerColor: '#7B8FA1', speakerRole: 'Design Systems Lead',
    date: '2026-06-28', time: '6:00 PM IST', duration: '2h', attendees: 448,
    description: 'How to build scalable CSS architecture using tokens, components, and design systems.',
    status: 'ended', tags: ['CSS', 'Design Systems'],
  },
  {
    id: 5, title: 'Node.js Performance & Scaling', type: 'Webinar',
    speaker: 'David Kumar', speakerInitials: 'DK', speakerColor: '#D4A13A', speakerRole: 'Backend Architect',
    date: '2026-06-20', time: '7:30 PM IST', duration: '1.5h', attendees: 589,
    description: 'Profiling, clustering, caching, and scaling Node.js apps to handle millions of requests.',
    status: 'ended', tags: ['Node.js', 'Performance'],
  },
]

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const timer = setInterval(calc, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.mins },
    { label: 'Secs', value: timeLeft.secs },
  ]

  return (
    <div className="flex items-center gap-2">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center rounded-xl bg-white/20 px-3 py-2 backdrop-blur-sm">
            <span className="text-xl font-bold text-white leading-none">{String(u.value).padStart(2, '0')}</span>
            <span className="mt-0.5 text-[9px] uppercase tracking-widest text-white/80">{u.label}</span>
          </div>
          {i < 3 && <span className="text-lg font-bold text-white/70">:</span>}
        </div>
      ))}
    </div>
  )
}

function EventCard({ event }: { event: typeof EVENTS[0] }) {
  const [registered, setRegistered] = useState(false)

  const typeColors: Record<string, string> = {
    Workshop: 'bg-[#78866B]/10 text-[#78866B] border-[#78866B]/20',
    Webinar: 'bg-[#7B8FA1]/10 text-[#7B8FA1] border-[#7B8FA1]/20',
    'Q&A': 'bg-[#B88A5A]/10 text-[#B88A5A] border-[#B88A5A]/20',
  }

  return (
    <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm transition-all duration-250 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={cn('rounded-full border px-2.5 py-0.5 text-[11px] font-semibold', typeColors[event.type] || 'bg-[#F3F4EF] text-[#6B7280] border-[#E4E6DE]')}>{event.type}</span>
            {event.status === 'live' && (
              <span className="flex items-center gap-1 rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[11px] font-bold text-red-500">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE NOW
              </span>
            )}
            {event.status === 'ended' && <span className="rounded-full border border-[#E4E6DE] bg-[#F3F4EF] px-2.5 py-0.5 text-[11px] text-[#6B7280]">Ended</span>}
          </div>
          <h3 className="text-base font-bold text-[#1F2933]">{event.title}</h3>
          <p className="mt-1.5 text-sm text-[#6B7280] line-clamp-2">{event.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{event.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{event.time} · {event.duration}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{event.attendees.toLocaleString()} attending</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shrink-0" style={{ background: event.speakerColor }}>
              {event.speakerInitials}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1F2933]">{event.speaker}</p>
              <p className="text-[10px] text-[#6B7280]">{event.speakerRole}</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          {event.status === 'live' && (
            <a href="#" className="flex items-center gap-1.5 rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 transition-colors">
              <Play className="h-3.5 w-3.5" fill="currentColor" /> Join Live
            </a>
          )}
          {event.status === 'upcoming' && (
            <button onClick={() => setRegistered(!registered)}
              className={cn('flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
                registered ? 'bg-[#4F8A5B]/10 text-[#4F8A5B] border border-[#4F8A5B]/30' : 'bg-[#78866B] text-white hover:bg-[#65735A]')}>
              {registered ? <><CheckCircle className="h-3.5 w-3.5" /> Registered</> : <><Bell className="h-3.5 w-3.5" /> Register</>}
            </button>
          )}
          {event.status === 'ended' && (
            <button className="flex items-center gap-1.5 rounded-xl border border-[#E4E6DE] bg-[#F3F4EF] px-4 py-2 text-sm font-semibold text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
              <Play className="h-3.5 w-3.5" /> Watch Recording
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LiveEventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'registered' | 'past'>('upcoming')
  const tabs = [{ key: 'upcoming', label: 'Upcoming' }, { key: 'registered', label: 'Registered' }, { key: 'past', label: 'Past Recordings' }] as const
  const nextEvent = EVENTS.find(e => e.status === 'upcoming')

  const filtered = EVENTS.filter(e =>
    activeTab === 'upcoming' ? e.status === 'upcoming' || e.status === 'live' :
    activeTab === 'past' ? e.status === 'ended' :
    e.status === 'upcoming'
  )

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      {nextEvent && (
        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#65735A] to-[#78866B] p-6 text-white shadow-lg">
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
            <Video className="absolute right-8 top-8 h-32 w-32 text-white" />
          </div>
          <div className="relative z-10">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-white/80">
              <Radio className="h-4 w-4" /> Next Live Event
            </div>
            <h2 className="text-xl font-bold leading-snug">{nextEvent.title}</h2>
            <p className="mt-1 text-sm text-white/80">{nextEvent.date} · {nextEvent.time}</p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Starts in</p>
              <CountdownTimer targetDate={`${nextEvent.date}T13:30:00`} />
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-[#1F2933]">Live Events</h1>
        <p className="text-sm text-[#6B7280]">Join live sessions, workshops, and webinars</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-[#E4E6DE] bg-white p-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={cn('flex-1 rounded-lg py-2 text-sm font-semibold transition-all', activeTab === t.key
              ? 'bg-[#78866B] text-white shadow-sm'
              : 'text-[#6B7280] hover:text-[#1F2933]')}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-[#E4E6DE] py-16 text-center">
            <span className="text-4xl">📅</span>
            <p className="mt-3 font-semibold text-[#1F2933]">No events here</p>
            <p className="mt-1 text-sm text-[#6B7280]">Check back soon for new events</p>
          </div>
        ) : filtered.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  )
}
