'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Settings, User, LogOut } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Users', href: '/dashboard/users', icon: '👥' },
  { label: 'Courses', href: '/dashboard/courses', icon: '📚' },
  { label: 'Communities', href: '/dashboard/communities', icon: '💬' },
  { label: 'Events', href: '/dashboard/events', icon: '📅' },
  { label: 'Payments', href: '/dashboard/payments', icon: '💳' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { label: 'Marketing', href: '/dashboard/marketing', icon: '📢' },
]

export function DashboardNavbar() {
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center h-16 px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0 mr-8">
          <img src="/cloud-logo.png" alt="Cloud" className="h-8 w-8" />
          <span className="text-xl font-bold text-slate-900">Cloud</span>
        </Link>

        {/* Horizontal Navigation */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label.toUpperCase()}
              </Link>
            )
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-8">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition border-t border-gray-200">
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
