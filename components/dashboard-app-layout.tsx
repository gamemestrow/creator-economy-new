'use client'

import { AdminSidebar, useSidebarWidth } from '@/components/sidebar/admin-sidebar'
import { cn } from '@/lib/utils'

function DashboardMain({ children }: { children: React.ReactNode }) {
  const sidebarWidth = useSidebarWidth()

  return (
    <main
      style={{ marginLeft: sidebarWidth }}
      className={cn(
        'min-h-screen flex-1 bg-[#F8FAFC] p-6 transition-[margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:p-8'
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  )
}

export function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />
      <DashboardMain>{children}</DashboardMain>
    </div>
  )
}
