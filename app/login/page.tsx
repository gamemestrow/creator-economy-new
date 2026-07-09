import LoginForm from '@/components/login/LoginForm'
import { Sparkles } from 'lucide-react'

export default function LoginPage() {

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#F3F4EF] p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#78866B] shadow-[0_10px_30px_rgba(0,0,0,0.05)] shadow-blue-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
            Welcome back to your creator hub.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-[#6B7280]">
            Manage products, track revenue, and grow your audience from one unified dashboard.
          </p>
        </div>

        <p className="text-sm text-[#6B7280]">© 2026 CreatorWorks Cloud. All rights reserved.</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center bg-[#F8F8F5] px-6 py-12 lg:w-1/2">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#78866B]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </div>

        <LoginForm />

      </div>
    </div>
  )
}
