"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { auth, db } from '@/lib/firebase'

const SignupForm = () => {

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

      const user = {
        uid: userCredential.user.uid,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: "creator",
        plan: "free",
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        ...user,
        createdAt: serverTimestamp(),
      })

      router.push('/select-role')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create account.'
      setError(message.replace('Firebase: ', ''))
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="rounded-2xl border border-[#E4E6DE] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#F3F4EF]">Create your account</h2>
      <p className="mt-1 text-sm text-[#6B7280]">Start your 14-day free trial. No credit card required.</p>

      <form onSubmit={handleSignup} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#1F2933]">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Creator"
              className="w-full rounded-lg border border-[#E4E6DE] bg-white py-2.5 pl-10 pr-4 text-sm text-[#F3F4EF] outline-none transition-all placeholder:text-[#6B7280] focus:border-[#78866B] focus:ring-2 focus:ring-[#78866B]/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#1F2933]">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-[#E4E6DE] bg-white py-2.5 pl-10 pr-4 text-sm text-[#F3F4EF] outline-none transition-all placeholder:text-[#6B7280] focus:border-[#78866B] focus:ring-2 focus:ring-[#78866B]/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#1F2933]">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full rounded-lg border border-[#E4E6DE] bg-white py-2.5 pl-10 pr-4 text-sm text-[#F3F4EF] outline-none transition-all placeholder:text-[#6B7280] focus:border-[#78866B] focus:ring-2 focus:ring-[#78866B]/20"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#78866B] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#65735A] disabled:cursor-not-allowed disabled:opacity-60"
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

      <p className="mt-6 text-center text-sm text-[#6B7280]">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#78866B] hover:text-[#65735A]">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignupForm
