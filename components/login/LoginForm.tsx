'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

const LoginForm = () => {
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

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            const uid = userCredential.user.uid

            const userDoc = await getDoc(doc(db, 'users', uid))

            if (!userDoc.exists()) {
                throw new Error('User profile not found.')
            }

            const userData = userDoc.data()

            if (userData.role === "creator") {
                router.push("/dashboard");
            } else if (userData.role === "attendee") {
                router.push("/attendee/dashboard");
            } else {
                router.push("/select-role");
            }

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to sign in.'
            setError(message.replace('Firebase: ', ''))
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-full max-w-md">
            <div className="rounded-2xl border border-[#ECE8DF] bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#FBFAF7]">Sign in</h2>
                <p className="mt-1 text-sm text-[#666666]">Enter your credentials to access your workspace.</p>

                <form onSubmit={handleLogin} className="mt-8 space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#232323]">
                            Email address
                        </label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full rounded-lg border border-[#ECE8DF] bg-white py-2.5 pl-10 pr-4 text-sm text-[#FBFAF7] outline-none transition-all placeholder:text-[#666666] focus:border-[#9AA59E] focus:ring-2 focus:ring-[#9AA59E]/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#232323]">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                className="w-full rounded-lg border border-[#ECE8DF] bg-white py-2.5 pl-10 pr-4 text-sm text-[#FBFAF7] outline-none transition-all placeholder:text-[#666666] focus:border-[#9AA59E] focus:ring-2 focus:ring-[#9AA59E]/20"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#9AA59E] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7F8F84] disabled:cursor-not-allowed disabled:opacity-60"
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

                <p className="mt-6 text-center text-sm text-[#666666]">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="font-semibold text-[#9AA59E] hover:text-[#7F8F84]">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm
