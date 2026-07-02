"use client"
import { Crown, LogOut, Menu, Sparkles, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { PRODUCT_NAME } from '@/components/sidebar/sidebar-config'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { UpgradePlanModal } from '../upgrade-plan-modal'

interface UserData {
    name: string
    email: string
}

function AttendeeHeader({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}) {
  const { loading: authLoading, user, authorized } = useRequireRole(['attendee'])
  const [userData, setUserData] = useState<UserData | null>(null)

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

  const router = useRouter()
  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  return (
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

      <UpgradePlanModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </header>
  )
}

export default AttendeeHeader
