'use client'

import { Globe, Plus, Eye, Edit2, Trash2, ArrowUpRight, MoreVertical } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const visitData = [
  { name: 'Mon', visits: 450, conversions: 42 },
  { name: 'Tue', visits: 520, conversions: 58 },
  { name: 'Wed', visits: 680, conversions: 78 },
  { name: 'Thu', visits: 750, conversions: 92 },
  { name: 'Fri', visits: 890, conversions: 125 },
  { name: 'Sat', visits: 620, conversions: 68 },
  { name: 'Sun', visits: 480, conversions: 48 },
]

const pages = [
  { id: 1, title: 'Product Launch', visits: 4280, conversions: 428, rate: 10, live: true },
  { id: 2, title: 'Free Webinar', visits: 3450, conversions: 415, rate: 12, live: true },
  { id: 3, title: 'Course Promotion', visits: 2890, conversions: 231, rate: 8, live: false },
  { id: 4, title: 'Black Friday Sale', visits: 5620, conversions: 842, rate: 15, live: true },
]

export function LandingPagesView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Landing Pages</h1>
          <p className="text-muted-foreground mt-2">Create and manage high-converting landing pages</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition">
          <Plus className="w-5 h-5" />
          Create Page
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Total Pages</p>
          <p className="text-3xl font-bold text-foreground mt-2">4</p>
          <p className="text-sm text-green-600 mt-3">3 active pages</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Total Visits</p>
          <p className="text-3xl font-bold text-foreground mt-2">16,240</p>
          <div className="flex items-center gap-1 mt-3 text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm">15% vs last month</span>
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground">Avg Conversion</p>
          <p className="text-3xl font-bold text-foreground mt-2">11.1%</p>
          <p className="text-sm text-primary mt-3">Excellent performance</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Weekly Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={visitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }} />
            <Bar dataKey="visits" fill="#78866B" radius={[8, 8, 0, 0]} />
            <Bar dataKey="conversions" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white border border-border rounded-lg p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{page.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                    page.live ? 'bg-green-100 text-green-800' : 'bg-muted text-foreground'
                  }`}>
                    {page.live ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Visits</p>
                <p className="text-lg font-bold text-foreground">{page.visits.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conversions</p>
                <p className="text-lg font-bold text-foreground">{page.conversions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rate</p>
                <p className="text-lg font-bold text-green-600">{page.rate}%</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded hover:bg-primary/10 transition text-sm font-medium">
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted text-foreground rounded hover:bg-muted transition text-sm font-medium">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
