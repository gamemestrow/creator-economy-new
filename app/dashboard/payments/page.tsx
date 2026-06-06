'use client'

import { CreditCard, DollarSign, TrendingUp, AlertCircle, MoreHorizontal, Search } from 'lucide-react'
import { useState } from 'react'

const mockTransactions = [
  { id: 1, user: 'Sarah Chen', amount: '$1,200', status: 'Completed', date: '2024-06-10', method: 'Credit Card' },
  { id: 2, user: 'John Developer', amount: '$2,500', status: 'Completed', date: '2024-06-09', method: 'Bank Transfer' },
  { id: 3, user: 'Emma Watson', amount: '$450', status: 'Completed', date: '2024-06-08', method: 'PayPal' },
  { id: 4, user: 'Lisa Johnson', amount: '$1,800', status: 'Pending', date: '2024-06-07', method: 'Credit Card' },
  { id: 5, user: 'Alex Thompson', amount: '$5,000', status: 'Completed', date: '2024-06-06', method: 'Bank Transfer' },
  { id: 6, user: 'Casey Rivera', amount: '$1,600', status: 'Failed', date: '2024-06-05', method: 'Credit Card' },
]

function StatusBadge({ status }: { status: string }) {
  const colors = {
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Failed': 'bg-red-100 text-red-800',
  }
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  )
}

export default function PaymentsPage() {
  const [search, setSearch] = useState('')

  const totalRevenue = 12550
  const totalTransactions = mockTransactions.length
  const completedTransactions = mockTransactions.filter(t => t.status === 'Completed').length

  const filteredTransactions = mockTransactions.filter(
    t =>
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.amount.includes(search)
  )

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-2">Monitor transactions and payment processing</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Transactions</p>
                <p className="text-3xl font-bold text-foreground">{totalTransactions}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Success Rate</p>
                <p className="text-3xl font-bold text-foreground">{((completedTransactions / totalTransactions) * 100).toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Pending Settlements</h3>
            <p className="text-sm text-yellow-800">1 transaction is pending settlement and will be processed within 24 hours.</p>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by user or amount..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">User</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Method</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-input/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{transaction.user}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">{transaction.amount}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{transaction.method}</td>
                    <td className="px-6 py-4 text-muted-foreground">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-input rounded transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
