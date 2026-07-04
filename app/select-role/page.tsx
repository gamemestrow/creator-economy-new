'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Sparkles, Zap, ArrowRight, Loader2, Crown, Users2 } from 'lucide-react'
import { PRODUCT_NAME } from '@/components/sidebar/sidebar-config'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function SelectRolePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [selectedRole, setSelectedRole] = useState<'creator' | 'attendee' | null>(null)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState('')

   useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  const handleRoleSelection = async (role: 'creator' | 'attendee') => {
    if (!user) return
    try {
      setLoading(true)
      setError('')
      setSelectedRole(role)
      const userDocRef = doc(db, 'users', user.uid)
      await updateDoc(userDocRef, { role })
      router.push(role === 'creator' ? '/dashboard' : '/attendee/dashboard')
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
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9AA59E] shadow-[0_10px_30px_rgba(0,0,0,0.05)] shadow-blue-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">{PRODUCT_NAME}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Choose Your Role
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
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
            className={`group relative overflow-hidden rounded-2xl border-2 p-8 text-left transition-all duration-300 ${selectedRole === 'creator'
                ? 'border-[#9AA59E] bg-primary/10'
                : 'border-border bg-white hover:border-[#9AA59E] hover:bg-primary/10'
              } ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {/* Background accent */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-3">
                <Crown className="h-6 w-6 text-[#9AA59E]" />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-foreground">Creator</h2>

              <p className="mb-6 text-muted-foreground">
                Build and monetize your audience with courses, memberships, and exclusive content.
              </p>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9AA59E]" />
                  <span className="text-sm text-foreground">Create and sell courses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9AA59E]" />
                  <span className="text-sm text-foreground">Launch membership programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9AA59E]" />
                  <span className="text-sm text-foreground">Advanced analytics & insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9AA59E]" />
                  <span className="text-sm text-foreground">Marketing automation tools</span>
                </li>
              </ul>

              {/* Button */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-semibold transition-colors ${selectedRole === 'creator'
                      ? 'text-[#9AA59E]'
                      : 'text-foreground group-hover:text-[#9AA59E]'
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
                  className={`h-5 w-5 transition-all ${selectedRole === 'creator'
                      ? 'translate-x-1 text-[#9AA59E]'
                      : 'text-muted-foreground group-hover:translate-x-1 group-hover:text-[#9AA59E]'
                    }`}
                />
              </div>
            </div>
          </button>

          {/* Attendee Card */}
          <button
            onClick={() => handleRoleSelection('attendee')}
            disabled={loading}
            className={`group relative overflow-hidden rounded-2xl border-2 p-8 text-left transition-all duration-300 ${selectedRole === 'attendee'
                ? 'border-primary/20 bg-primary/10'
                : 'border-border bg-white hover:border-primary/20 hover:bg-primary/10'
              } ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {/* Background accent */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-3">
                <Users2 className="h-6 w-6 text-primary" />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-foreground">Attendee</h2>

              <p className="mb-6 text-muted-foreground">
                Access and learn from courses, engage with creators, and join a community.
              </p>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Browse and enroll in courses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Access member-only content</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Track learning progress</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">Join communities and events</span>
                </li>
              </ul>

              {/* Button */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-semibold transition-colors ${selectedRole === 'attendee'
                      ? 'text-primary'
                      : 'text-foreground group-hover:text-primary'
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
                  className={`h-5 w-5 transition-all ${selectedRole === 'attendee'
                      ? 'translate-x-1 text-primary'
                      : 'text-muted-foreground group-hover:translate-x-1 group-hover:text-primary'
                    }`}
                />
              </div>
            </div>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-12 rounded-lg bg-muted p-6">
          <p className="text-center text-sm text-muted-foreground">
            Not sure which role to choose?{' '}
            <a href="#" className="font-semibold text-[#9AA59E] hover:underline">
              Learn more about roles
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
