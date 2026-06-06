'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, BarChart3, Users, BookOpen, MessageSquare, Calendar, Zap, Mail, CreditCard, BarChart2, Gamepad2, Smartphone, Bot, Share2, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuSections = [
  {
    label: 'Core Features',
    items: [
      { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', href: '/dashboard' },
      { icon: <Users className="w-5 h-5" />, label: 'Users', href: '/dashboard/users' },
      { icon: <BookOpen className="w-5 h-5" />, label: 'Courses', href: '/dashboard/courses' },
      { icon: <MessageSquare className="w-5 h-5" />, label: 'Communities', href: '/dashboard/communities' },
      { icon: <Calendar className="w-5 h-5" />, label: 'Events', href: '/dashboard/events' },
    ],
  },
  {
    label: 'Monetization',
    items: [
      { icon: <CreditCard className="w-5 h-5" />, label: 'Payments', href: '/dashboard/payments' },
      { icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics', href: '/dashboard/analytics' },
      { icon: <Mail className="w-5 h-5" />, label: 'Marketing', href: '/dashboard/marketing' },
    ],
  },
  {
    label: 'Advanced',
    items: [
      { icon: <Zap className="w-5 h-5" />, label: 'CRM', href: '/dashboard/crm' },
      { icon: <Mail className="w-5 h-5" />, label: 'Campaigns', href: '/dashboard/campaigns' },
      { icon: <Gamepad2 className="w-5 h-5" />, label: 'Gamification', href: '/dashboard/gamification' },
      { icon: <Smartphone className="w-5 h-5" />, label: 'Mobile App', href: '/dashboard/mobile' },
      { icon: <Bot className="w-5 h-5" />, label: 'AI Assistant', href: '/dashboard/ai-assistant' },
      { icon: <Share2 className="w-5 h-5" />, label: 'Affiliate', href: '/dashboard/affiliate' },
    ],
  },
]

export function SidebarNew() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedSections, setExpandedSections] = useState<string[]>(['Core Features'])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-30 lg:hidden bg-white border border-gray-200 rounded-lg p-2"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 z-20',
          !isOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6 space-y-6">
          {menuSections.map((section) => (
            <div key={section.label}>
              <button
                onClick={() => toggleSection(section.label)}
                className="flex items-center justify-between w-full mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition"
              >
                {section.label}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    expandedSections.includes(section.label) && 'rotate-180'
                  )}
                />
              </button>

              {expandedSections.includes(section.label) && (
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Settings - Bottom */}
          <div className="pt-6 border-t border-gray-200">
            <Link
              href="/dashboard/settings"
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                pathname === '/dashboard/settings'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
