'use client'

import { useDashboardStore } from '@/lib/store'
import { Search, Bell, MessageSquare, Settings, User, LogOut, Menu, Crown } from 'lucide-react'
import { useState } from 'react'
import { UpgradePlanModal } from './upgrade-plan-modal'

export function TopNavbar() {
  const { toggleSidebar } = useDashboardStore()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Cloud Admin</h1>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-blue-300"
              />
            </div>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Crown className="w-4 h-4" />
              Upgrade
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg relative group">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-900">
                  Tannu
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t my-2"></div>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <UpgradePlanModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </>
  )
}
