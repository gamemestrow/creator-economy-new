'use client'

import { useRequireRole } from '@/lib/use-auth-redirect'
import { useCreatorOrders } from '@/lib/hooks/use-creator-data'
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts'
import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function RevenuePage() {
  const { user } = useRequireRole(['creator'])
  const { orders, loading } = useCreatorOrders(user?.uid || '')

  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'completed' ? o.amount : 0), 0)
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0
  
  // Prepare chart data (last 7 days mock)
  const chartData = [
    { name: 'Mon', revenue: 400 },
    { name: 'Tue', revenue: 300 },
    { name: 'Wed', revenue: 600 },
    { name: 'Thu', revenue: 800 },
    { name: 'Fri', revenue: 500 },
    { name: 'Sat', revenue: 900 },
    { name: 'Sun', revenue: 700 },
  ]

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Revenue Analytics</h1>
            <p className="text-muted-foreground mt-2">Monitor your earnings and sales performance</p>
          </div>
          <div className="flex gap-2">
            <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Year to Date</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>12.5% from last period</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">${averageOrderValue.toFixed(2)}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>4.2% from last period</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{orders.length}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
              <ArrowDownRight className="w-3 h-3" />
              <span>2.1% from last period</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Users className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">3.2%</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>0.8% from last period</span>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Revenue Trend</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Sales by Category</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { category: 'Courses', sales: 4500 },
                  { category: 'Events', sales: 1200 },
                  { category: 'Community', sales: 800 },
                  { category: 'Other', sales: 300 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Payment Methods</h2>
            <div className="space-y-4">
              {[
                { method: 'Razorpay', percentage: 65, color: 'bg-blue-600' },
                { method: 'Stripe', percentage: 25, color: 'bg-purple-600' },
                { method: 'PayPal', percentage: 10, color: 'bg-indigo-600' },
              ].map((item) => (
                <div key={item.method} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{item.method}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
