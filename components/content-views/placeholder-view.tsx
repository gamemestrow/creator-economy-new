'use client'

import { Plus } from 'lucide-react'

interface PlaceholderViewProps {
  title: string
  description: string
  icon: React.ReactNode
}

export function PlaceholderView({ title, description, icon }: PlaceholderViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary">
          <Plus className="w-5 h-5" />
          New
        </button>
      </div>

      <div className="bg-white p-12 rounded-xl border border-border text-center">
        <div className="flex justify-center mb-4 text-muted-foreground">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
        <p className="text-muted-foreground">This section is coming soon. Check back later for updates!</p>
      </div>
    </div>
  )
}
