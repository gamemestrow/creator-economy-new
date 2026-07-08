'use client'

import { useState } from 'react'
import { Trophy, Star, Flame, Zap, Crown, Target, Award, Gift, Shield, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const BADGES = [
  { id: 1, name: 'First Steps', desc: 'Complete your first lesson', emoji: '👶', rarity: 'Common', earned: true, date: 'Jan 2026' },
  { id: 2, name: 'Week Warrior', desc: '7-day learning streak', emoji: '🔥', rarity: 'Common', earned: true, date: 'Feb 2026' },
  { id: 3, name: 'Course Crusher', desc: 'Complete 5 courses', emoji: '💪', rarity: 'Rare', earned: true, date: 'Mar 2026' },
  { id: 4, name: 'Scholar', desc: 'Earn 3 certificates', emoji: '🎓', rarity: 'Rare', earned: true, date: 'Apr 2026' },
  { id: 5, name: 'Community Star', desc: '50 posts liked by others', emoji: '⭐', rarity: 'Epic', earned: true, date: 'May 2026' },
  { id: 6, name: 'Speed Learner', desc: 'Complete a course in 2 days', emoji: '⚡', rarity: 'Epic', earned: false, date: null },
  { id: 7, name: 'Legend', desc: 'Reach Level 10', emoji: '👑', rarity: 'Legendary', earned: false, date: null },
  { id: 8, name: 'Night Owl', desc: 'Study after midnight 10 times', emoji: '🦉', rarity: 'Rare', earned: false, date: null },
  { id: 9, name: 'Helping Hand', desc: 'Answer 20 community questions', emoji: '🤝', rarity: 'Epic', earned: true, date: 'June 2026' },
  { id: 10, name: 'Perfect Score', desc: 'Score 100% on any quiz', emoji: '💯', rarity: 'Rare', earned: false, date: null },
  { id: 11, name: 'Month Streak', desc: '30-day learning streak', emoji: '🌟', rarity: 'Legendary', earned: false, date: null },
  { id: 12, name: 'Social Butterfly', desc: 'Connect with 10 members', emoji: '🦋', rarity: 'Common', earned: true, date: 'Mar 2026' },
]

const LEADERBOARD = [
  { rank: 1, name: 'Sarah Chen', initials: 'SC', color: '#B88A5A', level: 'Legend', xp: 12450, badges: 18, streak: 45 },
  { rank: 2, name: 'Rahul Sharma', initials: 'RS', color: '#78866B', level: 'Expert', xp: 11200, badges: 15, streak: 38 },
  { rank: 3, name: 'Priya Nair', initials: 'PN', color: '#4F8A5B', level: 'Expert', xp: 9800, badges: 13, streak: 30 },
  { rank: 4, name: 'Alex Johnson', initials: 'AJ', color: '#7B8FA1', level: 'Scholar', xp: 8420, badges: 11, streak: 22 },
  { rank: 5, name: 'You (Anamika)', initials: 'AP', color: '#78866B', level: 'Scholar', xp: 7840, badges: 9, streak: 7, isYou: true },
  { rank: 6, name: 'David Kumar', initials: 'DK', color: '#D4A13A', level: 'Learner', xp: 6500, badges: 8, streak: 15 },
  { rank: 7, name: 'Meera Pillai', initials: 'MP', color: '#B88A5A', level: 'Learner', xp: 5900, badges: 7, streak: 12 },
]

const CHALLENGES = [
  { title: 'Daily Goal', desc: 'Complete 2 lessons today', progress: 1, total: 2, type: 'daily', xp: 50 },
  { title: 'Weekly Champion', desc: 'Complete 10 lessons this week', progress: 7, total: 10, type: 'weekly', xp: 200 },
  { title: 'Monthly Master', desc: 'Complete 40 lessons this month', progress: 28, total: 40, type: 'monthly', xp: 800 },
]

const rarityStyles: Record<string, string> = {
  Common: 'border-[#E4E6DE] bg-[#F3F4EF] text-[#6B7280]',
  Rare: 'border-[#7B8FA1]/30 bg-[#7B8FA1]/5 text-[#7B8FA1]',
  Epic: 'border-[#78866B]/30 bg-[#78866B]/5 text-[#78866B]',
  Legendary: 'border-[#B88A5A]/30 bg-[#B88A5A]/5 text-[#B88A5A]',
}

function ProgressBar({ value, max, color = '#78866B' }: { value: number; max: number; color?: string }) {
  return (
    <div className="mt-2 overflow-hidden rounded-full bg-[#E4E6DE] h-2">
      <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${(value / max) * 100}%`, background: color }} />
    </div>
  )
}

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<'badges' | 'challenges' | 'leaderboard'>('badges')
  const currentXP = 7840
  const nextLevelXP = 10000
  const level = 7

  const streakDays = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, active: Math.random() > 0.35 }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2933]">Achievements</h1>
        <p className="text-sm text-[#6B7280]">Track your XP, badges, and learning milestones</p>
      </div>

      {/* Level Card */}
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#65735A] to-[#78866B] p-6 text-white shadow-lg">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-4 right-16 h-20 w-20 rounded-full bg-white/5" />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Current Level</p>
            <h2 className="mt-1 text-3xl font-bold">Level {level} <span className="text-white/80">— Scholar</span></h2>
            <p className="mt-1 text-sm text-white/70">{currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</p>
            <div className="mt-3 w-64 max-w-full overflow-hidden rounded-full bg-white/20 h-2">
              <div className="h-2 rounded-full bg-white transition-all" style={{ width: `${(currentXP / nextLevelXP) * 100}%` }} />
            </div>
            <p className="mt-1.5 text-xs text-white/60">{(nextLevelXP - currentXP).toLocaleString()} XP to Level {level + 1}</p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">🏆</div>
            <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
              <Flame className="h-3.5 w-3.5" /> 7 Day Streak
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[{ label: 'Level', value: level, emoji: '⭐' },
          { label: 'Total XP', value: '7.8K', emoji: '⚡' },
          { label: 'Badges', value: BADGES.filter(b => b.earned).length, emoji: '🏅' },
          { label: 'Day Streak', value: 7, emoji: '🔥' }].map(s => (
          <div key={s.label} className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm text-center">
            <div className="text-2xl">{s.emoji}</div>
            <p className="mt-1 text-2xl font-bold text-[#1F2933]">{s.value}</p>
            <p className="text-xs text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-[#E4E6DE] bg-white p-1">
        {[['badges', '🏅 Badges'], ['challenges', '🎯 Challenges'], ['leaderboard', '🏆 Leaderboard']].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key as any)}
            className={cn('flex-1 rounded-lg py-2 text-sm font-semibold transition-all', activeTab === key
              ? 'bg-[#78866B] text-white shadow-sm'
              : 'text-[#6B7280] hover:text-[#1F2933]')}>
            {label}
          </button>
        ))}
      </div>

      {/* Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BADGES.map(badge => (
            <div key={badge.id} className={cn('rounded-[18px] border p-4 text-center transition-all duration-250', badge.earned
              ? cn(rarityStyles[badge.rarity], 'hover:shadow-md hover:-translate-y-0.5')
              : 'border-dashed border-[#E4E6DE] bg-[#F3F4EF] opacity-50')}>
              <div className="text-3xl">{badge.emoji}</div>
              <p className="mt-2 text-xs font-bold text-[#1F2933]">{badge.name}</p>
              <p className="mt-0.5 text-[10px] text-[#6B7280] line-clamp-2">{badge.desc}</p>
              <span className={cn('mt-2 inline-block rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider', rarityStyles[badge.rarity])}>
                {badge.rarity}
              </span>
              {badge.earned && badge.date && <p className="mt-1 text-[10px] text-[#6B7280]">{badge.date}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Challenges */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {/* Streak Calendar */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-[#1F2933]">30-Day Learning Streak</h3>
            <div className="flex flex-wrap gap-1.5">
              {streakDays.map(d => (
                <div key={d.day} title={`Day ${d.day}`}
                  className={cn('h-7 w-7 rounded-lg text-center text-[10px] leading-7 font-medium transition-colors',
                    d.active ? 'bg-[#78866B] text-white' : 'bg-[#F3F4EF] text-[#9AA59E]')}>
                  {d.day}
                </div>
              ))}
            </div>
          </div>
          {CHALLENGES.map(c => (
            <div key={c.title} className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                      c.type === 'daily' ? 'bg-[#4F8A5B]/10 text-[#4F8A5B]' :
                      c.type === 'weekly' ? 'bg-[#78866B]/10 text-[#78866B]' :
                      'bg-[#B88A5A]/10 text-[#B88A5A]')}>
                      {c.type}
                    </span>
                    <span className="text-xs font-semibold text-[#6B7280]">+{c.xp} XP</span>
                  </div>
                  <h3 className="mt-1.5 text-sm font-bold text-[#1F2933]">{c.title}</h3>
                  <p className="text-xs text-[#6B7280]">{c.desc}</p>
                </div>
                <span className="text-sm font-bold text-[#1F2933]">{c.progress}/{c.total}</span>
              </div>
              <ProgressBar value={c.progress} max={c.total} />
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="rounded-[18px] border border-[#E4E6DE] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E4E6DE] bg-[#F3F4EF]">
                  <th className="py-3 pl-5 text-left text-xs font-semibold text-[#6B7280]">Rank</th>
                  <th className="py-3 pl-3 text-left text-xs font-semibold text-[#6B7280]">Member</th>
                  <th className="py-3 pr-4 text-right text-xs font-semibold text-[#6B7280]">XP</th>
                  <th className="py-3 pr-4 text-right text-xs font-semibold text-[#6B7280]">Badges</th>
                  <th className="py-3 pr-5 text-right text-xs font-semibold text-[#6B7280]">Streak</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map(u => (
                  <tr key={u.rank} className={cn('border-b border-[#F3F4EF] transition-colors', u.isYou ? 'bg-[#78866B]/5' : 'hover:bg-[#F8F8F5]')}>
                    <td className="py-3.5 pl-5">
                      <span className={cn('text-lg font-bold', u.rank === 1 ? 'text-[#B88A5A]' : u.rank === 2 ? 'text-[#9AA59E]' : u.rank === 3 ? 'text-[#B87333]' : 'text-[#6B7280]')}>
                        {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : `#${u.rank}`}
                      </span>
                    </td>
                    <td className="py-3.5 pl-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: u.color }}>
                          {u.initials}
                        </div>
                        <div>
                          <p className={cn('text-sm font-semibold', u.isYou ? 'text-[#78866B]' : 'text-[#1F2933]')}>{u.name}{u.isYou && ' ← You'}</p>
                          <p className="text-[11px] text-[#6B7280]">{u.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-right text-sm font-bold text-[#1F2933]">{u.xp.toLocaleString()}</td>
                    <td className="py-3.5 pr-4 text-right text-sm text-[#6B7280]">{u.badges}</td>
                    <td className="py-3.5 pr-5 text-right text-sm text-[#6B7280]">🔥 {u.streak}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
