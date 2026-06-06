'use client'

import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        {children}
      </div>
    </div>
  )
}
