'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { PRODUCT_NAME } from '@/components/sidebar/sidebar-config'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard/getstarted')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to sign in.'
      setError(message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#0B1220] p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] shadow-lg shadow-blue-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">{PRODUCT_NAME}</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
            Welcome back to your creator hub.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-[#94A3B8]">
            Manage products, track revenue, and grow your audience from one unified dashboard.
          </p>
        </div>

        <p className="text-sm text-[#64748B]">© 2026 CreatorWorks Cloud. All rights reserved.</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center bg-[#F8FAFC] px-6 py-12 lg:w-1/2">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-[#0B1220]">{PRODUCT_NAME}</span>
        </div>

        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0B1220]">Sign in</h2>
            <p className="mt-1 text-sm text-[#64748B]">Enter your credentials to access your workspace.</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#334155]">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0B1220] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#334155]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0B1220] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#64748B]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8]">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
