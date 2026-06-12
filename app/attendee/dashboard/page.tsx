'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useDashboardStats } from '@/lib/hooks/use-attendee-data'
import { DashboardStats, FeaturedCourses, UpcomingEvents } from '@/components/attendee'
import {
  Sparkles,
  BookOpen,
  Users,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Crown,
} from 'lucide-react'
import { PRODUCT_NAME } from '@/components/sidebar/sidebar-config'
import { FloatingChat } from '@/components/floating-chat'
import { UpgradePlanModal } from '@/components/upgrade-plan-modal'
import { cn } from '@/lib/utils'

interface UserData {
  name: string
  email: string
}

export default function AttendeeDashboardPage() {
  const router = useRouter()
  const { loading: authLoading, user, authorized } = useRequireRole(['attendee'])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const { stats, loading: statsLoading } = useDashboardStats(user?.uid || '')

  useEffect(() => {
    if (user && authorized) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          const data = userDocSnap.data()
          setUserData({
            name: data.name || user.displayName || 'Attendee',
            email: user.email || '',
          })
        }
      }
      fetchUserData()
    }
  }, [user, authorized])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }  

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#2563EB]" />
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB] shadow-lg shadow-blue-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:inline-block">{PRODUCT_NAME}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Crown className="w-4 h-4" />
                <span className="hidden xs:inline">Upgrade</span>
                <span className="hidden sm:inline">to Pro</span>
              </button>
              
              <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />
              
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">{userData?.name}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        <aside
          className={cn(
            "fixed inset-y-0 top-[73px] left-0 w-64 border-r border-gray-200 bg-white p-6 transition-transform duration-300 z-20 md:relative md:top-0 md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="space-y-1">
            {[
              { icon: BarChart3, label: 'Dashboard', active: true },
              { icon: BookOpen, label: 'My Courses' },
              { icon: Award, label: 'Certificates' },
              { icon: Users, label: 'Community' },
              { icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.label}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition-colors",
                  item.active 
                    ? "bg-[#2563EB]/10 text-[#2563EB]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-gray-100 pt-4 md:hidden">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 font-medium hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden top-[73px]" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome, {userData?.name}! 🎓
              </h1>
              <p className="mt-1 text-gray-600 text-sm sm:text-base">
                Continue learning and grow your skills.
              </p>
            </div>

            <div className="mb-8">
              <DashboardStats stats={stats} loading={statsLoading} />
            </div>

            <div className="space-y-8">
              {user && <FeaturedCourses userId={user.uid} />}
              {user && <UpcomingEvents userId={user.uid} />}
            </div>
          </div>
        </main>
      </div>
      <FloatingChat />
      <UpgradePlanModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  )
}
