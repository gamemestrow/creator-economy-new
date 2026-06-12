'use client'

import { Package, BookOpen, Users, ArrowRight, Star, Layers } from 'lucide-react'
import Link from 'next/link'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useCreatorStats } from '@/lib/hooks/use-creator-data'

export default function ProductsOverviewPage() {
  const { user } = useRequireRole(['creator', 'attendee'])
  const { stats, loading } = useCreatorStats(user?.uid || '')

  const productTypes = [
    {
      title: 'Online Courses',
      description: 'Create and sell structured video courses with lessons and quizzes.',
      icon: BookOpen,
      href: '/dashboard/products/courses',
      count: stats.totalCourses,
      color: 'bg-blue-500',
    },
    {
      title: 'Memberships',
      description: 'Offer recurring subscription plans with exclusive community access.',
      icon: Star,
      href: '/dashboard/products/memberships',
      count: 0, // Should use membership count
      color: 'bg-purple-500',
    },
    {
      title: 'Communities',
      description: 'Build vibrant discussion groups and forums for your audience.',
      icon: Users,
      href: '/dashboard/products/communities',
      count: 0,
      color: 'bg-green-500',
    },
    {
      title: 'Digital Downloads',
      description: 'Sell e-books, templates, presets, and other digital files.',
      icon: Layers,
      href: '/dashboard/products/digital-downloads',
      count: 0,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage your monetization offerings and catalog</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <p className="font-bold text-foreground">Total Offerings</p>
            </div>
            <p className="text-4xl font-black text-foreground">{stats.totalCourses}</p>
            <p className="text-sm text-muted-foreground mt-2">Active across all categories</p>
          </div>
          {/* Add more overview stats here if needed */}
        </div>

        {/* Product Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productTypes.map((type) => (
            <Link 
              key={type.title} 
              href={type.href}
              className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-xl relative overflow-hidden"
            >
              <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10 rounded-full blur-3xl transition-opacity group-hover:opacity-20", type.color)} />
              
              <div className="flex items-start justify-between">
                <div className={cn("p-4 rounded-2xl text-white shadow-lg", type.color)}>
                  <type.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-foreground">{type.count}</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Items</p>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{type.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{type.description}</p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm">
                <span>Manage {type.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import { cn } from '@/lib/utils'
