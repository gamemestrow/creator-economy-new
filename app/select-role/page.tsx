'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Sparkles, Users, Zap, ArrowRight, Loader2, Crown, Users2 } from 'lucide-react'
import { PRODUCT_NAME } from '@/components/sidebar/sidebar-config'
import { useEffect } from 'react'

export default function SelectRolePage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'creator' | 'attendee' | null>(null)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      } else {
        setUserId(user.uid)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleRoleSelection = async (role: 'creator' | 'attendee') => {
    if (!userId) return

    try {
      setLoading(true)
      setError('')
      setSelectedRole(role)

      const userDocRef = doc(db, 'users', userId)
      await updateDoc(userDocRef, { role })

      const redirectPath = '/dashboard'
      router.push(redirectPath)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save role.'
      setError(message)
      setLoading(false)
      setSelectedRole(null)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB] shadow-lg shadow-blue-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">{PRODUCT_NAME}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose Your Role
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Select your role to get started with {PRODUCT_NAME}. You can change this later in your settings.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Role Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Creator Card */}
          <button
            onClick={() => handleRoleSelection('creator')}
            disabled={loading}
            className={`group relative overflow-hidden rounded-2xl border-2 p-8 text-left transition-all duration-300 ${
              selectedRole === 'creator'
                ? 'border-[#2563EB] bg-blue-50'
                : 'border-gray-200 bg-white hover:border-[#2563EB] hover:bg-blue-50'
            } ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {/* Background accent */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-lg bg-blue-100 p-3">
                <Crown className="h-6 w-6 text-[#2563EB]" />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-gray-900">Creator</h2>

              <p className="mb-6 text-gray-600">
                Build and monetize your audience with courses, memberships, and exclusive content.
              </p>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]" />
                  <span className="text-sm text-gray-700">Create and sell courses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]" />
                  <span className="text-sm text-gray-700">Launch membership programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]" />
                  <span className="text-sm text-gray-700">Advanced analytics & insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]" />
                  <span className="text-sm text-gray-700">Marketing automation tools</span>
                </li>
              </ul>

              {/* Button */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-semibold transition-colors ${
                    selectedRole === 'creator'
                      ? 'text-[#2563EB]'
                      : 'text-gray-900 group-hover:text-[#2563EB]'
                  }`}
                >
                  {selectedRole === 'creator' && loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Setting up...
                    </span>
                  ) : (
                    'Select Creator'
                  )}
                </span>
                <ArrowRight
                  className={`h-5 w-5 transition-all ${
                    selectedRole === 'creator'
                      ? 'translate-x-1 text-[#2563EB]'
                      : 'text-gray-400 group-hover:translate-x-1 group-hover:text-[#2563EB]'
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Attendee Card */}
          <button
            onClick={() => handleRoleSelection('attendee')}
            disabled={loading}
            className={`group relative overflow-hidden rounded-2xl border-2 p-8 text-left transition-all duration-300 ${
              selectedRole === 'attendee'
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50'
            } ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {/* Background accent */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-lg bg-blue-100 p-3">
                <Users2 className="h-6 w-6 text-blue-600" />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-gray-900">Attendee</h2>

              <p className="mb-6 text-gray-600">
                Access and learn from courses, engage with creators, and join a community.
              </p>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-sm text-gray-700">Browse and enroll in courses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-sm text-gray-700">Access member-only content</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-sm text-gray-700">Track learning progress</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <span className="text-sm text-gray-700">Join communities and events</span>
                </li>
              </ul>

              {/* Button */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-semibold transition-colors ${
                    selectedRole === 'attendee'
                      ? 'text-blue-600'
                      : 'text-gray-900 group-hover:text-blue-600'
                  }`}
                >
                  {selectedRole === 'attendee' && loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Setting up...
                    </span>
                  ) : (
                    'Select Attendee'
                  )}
                </span>
                <ArrowRight
                  className={`h-5 w-5 transition-all ${
                    selectedRole === 'attendee'
                      ? 'translate-x-1 text-blue-600'
                      : 'text-gray-400 group-hover:translate-x-1 group-hover:text-blue-600'
                  }`}
                />
              </div>
            </div>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-12 rounded-lg bg-gray-50 p-6">
          <p className="text-center text-sm text-gray-600">
            Not sure which role to choose?{' '}
            <a href="#" className="font-semibold text-[#2563EB] hover:underline">
              Learn more about roles
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
