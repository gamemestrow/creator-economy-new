'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight, ArrowLeft, Crown } from 'lucide-react'
import { AdminSidebar, useSidebarWidth } from '@/components/sidebar/admin-sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FloatingChat } from '@/components/floating-chat'
import { useState } from 'react'
import { UpgradePlanModal } from '@/components/upgrade-plan-modal'

function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`
        const isLast = index === paths.length - 1
        const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')

        return (
          <div key={path} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-3 h-3" />}
            {isLast ? (
              <span className="text-foreground font-bold">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

function DashboardMain({ children }: { children: React.ReactNode }) {
  const sidebarWidth = useSidebarWidth()
  const router = useRouter()
  const pathname = usePathname()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  return (
    <main
      style={{ marginLeft: sidebarWidth }}
      className={cn(
        'min-h-screen flex-1 bg-[#F7F7F4] p-6 transition-[margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:p-8'
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-2">
          <Breadcrumbs />
          <div className="flex items-center gap-4">
            {pathname !== '/dashboard/analytics/overview' && (
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>
        </div>
        {children}
      </div>
      <UpgradePlanModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </main>
  )
}

export function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F7F4] relative">
      <AdminSidebar />
      <DashboardMain>{children}</DashboardMain>
      <FloatingChat />
    </div>
  )
}
