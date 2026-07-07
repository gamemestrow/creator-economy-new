'use client'

import { cn } from '@/lib/utils'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Radio,
  Award,
  CreditCard,
  Download,
  Bookmark,
  Heart,
  Bell,
  Trophy,
  BarChart3,
  User,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/attendee/dashboard' },
  { icon: BookOpen, label: 'Courses', href: '/attendee/courses' },
  { icon: Users, label: 'Community', href: '/attendee/community' },
  { icon: Radio, label: 'Live Events', href: '/attendee/live-events' },
  { icon: Award, label: 'Certificates', href: '/attendee/certificates' },
  { icon: CreditCard, label: 'Payments', href: '/attendee/payments' },
  { icon: Download, label: 'Downloads', href: '/attendee/downloads' },
  { icon: Bookmark, label: 'Bookmarks', href: '/attendee/bookmarks' },
  { icon: Heart, label: 'Wishlist', href: '/attendee/wishlist' },
  { icon: Bell, label: 'Notifications', href: '/attendee/notifications' },
  { icon: Trophy, label: 'Achievements', href: '/attendee/achievements' },
  { icon: BarChart3, label: 'Leaderboard', href: '/attendee/leaderboard' },
  { icon: User, label: 'Profile', href: '/attendee/profile' },
  { icon: Settings, label: 'Settings', href: '/attendee/settings' },
]

const AttendeeSidebar = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-[#E4E6DE] bg-white transition-transform duration-300 md:relative md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-[#E4E6DE] px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#78866B]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-[#1F2933]">Learning Hub</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#6B7280]">
            Main Menu
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-[#78866B]/10 text-[#78866B]'
                        : 'text-[#6B7280] hover:bg-[#F3F4EF] hover:text-[#1F2933]'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4.5 w-4.5 shrink-0 transition-colors',
                        isActive ? 'text-[#78866B]' : 'text-[#9AA59E] group-hover:text-[#78866B]'
                      )}
                      style={{ width: 18, height: 18 }}
                    />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 text-[#78866B]" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#E4E6DE] p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut style={{ width: 18, height: 18 }} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default AttendeeSidebar
