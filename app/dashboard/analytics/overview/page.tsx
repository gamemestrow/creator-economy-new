'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { ShoppingBag, BookOpen, Users } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'

const analyticsData = [
  { day: 'Mon', pageViews: 4200, users: 2400 },
  { day: 'Tue', pageViews: 4800, users: 2800 },
  { day: 'Wed', pageViews: 5600, users: 3200 },
  { day: 'Thu', pageViews: 6200, users: 3800 },
  { day: 'Fri', pageViews: 7100, users: 4500 },
  { day: 'Sat', pageViews: 5800, users: 3900 },
  { day: 'Sun', pageViews: 4300, users: 2800 },
]

export default function AnalyticsPage() {

  const user = useAuth()
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-2">Platform performance and user behavior insights</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Page Views</p>
            <p className="text-3xl font-bold text-foreground">38,100</p>
            <p className="text-xs text-green-600 mt-2">+12% from last week</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Avg Session Duration</p>
            <p className="text-3xl font-bold text-foreground">4m 23s</p>
            <p className="text-xs text-green-600 mt-2">+8% from last week</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Bounce Rate</p>
            <p className="text-3xl font-bold text-foreground">32.4%</p>
            <p className="text-xs text-green-600 mt-2">-3% from last week</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
            <p className="text-3xl font-bold text-foreground">8.2%</p>
            <p className="text-xs text-green-600 mt-2">+2% from last week</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Page Views & Users</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: '#0B1220' }}
                />
                <Legend />
                <Bar dataKey="pageViews" fill="#2563EB" radius={[8, 8, 0, 0]} />
                <Bar dataKey="users" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Traffic Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: '#0B1220' }}
                />
                <Legend />
                <Line type="monotone" dataKey="pageViews" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} />
                <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} dot={{ fill: '#4F46E5', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Quick Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/products/courses" className="p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors border border-border">
              <BookOpen className="w-6 h-6 text-primary mb-2" />
              <p className="font-bold text-sm">Courses</p>
              <p className="text-xs text-muted-foreground">Manage your lessons</p>
            </Link>
            <Link href="/dashboard/sales/orders" className="p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors border border-border">
              <ShoppingBag className="w-6 h-6 text-primary mb-2" />
              <p className="font-bold text-sm">Orders</p>
              <p className="text-xs text-muted-foreground">Track your sales</p>
            </Link>
            <Link href="/dashboard/customers/users" className="p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors border border-border">
              <Users className="w-6 h-6 text-primary mb-2" />
              <p className="font-bold text-sm">Customers</p>
              <p className="text-xs text-muted-foreground">View your audience</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}