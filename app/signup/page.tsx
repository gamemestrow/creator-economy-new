import SignupForm from '@/components/signup/SignupForm'
import { Sparkles } from 'lucide-react'

export default function SignupPage() {

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#FBFAF7] p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9AA59E] shadow-[0_10px_30px_rgba(0,0,0,0.05)] shadow-blue-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
            Build, launch, and scale your creator business.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-[#666666]">
            Courses, memberships, automation, and analytics — all in one premium cloud platform.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-2xl font-bold text-white">10k+</p>
              <p className="text-sm text-[#666666]">Creators</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">₹2M+</p>
              <p className="text-sm text-[#666666]">Processed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-sm text-[#666666]">Uptime</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#666666]">© 2026 CreatorWorks Cloud. All rights reserved.</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center bg-[#F7F7F4] px-6 py-12 lg:w-1/2">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9AA59E]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </div>

        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
