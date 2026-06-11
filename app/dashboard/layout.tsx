import { DashboardAppLayout } from '@/components/dashboard-app-layout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardAppLayout>{children}</DashboardAppLayout>
}
