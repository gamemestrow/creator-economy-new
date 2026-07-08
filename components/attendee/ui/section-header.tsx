'use client'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  icon?: LucideIcon
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between', className)}>
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#78866B]/10">
            <Icon className="h-4 w-4 text-[#78866B]" />
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-[#1F2933]">{title}</h2>
          {subtitle && <p className="text-sm text-[#6B7280]">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
