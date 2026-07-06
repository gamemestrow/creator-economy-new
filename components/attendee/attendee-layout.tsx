'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight, ArrowLeft, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FloatingChat } from '@/components/floating-chat'
import { useState } from 'react'
import { UpgradePlanModal } from '@/components/upgrade-plan-modal'
import AttendeeSidebar from './attendee-sidebar'
import AttendeeHeader from './attendee-header'

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


function AttendeeMain({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  return (
    <main
      className={cn(
        'min-h-screen flex-1 bg-[#F8F8F5] p-6 transition-[margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:p-8'
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

export function AttendeeAppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F8F5] relative">
      <AttendeeHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <AttendeeSidebar sidebarOpen={sidebarOpen} />
        <AttendeeMain>{children}</AttendeeMain>
      </div>
      <FloatingChat />
    </div>
  )
}