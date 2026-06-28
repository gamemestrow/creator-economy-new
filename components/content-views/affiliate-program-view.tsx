'use client'

import { Handshake, Copy, Plus, TrendingUp, Users, DollarSign, Eye, Edit2 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const commissionData = [
  { month: 'Jan', commission: 1200, sales: 8400 },
  { month: 'Feb', commission: 1600, sales: 11200 },
  { month: 'Mar', commission: 2100, sales: 14700 },
  { month: 'Apr', commission: 2800, sales: 19600 },
  { month: 'May', commission: 3200, sales: 22400 },
  { month: 'Jun', commission: 4100, sales: 28700 },
]

const topAffiliates = [
  { id: 1, name: 'Sarah Marketing Pro', referrals: 245, sales: 18500, commission: 1850, status: 'active' },
  { id: 2, name: 'Tech Review Blog', referrals: 182, sales: 14200, commission: 1420, status: 'active' },
  { id: 3, name: 'John Creator', referrals: 156, sales: 12100, commission: 1210, status: 'active' },
  { id: 4, name: 'Digital Agency Team', referrals: 128, sales: 9600, commission: 960, status: 'pending' },
]

export function AffiliateProgramView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Affiliate Program</h1>
          <p className="text-gray-600 mt-2">Manage your affiliate partners and track commissions</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          Invite Affiliate
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Affiliates</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">34</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹88,400</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Commission Paid</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹8,840</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Commission</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">10%</p>
            </div>
            <Handshake className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Commission Trend */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Commission Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={commissionData}>
            <defs>
              <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }} />
            <Area type="monotone" dataKey="commission" stroke="#2563eb" fillOpacity={1} fill="url(#colorCommission)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Affiliates */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Top Affiliates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Referrals</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sales</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Commission</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900"></th>
              </tr>
            </thead>
            <tbody>
              {topAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{affiliate.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{affiliate.referrals}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{affiliate.sales.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">₹{affiliate.commission.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      affiliate.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {affiliate.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
