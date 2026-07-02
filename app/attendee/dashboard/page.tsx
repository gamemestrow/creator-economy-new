'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useDashboardStats } from '@/lib/hooks/use-attendee-data'
import { DashboardStats, FeaturedCourses, UpcomingEvents } from '@/components/attendee'

interface UserData {
  name: string
  email: string
}

export default function AttendeeDashboardPage() {
  const { loading: authLoading, user, authorized } = useRequireRole(['attendee'])
  const [userData, setUserData] = useState<UserData | null>(null)
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
      <div className="flex min-h-[calc(100vh-73px)]">

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
    </div>
  )
}