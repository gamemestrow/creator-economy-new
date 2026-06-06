'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, Zap, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 4000, target: 4500 },
  { month: 'Feb', revenue: 5200, target: 4500 },
  { month: 'Mar', revenue: 4800, target: 4500 },
  { month: 'Apr', revenue: 6100, target: 5500 },
  { month: 'May', revenue: 7200, target: 5500 },
  { month: 'Jun', revenue: 8500, target: 6500 },
]

const userGrowthData = [
  { month: 'Jan', active: 2400, inactive: 600 },
  { month: 'Feb', active: 2800, inactive: 500 },
  { month: 'Mar', active: 3200, inactive: 400 },
  { month: 'Apr', active: 3800, inactive: 300 },
  { month: 'May', active: 4500, inactive: 200 },
  { month: 'Jun', active: 5200, inactive: 150 },
]

const engagementData = [
  { name: 'Content Creators', value: 45, color: '#2563EB' },
  { name: 'Students', value: 30, color: '#4F46E5' },
  { name: 'Community Managers', value: 15, color: '#7c3aed' },
  { name: 'Investors', value: 10, color: '#06b6d4' },
]

const metricsData = [
  { label: 'Total Revenue', value: '$127,500', change: '+23.5%', positive: true, icon: DollarSign },
  { label: 'Active Users', value: '5,240', change: '+8.2%', positive: true, icon: Users },
  { label: 'Engagement Rate', value: '62.4%', change: '+5.1%', positive: true, icon: Zap },
  { label: 'Growth Rate', value: '3.2x', change: '-1.2%', positive: false, icon: TrendingUp },
]

function MetricCard({ label, value, change, positive, icon: Icon }: any) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold text-foreground mb-4">{value}</p>
          <div className="flex items-center gap-1">
            {positive ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={positive ? 'text-green-500 text-sm font-medium' : 'text-red-500 text-sm font-medium'}>
              {change}
            </span>
            <span className="text-muted-foreground text-sm">vs last month</span>
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, Admin</h1>
          <p className="text-muted-foreground">Here&apos;s your platform overview for this month</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, i) => (
            <MetricCard key={i} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground mb-1">Revenue Trend</h2>
              <p className="text-sm text-muted-foreground">Monthly revenue vs target</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
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
                <Bar dataKey="revenue" fill="#2563EB" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement Pie Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground mb-1">User Types</h2>
              <p className="text-sm text-muted-foreground">Distribution by role</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-1">User Growth</h2>
            <p className="text-sm text-muted-foreground">Active vs inactive users over time</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
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
              <Line
                type="monotone"
                dataKey="active"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ fill: '#2563EB', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="inactive"
                stroke="#e5e7eb"
                strokeWidth={2}
                dot={{ fill: '#e5e7eb', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {[
              { action: 'New course published', user: 'Sarah Chen', time: '2 hours ago' },
              { action: 'User registration', user: 'John Developer', time: '4 hours ago' },
              { action: 'Payment processed', user: 'Emma Watson', time: '6 hours ago' },
              { action: 'Event scheduled', user: 'Michael Park', time: '1 day ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">by {item.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
