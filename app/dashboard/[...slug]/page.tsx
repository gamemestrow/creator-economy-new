'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  Lock, AlertTriangle, ShieldCheck, Mail, Users, BarChart3, 
  Settings as SettingsIcon, CreditCard, Gift, Trophy, Bell, ChevronRight
} from 'lucide-react'

// Helper to format path slugs into readable titles
function formatTitle(slugs: string[]) {
  if (slugs.length === 0) return 'Dashboard'
  const last = slugs[slugs.length - 1]
  return last
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function CatchAllDashboardPage() {
  const pathname = usePathname()
  const slugs = pathname.split('/').filter(Boolean).slice(1) // Remove 'dashboard'
  
  const title = formatTitle(slugs)
  const category = slugs[0] || ''
  const subCategory = slugs[1] || ''

  // Determine if this route is a locked feature
  const isLocked = [
    'banners', 
    'unsubscribed', 
    'path', 
    'affiliates', 
    'points', 
    'badges', 
    'leaderboard', 
    'team'
  ].includes(subCategory) || slugs.includes('affiliates') || slugs.includes('team')

  if (isLocked) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        {/* Verification Alert Banner */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 flex items-start gap-4">
          <div className="p-2 bg-orange-100 text-[#e06a28] rounded-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-orange-900 font-bold text-sm mb-1">KYC Verification Required</h4>
            <p className="text-orange-700 text-xs leading-relaxed">
              This feature is currently locked. To unlock advanced creator modules, you must complete your KYC verification.
            </p>
          </div>
        </div>

        {/* Lock Mockup Screen */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-gray-50 border border-gray-100 text-gray-400 rounded-full flex items-center justify-center relative">
            <Lock className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#e06a28]"></span>
            </span>
          </div>

          <div className="space-y-2 max-w-md">
            <h2 className="text-2xl font-black text-gray-900">Unlock {title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Enhance your creator business! Complete these quick steps to access premium analytics, gamification elements, and landing banner managers.
            </p>
          </div>

          {/* Onboarding Checklist */}
          <div className="w-full max-w-sm border border-gray-50 bg-gray-50/30 rounded-xl p-4 text-left space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
              <span>Requirements Checklist</span>
              <span>2/3 Completed</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center text-[10px]">✓</span>
                <span>Verify email address</span>
              </span>
              <span className="text-xs text-green-600 font-bold">Verified</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center text-[10px]">✓</span>
                <span>Setup first Mango offering</span>
              </span>
              <span className="text-xs text-green-600 font-bold">Completed</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-700 font-bold">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border border-orange-500 text-orange-500 rounded-full flex items-center justify-center text-[10px]">3</span>
                <span>Submit KYC Details</span>
              </span>
              <span className="text-xs text-orange-600 font-bold animate-pulse">Required</span>
            </div>
          </div>

          <button className="px-6 py-3 bg-[#e06a28] hover:bg-[#ff733b] text-white font-bold rounded-lg transition shadow-md text-sm w-full max-w-sm">
            Complete KYC Now
          </button>
        </div>
      </div>
    )
  }

  // Render normal high-fidelity mock views based on path
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
          {category} {subCategory && `> ${subCategory}`}
        </span>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">{title}</h1>
      </div>

      {/* Main Content Card Mockup */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
        
        {/* Mock content based on route */}
        <div className="space-y-4">
          <div className="border-b border-gray-50 pb-4">
            <h3 className="text-lg font-bold text-gray-900">Manage your {title}</h3>
            <p className="text-gray-500 text-sm mt-0.5">Use this interface to view, configure, and scale your creator capabilities.</p>
          </div>

          {/* Render Route Specific Layout Mock */}
          {category === 'marketing' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="border border-gray-100 rounded-lg p-5 bg-gray-50/50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Sends</p>
                <p className="text-2xl font-black text-gray-900 mt-2">12,450</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-5 bg-gray-50/50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Open Rate</p>
                <p className="text-2xl font-black text-gray-900 mt-2">48.2%</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-5 bg-gray-50/50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Clicks</p>
                <p className="text-2xl font-black text-gray-900 mt-2">1,502</p>
              </div>
            </div>
          )}

          {category === 'products' && (
            <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 py-16">
              <Package className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="font-semibold text-gray-800 text-base">No {title} Listed Yet</p>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">Create courses, schedule live webinars, or list consultation slots to monetize your audience.</p>
              <button className="mt-4 px-4 py-2 bg-[#e06a28] hover:bg-[#ff733b] text-white text-xs font-bold rounded-lg transition shadow-sm">
                Add {title.slice(0, -1) || 'Item'}
              </button>
            </div>
          )}

          {category === 'sales' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#FCFBF9] p-4 rounded-xl border border-gray-100">
                <div className="space-y-0.5">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Payout Account</p>
                  <p className="text-sm font-bold text-gray-800">Bank Transfer Account ending in 9876</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Active</span>
              </div>
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                <div className="p-4 border-b border-gray-100 font-bold text-sm text-gray-800">Recent Transactions</div>
                <div className="p-8 text-center text-sm text-gray-400">No recent sales records.</div>
              </div>
            </div>
          )}

          {pathname.includes('feed') && (
            <div className="space-y-4">
              <div className="border border-gray-100 rounded-xl p-4 bg-[#fffaf5] flex items-center justify-between">
                <span className="text-xs text-[#e06a28] font-bold">New announcement capabilities are live on your creator feed!</span>
                <button className="text-xs text-white bg-black px-3 py-1.5 rounded-lg font-bold">Explore</button>
              </div>
              <div className="p-12 text-center border border-dashed border-gray-100 rounded-xl">
                <p className="text-sm font-bold text-gray-500">Your feed is empty.</p>
                <p className="text-xs text-gray-400 mt-1">Post updates, share newsletters, and spark conversations with your community.</p>
              </div>
            </div>
          )}

          {/* Fallback description */}
          {!['marketing', 'products', 'sales'].includes(category) && !pathname.includes('feed') && (
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                This dashboard page represents the <strong className="text-gray-800">{title}</strong> creator feature.
                Here you can customize configurations, export analytical csv logs, and set automated alerts.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-50 pt-4 flex items-center justify-between text-xs text-gray-400 font-semibold mt-6">
          <span>TagMango Creator Console v3.1</span>
          <span className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-gray-800">
            <span>Documentation Guide</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>
    </div>
  )
}
