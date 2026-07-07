'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Users, Trophy, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const mobileNav = [
  { icon: LayoutDashboard, label: 'Home', href: '/attendee/dashboard' },
  { icon: BookOpen, label: 'Courses', href: '/attendee/courses' },
  { icon: Users, label: 'Community', href: '/attendee/community' },
  { icon: Trophy, label: 'Achievements', href: '/attendee/achievements' },
  { icon: User, label: 'Profile', href: '/attendee/profile' },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E4E6DE] bg-white/95 backdrop-blur-md md:hidden">
      <ul className="flex items-center justify-around px-2 py-2">
        {mobileNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-semibold transition-colors',
                  isActive ? 'text-[#78866B]' : 'text-[#9AA59E]'
                )}
              >
                <Icon
                  style={{ width: 20, height: 20 }}
                  className={isActive ? 'text-[#78866B]' : 'text-[#9AA59E]'}
                />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
