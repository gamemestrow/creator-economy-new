'use client'

import { useDashboardStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { DashboardOverview } from '@/components/content-views/dashboard-overview'
import { ProductsView } from '@/components/content-views/products-view'
import { SalesView } from '@/components/content-views/sales-view'
import { CustomersView } from '@/components/content-views/customers-view'
import { MarketingView } from '@/components/content-views/marketing-view'
import { AnalyticsView } from '@/components/content-views/analytics-view'
import { EmailAutomationView } from '@/components/content-views/email-automation-view'
import { PageBuilderView } from '@/components/content-views/page-builder-view'
import { SettingsView } from '@/components/content-views/settings-view'
import { PlaceholderView } from '@/components/content-views/placeholder-view'
import {
  Smartphone,
  MessageSquare,
  Gamepad2,
  Handshake,
  TrendingUp,
} from 'lucide-react'

export default function DashboardMainPage() {
  const { activeSection } = useDashboardStore()

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />
      case 'products':
        return <ProductsView />
      case 'sales':
        return <SalesView />
      case 'customers':
        return <CustomersView />
      case 'marketing':
        return <MarketingView />
      case 'analytics':
        return <AnalyticsView />
      case 'email-automation':
        return <EmailAutomationView />
      case 'page-builder':
        return <PageBuilderView />
      case 'settings':
        return <SettingsView />
      case 'mobile-app':
        return (
          <PlaceholderView
            title="Mobile App"
            description="Manage your iOS and Android apps"
            icon={<Smartphone className="w-12 h-12" />}
          />
        )
      case 'community':
        return (
          <PlaceholderView
            title="Community"
            description="Build and manage your community platform"
            icon={<MessageSquare className="w-12 h-12" />}
          />
        )
      case 'gamification':
        return (
          <PlaceholderView
            title="Gamification"
            description="Create badges, points, and leaderboards"
            icon={<Gamepad2 className="w-12 h-12" />}
          />
        )
      case 'partnerships':
        return (
          <PlaceholderView
            title="Partnerships"
            description="Manage your partnership programs"
            icon={<Handshake className="w-12 h-12" />}
          />
        )
      case 'affiliates':
        return (
          <PlaceholderView
            title="Affiliates"
            description="Track affiliate performance and commissions"
            icon={<TrendingUp className="w-12 h-12" />}
          />
        )
      case 'api-webhooks':
        return (
          <PlaceholderView
            title="API & Webhooks"
            description="Integrate with external services"
            icon={<TrendingUp className="w-12 h-12" />}
          />
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8"
    >
      {renderContent()}
    </motion.div>
  )
}
