'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useDashboardStats } from '@/lib/hooks/use-attendee-data'
import { DashboardStats, FeaturedCourses, UpcomingEvents } from '@/components/attendee'
import { Play, ChevronRight, Target, Award, Flame, Sparkles, BookOpen, Users, Radio, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface UserData {
  name: string
  email: string
}

const CONTINUE_COURSES = [
  { id: '1', title: 'Advanced TypeScript', instructor: 'Rahul Sharma', progress: 65, lesson: 'Lesson 8: Conditional Types', emoji: '📘', duration: '32h total' },
  { id: '2', title: 'Full-Stack Development', instructor: 'Maria Full Stack', progress: 32, lesson: 'Lesson 5: REST API Design', emoji: '⚙️', duration: '48h total' },
  { id: '3', title: 'CSS Mastery', instructor: 'Tom Styles', progress: 88, lesson: 'Lesson 14: CSS Grid Advanced', emoji: '🎨', duration: '18h total' },
]

const ANNOUNCEMENTS = [
  { id: 1, author: 'Sarah Chen', initials: 'SC', color: '#78866B', title: '🎉 New Module Released: Advanced React Patterns!', time: '2h ago', preview: 'The most-requested module is finally live — render props, compound components, and state machines.' },
  { id: 2, author: 'Platform Team', initials: 'PT', color: '#B88A5A', title: '📅 Live Workshop This Thursday', time: '1d ago', preview: 'Join us for a live TypeScript workshop. Register now to secure your spot!' },
]

const RECENT_CERTS = [
  { title: 'React Fundamentals', date: 'Jun 15, 2026', grade: 'A+', emoji: '⚛️' },
  { title: 'CSS Mastery', date: 'Apr 10, 2026', grade: 'A+', emoji: '🎨' },
]

export default function AttendeeDashboardPage() {
  const { loading: authLoading, user, authorized } = useRequireRole(['attendee'])
  const [userData, setUserData] = useState<UserData | null>(null)
  const { stats, loading: statsLoading } = useDashboardStats(user?.uid || '')

  useEffect(() => {
    if (user && authorized) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
          const data = userDocSnap.data()
          setUserData({
            name: data.name || user.displayName || 'Attendee',
            email: user.email || '',
          })
        }
      }
      fetchUserData()
    }
  }, [user, authorized])

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F8F5] p-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E4E6DE] border-t-[#78866B]" />
          <p className="text-sm font-medium text-[#6B7280]">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const firstName = userData?.name?.split(' ')[0] || 'Learner'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#65735A] to-[#78866B] p-6 text-white shadow-lg">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-4 right-20 h-20 w-20 rounded-full bg-white/5" />
        <div className="relative z-10">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium text-white/80">
            <Sparkles className="h-4 w-4" /> {greeting}!
          </div>
          <h1 className="text-2xl font-bold leading-snug">Welcome back, {firstName} 🎓</h1>
          <p className="mt-1 text-sm text-white/80">You have 3 lessons in progress. Keep the momentum going!</p>

          {/* XP & Streak Row */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 backdrop-blur-sm">
              <Flame className="h-4 w-4" />
              <span className="text-sm font-bold">7 Day Streak</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-bold">7,840 XP — Level 7</span>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/70">Progress to Level 8</span>
              <span className="text-xs font-semibold text-white/90">7,840 / 10,000 XP</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-2 rounded-full bg-white transition-all" style={{ width: '78%' }} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/attendee/courses"
              className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/30 transition-colors">
              <Play className="h-4 w-4" fill="currentColor" /> Resume Learning
            </Link>
            <Link href="/attendee/courses"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              <BookOpen className="h-4 w-4" /> Explore Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Enrolled', value: '6', emoji: '📚', sub: 'courses' },
          { label: 'Completed', value: '3', emoji: '✅', sub: 'courses' },
          { label: 'Certificates', value: '3', emoji: '🏆', sub: 'earned' },
          { label: 'Hours Learned', value: '74h', emoji: '⏱️', sub: 'total' },
        ].map(s => (
          <div key={s.label} className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm text-center transition-all hover:-translate-y-0.5 hover:shadow-md duration-250">
            <div className="text-2xl">{s.emoji}</div>
            <p className="mt-1 text-2xl font-bold text-[#1F2933]">{s.value}</p>
            <p className="text-[11px] text-[#6B7280]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Dashboard Stats from Firebase */}
      <div>
        <DashboardStats stats={stats} loading={statsLoading} />
      </div>

      {/* Learning Progress Rings */}
      <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#78866B]/10">
              <Target className="h-4 w-4 text-[#78866B]" />
            </div>
            <h2 className="text-base font-bold text-[#1F2933]">Learning Goals</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Weekly Goal', percent: 60, color: '#78866B', current: '6/10', unit: 'lessons' },
            { label: 'Monthly Goal', percent: 45, color: '#B88A5A', current: '18/40', unit: 'lessons' },
            { label: 'Overall', percent: 72, color: '#4F8A5B', current: '72%', unit: 'complete' },
          ].map(goal => {
            const radius = 30
            const circ = 2 * Math.PI * radius
            const offset = circ - (goal.percent / 100) * circ
            return (
              <div key={goal.label} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <svg width={80} height={80} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={40} cy={40} r={radius} fill="none" stroke="#E4E6DE" strokeWidth={7} />
                    <circle cx={40} cy={40} r={radius} fill="none" stroke={goal.color} strokeWidth={7}
                      strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-[#1F2933]">{goal.percent}%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-[#1F2933]">{goal.label}</p>
                  <p className="text-[10px] text-[#6B7280]">{goal.current} {goal.unit}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Continue Learning */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#78866B]/10">
              <Play className="h-4 w-4 text-[#78866B]" />
            </div>
            <h2 className="text-base font-bold text-[#1F2933]">Continue Learning</h2>
          </div>
          <Link href="/attendee/courses" className="flex items-center gap-1 text-xs font-semibold text-[#78866B] hover:text-[#65735A]">
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTINUE_COURSES.map(c => (
            <div key={c.id} className="group rounded-[18px] border border-[#E4E6DE] bg-white p-4 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3F4EF] text-2xl">{c.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1F2933] line-clamp-1">{c.title}</p>
                  <p className="text-xs text-[#6B7280]">by {c.instructor}</p>
                  <p className="mt-1 truncate text-[11px] text-[#9AA59E]">{c.lesson}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#6B7280]">{c.progress}% complete</span>
                  <span className="text-[11px] text-[#6B7280]">{c.duration}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#E4E6DE]">
                  <div className="h-1.5 rounded-full bg-[#78866B] transition-all" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#78866B]/10 py-2 text-xs font-semibold text-[#78866B] transition-colors group-hover:bg-[#78866B] group-hover:text-white">
                <Play className="h-3.5 w-3.5" /> Resume
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Courses from Firebase */}
      <div>
        {user && <FeaturedCourses userId={user.uid} />}
      </div>

      {/* Announcements */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B88A5A]/10">
            <Sparkles className="h-4 w-4 text-[#B88A5A]" />
          </div>
          <h2 className="text-base font-bold text-[#1F2933]">Creator Announcements</h2>
        </div>
        <div className="space-y-3">
          {ANNOUNCEMENTS.map(a => (
            <div key={a.id} className="flex items-start gap-3 rounded-[18px] border border-[#E4E6DE] bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white" style={{ background: a.color }}>
                {a.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-[#1F2933]">{a.title}</p>
                  <span className="shrink-0 text-[11px] text-[#6B7280]">{a.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-[#6B7280] line-clamp-2">{a.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events from Firebase */}
      <div>
        {user && <UpcomingEvents userId={user.uid} />}
      </div>

      {/* Recent Certificates */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B88A5A]/10">
              <Award className="h-4 w-4 text-[#B88A5A]" />
            </div>
            <h2 className="text-base font-bold text-[#1F2933]">Recent Certificates</h2>
          </div>
          <Link href="/attendee/certificates" className="flex items-center gap-1 text-xs font-semibold text-[#78866B]">
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RECENT_CERTS.map(c => (
            <div key={c.title} className="flex items-center gap-4 rounded-[18px] border border-[#B88A5A]/20 bg-gradient-to-r from-white to-[#F8F8F5] p-4 shadow-sm">
              <div className="text-3xl">{c.emoji}</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1F2933]">{c.title}</p>
                <p className="text-xs text-[#6B7280]">Completed {c.date}</p>
              </div>
              <span className="rounded-full bg-[#4F8A5B]/10 px-2.5 py-0.5 text-xs font-bold text-[#4F8A5B]">{c.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}