'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download } from 'lucide-react'

const salesData = [
  { date: 'Mon', sales: 4000, orders: 24, revenue: 2400 },
  { date: 'Tue', sales: 3000, orders: 18, revenue: 2210 },
  { date: 'Wed', sales: 2000, orders: 29, revenue: 2290 },
  { date: 'Thu', sales: 2780, orders: 20, revenue: 2000 },
  { date: 'Fri', sales: 1890, orders: 23, revenue: 2181 },
  { date: 'Sat', sales: 2390, orders: 25, revenue: 2500 },
  { date: 'Sun', sales: 3490, orders: 30, revenue: 2100 },
]

const topProducts = [
  { name: 'React Course', sales: 1240, revenue: '$12,400' },
  { name: 'Design Kit', sales: 856, revenue: '$8,560' },
  { name: 'Bundle Pack', sales: 643, revenue: '$12,860' },
  { name: 'Workshop Access', sales: 521, revenue: '$5,210' },
]

export function SalesView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales</h1>
          <p className="text-gray-500 mt-1">Track your sales performance and trends</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Sales', value: '$24,580', change: '+12.5%' },
          { label: 'Orders', value: '189', change: '+8.2%' },
          { label: 'Avg Order Value', value: '$130', change: '+3.1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-green-600 text-sm font-medium mt-4">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Sales This Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Bar dataKey="sales" fill="#2563EB" name="Sales ($)" />
            <Bar dataKey="orders" fill="#4F46E5" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Top Products</h3>
        <div className="space-y-4">
          {topProducts.map((product, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{i + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales.toLocaleString()} sales</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">{product.revenue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
