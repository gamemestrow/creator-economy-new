'use client'

import { useEffect, useState } from 'react'
import { Command as CommandIcon, BarChart3, Users, BookOpen, MessageSquare, Calendar, Mail, CreditCard, Settings, X } from 'lucide-react'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const commands = [
  { category: 'Navigation', items: [
    { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { label: 'User Management', href: '/users', icon: Users },
    { label: 'Courses', href: '/courses', icon: BookOpen },
    { label: 'Communities', href: '/communities', icon: MessageSquare },
    { label: 'Live Events', href: '/events', icon: Calendar },
    { label: 'Email Campaigns', href: '/campaigns', icon: Mail },
    { label: 'Payments', href: '/payments', icon: CreditCard },
    { label: 'Settings', href: '/settings', icon: Settings },
  ]}
]

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = commands[0].items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const selected = filteredCommands[selectedIndex]
        if (selected) {
          window.location.href = selected.href
          onClose()
        }
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, selectedIndex, filteredCommands, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24" onClick={() => onClose()}>
      <div
        className="w-full max-w-xl bg-card border border-border rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <CommandIcon className="w-5 h-5 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Search commands..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelectedIndex(0)
            }}
            className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
          />
          <button
            onClick={() => onClose()}
            className="p-1 hover:bg-input rounded transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No commands found
            </div>
          ) : (
            filteredCommands.map((item, index) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    onClose()
                  }}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-input'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              )
            })
          )}
        </div>

        {/* Footer */}
        {filteredCommands.length > 0 && (
          <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
            <span>Use arrow keys to navigate</span>
            <span>Press Enter to select</span>
          </div>
        )}
      </div>
    </div>
  )
}
