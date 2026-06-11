'use client'

import { Plus, MoreHorizontal, Smartphone, Download, Users, TrendingUp } from 'lucide-react'

const mobileStats = [
  {
    id: 1,
    os: 'iOS',
    downloads: 24500,
    rating: 4.8,
    reviews: 2847,
    activeUsers: 18920,
    version: '2.1.4',
  },
  {
    id: 2,
    os: 'Android',
    downloads: 31200,
    rating: 4.6,
    reviews: 3421,
    activeUsers: 24680,
    version: '2.1.3',
  },
]

const appFeatures = [
  {
    name: 'Push Notifications',
    status: 'Active',
    engagement: '45.3%',
    icon: '🔔',
  },
  {
    name: 'Offline Mode',
    status: 'Active',
    engagement: '38.7%',
    icon: '📡',
  },
  {
    name: 'In-App Messaging',
    status: 'Active',
    engagement: '52.1%',
    icon: '💬',
  },
  {
    name: 'Mobile Wallet',
    status: 'Beta',
    engagement: '12.4%',
    icon: '💳',
  },
]

export default function MobileAppPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-foreground">Mobile App Management</h1>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Release
            </button>
          </div>
          <p className="text-muted-foreground">Manage iOS and Android app distribution, updates, and analytics</p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {mobileStats.map((stat) => (
            <div key={stat.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{stat.os}</h2>
                <Smartphone className="w-8 h-8 text-primary opacity-50" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Downloads</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.downloads.toLocaleString()}</p>
                  </div>
                  <Download className="w-8 h-8 text-secondary opacity-20" />
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.activeUsers.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-accent opacity-20" />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">App Store Rating</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.rating} ⭐</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.reviews.toLocaleString()} reviews</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="text-lg font-bold text-primary mt-1">{stat.version}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Active Features</h2>
          </div>
          <div className="grid grid-cols-4 gap-4 p-6">
            {appFeatures.map((feature, idx) => (
              <div key={idx} className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <p className="font-medium text-foreground text-sm mb-2">{feature.name}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded ${
                    feature.status === 'Active' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {feature.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{feature.engagement} engagement</p>
              </div>
            ))}
          </div>
        </div>

        {/* Release History */}
        <div className="mt-8 bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Recent Releases</h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { version: '2.1.4', date: 'Released 2 days ago', changes: '12 bug fixes, 3 new features' },
              { version: '2.1.3', date: 'Released 1 week ago', changes: '8 improvements, 5 bug fixes' },
              { version: '2.1.2', date: 'Released 2 weeks ago', changes: 'Performance optimization' },
            ].map((release, idx) => (
              <div key={idx} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">v{release.version}</p>
                    <p className="text-sm text-muted-foreground mt-1">{release.date}</p>
                    <p className="text-sm text-muted-foreground mt-2">{release.changes}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
