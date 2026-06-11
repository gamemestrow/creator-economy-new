'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useRequireRole } from '@/lib/use-auth-redirect'
import {
  Sparkles,
  BarChart3,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Eye,
} from 'lucide-react'
import { PRODUCT_NAME } from '@/components/sidebar/sidebar-config'
import { CreateCourseForm } from '@/components/creator/CreateCourseForm'
import { createCourse } from '@/lib/firestore/courses'

interface UserData {
  name: string
  email: string
}

export default function CreatorDashboardPage() {
  const router = useRouter()
  const { loading, user, authorized } = useRequireRole(['creator'])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    if (user && authorized) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          const data = userDocSnap.data()
          setUserData({
            name: data.name || user.displayName || 'Creator',
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

  if (loading) {
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]">
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
          className={`fixed inset-y-0 top-16 left-0 w-64 border-r border-gray-200 bg-white p-6 transition-transform md:relative md:top-0 md:translate-x-0 md:border-r ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-lg bg-[#2563EB]/10 px-4 py-3 text-left font-medium text-[#2563EB]">
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              <BookOpen className="h-5 w-5" />
              Courses
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              <Users className="h-5 w-5" />
              Audience
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-100">
              <DollarSign className="h-5 w-5" />
              Earnings
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
                Welcome back, {userData?.name}! 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Here's what's happening with your creator business today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Revenue Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <DollarSign className="h-6 w-6 text-[#2563EB]" />
                </div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">$0.00</p>
                <p className="mt-1 text-xs text-gray-500">No transactions yet</p>
              </div>

              {/* Students Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-[#2563EB]" />
                </div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">0</p>
                <p className="mt-1 text-xs text-gray-500">Start creating to attract students</p>
              </div>

              {/* Courses Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">0</p>
                <p className="mt-1 text-xs text-gray-500">Create your first course</p>
              </div>

              {/* Views Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Profile Views</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">0</p>
                <p className="mt-1 text-xs text-gray-500">Share your profile to attract viewers</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="rounded-lg border-2 border-dashed border-[#2563EB]/30 bg-blue-50/50 px-6 py-8 text-center transition-colors hover:bg-blue-100/50"
                >
                  <BookOpen className="mx-auto mb-2 h-8 w-8 text-[#2563EB]" />
                  <p className="font-medium text-gray-900">Create Course</p>
                  <p className="text-xs text-gray-600">Build and publish a new course</p>
                </button>
                {showCreateForm && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    onClick={(e) => {
                      if (e.target === e.currentTarget) setShowCreateForm(false)
                    }}
                  >
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl">
                      <CreateCourseForm
                        onSubmit={async (data) => {
                          if(!user) return
                          await createCourse({
                            title: data.title,
                            description: data.description,
                            price: Number(data.price),
                            image: data.image,
                            creatorId: user?.uid,
                          })
                          setShowCreateForm(false)
                        }}
                        onCancel={() => setShowCreateForm(false)}
                      />
                    </div>
                  </div>
                )}

                <button className="rounded-lg border-2 border-dashed border-[#2563EB]/30 bg-blue-50/50 px-6 py-8 text-center transition-colors hover:bg-blue-100/50">
                  <TrendingUp className="mx-auto mb-2 h-8 w-8 text-[#2563EB]" />
                  <p className="font-medium text-gray-900">View Analytics</p>
                  <p className="text-xs text-gray-600">Track your performance</p>
                </button>

                <button className="rounded-lg border-2 border-dashed border-[#2563EB]/30 bg-blue-50/50 px-6 py-8 text-center transition-colors hover:bg-blue-100/50">
                  <Users className="mx-auto mb-2 h-8 w-8 text-[#2563EB]" />
                  <p className="font-medium text-gray-900">Manage Students</p>
                  <p className="text-xs text-gray-600">View and interact with students</p>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
