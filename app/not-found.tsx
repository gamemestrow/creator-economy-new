'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Home, ArrowLeft, SearchX } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
            <SearchX className="h-10 w-10 text-[#2563EB]" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>

          <Link
            href="/attendee/dashboard"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go To Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}