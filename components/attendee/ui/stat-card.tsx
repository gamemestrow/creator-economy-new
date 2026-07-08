'use client'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  iconEmoji?: string
  trend?: { value: number; positive: boolean }
  className?: string
  accent?: string
}

export function StatCard({ title, value, subtitle, iconEmoji, trend, className, accent = '#78866B' }: StatCardProps) {
  return (
    <div className={cn('rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-[#1F2933]">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-[#6B7280]">{subtitle}</p>}
          {trend && (
            <p className={cn('mt-1 text-xs font-semibold', trend.positive ? 'text-[#4F8A5B]' : 'text-[#D96A5F]')}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% vs last month
            </p>
          )}
        </div>
        {iconEmoji && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background: accent + '18' }}>
            {iconEmoji}
          </div>
        )}
      </div>
    </div>
  )
}
