'use client'

import { Plus, MoreHorizontal, Send, Users, TrendingUp, Clock } from 'lucide-react'

const campaigns = [
  {
    id: 1,
    name: 'Launch Week Email Campaign',
    type: 'Email',
    recipients: 12500,
    openRate: 34.2,
    clickRate: 8.5,
    status: 'Active',
    schedule: 'Daily at 9 AM',
    conversions: 145,
  },
  {
    id: 2,
    name: 'WhatsApp Promo Campaign',
    type: 'WhatsApp',
    recipients: 8300,
    openRate: 67.8,
    clickRate: 22.3,
    status: 'Active',
    schedule: 'Instant',
    conversions: 312,
  },
  {
    id: 3,
    name: 'Re-engagement Campaign',
    type: 'Email',
    recipients: 4200,
    openRate: 19.3,
    clickRate: 4.1,
    status: 'Paused',
    schedule: 'Weekly',
    conversions: 52,
  },
  {
    id: 4,
    name: 'Product Upsell Campaign',
    type: 'WhatsApp',
    recipients: 5600,
    openRate: 72.4,
    clickRate: 18.9,
    status: 'Active',
    schedule: 'Bi-weekly',
    conversions: 198,
  },
]

export default function CampaignsPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-foreground">Email & WhatsApp Campaigns</h1>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Campaign
            </button>
          </div>
          <p className="text-muted-foreground">Create and manage email and WhatsApp marketing campaigns</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Subscribers</p>
                <p className="text-3xl font-bold text-foreground mt-2">45.2K</p>
              </div>
              <Users className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg Open Rate</p>
                <p className="text-3xl font-bold text-foreground mt-2">48.4%</p>
              </div>
              <Send className="w-12 h-12 text-secondary opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Conversions</p>
                <p className="text-3xl font-bold text-foreground mt-2">707</p>
              </div>
              <TrendingUp className="w-12 h-12 text-accent opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Revenue Generated</p>
                <p className="text-3xl font-bold text-foreground mt-2">$47.3K</p>
              </div>
              <Clock className="w-12 h-12 text-chart-3 opacity-20" />
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Active Campaigns</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Campaign Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Recipients</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Open Rate</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Click Rate</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Conversions</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.type === 'Email' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {campaign.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{campaign.recipients.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.openRate}%</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.clickRate}%</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{campaign.conversions}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
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
