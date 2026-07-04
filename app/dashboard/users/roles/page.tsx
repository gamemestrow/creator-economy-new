'use client'

import { Plus, MoreHorizontal, Shield, Lock, Eye } from 'lucide-react'

export default function RolesPage() {
  const roles = [
    {
      id: 1,
      name: 'Admin',
      description: 'Full access to all features',
      users: 2,
      permissions: 32,
      color: 'bg-red-100 text-red-800',
    },
    {
      id: 2,
      name: 'Creator',
      description: 'Can create and manage content',
      users: 24,
      permissions: 18,
      color: 'bg-primary/10 text-primary-hover',
    },
    {
      id: 3,
      name: 'Moderator',
      description: 'Can moderate content and users',
      users: 8,
      permissions: 12,
      color: 'bg-primary/10 text-primary-hover',
    },
    {
      id: 4,
      name: 'Member',
      description: 'Limited access, read-only',
      users: 156,
      permissions: 5,
      color: 'bg-green-100 text-green-800',
    },
  ]

  const permissions = [
    { id: 1, name: 'View Dashboard', category: 'Dashboard' },
    { id: 2, name: 'Manage Users', category: 'Users' },
    { id: 3, name: 'Create Courses', category: 'Courses' },
    { id: 4, name: 'Manage Payments', category: 'Payments' },
    { id: 5, name: 'View Analytics', category: 'Analytics' },
    { id: 6, name: 'Delete Content', category: 'Content' },
    { id: 7, name: 'Manage Settings', category: 'Settings' },
    { id: 8, name: 'Invite Users', category: 'Users' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Roles & Permissions</h1>
          <p className="text-muted-foreground mt-1">Manage user roles and access control</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{role.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 border-t border-border pt-3 mt-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Users</span>
                <span className="font-semibold text-foreground">{role.users}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Permissions</span>
                <span className="font-semibold text-foreground">{role.permissions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Available Permissions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Permission</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Category</th>
                <th className="text-center px-6 py-3 text-sm font-semibold text-foreground">Admin</th>
                <th className="text-center px-6 py-3 text-sm font-semibold text-foreground">Creator</th>
                <th className="text-center px-6 py-3 text-sm font-semibold text-foreground">Moderator</th>
                <th className="text-center px-6 py-3 text-sm font-semibold text-foreground">Member</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{permission.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{permission.category}</td>
                  <td className="px-6 py-4 text-center">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="checkbox" defaultChecked={permission.id <= 3} className="w-4 h-4 accent-primary" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="checkbox" defaultChecked={permission.id <= 2} className="w-4 h-4 accent-primary" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 accent-primary" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Management Matrix */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Role Management Matrix
        </h2>
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${role.color.split(' ')[0]}`}></div>
                <div>
                  <h3 className="font-semibold text-foreground">{role.name}</h3>
                  <p className="text-xs text-muted-foreground">{role.users} users assigned</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1 text-sm rounded bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors">
                  <Eye className="w-4 h-4" />
                  View Permissions
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
