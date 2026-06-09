'use client'

import { useDashboardStore } from '@/lib/store'
import { motion } from 'framer-motion'
import { Package, Users, TrendingUp, FileText, Funnel, Tag, Zap, Plug, Download, Bell, Smartphone, MessageCircle, MessageSquare, Handshake, Lightbulb, Shield } from 'lucide-react'
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
import { WhatsAppAutomationView } from '@/components/content-views/whatsapp-automation-view'
import { LandingPagesView } from '@/components/content-views/landing-pages-view'
import { GamificationDetailedView } from '@/components/content-views/gamification-detailed-view'
import { AffiliateProgramView } from '@/components/content-views/affiliate-program-view'

export default function DashboardMainPage() {
  const { activeSection, activeSubsection } = useDashboardStore()

  const renderContent = () => {
    switch (activeSection) {
      // Dashboard
      case 'dashboard':
        return <DashboardOverview />

      // Products
      case 'products':
        switch (activeSubsection) {
          case 'courses':
            return <ProductsView />
          case 'digital-products':
            return <PlaceholderView title="Digital Products" description="Manage your digital product catalog" icon={<Package className="w-12 h-12" />} />
          case 'memberships':
            return <PlaceholderView title="Memberships" description="Create and manage membership levels" icon={<Users className="w-12 h-12" />} />
          default:
            return <ProductsView />
        }

      // Sales
      case 'sales':
        switch (activeSubsection) {
          case 'orders':
            return <SalesView />
          case 'revenue':
            return <PlaceholderView title="Revenue Analytics" description="Track your revenue and earnings" icon={<TrendingUp className="w-12 h-12" />} />
          case 'customers':
            return <CustomersView />
          default:
            return <SalesView />
        }

      // Website Builder
      case 'website':
        switch (activeSubsection) {
          case 'landing-pages':
            return <LandingPagesView />
          case 'sales-pages':
            return <PlaceholderView title="Sales Pages" description="Create high-converting sales pages" icon={<FileText className="w-12 h-12" />} />
          case 'funnels':
            return <PlaceholderView title="Sales Funnels" description="Build complete sales funnels" icon={<Funnel className="w-12 h-12" />} />
          default:
            return <LandingPagesView />
        }

      // Customers
      case 'customers':
        switch (activeSubsection) {
          case 'all-customers':
            return <CustomersView />
          case 'segments':
            return <PlaceholderView title="Customer Segments" description="Segment your audience" icon={<Users className="w-12 h-12" />} />
          case 'tags':
            return <PlaceholderView title="Tags & Groups" description="Organize customers with tags" icon={<Tag className="w-12 h-12" />} />
          default:
            return <CustomersView />
        }

      // Marketing
      case 'marketing':
        switch (activeSubsection) {
          case 'campaigns':
            return <MarketingView />
          case 'templates':
            return <PlaceholderView title="Email Templates" description="Manage email templates" icon={<FileText className="w-12 h-12" />} />
          case 'analytics':
            return <AnalyticsView />
          default:
            return <MarketingView />
        }

      // Automation & Integrations
      case 'automation':
        switch (activeSubsection) {
          case 'email-automation':
            return <EmailAutomationView />
          case 'whatsapp-automation':
            return <WhatsAppAutomationView />
          case 'workflows':
            return <PlaceholderView title="Workflows" description="Create automated workflows" icon={<Zap className="w-12 h-12" />} />
          case 'integrations':
            return <PlaceholderView title="Integrations" description="Connect with third-party tools" icon={<Plug className="w-12 h-12" />} />
          default:
            return <EmailAutomationView />
        }

      // Mobile App
      case 'mobile':
        switch (activeSubsection) {
          case 'app-distribution':
            return <PlaceholderView title="App Distribution" description="Manage app store listings" icon={<Download className="w-12 h-12" />} />
          case 'push-notifications':
            return <PlaceholderView title="Push Notifications" description="Send push notifications" icon={<Bell className="w-12 h-12" />} />
          default:
            return <PlaceholderView title="Mobile App" description="Manage your mobile applications" icon={<Smartphone className="w-12 h-12" />} />
        }

      // Community
      case 'community':
        switch (activeSubsection) {
          case 'forums':
            return <PlaceholderView title="Forums" description="Manage community forums" icon={<MessageCircle className="w-12 h-12" />} />
          case 'discussions':
            return <PlaceholderView title="Discussions" description="Manage discussions" icon={<MessageSquare className="w-12 h-12" />} />
          default:
            return <PlaceholderView title="Community" description="Build and manage your community" icon={<Users className="w-12 h-12" />} />
        }

      // Gamification
      case 'gamification':
        switch (activeSubsection) {
          case 'badges':
            return <GamificationDetailedView />
          case 'leaderboards':
            return <GamificationDetailedView />
          default:
            return <GamificationDetailedView />
        }

      // Partnerships & Affiliates
      case 'partnerships':
        switch (activeSubsection) {
          case 'affiliate-program':
            return <AffiliateProgramView />
          case 'partner-program':
            return <PlaceholderView title="Partner Program" description="Manage your partner network" icon={<Handshake className="w-12 h-12" />} />
          default:
            return <AffiliateProgramView />
        }

      // Analytics Main
      case 'analytics-main':
        switch (activeSubsection) {
          case 'reports':
            return <AnalyticsView />
          case 'insights':
            return <PlaceholderView title="Insights" description="Get actionable insights" icon={<Lightbulb className="w-12 h-12" />} />
          default:
            return <AnalyticsView />
        }

      // Settings
      case 'settings':
        switch (activeSubsection) {
          case 'account':
            return <SettingsView />
          case 'security':
            return <PlaceholderView title="Security Settings" description="Manage account security" icon={<Shield className="w-12 h-12" />} />
          case 'notifications':
            return <PlaceholderView title="Notification Preferences" description="Manage your notifications" icon={<Bell className="w-12 h-12" />} />
          default:
            return <SettingsView />
        }

      // Default
      default:
        return <DashboardOverview />
    }
  }

  return (
    <motion.div
      key={`${activeSection}-${activeSubsection}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-auto"
    >
      <div className="p-8">
        {renderContent()}
      </div>
    </motion.div>
  )
}
