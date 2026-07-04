'use client'

import { BookOpen, Users, Award, Users2, Loader2 } from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    enrolledCount: number
    inProgressCount: number
    certificateCount: number
    communityCount: number
  }
  loading?: boolean
}

export function DashboardStats({ stats, loading = false }: DashboardStatsProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-xl border border-border bg-white p-6 animate-pulse"
          >
            <div className="h-4 w-24 bg-card rounded mb-4" />
            <div className="h-8 w-12 bg-card rounded" />
          </div>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      title: 'Courses Enrolled',
      value: stats.enrolledCount,
      icon: BookOpen,
      color: 'bg-primary/10',
      iconColor: 'text-[#9AA59E]',
    },
    {
      title: 'In Progress',
      value: stats.inProgressCount,
      icon: Users,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Certificates Earned',
      value: stats.certificateCount,
      icon: Award,
      color: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Communities Joined',
      value: stats.communityCount,
      icon: Users2,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.title}
            className="rounded-xl border border-border bg-white p-6"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
              <Icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
