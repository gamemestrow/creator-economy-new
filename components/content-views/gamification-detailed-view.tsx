'use client'

import { Trophy, Star, Zap, Plus, Award, Target } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const badgeData = [
  { name: 'Earned', value: 1240, color: '#9AA59E' },
  { name: 'Available', value: 3760, color: '#e5e7eb' },
]

const leaderboard = [
  { rank: 1, name: 'Alex Johnson', points: 4850, badges: 12, level: 'Master' },
  { rank: 2, name: 'Sarah Chen', points: 4220, badges: 10, level: 'Expert' },
  { rank: 3, name: 'Mike Davis', points: 3890, badges: 9, level: 'Expert' },
  { rank: 4, name: 'Emma Wilson', points: 3450, badges: 7, level: 'Pro' },
  { rank: 5, name: 'James Brown', points: 3120, badges: 6, level: 'Pro' },
]

const pointTrend = [
  { day: 'Mon', points: 450 },
  { day: 'Tue', points: 520 },
  { day: 'Wed', points: 680 },
  { day: 'Thu', points: 750 },
  { day: 'Fri', points: 890 },
  { day: 'Sat', points: 620 },
  { day: 'Sun', points: 480 },
]

export function GamificationDetailedView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gamification</h1>
          <p className="text-muted-foreground mt-2">Engage users with badges, points, and leaderboards</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition">
          <Plus className="w-5 h-5" />
          Create Badge
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Points Earned</p>
              <p className="text-3xl font-bold text-foreground mt-1">127,450</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Badges</p>
              <p className="text-3xl font-bold text-foreground mt-1">12</p>
            </div>
            <Award className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="text-3xl font-bold text-foreground mt-1">2,840</p>
            </div>
            <Target className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Level</p>
              <p className="text-3xl font-bold text-foreground mt-1">4.2</p>
            </div>
            <Star className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges Distribution */}
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Badges Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={badgeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                {badgeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {badgeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Points Trend */}
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Points Earned This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={pointTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="points" stroke="#9AA59E" strokeWidth={2} dot={{ fill: '#9AA59E' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Top Players</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Points</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Badges</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Level</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user) => (
                <tr key={user.rank} className="border-b border-border hover:bg-muted">
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-bold">
                      {user.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.points.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.badges}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-hover">
                      {user.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
