'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Sparkles, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { auth, db } from '@/lib/firebase'
import { PRODUCT_NAME } from '@/components/sidebar/sidebar-config'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: 'creator',
        plan: 'free',
        createdAt: serverTimestamp(),
      })

      router.push('/dashboard/getstarted')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create account.'
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
            Build, launch, and scale your creator business.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-[#94A3B8]">
            Courses, memberships, automation, and analytics — all in one premium cloud platform.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-2xl font-bold text-white">10k+</p>
              <p className="text-sm text-[#64748B]">Creators</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">$2M+</p>
              <p className="text-sm text-[#64748B]">Processed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-sm text-[#64748B]">Uptime</p>
            </div>
          </div>
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
            <h2 className="text-2xl font-bold text-[#0B1220]">Create your account</h2>
            <p className="mt-1 text-sm text-[#64748B]">Start your 14-day free trial. No credit card required.</p>

            <form onSubmit={handleSignup} className="mt-8 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#334155]">
                  Full name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Creator"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0B1220] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
              </div>

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
                    placeholder="Min. 6 characters"
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#64748B]">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
