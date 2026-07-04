'use client'

import { Plus, Edit2, Eye, Trash2 } from 'lucide-react'

const pages = [
  { id: 1, name: 'Home Page', slug: '/', status: 'published', views: 45230, lastEdited: '2 hours ago' },
  { id: 2, name: 'Pricing', slug: '/pricing', status: 'published', views: 12540, lastEdited: '1 day ago' },
  { id: 3, name: 'About Us', slug: '/about', status: 'published', views: 8920, lastEdited: '3 days ago' },
  { id: 4, name: 'Blog Landing', slug: '/blog', status: 'draft', views: 0, lastEdited: '5 hours ago' },
]

export function PageBuilderView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Page Builder</h1>
          <p className="text-muted-foreground mt-1">Create and manage your landing pages</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary">
          <Plus className="w-5 h-5" />
          New Page
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Pages', value: '4', change: '+1 this week' },
          { label: 'Published', value: '3', change: '75% published' },
          { label: 'Total Views', value: '66.7K', change: '+12.3% vs last week' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-border">
            <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
            <p className="text-muted-foreground text-sm mt-4">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <div key={page.id} className="bg-white p-4 rounded-xl border border-border hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{page.name}</h3>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{page.slug}</span>
                  <span>•</span>
                  <span>{page.views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>Edited {page.lastEdited}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  page.status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {page.status}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg">
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
