'use client'

import { Plus, MoreHorizontal, Trophy, Star, Zap, Target } from 'lucide-react'

const badges = [
  {
    id: 1,
    name: 'Course Completion',
    icon: '🏆',
    points: 100,
    earnedBy: 2340,
    rarity: 'Common',
    unlocked: true,
  },
  {
    id: 2,
    name: 'Top Contributor',
    icon: '⭐',
    points: 500,
    earnedBy: 342,
    rarity: 'Rare',
    unlocked: true,
  },
  {
    id: 3,
    name: 'Community Leader',
    icon: '👑',
    points: 1000,
    earnedBy: 42,
    rarity: 'Epic',
    unlocked: false,
  },
  {
    id: 4,
    name: 'Event Attendee',
    icon: '🎭',
    points: 250,
    earnedBy: 1820,
    rarity: 'Common',
    unlocked: true,
  },
]

const leaderboard = [
  {
    rank: 1,
    name: 'Alex Thompson',
    points: 15240,
    badges: 12,
    avatar: '👨‍🚀',
  },
  {
    rank: 2,
    name: 'Maria Garcia',
    points: 14580,
    badges: 11,
    avatar: '👩‍🎓',
  },
  {
    rank: 3,
    name: 'David Lee',
    points: 13920,
    badges: 10,
    avatar: '👨‍💻',
  },
  {
    rank: 4,
    name: 'Jessica Brown',
    points: 12850,
    badges: 9,
    avatar: '👩‍🏫',
  },
  {
    rank: 5,
    name: 'Robert Chen',
    points: 11620,
    badges: 8,
    avatar: '👨‍🔬',
  },
]

export default function GamificationPage() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-foreground">Gamification</h1>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Badge
            </button>
          </div>
          <p className="text-muted-foreground">Engage your community with badges, points, and leaderboards</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Badges</p>
                <p className="text-3xl font-bold text-foreground mt-2">24</p>
              </div>
              <Trophy className="w-12 h-12 text-primary opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Users Engaged</p>
                <p className="text-3xl font-bold text-foreground mt-2">8,942</p>
              </div>
              <Star className="w-12 h-12 text-secondary opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Points Awarded</p>
                <p className="text-3xl font-bold text-foreground mt-2">2.4M</p>
              </div>
              <Zap className="w-12 h-12 text-accent opacity-20" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Engagement Rate</p>
                <p className="text-3xl font-bold text-foreground mt-2">68.3%</p>
              </div>
              <Target className="w-12 h-12 text-chart-2 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Badges Section */}
          <div>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Available Badges</h2>
              </div>
              <div className="p-6 space-y-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{badge.icon}</span>
                      <div>
                        <p className="font-medium text-foreground">{badge.name}</p>
                        <p className="text-sm text-muted-foreground">{badge.earnedBy.toLocaleString()} earned</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{badge.points} pts</p>
                      <p className={`text-xs font-medium ${
                        badge.rarity === 'Common' ? 'text-gray-600' :
                        badge.rarity === 'Rare' ? 'text-blue-600' :
                        'text-purple-600'
                      }`}>
                        {badge.rarity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Top Users</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rank</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">User</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Points</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Badges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user) => (
                      <tr key={user.rank} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-primary">#{user.rank}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{user.avatar}</span>
                            <span className="font-medium text-foreground">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{user.points.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{user.badges}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
