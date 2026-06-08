'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useDashboardStore } from '@/lib/store'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Palette,
  Users,
  Zap,
  Smartphone,
  MessageSquare,
  Gamepad2,
  Handshake,
  TrendingUp,
  Settings,
  ChevronDown,
  Menu,
  Cloud,
} from 'lucide-react'

const menuGroups = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Creator Management',
    items: [
      { id: 'products', name: 'Products', icon: ShoppingBag },
      { id: 'sales', name: 'Sales', icon: BarChart3 },
      { id: 'page-builder', name: 'Page Builder', icon: Palette },
    ],
  },
  {
    label: 'Community & Growth',
    items: [
      { id: 'customers', name: 'Customers', icon: Users },
      { id: 'marketing', name: 'Marketing', icon: Zap },
      { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    ],
  },
  {
    label: 'Automation & Integrations',
    items: [
      { id: 'email-automation', name: 'Email Automation', icon: MessageSquare },
      { id: 'mobile-app', name: 'Mobile App', icon: Smartphone },
      { id: 'api-webhooks', name: 'API & Webhooks', icon: Zap },
    ],
  },
  {
    label: 'Community & Engagement',
    items: [
      { id: 'community', name: 'Community', icon: Users },
      { id: 'gamification', name: 'Gamification', icon: Gamepad2 },
    ],
  },
  {
    label: 'Partnerships',
    items: [
      { id: 'partnerships', name: 'Partnerships', icon: Handshake },
      { id: 'affiliates', name: 'Affiliates', icon: TrendingUp },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'settings', name: 'Settings', icon: Settings },
    ],
  },
]

export function SidebarDynamic() {
  const { activeSection, sidebarOpen, setActiveSection, toggleSidebar } =
    useDashboardStore()
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(menuGroups.map((g) => g.label))
  )

  const toggleGroup = (label: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(label)) {
      newExpanded.delete(label)
    } else {
      newExpanded.add(label)
    }
    setExpandedGroups(newExpanded)
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-20 left-4 z-40 p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed left-0 top-0 h-screen pt-20 w-64 bg-white border-r border-gray-200 overflow-y-auto z-50 lg:z-auto lg:static lg:translate-x-0"
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Cloud</p>
              <p className="text-xs text-gray-500">Creator Platform</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {menuGroups.map((group) => (
              <div key={group.label}>
                {group.items.length > 1 ? (
                  <>
                    <button
                      onClick={() => toggleGroup(group.label)}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedGroups.has(group.label) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedGroups.has(group.label) && (
                      <div className="ml-4 mt-2 space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon
                          const isActive = activeSection === item.id
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveSection(item.id)}
                              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                                isActive
                                  ? 'bg-blue-50 text-blue-600 font-medium'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  group.items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </button>
                    )
                  })
                )}
              </div>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => toggleSidebar()}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </>
  )
}
