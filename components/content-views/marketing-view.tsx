'use client'

import { Plus, Send, MoreHorizontal } from 'lucide-react'

const campaigns = [
  { id: 1, name: 'Summer Sale 2026', type: 'Email', subscribers: 15430, openRate: '42%', clickRate: '8.3%', status: 'active' },
  { id: 2, name: 'New Course Launch', type: 'WhatsApp', subscribers: 8420, openRate: '68%', clickRate: '12.1%', status: 'active' },
  { id: 3, name: 'Flash Deal', type: 'SMS', subscribers: 12350, openRate: '35%', clickRate: '5.2%', status: 'completed' },
  { id: 4, name: 'Webinar Invite', type: 'Email', subscribers: 9820, openRate: '38%', clickRate: '7.8%', status: 'draft' },
]

export function MarketingView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketing</h1>
          <p className="text-muted-foreground mt-1">Create and manage marketing campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary">
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Subscribers', value: '45.2K', change: '+12%' },
          { label: 'Avg Open Rate', value: '45.8%', change: '+3.2%' },
          { label: 'Avg Click Rate', value: '8.4%', change: '+1.8%' },
          { label: 'Active Campaigns', value: '2', change: '0%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-border">
            <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
            <p className="text-green-600 text-sm font-medium mt-4">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Campaign Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Subscribers</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Open Rate</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Click Rate</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t border-border hover:bg-muted">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{campaign.type}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{campaign.subscribers.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-medium text-green-600">{campaign.openRate}</td>
                <td className="px-6 py-4 text-sm font-medium text-primary">{campaign.clickRate}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : campaign.status === 'completed'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-card rounded-lg">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
