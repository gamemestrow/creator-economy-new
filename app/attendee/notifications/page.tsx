'use client'

import { useState } from 'react'
import { Bell, BookOpen, Users, Radio, CreditCard, Award, Trophy, CheckCheck, Filter, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

type NType = 'course' | 'community' | 'event' | 'payment' | 'certificate' | 'reward' | 'system'

const NOTIFICATIONS = [
  { id: 1, type: 'course' as NType, title: 'New lesson available', message: 'Advanced TypeScript: Lesson 12 — Conditional Types is now live!', time: '5 min ago', read: false, group: 'Today' },
  { id: 2, type: 'community' as NType, title: 'Someone replied to your post', message: 'Rahul Sharma replied to your question about async/await patterns.', time: '1h ago', read: false, group: 'Today' },
  { id: 3, type: 'event' as NType, title: 'Live event starting soon', message: 'Career Q&A with Priya Nair starts in 30 minutes. Don\'t miss it!', time: '2h ago', read: false, group: 'Today' },
  { id: 4, type: 'certificate' as NType, title: 'Certificate earned! 🎓', message: 'Congratulations! You\'ve earned your React Fundamentals certificate.', time: '6h ago', read: true, group: 'Today' },
  { id: 5, type: 'reward' as NType, title: 'New badge unlocked! 🏅', message: 'You earned the "Community Star" badge for 50 liked posts!', time: '1d ago', read: true, group: 'Yesterday' },
  { id: 6, type: 'payment' as NType, title: 'Payment successful', message: 'Your Pro Plan subscription has been renewed for ₹29.00.', time: '2d ago', read: true, group: 'Yesterday' },
  { id: 7, type: 'course' as NType, title: 'Course update', message: 'CSS Mastery: 3 new bonus lessons have been added to the course.', time: '3d ago', read: true, group: 'This Week' },
  { id: 8, type: 'community' as NType, title: 'You were mentioned', message: 'Alex Johnson mentioned you in a post: "Thanks to @Anamika for the help!"', time: '4d ago', read: true, group: 'This Week' },
  { id: 9, type: 'system' as NType, title: 'Welcome to the platform!', message: 'Your account is set up and ready. Start exploring courses and the community!', time: '1 week ago', read: true, group: 'This Week' },
]

const typeConfig: Record<NType, { icon: typeof Bell; color: string; bg: string }> = {
  course: { icon: BookOpen, color: 'text-[#78866B]', bg: 'bg-[#78866B]/10' },
  community: { icon: Users, color: 'text-[#7B8FA1]', bg: 'bg-[#7B8FA1]/10' },
  event: { icon: Radio, color: 'text-red-500', bg: 'bg-red-50' },
  payment: { icon: CreditCard, color: 'text-[#4F8A5B]', bg: 'bg-[#4F8A5B]/10' },
  certificate: { icon: Award, color: 'text-[#B88A5A]', bg: 'bg-[#B88A5A]/10' },
  reward: { icon: Trophy, color: 'text-[#D4A13A]', bg: 'bg-[#D4A13A]/10' },
  system: { icon: Bell, color: 'text-[#6B7280]', bg: 'bg-[#F3F4EF]' },
}

const TABS = ['All', 'Courses', 'Community', 'Events', 'Payments', 'System']
const tabType: Record<string, NType | null> = {
  All: null, Courses: 'course', Community: 'community', Events: 'event', Payments: 'payment', System: 'system',
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })))
  const unread = notifications.filter(n => !n.read).length

  const filtered = notifications.filter(n => !tabType[activeTab] || n.type === tabType[activeTab])
  const groups = [...new Set(filtered.map(n => n.group))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2933]">Notifications</h1>
          <p className="text-sm text-[#6B7280]">{unread > 0 ? `${unread} unread notifications` : 'All caught up!'}</p>
        </div>
        <div className="flex gap-2">
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 rounded-xl border border-[#E4E6DE] bg-white px-4 py-2.5 text-sm font-semibold text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
              <CheckCheck className="h-4 w-4" /> Mark all read
            </button>
          )}
          <button className="flex items-center gap-2 rounded-xl border border-[#E4E6DE] bg-white px-4 py-2.5 text-sm font-semibold text-[#6B7280] hover:text-[#78866B] transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn('shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all', activeTab === tab
              ? 'bg-[#78866B] text-white'
              : 'border border-[#E4E6DE] bg-white text-[#6B7280] hover:border-[#78866B]/40 hover:text-[#78866B]')}>
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="space-y-6">
        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-[#E4E6DE] py-16 text-center">
            <Bell className="h-10 w-10 text-[#9AA59E]" />
            <p className="mt-3 font-semibold text-[#1F2933]">No notifications here</p>
          </div>
        ) : groups.map(group => (
          <div key={group}>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6B7280]">{group}</p>
            <div className="space-y-2">
              {filtered.filter(n => n.group === group).map(notif => {
                const cfg = typeConfig[notif.type]
                const Icon = cfg.icon
                return (
                  <div key={notif.id} onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                    className={cn('flex cursor-pointer items-start gap-3 rounded-[18px] border p-4 transition-all duration-200 hover:shadow-sm',
                      notif.read ? 'border-[#E4E6DE] bg-white' : 'border-[#78866B]/20 bg-[#78866B]/5')}>
                    <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', cfg.bg)}>
                      <Icon className={cn('h-4.5 w-4.5', cfg.color)} style={{ width: 18, height: 18 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[#1F2933]">{notif.title}</p>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[11px] text-[#6B7280] whitespace-nowrap">{notif.time}</span>
                          {!notif.read && <span className="h-2 w-2 rounded-full bg-[#78866B]" />}
                        </div>
                      </div>
                      <p className="mt-0.5 text-xs text-[#6B7280] line-clamp-2">{notif.message}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
