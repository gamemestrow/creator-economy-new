'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Grid, User, LogOut, Compass, Video, BookOpen, MessageSquare, Gauge } from 'lucide-react'
import { useState } from 'react'

export function DashboardNavbar() {
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navItems = [
    { 
      label: 'Dashboard', 
      href: '/dashboard/getstarted', 
      icon: <Gauge className="w-5 h-5 mb-1" />,
      isActive: (path: string) => {
        // Active if dashboard but not feed/workshops/courses/messages
        return path.startsWith('/dashboard') && 
          !path.startsWith('/dashboard/feed') && 
          !path.startsWith('/dashboard/workshops') && 
          !path.startsWith('/dashboard/courses') && 
          !path.startsWith('/dashboard/messages')
      }
    },
    { 
      label: 'Feed', 
      href: '/dashboard/feed', 
      icon: <Compass className="w-5 h-5 mb-1" />,
      isActive: (path: string) => path.startsWith('/dashboard/feed')
    },
    { 
      label: 'Workshops', 
      href: '/dashboard/workshops', 
      icon: <Video className="w-5 h-5 mb-1" />,
      isActive: (path: string) => path.startsWith('/dashboard/workshops')
    },
    { 
      label: 'Courses', 
      href: '/dashboard/courses', 
      icon: <BookOpen className="w-5 h-5 mb-1" />,
      isActive: (path: string) => path.startsWith('/dashboard/courses')
    },
    { 
      label: 'Messages', 
      href: '/dashboard/messages', 
      icon: <MessageSquare className="w-5 h-5 mb-1" />,
      isActive: (path: string) => path.startsWith('/dashboard/messages')
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-40 h-20 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between h-full px-8">
        
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl font-black text-foreground tracking-tight lowercase">
            tag<span className="text-primary">mango</span>
          </span>
        </Link>

        {/* Center Horizontal Navigation */}
        <div className="flex items-center h-full gap-8">
          {navItems.map((item) => {
            const active = item.isActive(pathname)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center h-full px-3 text-[11px] font-bold tracking-wider transition-all border-b-[3px] uppercase ${
                  active
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-5 flex-shrink-0">
          {/* App Grid Launcher */}
          <button className="p-2 hover:bg-muted rounded-full transition text-muted-foreground hover:text-foreground">
            <Grid className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-muted rounded-full transition text-muted-foreground hover:text-foreground relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 hover:bg-muted rounded-full transition"
            >
              <div className="w-9 h-9 rounded-full bg-[#EEF2EC] border border-[#E4E6DE] flex items-center justify-center text-[#8FA193] font-bold text-sm">
                A
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-border py-1.5 z-50">
                <Link
                  href="/dashboard/settings/platform"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Account Settings</span>
                </Link>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/50 transition border-t border-border"
                  onClick={() => setShowUserMenu(false)}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}
