'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Home, ArrowLeft, SearchX } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F5] px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <SearchX className="h-10 w-10 text-[#78866B]" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Page not found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>

          <Link
            href="/attendee/dashboard"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#78866B] text-white rounded-lg text-sm font-bold hover:bg-primary transition-colors"
          >
            <Home className="h-4 w-4" />
            Go To Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}