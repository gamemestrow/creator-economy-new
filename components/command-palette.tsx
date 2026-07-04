'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Search, X } from 'lucide-react'
import { flattenNavItems } from '@/components/sidebar/sidebar-config'
import { cn } from '@/lib/utils'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const allItems = useMemo(() => flattenNavItems(), [])

  useEffect(() => {
    if (!isOpen) setSearch('')
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSelect = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-foreground/60 pt-[15vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-white/[0.08] bg-[#FBFAF7] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          className="flex flex-col"
          loop
          shouldFilter
        >
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-[#666666]" />
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Search pages and features..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#666666]"
            />
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-[#666666] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 admin-sidebar-scroll">
            <Command.Empty className="py-8 text-center text-sm text-[#666666]">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[#666666]">
              {allItems.map((item) => {
                const Icon = item.icon
                return (
                  <Command.Item
                    key={item.href}
                    value={`${item.label} ${item.group ?? ''} ${item.href}`}
                    onSelect={() => handleSelect(item.href)}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                      'text-[#232323] aria-selected:bg-[rgba(37,99,235,0.12)] aria-selected:text-white'
                    )}
                  >
                    <Icon className="h-4 w-4 text-[#666666] aria-selected:text-[#9AA59E]" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{item.label}</span>
                      {item.group && (
                        <span className="truncate text-[11px] text-[#666666]">{item.group}</span>
                      )}
                    </div>
                    {item.badge != null && (
                      <span className="rounded-full bg-[#9AA59E] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Command.Item>
                )
              })}
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5 text-[11px] text-[#666666]">
            <span>↑↓ navigate</span>
            <span>↵ select · esc close</span>
          </div>
        </Command>
      </div>
    </div>
  )
}
