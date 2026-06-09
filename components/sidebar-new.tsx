'use client'

import { useState, useEffect } from 'react'
import { 
  ChevronDown, Search, LayoutGrid, Package, ArrowLeftRight, 
  MonitorPlay, Users, Megaphone, Cpu, Smartphone, MessagesSquare, 
  Trophy, Share2, BarChart3, Settings, Menu, X, Sparkles, ChevronLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarSubitem {
  label: string
  id: string
}

interface SidebarGroup {
  id: string
  label: string
  icon: React.ReactNode
  items: SidebarSubitem[]
}

interface SidebarNewProps {
  activeTab: string
  onSelectTab: (tabId: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function SidebarNew({ activeTab, onSelectTab, isCollapsed, onToggleCollapse }: SidebarNewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['dashboard', 'products', 'automation'])

  const menuGroups: SidebarGroup[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutGrid className="w-5 h-5" />,
      items: [
        { label: 'Overview', id: 'dashboard-overview' },
        { label: 'Analytics', id: 'dashboard-analytics' },
        { label: 'Reports', id: 'dashboard-reports' },
      ],
    },
    {
      id: 'products',
      label: 'Products',
      icon: <Package className="w-5 h-5" />,
      items: [
        { label: 'Courses', id: 'products-courses' },
        { label: 'Digital Products', id: 'products-digital' },
        { label: 'Memberships', id: 'products-memberships' },
        { label: 'Workshops', id: 'products-workshops' },
        { label: 'Webinars', id: 'products-webinars' },
        { label: 'Coaching Programs', id: 'products-coaching' },
      ],
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: <ArrowLeftRight className="w-5 h-5" />,
      items: [
        { label: 'Orders', id: 'sales-orders' },
        { label: 'Revenue', id: 'sales-revenue' },
        { label: 'Transactions', id: 'sales-transactions' },
        { label: 'Coupons', id: 'sales-coupons' },
      ],
    },
    {
      id: 'website',
      label: 'Website Builder',
      icon: <MonitorPlay className="w-5 h-5" />,
      items: [
        { label: 'Landing Pages', id: 'website-landing' },
        { label: 'Website Pages', id: 'website-pages' },
        { label: 'Funnels', id: 'website-funnels' },
        { label: 'Forms', id: 'website-forms' },
        { label: 'Templates', id: 'website-templates' },
      ],
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Users className="w-5 h-5" />,
      items: [
        { label: 'Users', id: 'customers-users' },
        { label: 'Leads', id: 'customers-leads' },
        { label: 'Subscribers', id: 'customers-subscribers' },
        { label: 'Community Members', id: 'customers-members' },
      ],
    },
    {
      id: 'marketing',
      label: 'Marketing',
      icon: <Megaphone className="w-5 h-5" />,
      items: [
        { label: 'Broadcasts', id: 'marketing-broadcasts' },
        { label: 'Email Campaigns', id: 'marketing-email' },
        { label: 'Push Notifications', id: 'marketing-push' },
        { label: 'Banners', id: 'marketing-banners' },
      ],
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: <Cpu className="w-5 h-5" />,
      items: [
        { label: 'Email Automation', id: 'automation-email' },
        { label: 'WhatsApp Automation', id: 'automation-whatsapp' },
        { label: 'Workflows', id: 'automation-workflows' },
        { label: 'Triggers', id: 'automation-triggers' },
        { label: 'Sequences', id: 'automation-sequences' },
      ],
    },
    {
      id: 'mobile',
      label: 'Mobile App',
      icon: <Smartphone className="w-5 h-5" />,
      items: [
        { label: 'App Configuration', id: 'mobile-config' },
        { label: 'App Branding', id: 'mobile-branding' },
        { label: 'App Publishing', id: 'mobile-publishing' },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      icon: <MessagesSquare className="w-5 h-5" />,
      items: [
        { label: 'Groups', id: 'community-groups' },
        { label: 'Feed', id: 'community-feed' },
        { label: 'Discussions', id: 'community-discussions' },
        { label: 'Events', id: 'community-events' },
      ],
    },
    {
      id: 'gamification',
      label: 'Gamification',
      icon: <Trophy className="w-5 h-5" />,
      items: [
        { label: 'Points', id: 'gamification-points' },
        { label: 'Badges', id: 'gamification-badges' },
        { label: 'Leaderboards', id: 'gamification-leaderboards' },
        { label: 'Rewards', id: 'gamification-rewards' },
      ],
    },
    {
      id: 'partnerships',
      label: 'Partnerships',
      icon: <Share2 className="w-5 h-5" />,
      items: [
        { label: 'Affiliates', id: 'partnerships-affiliates' },
        { label: 'Referral Programs', id: 'partnerships-referral' },
        { label: 'Partner Management', id: 'partnerships-management' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      items: [
        { label: 'User Analytics', id: 'analytics-user' },
        { label: 'Sales Analytics', id: 'analytics-sales' },
        { label: 'Course Analytics', id: 'analytics-course' },
        { label: 'Funnel Analytics', id: 'analytics-funnel' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      items: [
        { label: 'Platform Settings', id: 'settings-platform' },
        { label: 'Security', id: 'settings-security' },
        { label: 'Team Management', id: 'settings-team' },
        { label: 'Integrations', id: 'settings-integrations' },
        { label: 'Billing', id: 'settings-billing' },
      ],
    },
  ]

  // Auto-expand group containing the active tab on mount/change
  useEffect(() => {
    const activeGroup = menuGroups.find(group => 
      group.items.some(item => item.id === activeTab)
    )
    if (activeGroup && !expandedGroups.includes(activeGroup.id)) {
      setExpandedGroups(prev => [...prev, activeGroup.id])
    }
  }, [activeTab])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId) ? prev.filter(g => g !== groupId) : [...prev, groupId]
    )
  }

  // Filter groups based on search
  const filteredGroups = menuGroups.filter(group => {
    const groupMatches = group.label.toLowerCase().includes(searchQuery.toLowerCase())
    const itemMatches = group.items.some(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    return groupMatches || itemMatches
  })

  return (
    <div 
      className={cn(
        "fixed left-0 top-16 bottom-0 bg-white border-r border-slate-100 flex flex-col z-30 select-none shadow-sm transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Collapse button floating */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-4 w-6 h-6 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm text-slate-500 hover:text-[#f06529] z-50 hover:shadow-md transition-all"
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
      </button>

      {/* Search Bar - Hidden when collapsed */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-50">
          <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 group focus-within:border-slate-200 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 group-focus-within:text-slate-600 transition-colors" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder-slate-400"
            />
          </div>
        </div>
      )}

      {/* Navigation Group Scroller */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200">
        {filteredGroups.map((group) => {
          const isExpanded = expandedGroups.includes(group.id)
          const isGroupActive = group.items.some(item => item.id === activeTab)

          return (
            <div key={group.id} className="space-y-0.5">
              {/* Group Trigger */}
              <button
                onClick={() => {
                  if (isCollapsed) onToggleCollapse()
                  toggleGroup(group.id)
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all border-l-[3.5px]",
                  isGroupActive
                    ? "bg-slate-50/80 text-slate-900 border-[#f06529]"
                    : "text-slate-500 border-transparent hover:bg-slate-50/50 hover:text-slate-800"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(isGroupActive ? "text-[#f06529]" : "text-slate-400")}>
                    {group.icon}
                  </span>
                  {!isCollapsed && <span>{group.label}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 text-slate-400 transition-transform duration-200",
                      isExpanded && "rotate-180 text-slate-600"
                    )}
                  />
                )}
              </button>

              {/* Submenu Items */}
              {!isCollapsed && isExpanded && (
                <div className="pl-6 pr-1 py-0.5 space-y-0.5 border-l border-slate-50 ml-[18px]">
                  {group.items
                    .filter(sub => sub.label.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((sub) => {
                      const isActive = activeTab === sub.id
                      return (
                        <button
                          key={sub.id}
                          onClick={() => onSelectTab(sub.id)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold rounded-lg text-left transition-all",
                            isActive
                              ? "bg-[#fff6f0] text-[#f06529]"
                              : "text-slate-400 hover:bg-slate-50/50 hover:text-slate-700"
                          )}
                        >
                          {sub.label}
                        </button>
                      )
                    })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Partner Callout bottom banner */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-50 bg-white">
          <button 
            onClick={() => onSelectTab('partnerships-affiliates')}
            className="w-full text-left bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 transition shadow-sm relative overflow-hidden group hover:shadow-md"
          >
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-2 translate-y-2 pointer-events-none group-hover:scale-110 transition-transform">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-1">
              <h5 className="text-[11px] font-bold text-white tracking-wide">
                Apex Partner System
              </h5>
              <p className="text-[9px] text-slate-300 font-medium leading-normal max-w-[170px]">
                Invite members and earn up to 30% monthly commission.
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
