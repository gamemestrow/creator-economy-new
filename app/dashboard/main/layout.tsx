import { TopNavbar } from '@/components/top-navbar'
import { SidebarDynamic } from '@/components/sidebar-dynamic'

export default function MainDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavbar />
      <div className="flex pt-20">
        <SidebarDynamic />
        <main className="flex-1 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  )
}
