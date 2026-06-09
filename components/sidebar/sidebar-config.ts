import {
  LayoutDashboard,
  BarChart3,
  Package,
  ArrowLeftRight,
  LayoutTemplate,
  Users,
  Megaphone,
  Workflow,
  CalendarDays,
  Trophy,
  Handshake,
  Smartphone,
  CreditCard,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  badge?: number | string
  keywords?: string[]
}

export type NavGroup = {
  id: string
  label: string
  icon: LucideIcon
  items: NavItem[]
}

export type NavStandalone = {
  id: string
  label: string
  href: string
  icon: LucideIcon
}

export const PRODUCT_NAME = 'CreatorWorks Cloud'

export const dashboardLink: NavStandalone = {
  id: 'dashboard',
  label: 'Dashboard',
  href: '/dashboard/getstarted',
  icon: LayoutDashboard,
}

export const navGroups: NavGroup[] = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    items: [
      { label: 'Overview', href: '/dashboard/analytics/overview' },
      { label: 'Revenue Analytics', href: '/dashboard/analytics/revenue' },
      { label: 'User Analytics', href: '/dashboard/analytics/user' },
      { label: 'Engagement Analytics', href: '/dashboard/analytics/engagement' },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    items: [
      { label: 'Courses', href: '/dashboard/products/courses' },
      { label: 'Memberships', href: '/dashboard/products/memberships' },
      { label: 'Communities', href: '/dashboard/products/communities' },
      { label: 'Digital Downloads', href: '/dashboard/products/digital-downloads' },
      { label: 'Bundles', href: '/dashboard/products/bundles' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: ArrowLeftRight,
    items: [
      { label: 'Orders', href: '/dashboard/sales/orders', badge: 12 },
      { label: 'Transactions', href: '/dashboard/sales/transactions' },
      { label: 'Subscriptions', href: '/dashboard/sales/subscriptions' },
      { label: 'Payouts', href: '/dashboard/sales/payouts' },
      { label: 'Refunds', href: '/dashboard/sales/refunds' },
    ],
  },
  {
    id: 'landing-pages',
    label: 'Landing Pages',
    icon: LayoutTemplate,
    items: [
      { label: 'Page Builder', href: '/dashboard/landing-pages/page-builder' },
      { label: 'Templates', href: '/dashboard/landing-pages/templates' },
      { label: 'Forms', href: '/dashboard/landing-pages/forms' },
      { label: 'Funnels', href: '/dashboard/landing-pages/funnels' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    items: [
      { label: 'Users', href: '/dashboard/customers/users' },
      { label: 'Segments', href: '/dashboard/customers/segments' },
      { label: 'CRM', href: '/dashboard/customers/crm' },
      { label: 'Leads', href: '/dashboard/customers/leads', badge: 5 },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: Megaphone,
    items: [
      { label: 'Email Campaigns', href: '/dashboard/marketing/email-campaigns' },
      { label: 'WhatsApp Automation', href: '/dashboard/marketing/whatsapp-automation' },
      { label: 'Push Notifications', href: '/dashboard/marketing/push-notifications' },
      { label: 'Broadcasts', href: '/dashboard/marketing/broadcasts' },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: Workflow,
    items: [
      { label: 'Workflow Builder', href: '/dashboard/automation/workflow-builder' },
      { label: 'Triggers', href: '/dashboard/automation/triggers' },
      { label: 'Email Sequences', href: '/dashboard/automation/email-sequences' },
      { label: 'WhatsApp Flows', href: '/dashboard/automation/whatsapp-flows' },
    ],
  },
  {
    id: 'live-events',
    label: 'Live Events',
    icon: CalendarDays,
    items: [
      { label: 'Webinars', href: '/dashboard/live-events/webinars' },
      { label: 'Workshops', href: '/dashboard/live-events/workshops' },
      { label: 'Event Calendar', href: '/dashboard/live-events/event-calendar' },
      { label: 'Registrations', href: '/dashboard/live-events/registrations' },
    ],
  },
  {
    id: 'gamification',
    label: 'Gamification',
    icon: Trophy,
    items: [
      { label: 'Leaderboards', href: '/dashboard/gamification/leaderboards' },
      { label: 'Badges', href: '/dashboard/gamification/badges' },
      { label: 'XP System', href: '/dashboard/gamification/xp-system' },
      { label: 'Challenges', href: '/dashboard/gamification/challenges' },
    ],
  },
  {
    id: 'partnerships',
    label: 'Partnerships',
    icon: Handshake,
    items: [
      { label: 'Affiliates', href: '/dashboard/partnerships/affiliates' },
      { label: 'Referral Program', href: '/dashboard/partnerships/referral-program' },
      { label: 'Commission Tracking', href: '/dashboard/partnerships/commission-tracking' },
    ],
  },
  {
    id: 'mobile-app',
    label: 'Mobile App',
    icon: Smartphone,
    items: [
      { label: 'App Branding', href: '/dashboard/mobile-app/app-branding' },
      { label: 'Push Notifications', href: '/dashboard/mobile-app/push-notifications' },
      { label: 'App Analytics', href: '/dashboard/mobile-app/app-analytics' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: CreditCard,
    items: [
      { label: 'Razorpay', href: '/dashboard/payments/razorpay' },
      { label: 'Stripe', href: '/dashboard/payments/stripe' },
      { label: 'PayPal', href: '/dashboard/payments/paypal' },
      { label: 'Billing', href: '/dashboard/payments/billing' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    items: [
      { label: 'General', href: '/dashboard/settings/general' },
      { label: 'Team Members', href: '/dashboard/settings/team-members' },
      { label: 'Roles & Permissions', href: '/dashboard/settings/roles-permissions' },
      { label: 'Security', href: '/dashboard/settings/security' },
      { label: 'Integrations', href: '/dashboard/settings/integrations' },
    ],
  },
]

export type FlatNavEntry = {
  label: string
  href: string
  group?: string
  icon: LucideIcon
  badge?: number | string
}

export function flattenNavItems(): FlatNavEntry[] {
  const items: FlatNavEntry[] = [
    {
      label: dashboardLink.label,
      href: dashboardLink.href,
      icon: dashboardLink.icon,
    },
  ]

  for (const group of navGroups) {
    for (const item of group.items) {
      items.push({
        label: item.label,
        href: item.href,
        group: group.label,
        icon: group.icon,
        badge: item.badge,
      })
    }
  }

  return items
}

export function filterNavGroups(query: string): NavGroup[] {
  const q = query.trim().toLowerCase()
  if (!q) return navGroups

  return navGroups
    .map((group) => {
      const groupMatches = group.label.toLowerCase().includes(q)
      const filteredItems = group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.href.toLowerCase().includes(q) ||
          groupMatches
      )
      if (groupMatches || filteredItems.length > 0) {
        return { ...group, items: groupMatches ? group.items : filteredItems }
      }
      return null
    })
    .filter(Boolean) as NavGroup[]
}

export function isRouteActive(pathname: string, href: string): boolean {
  if (href === '/dashboard/getstarted') {
    return pathname === href || pathname === '/dashboard'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function getActiveGroupId(pathname: string): string | null {
  for (const group of navGroups) {
    if (group.items.some((item) => isRouteActive(pathname, item.href))) {
      return group.id
    }
  }
  return null
}
