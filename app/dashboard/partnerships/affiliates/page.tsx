'use client'

import { Plus, MoreHorizontal, Share2, TrendingUp, Users, DollarSign } from 'lucide-react'

const affiliates = [
  {
    id: 1,
    name: 'Sarah Marketing Pro',
    joinDate: '6 months ago',
    referrals: 342,
    conversions: 89,
    revenue: '₹4,250',
    commissionRate: '20%',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Tech Content Creator',
    joinDate: '4 months ago',
    referrals: 218,
    conversions: 52,
    revenue: '₹2,480',
    commissionRate: '20%',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Digital Strategy Hub',
    joinDate: '2 months ago',
    referrals: 156,
    conversions: 38,
    revenue: '₹1,820',
    commissionRate: '15%',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Business Network',
    joinDate: '1 month ago',
    referrals: 87,
    conversions: 18,
    revenue: '₹864',
    commissionRate: '15%',
    status: 'Pending',
  },
]

const affiliateStats = [
  {
    metric: 'Total Affiliates',
    value: '284',
    change: '+32',
    icon: '👥',
  },
  {
    metric: 'Total Referrals',
    value: '8.4K',
    change: '+1.2K',
    icon: '🔗',
  },
  {
    metric: 'Conversion Rate',
    value: '24.3%',
    change: '+2.1%',
    icon: '📈',
  },
  {
    metric: 'Total Payouts',
    value: '₹82.4K',
    change: '+₹12.3K',
    icon: '💵',
  },
]

export default function AffiliateSystemPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-foreground">Affiliate System</h1>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Invite Affiliate
            </button>
          </div>
          <p className="text-muted-foreground">Manage your affiliate program and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {affiliateStats.map((stat, idx) => (
            <div key={idx} className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.metric}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Affiliates */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Top Affiliates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Affiliate Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Referrals</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Conversions</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Revenue</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Commission</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{affiliate.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{affiliate.joinDate}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{affiliate.referrals.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{affiliate.conversions}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{affiliate.revenue}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{affiliate.commissionRate}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        affiliate.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {affiliate.status}
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

        {/* Commission Structure */}
        <div className="mt-8 bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Commission Structure</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { tier: 'Starter', referrals: '0-100', rate: '15%', description: 'New affiliates' },
              { tier: 'Professional', referrals: '101-500', rate: '20%', description: 'Active promoters' },
              { tier: 'Elite', referrals: '500+', rate: '25%', description: 'Top performers' },
            ].map((tier, idx) => (
              <div key={idx} className="bg-muted/30 rounded-lg p-4 border border-border">
                <p className="font-semibold text-foreground mb-1">{tier.tier}</p>
                <p className="text-2xl font-bold text-primary mb-2">{tier.rate}</p>
                <p className="text-sm text-muted-foreground mb-2">{tier.referrals} referrals</p>
                <p className="text-xs text-muted-foreground">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
