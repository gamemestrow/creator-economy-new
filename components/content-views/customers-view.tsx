'use client'

import { Plus, Mail, MoreHorizontal } from 'lucide-react'

const customers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', joined: '2024-01-15', purchases: 5, spent: '$450', status: 'active' },
  { id: 2, name: 'Mike Chen', email: 'mike@example.com', joined: '2024-02-20', purchases: 3, spent: '$290', status: 'active' },
  { id: 3, name: 'Emma Davis', email: 'emma@example.com', joined: '2024-03-10', purchases: 8, spent: '$720', status: 'active' },
  { id: 4, name: 'John Smith', email: 'john@example.com', joined: '2024-01-05', purchases: 2, spent: '$150', status: 'inactive' },
  { id: 5, name: 'Lisa Wang', email: 'lisa@example.com', joined: '2024-04-01', purchases: 6, spent: '$540', status: 'active' },
]

export function CustomersView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">Manage your customer relationships</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Customers', value: '2,543', change: '+18.5%' },
          { label: 'Active Customers', value: '2,124', change: '+12.3%' },
          { label: 'Avg Lifetime Value', value: '$342', change: '+8.2%' },
          { label: 'Retention Rate', value: '87.5%', change: '+2.1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-green-600 text-sm font-medium mt-4">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Purchases</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total Spent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.joined}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.purchases}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{customer.spent}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
