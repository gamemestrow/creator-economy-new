'use client'

import { useState, useEffect } from 'react'
import { Search, Bell, User, LogOut, Command } from 'lucide-react'
import { CommandPalette } from './command-palette'

export function Topbar() {
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Listen for keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background sticky top-0 z-40">
        {/* Left side - Search */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer group" onClick={() => setShowCommandPalette(true)}>
            <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-sm text-muted-foreground flex-1">Search or jump to...</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-input rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-input transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
              <span className="text-sm font-medium text-foreground">Admin</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-input transition-colors">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <hr className="my-2 border-border" />
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-input transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Command Palette */}
      {showCommandPalette && (
        <CommandPalette isOpen={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
      )}
    </>
  )
}
