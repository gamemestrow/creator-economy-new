'use client'

import { Plus, Mail, MessageSquare, Zap, Users, BarChart3, Settings } from 'lucide-react'

const campaigns = [
  {
    id: 1,
    name: 'Welcome Email Series',
    type: 'Email',
    status: 'Active',
    subscribers: 2500,
    openRate: 45,
    clickRate: 12,
    createdDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Course Launch Campaign',
    type: 'Multi-channel',
    status: 'Active',
    subscribers: 5000,
    openRate: 52,
    clickRate: 18,
    createdDate: '2024-02-10',
  },
  {
    id: 3,
    name: 'Community Engagement',
    type: 'WhatsApp',
    status: 'Scheduled',
    subscribers: 1200,
    openRate: 0,
    clickRate: 0,
    createdDate: '2024-03-05',
  },
  {
    id: 4,
    name: 'Product Announcement',
    type: 'Email',
    status: 'Completed',
    subscribers: 3200,
    openRate: 38,
    clickRate: 8,
    createdDate: '2024-01-20',
  },
]

const marketingTools = [
  {
    icon: <Mail className="w-8 h-8" />,
    title: 'Email Marketing',
    description: 'Create and send targeted email campaigns to your subscribers',
    subscribers: 12500,
    status: 'Connected',
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'WhatsApp Marketing',
    description: 'Reach customers via WhatsApp with personalized messages',
    subscribers: 8300,
    status: 'Connected',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'SMS Campaigns',
    description: 'Send SMS notifications and promotions',
    subscribers: 5400,
    status: 'Connected',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Audience Segmentation',
    description: 'Segment your audience for targeted campaigns',
    features: 'Advanced segmentation',
    status: 'Active',
  },
]

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Marketing & Campaigns</h1>
        <p className="text-muted-foreground mt-2">Create and manage email, WhatsApp, and SMS campaigns</p>
      </div>

      {/* Marketing Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketingTools.map((tool, index) => (
          <div key={index} className="bg-white rounded-lg border border-border p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition">
            <div className="flex items-start justify-between mb-4">
              <div className="text-primary">{tool.icon}</div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                tool.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
              }`}>
                {tool.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{tool.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
            {('subscribers' in tool) && (
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Subscribers: {tool.subscribers?.toLocaleString() ?? '0'}</span>
                <button className="text-primary hover:text-primary font-medium text-sm">Configure</button>
              </div>
            )}
            {(!('subscribers' in tool)) && (
              <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition font-medium">
                Enable Feature
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Active Campaigns</h2>
            <p className="text-muted-foreground text-sm mt-1">Manage your marketing campaigns</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition font-medium">
            <Plus className="w-5 h-5" />
            Create Campaign
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Campaign Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Subscribers</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Open Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-border hover:bg-muted transition">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-foreground">{campaign.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{campaign.createdDate}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                      campaign.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-muted text-foreground'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-foreground font-medium">{campaign.subscribers.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-card rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${campaign.openRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{campaign.openRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-primary hover:text-primary font-medium text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Sent</p>
              <p className="text-2xl font-bold text-foreground mt-2">11,900</p>
            </div>
            <Mail className="w-8 h-8 text-primary opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Avg Open Rate</p>
              <p className="text-2xl font-bold text-foreground mt-2">45.8%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Avg Click Rate</p>
              <p className="text-2xl font-bold text-foreground mt-2">12.5%</p>
            </div>
            <Zap className="w-8 h-8 text-orange-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Conversions</p>
              <p className="text-2xl font-bold text-foreground mt-2">1,488</p>
            </div>
            <Users className="w-8 h-8 text-primary opacity-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
