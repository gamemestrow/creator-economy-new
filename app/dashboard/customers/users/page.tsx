'use client'

import { useState } from 'react'
import { Search, Mail, Calendar, User, MoreHorizontal, Loader2, Filter } from 'lucide-react'
import { useCustomers } from '@/lib/hooks/use-creator-data'
import DownloadCsvButton from '@/components/downloadCSVbutton'

export default function CustomersPage() {
  const { customers, loading, search } = useCustomers()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    search(searchTerm)
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground mt-2">Manage your audience and view customer profiles</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-border px-4 py-2 rounded-lg hover:bg-muted transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <DownloadCsvButton data={customers} fileName='customers'/>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button 
            type="submit"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            Search
          </button>
        </form>

        {/* Customers Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Customer</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Contact</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Joined Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8">
                        <div className="h-4 bg-muted rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer.uid} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {customer.avatar ? (
                              <img src={customer.avatar} alt="" className="w-full h-full rounded-full" />
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">ID: {customer.uid.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{customer.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{customer.createdAt ? new Date(customer.createdAt?.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
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
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <User className="w-10 h-10 text-muted-foreground" />
                        <p className="text-lg font-semibold text-foreground">No customers found</p>
                        <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
                      </div>
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
