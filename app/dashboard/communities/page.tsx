'use client'

import { Plus, MessageSquare, Users, Activity, MoreHorizontal } from 'lucide-react'

const mockCommunities = [
  {
    id: 1,
    name: 'Web Developers Hub',
    description: 'A community for web developers to share knowledge and projects',
    members: 3400,
    posts: 12500,
    engagement: '8.5%',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Digital Marketing Masters',
    description: 'Discuss strategies, tools, and trends in digital marketing',
    members: 2100,
    posts: 8900,
    engagement: '7.2%',
    status: 'Active',
  },
  {
    id: 3,
    name: 'AI & Tech Enthusiasts',
    description: 'Explore artificial intelligence, machine learning, and technology',
    members: 5200,
    posts: 18700,
    engagement: '9.1%',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Startup Founders Circle',
    description: 'Support and advice for startup founders and entrepreneurs',
    members: 1800,
    posts: 5600,
    engagement: '6.8%',
    status: 'Active',
  },
]

function CommunityCard({ community }: { community: any }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">{community.name}</h3>
          <p className="text-sm text-muted-foreground">{community.description}</p>
        </div>
        <button className="p-2 hover:bg-input rounded transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Members</p>
          <p className="text-xl font-bold text-foreground">{(community.members / 1000).toFixed(1)}k</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Posts</p>
          <p className="text-xl font-bold text-foreground">{(community.posts / 1000).toFixed(1)}k</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Engagement</p>
          <p className="text-xl font-bold text-foreground">{community.engagement}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            community.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {community.status}
        </span>
        <button className="text-primary text-sm font-medium hover:underline">
          Manage →
        </button>
      </div>
    </div>
  )
}

export default function CommunitiesPage() {
  const totalMembers = mockCommunities.reduce((sum, c) => sum + c.members, 0)
  const totalPosts = mockCommunities.reduce((sum, c) => sum + c.posts, 0)
  const avgEngagement = (mockCommunities.reduce((sum, c) => sum + parseFloat(c.engagement), 0) / mockCommunities.length).toFixed(1)

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Communities</h1>
            <p className="text-muted-foreground mt-2">Manage and grow your engaged communities</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" />
            Create Community
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Communities</p>
                <p className="text-3xl font-bold text-foreground">{mockCommunities.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Members</p>
                <p className="text-3xl font-bold text-foreground">{(totalMembers / 1000).toFixed(1)}k</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Avg Engagement</p>
                <p className="text-3xl font-bold text-foreground">{avgEngagement}%</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Activity className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </div>
    </div>
  )
}
