'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  { month: 'Mar', revenue: 2000, users: 9800 },
  { month: 'Apr', revenue: 2780, users: 3908 },
  { month: 'May', revenue: 1890, users: 4800 },
  { month: 'Jun', revenue: 2390, users: 3800 },
]

const salesData = [
  { name: 'Courses', value: 45 },
  { name: 'Products', value: 30 },
  { name: 'Workshops', value: 25 },
]

const COLORS = ['#2563EB', '#4F46E5', '#7C3AED']

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Anamika!</h1>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: DollarSign, label: 'Total Revenue', value: '$45,231', change: '+12.5%', color: 'bg-blue-50' },
          { icon: Users, label: 'Active Users', value: '12,543', change: '+8.2%', color: 'bg-indigo-50' },
          { icon: ShoppingCart, label: 'Total Orders', value: '1,234', change: '+23.1%', color: 'bg-purple-50' },
          { icon: TrendingUp, label: 'Conversion', value: '3.24%', change: '+4.3%', color: 'bg-cyan-50' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className={`${stat.color} p-6 rounded-xl`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <Icon className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-green-600 text-sm font-medium mt-4">{stat.change} from last month</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#2563EB" name="Revenue ($)" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#4F46E5" name="Users" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Sales Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { activity: 'New course created', timestamp: '2 hours ago', status: 'completed' },
            { activity: 'Payment received from customer', timestamp: '4 hours ago', status: 'completed' },
            { activity: 'New user registered', timestamp: '6 hours ago', status: 'pending' },
            { activity: 'Email campaign sent', timestamp: '1 day ago', status: 'completed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.activity}</p>
                <p className="text-sm text-gray-500">{item.timestamp}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
