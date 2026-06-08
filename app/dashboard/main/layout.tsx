import { TopNavbar } from '@/components/top-navbar'
import { SidebarComplete } from '@/components/sidebar-complete'

export default function MainDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="flex pt-20">
        <SidebarComplete />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
