'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Cloud, BarChart3, Users, BookOpen, MessageSquare, Calendar, Zap, Mail, CreditCard, BarChart2, Gamepad2, Smartphone, Bot, Share2, Settings, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  isActive: boolean
  submenu?: Array<{ label: string; href: string }>
  isOpen?: boolean
  onToggle?: () => void
}

function SidebarItem({ icon, label, href, isActive, submenu, isOpen, onToggle }: SidebarItemProps) {
  return (
    <div>
      <Link
        href={href}
        onClick={(e) => submenu && onToggle && (e.preventDefault(), onToggle())}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative group',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-primary/10'
        )}
      >
        {icon}
        <span className="text-sm font-medium flex-1">{label}</span>
        {submenu && (
          <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
        )}
      </Link>
      {submenu && isOpen && (
        <div className="mt-2 ml-4 space-y-1 border-l border-sidebar-border pl-4">
          {submenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboard', 'creators', 'engagement', 'monetization'])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId) ? prev.filter((m) => m !== menuId) : [...prev, menuId]
    )
  }

  const menuSections = [
    {
      label: 'Main',
      items: [
        {
          id: 'dashboard',
          icon: <BarChart3 className="w-5 h-5" />,
          label: 'Dashboard',
          href: '/dashboard',
        },
      ],
    },
    {
      label: 'Creators & Community',
      items: [
        {
          id: 'creators',
          icon: <Users className="w-5 h-5" />,
          label: 'User Management',
          href: '/users',
          submenu: [
            { label: 'All Users', href: '/users' },
            { label: 'Active Users', href: '/users?status=active' },
            { label: 'Roles & Permissions', href: '/users/roles' },
          ],
        },
        {
          id: 'courses',
          icon: <BookOpen className="w-5 h-5" />,
          label: 'Courses',
          href: '/courses',
        },
        {
          id: 'community',
          icon: <MessageSquare className="w-5 h-5" />,
          label: 'Communities',
          href: '/communities',
        },
      ],
    },
    {
      label: 'Engagement & Events',
      items: [
        {
          id: 'events',
          icon: <Calendar className="w-5 h-5" />,
          label: 'Live Events',
          href: '/events',
        },
        {
          id: 'engagement',
          icon: <Zap className="w-5 h-5" />,
          label: 'CRM',
          href: '/crm',
        },
      ],
    },
    {
      label: 'Monetization & Marketing',
      items: [
        {
          id: 'email',
          icon: <Mail className="w-5 h-5" />,
          label: 'Email & WhatsApp',
          href: '/campaigns',
        },
        {
          id: 'monetization',
          icon: <CreditCard className="w-5 h-5" />,
          label: 'Payments',
          href: '/payments',
        },
        {
          id: 'analytics',
          icon: <BarChart2 className="w-5 h-5" />,
          label: 'Analytics',
          href: '/analytics',
        },
      ],
    },
    {
      label: 'Advanced Features',
      items: [
        {
          id: 'gamification',
          icon: <Gamepad2 className="w-5 h-5" />,
          label: 'Gamification',
          href: '/gamification',
        },
        {
          id: 'mobile',
          icon: <Smartphone className="w-5 h-5" />,
          label: 'Mobile App',
          href: '/mobile',
        },
        {
          id: 'ai',
          icon: <Bot className="w-5 h-5" />,
          label: 'AI Assistant',
          href: '/ai-assistant',
        },
        {
          id: 'affiliate',
          icon: <Share2 className="w-5 h-5" />,
          label: 'Affiliate System',
          href: '/affiliate',
        },
      ],
    },
  ]

  return (
    <div className={cn('flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300', isOpen ? 'w-64' : 'w-20')}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {isOpen && (
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Cloud className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-sidebar-primary truncate">Cloud</h1>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-sidebar-primary/10 rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {menuSections.map((section) => (
          <div key={section.label}>
            {isOpen && <p className="px-4 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-3">{section.label}</p>}
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.id}>
                  {isOpen ? (
                    <SidebarItem
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                      isActive={false}
                      submenu={item.submenu}
                      isOpen={expandedMenus.includes(item.id)}
                      onToggle={() => toggleMenu(item.id)}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center p-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-primary/10 transition-colors cursor-help"
                      title={item.label}
                    >
                      {item.icon}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-primary/10 transition-colors"
        >
          <Settings className="w-5 h-5" />
          {isOpen && <span className="text-sm font-medium">Settings</span>}
        </Link>
      </div>
    </div>
  )
}
