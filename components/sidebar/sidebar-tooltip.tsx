'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SidebarTooltipProps {
  label: string
  children: ReactNode
  side?: 'right' | 'top'
  disabled?: boolean
}

export function SidebarTooltip({
  label,
  children,
  side = 'right',
  disabled = false,
}: SidebarTooltipProps) {
  const [visible, setVisible] = useState(false)

  if (disabled) return <>{children}</>

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-[60] whitespace-nowrap rounded-md px-2.5 py-1.5',
            'bg-[#1E293B] text-xs font-medium text-white shadow-lg',
            'border border-white/[0.08]',
            side === 'right' && 'left-full ml-3 top-1/2 -translate-y-1/2',
            side === 'top' && 'bottom-full mb-2 left-1/2 -translate-x-1/2'
          )}
        >
          {label}
        </div>
      )}
    </div>
  )
}
