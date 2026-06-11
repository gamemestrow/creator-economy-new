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
} from 'lucide-react'
import { PRODUCT_NAME } from '@/components/sidebar/sidebar-config'

interface UserData {
  name: string
  email: string
}

export default function AttendeeDashboardPage() {
  const router = useRouter()
  const { loading: authLoading, user, authorized } = useRequireRole(['attendee'])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#2563EB]" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">{PRODUCT_NAME}</span>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <span className="text-sm text-gray-600">{userData?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 top-16 left-0 w-64 border-r border-gray-200 bg-white p-6 transition-transform md:relative md:top-0 md:translate-x-0 md:border-r ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-lg bg-blue-600/10 px-4 py-3 text-left font-medium text-blue-600">
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              <BookOpen className="h-5 w-5" />
              My Courses
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              <Award className="h-5 w-5" />
              Certificates
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              <Users className="h-5 w-5" />
              Community
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
              Settings
            </button>
          </nav>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100 md:hidden"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-6 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {userData?.name}! 🎓
              </h1>
              <p className="mt-2 text-gray-600">
                Continue learning and grow your skills.
              </p>
            </div>

            {/* Dashboard Stats */}
            <div className="mb-8">
              <DashboardStats stats={stats} loading={statsLoading} />
            </div>

            {/* Featured Courses */}
            <div className="mb-8">
              {user && <FeaturedCourses userId={user.uid} />}
            </div>

            {/* Upcoming Events */}
            <div className="mb-8">
              {user && <UpcomingEvents userId={user.uid} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
  