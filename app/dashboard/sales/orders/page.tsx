'use client'

import { useState } from 'react'
import { ShoppingBag, Search, Filter, MoreHorizontal, Loader2, CreditCard } from 'lucide-react'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useCreatorOrders } from '@/lib/hooks/use-creator-data'
import DownloadCsvButton from '@/components/downloadCSVbutton'

export default function OrdersPage() {
  const { user } = useRequireRole(['creator', 'attendee'])
  const { orders, loading } = useCreatorOrders(user?.uid || '')
  const [search, setSearch] = useState('')

  const filteredOrders = orders.filter(
    (order) =>
      order.userName?.toLowerCase().includes(search.toLowerCase()) ||
      order.courseName?.toLowerCase().includes(search.toLowerCase()) ||
      order.orderId.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground mt-2">Track and manage your sales and transactions</p>
          </div>
          <DownloadCsvButton data={orders} fileName='orders'/>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">{orders.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-foreground">
              ₹{orders.reduce((sum, o) => sum + (o.status === 'completed' ? o.amount : 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
            <p className="text-2xl font-bold text-foreground">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by customer, course or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Order ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Customer</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Course</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Amount</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={7} className="px-6 py-6">
                        <div className="h-4 bg-muted rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                        #{order.orderId.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-foreground text-sm">{order.userName || 'Guest'}</p>
                          <p className="text-xs text-muted-foreground">{order.userEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground font-medium">{order.courseName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-foreground">₹{order.amount}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ₹{
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-semibold text-foreground">No orders found</p>
                      <p className="text-sm text-muted-foreground">When you make sales, they will appear here.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
