'use client'

import { Plus, Mail, MoreHorizontal } from 'lucide-react'

const customers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', joined: '2024-01-15', purchases: 5, spent: '₹450', status: 'active' },
  { id: 2, name: 'Mike Chen', email: 'mike@example.com', joined: '2024-02-20', purchases: 3, spent: '₹290', status: 'active' },
  { id: 3, name: 'Emma Davis', email: 'emma@example.com', joined: '2024-03-10', purchases: 8, spent: '₹720', status: 'active' },
  { id: 4, name: 'John Smith', email: 'john@example.com', joined: '2024-01-05', purchases: 2, spent: '₹150', status: 'inactive' },
  { id: 5, name: 'Lisa Wang', email: 'lisa@example.com', joined: '2024-04-01', purchases: 6, spent: '₹540', status: 'active' },
]

export function CustomersView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer relationships</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary">
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Customers', value: '2,543', change: '+18.5%' },
          { label: 'Active Customers', value: '2,124', change: '+12.3%' },
          { label: 'Avg Lifetime Value', value: '₹342', change: '+8.2%' },
          { label: 'Retention Rate', value: '87.5%', change: '+2.1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-border">
            <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
            <p className="text-green-600 text-sm font-medium mt-4">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Joined</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Purchases</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Spent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t border-border hover:bg-muted">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{customer.email}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{customer.joined}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.purchases}</td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">{customer.spent}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-foreground'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-card rounded-lg">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-card rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
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
