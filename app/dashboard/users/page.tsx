'use client'

import { useState } from 'react'
import { Search, MoreHorizontal, Plus, Filter } from 'lucide-react'

const mockUsers = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Content Creator', status: 'Active', joinDate: '2024-01-15', revenue: '$1,200' },
  { id: 2, name: 'John Developer', email: 'john@example.com', role: 'Developer', status: 'Active', joinDate: '2024-02-20', revenue: '$2,500' },
  { id: 3, name: 'Emma Watson', email: 'emma@example.com', role: 'Student', status: 'Active', joinDate: '2024-03-10', revenue: '$450' },
  { id: 4, name: 'Michael Park', email: 'michael@example.com', role: 'Community Manager', status: 'Inactive', joinDate: '2024-01-05', revenue: '$800' },
  { id: 5, name: 'Lisa Johnson', email: 'lisa@example.com', role: 'Content Creator', status: 'Active', joinDate: '2024-04-01', revenue: '$1,800' },
  { id: 6, name: 'Alex Thompson', email: 'alex@example.com', role: 'Investor', status: 'Active', joinDate: '2024-02-15', revenue: '$5,000' },
  { id: 7, name: 'Jordan Lee', email: 'jordan@example.com', role: 'Student', status: 'Inactive', joinDate: '2024-03-25', revenue: '$0' },
  { id: 8, name: 'Casey Rivera', email: 'casey@example.com', role: 'Content Creator', status: 'Active', joinDate: '2024-04-10', revenue: '$1,600' },
]

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        status === 'Active'
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      {status}
    </span>
  )
}

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const filteredUsers = mockUsers.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  )

  const toggleRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  const toggleAllRows = () => {
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredUsers.map(u => u.id))
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-2">Manage and monitor all platform users</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-input transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-input">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleAllRows}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Email</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Role</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Join Date</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Revenue</th>
                <th className="px-6 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-input/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.id)}
                      onChange={() => toggleRow(user.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.role}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.joinDate}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{user.revenue}</td>
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

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredUsers.length} users found</span>
          <div className="flex items-center gap-4">
            <span>Showing 1 to {filteredUsers.length} of {mockUsers.length}</span>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-border rounded hover:bg-input transition-colors">Previous</button>
              <button className="px-3 py-2 border border-border rounded hover:bg-input transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
