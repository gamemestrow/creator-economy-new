'use client'

import { useState } from 'react'
import { MapPin, Calendar, Globe, Edit2, Award, BookOpen, Clock, Star, TrendingUp, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const INTERESTS = ['TypeScript', 'React', 'System Design', 'CSS', 'Career Growth', 'Open Source', 'UI/UX', 'Node.js']

const COMPLETED_COURSES = [
  { id: 1, title: 'React Fundamentals', instructor: 'Sarah Chen', grade: 'A+', date: 'Jun 15, 2026', emoji: '⚛️' },
  { id: 2, title: 'Advanced TypeScript', instructor: 'Rahul Sharma', grade: 'A', date: 'May 28, 2026', emoji: '📘' },
  { id: 3, title: 'CSS Mastery', instructor: 'Tom Styles', grade: 'A+', date: 'Apr 10, 2026', emoji: '🎨' },
]

const BADGES = [
  { emoji: '👶', name: 'First Steps', rarity: 'Common' },
  { emoji: '🔥', name: 'Week Warrior', rarity: 'Common' },
  { emoji: '💪', name: 'Course Crusher', rarity: 'Rare' },
  { emoji: '🎓', name: 'Scholar', rarity: 'Rare' },
  { emoji: '⭐', name: 'Community Star', rarity: 'Epic' },
  { emoji: '🤝', name: 'Helping Hand', rarity: 'Epic' },
]

const ACTIVITY = [
  { action: 'Completed lesson', detail: '"Conditional Types" in Advanced TypeScript', time: '2h ago', emoji: '✅' },
  { action: 'Earned badge', detail: '"Helping Hand" — answered 20 questions', time: '1d ago', emoji: '🏅' },
  { action: 'Commented on post', detail: '"Great explanation of async patterns!"', time: '2d ago', emoji: '💬' },
  { action: 'Enrolled in course', detail: 'Full-Stack Development with React & Node.js', time: '3d ago', emoji: '📚' },
]

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState('Passionate developer learning full-stack web development. I love building beautiful UIs and scalable backend systems. Currently leveling up in TypeScript and system design!')

  return (
    <div className="space-y-6">
      {/* Profile Hero */}
      <div className="rounded-[20px] border border-[#E4E6DE] bg-white overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-24 bg-gradient-to-r from-[#65735A] to-[#78866B]" />
        <div className="relative px-6 pb-6">
          <div className="flex items-end justify-between gap-4">
            <div className="-mt-10 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-[#78866B] to-[#65735A] text-2xl font-bold text-white shadow-lg">
              AP
            </div>
            <button onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 rounded-xl border border-[#E4E6DE] px-4 py-2 text-sm font-semibold text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
              <Edit2 className="h-4 w-4" /> {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          <div className="mt-3">
            <h1 className="text-xl font-bold text-[#1F2933]">Anamika Pandey</h1>
            <p className="text-sm text-[#6B7280]">anamika.p@works.cloud</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Mumbai, India</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined January 2026</span>
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> anamika.dev</span>
            </div>
          </div>
          {editing ? (
            <div className="mt-4">
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                className="w-full resize-none rounded-xl border border-[#E4E6DE] p-3 text-sm text-[#1F2933] outline-none focus:border-[#78866B] focus:ring-1 focus:ring-[#78866B]/20" />
              <button onClick={() => setEditing(false)} className="mt-2 rounded-xl bg-[#78866B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#65735A] transition-colors">
                Save Changes
              </button>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{bio}</p>
          )}
          <div className="mt-4 flex items-center gap-3">
            <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E6DE] text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
              <XIcon className="h-4 w-4" />
            </a>
            {/* <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E6DE] text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
              <Linkedin className="h-4 w-4" />
            </a> */}
            <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E6DE] text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[{ label: 'Courses Completed', value: 3, emoji: '📚' },
          { label: 'Certificates', value: 3, emoji: '🏆' },
          { label: 'Total XP', value: '7.8K', emoji: '⚡' },
          { label: 'Hours Learned', value: '74h', emoji: '⏱️' }].map(s => (
          <div key={s.label} className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm text-center">
            <div className="text-2xl">{s.emoji}</div>
            <p className="mt-1 text-2xl font-bold text-[#1F2933]">{s.value}</p>
            <p className="text-xs text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Badges */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-[#1F2933]">Top Badges</h2>
            <div className="flex flex-wrap gap-3">
              {BADGES.map(b => (
                <div key={b.name} className="flex items-center gap-2 rounded-xl border border-[#E4E6DE] px-3 py-2">
                  <span className="text-xl">{b.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#1F2933]">{b.name}</p>
                    <p className="text-[10px] text-[#6B7280]">{b.rarity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Courses */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-[#1F2933]">Completed Courses</h2>
            <div className="space-y-3">
              {COMPLETED_COURSES.map(c => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl border border-[#E4E6DE] p-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1F2933]">{c.title}</p>
                    <p className="text-xs text-[#6B7280]">by {c.instructor} · {c.date}</p>
                  </div>
                  <span className="rounded-full bg-[#4F8A5B]/10 px-2.5 py-0.5 text-xs font-bold text-[#4F8A5B]">{c.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Interests */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-[#1F2933]">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <span key={interest} className="rounded-full border border-[#78866B]/20 bg-[#78866B]/5 px-3 py-1 text-xs font-medium text-[#78866B]">{interest}</span>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-[#1F2933]">Recent Activity</h2>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg">{a.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#1F2933]">{a.action}</p>
                    <p className="text-[11px] text-[#6B7280] line-clamp-1">{a.detail}</p>
                    <p className="text-[10px] text-[#9AA59E]">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
