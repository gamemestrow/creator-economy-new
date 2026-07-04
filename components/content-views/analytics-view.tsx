'use client'

import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Calendar } from 'lucide-react'

const pageViewsData = [
  { day: 'Mon', views: 4200, visitors: 2400, bounce: 32 },
  { day: 'Tue', views: 3890, visitors: 1398, bounce: 28 },
  { day: 'Wed', views: 2000, visitors: 9800, bounce: 41 },
  { day: 'Thu', views: 2780, visitors: 3908, bounce: 35 },
  { day: 'Fri', views: 1890, visitors: 4800, bounce: 25 },
  { day: 'Sat', views: 2390, visitors: 3800, bounce: 38 },
  { day: 'Sun', views: 3490, visitors: 4300, bounce: 30 },
]

const topPages = [
  { page: '/courses', views: 12450, avgTime: '4m 32s', bounce: '28%' },
  { page: '/pricing', views: 8230, avgTime: '2m 15s', bounce: '42%' },
  { page: '/blog', views: 7890, avgTime: '3m 48s', bounce: '35%' },
  { page: '/about', views: 5420, avgTime: '1m 52s', bounce: '55%' },
]

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Detailed insights into your platform performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-foreground rounded-lg hover:bg-muted">
          <Calendar className="w-5 h-5" />
          Last 7 Days
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Visitors', value: '45.2K', change: '+12.5%' },
          { label: 'Page Views', value: '124.8K', change: '+8.2%' },
          { label: 'Avg Session Duration', value: '3m 24s', change: '+2.1%' },
          { label: 'Bounce Rate', value: '34.2%', change: '-1.8%' },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-border">
            <p className="text-muted-foreground text-sm font-medium">{metric.label}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{metric.value}</p>
            <p className={`text-sm font-medium mt-4 ${metric.change.includes('-') ? 'text-green-600' : 'text-green-600'}`}>
              {metric.change}
            </p>
          </div>
        ))}
      </div>

      {/* Page Views Chart */}
      <div className="bg-white p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6">Page Views & Visitors</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={pageViewsData}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#78866B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#78866B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Area type="monotone" dataKey="views" stroke="#78866B" fillOpacity={1} fill="url(#colorViews)" name="Page Views" />
            <Area type="monotone" dataKey="visitors" stroke="#65735A" fill="url(#colorViews)" opacity={0.5} name="Visitors" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Pages */}
      <div className="bg-white p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6">Top Pages</h3>
        <div className="space-y-4">
          {topPages.map((page, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-muted rounded-lg border border-border">
              <div className="flex-1">
                <p className="font-medium text-foreground">{page.page}</p>
                <p className="text-sm text-muted-foreground">Avg time: {page.avgTime}</p>
              </div>
              <div className="flex gap-8 text-right">
                <div>
                  <p className="text-sm text-muted-foreground">Views</p>
                  <p className="font-semibold text-foreground">{page.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                  <p className="font-semibold text-red-600">{page.bounce}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
