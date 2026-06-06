'use client'

import { DashboardNavbar } from './dashboard-navbar'
import { SidebarNew } from './sidebar-new'

export function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="flex pt-16">
        <SidebarNew />
        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
