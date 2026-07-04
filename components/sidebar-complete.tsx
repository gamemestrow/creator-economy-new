'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, LayoutDashboard, ShoppingBag, TrendingUp, Globe, Users, Mail, Zap, Smartphone, Users2, Trophy, Handshake, BarChart3, Settings, Cloud } from 'lucide-react'
import { useDashboardStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'

export function SidebarComplete() {
  const [isOpen, setIsOpen] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    dashboard: true,
    products: true,
    sales: true,
    customers: true,
    marketing: true,
    automation: true,
  })
  const { activeSection, setActiveSection, activeSubsection, setActiveSubsection } = useDashboardStore()

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const menuGroups = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard }
      ]
    },
    {
      id: 'products',
      label: 'Products',
      icon: ShoppingBag,
      items: [
        { id: 'courses', label: 'Courses', icon: ShoppingBag },
        { id: 'digital-products', label: 'Digital Products', icon: ShoppingBag },
        { id: 'memberships', label: 'Memberships', icon: ShoppingBag },
      ]
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: TrendingUp,
      items: [
        { id: 'orders', label: 'Orders', icon: TrendingUp },
        { id: 'revenue', label: 'Revenue', icon: TrendingUp },
        { id: 'customers', label: 'Customers', icon: Users },
      ]
    },
    {
      id: 'website',
      label: 'Website Builder',
      icon: Globe,
      items: [
        { id: 'landing-pages', label: 'Landing Pages', icon: Globe },
        { id: 'sales-pages', label: 'Sales Pages', icon: Globe },
        { id: 'funnels', label: 'Funnels', icon: Globe },
      ]
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      items: [
        { id: 'all-customers', label: 'All Customers', icon: Users },
        { id: 'segments', label: 'Segments', icon: Users },
        { id: 'tags', label: 'Tags & Groups', icon: Users },
      ]
    },
    {
      id: 'marketing',
      label: 'Marketing',
      icon: Mail,
      items: [
        { id: 'campaigns', label: 'Campaigns', icon: Mail },
        { id: 'templates', label: 'Templates', icon: Mail },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ]
    },
    {
      id: 'automation',
      label: 'Automation & Integrations',
      icon: Zap,
      items: [
        { id: 'email-automation', label: 'Email Automation', icon: Mail },
        { id: 'whatsapp-automation', label: 'WhatsApp Automation', icon: Smartphone },
        { id: 'workflows', label: 'Workflows', icon: Zap },
        { id: 'integrations', label: 'Integrations', icon: Zap },
      ]
    },
    {
      id: 'mobile',
      label: 'Mobile App',
      icon: Smartphone,
      items: [
        { id: 'app-distribution', label: 'App Distribution', icon: Smartphone },
        { id: 'push-notifications', label: 'Push Notifications', icon: Smartphone },
      ]
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users2,
      items: [
        { id: 'forums', label: 'Forums', icon: Users2 },
        { id: 'discussions', label: 'Discussions', icon: Users2 },
      ]
    },
    {
      id: 'gamification',
      label: 'Gamification',
      icon: Trophy,
      items: [
        { id: 'badges', label: 'Badges & Points', icon: Trophy },
        { id: 'leaderboards', label: 'Leaderboards', icon: Trophy },
      ]
    },
    {
      id: 'partnerships',
      label: 'Partnerships & Affiliates',
      icon: Handshake,
      items: [
        { id: 'affiliate-program', label: 'Affiliate Program', icon: Handshake },
        { id: 'partner-program', label: 'Partner Program', icon: Handshake },
      ]
    },
    {
      id: 'analytics-main',
      label: 'Analytics',
      icon: BarChart3,
      items: [
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'insights', label: 'Insights', icon: BarChart3 },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      items: [
        { id: 'account', label: 'Account', icon: Settings },
        { id: 'security', label: 'Security', icon: Settings },
        { id: 'notifications', label: 'Notifications', icon: Settings },
      ]
    }
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 hover:bg-muted rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-foreground/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -384 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full w-96 bg-white border-r border-border z-40 lg:relative lg:translate-x-0 overflow-y-auto"
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-[14px] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <Cloud className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Cloud</span>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuGroups.map((group) => (
            <div key={group.id}>
              <button
                onClick={() => {
                  toggleGroup(group.id)
                  setActiveSection(group.id)
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  activeSection === group.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <group.icon className="w-5 h-5" />
                  <span className="font-medium">{group.label}</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedGroups[group.id] ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              {/* Submenu Items */}
              <AnimatePresence>
                {expandedGroups[group.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 space-y-1 mt-1 pb-2">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveSection(group.id)
                            setActiveSubsection(item.id)
                            setIsOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                            activeSubsection === item.id && activeSection === group.id
                              ? 'bg-primary/20 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
