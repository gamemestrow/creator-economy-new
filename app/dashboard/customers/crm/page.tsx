'use client'

import { Plus, MoreHorizontal, Phone, Mail, MapPin, TrendingUp } from 'lucide-react'

const contacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Corp',
    status: 'Active',
    lastContact: '2 days ago',
    value: '₹5,000',
    avatar: '👩‍💼',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 (555) 234-5678',
    company: 'Innovation Labs',
    status: 'Lead',
    lastContact: '1 week ago',
    value: '₹2,500',
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    phone: '+1 (555) 345-6789',
    company: 'Digital Solutions',
    status: 'Active',
    lastContact: 'Today',
    value: '₹8,000',
    avatar: '👩‍💻',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james@example.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Ventures',
    status: 'Inactive',
    lastContact: '3 weeks ago',
    value: '₹1,500',
    avatar: '👨‍🔬',
  },
]

export default function CRMPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-foreground">CRM Management</h1>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Contact
            </button>
          </div>
          <p className="text-muted-foreground">Manage and track your customer relationships</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Contacts</p>
                <p className="text-3xl font-bold text-foreground mt-2">842</p>
              </div>
              <Phone className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Leads</p>
                <p className="text-3xl font-bold text-foreground mt-2">156</p>
              </div>
              <TrendingUp className="w-12 h-12 text-secondary opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Converted This Month</p>
                <p className="text-3xl font-bold text-foreground mt-2">28</p>
              </div>
              <Mail className="w-12 h-12 text-accent opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pipeline Value</p>
                <p className="text-3xl font-bold text-foreground mt-2">₹234K</p>
              </div>
              <MapPin className="w-12 h-12 text-chart-2 opacity-20" />
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Recent Contacts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Last Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Value</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{contact.avatar}</span>
                        <div>
                          <p className="font-medium text-foreground">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{contact.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.status === 'Active' ? 'bg-green-100 text-green-800' :
                        contact.status === 'Lead' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{contact.lastContact}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{contact.value}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-5 h-5" />
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
