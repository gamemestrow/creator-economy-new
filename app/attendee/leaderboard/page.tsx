'use client'

import { cn } from '@/lib/utils'

const LEADERBOARD = [
  { rank: 1, name: 'Sarah Chen', initials: 'SC', color: '#B88A5A', level: 'Legend', xp: 12450, badges: 18, streak: 45 },
  { rank: 2, name: 'Rahul Sharma', initials: 'RS', color: '#78866B', level: 'Expert', xp: 11200, badges: 15, streak: 38 },
  { rank: 3, name: 'Priya Nair', initials: 'PN', color: '#4F8A5B', level: 'Expert', xp: 9800, badges: 13, streak: 30 },
  { rank: 4, name: 'Alex Johnson', initials: 'AJ', color: '#7B8FA1', level: 'Scholar', xp: 8420, badges: 11, streak: 22 },
  { rank: 5, name: 'Anamika Pandey', initials: 'AP', color: '#78866B', level: 'Scholar', xp: 7840, badges: 9, streak: 7, isYou: true },
  { rank: 6, name: 'David Kumar', initials: 'DK', color: '#D4A13A', level: 'Learner', xp: 6500, badges: 8, streak: 15 },
  { rank: 7, name: 'Meera Pillai', initials: 'MP', color: '#B88A5A', level: 'Learner', xp: 5900, badges: 7, streak: 12 },
  { rank: 8, name: 'Tom Styles', initials: 'TS', color: '#7B8FA1', level: 'Beginner', xp: 4800, badges: 5, streak: 8 },
  { rank: 9, name: 'Chris Designer', initials: 'CD', color: '#4F8A5B', level: 'Beginner', xp: 3900, badges: 4, streak: 5 },
  { rank: 10, name: 'Emily Wong', initials: 'EW', color: '#D96A5F', level: 'Beginner', xp: 3200, badges: 3, streak: 3 },
]

const TOP3 = LEADERBOARD.slice(0, 3)

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2933]">Leaderboard</h1>
        <p className="text-sm text-[#6B7280]">See how you rank among all learners this month</p>
      </div>

      {/* Podium */}
      <div className="rounded-[20px] bg-gradient-to-b from-[#F3F4EF] to-white p-6 border border-[#E4E6DE]">
        <div className="flex items-end justify-center gap-4">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-md" style={{ background: TOP3[1].color }}>
              {TOP3[1].initials}
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs font-bold text-[#1F2933]">{TOP3[1].name.split(' ')[0]}</p>
              <p className="text-[11px] text-[#6B7280]">{TOP3[1].xp.toLocaleString()} XP</p>
            </div>
            <div className="mt-3 flex h-24 w-24 flex-col items-center justify-center rounded-t-2xl bg-[#9AA59E]/20">
              <span className="text-3xl">🥈</span>
              <span className="text-sm font-bold text-[#6B7280]">#2</span>
            </div>
          </div>

          {/* 1st */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg" style={{ background: TOP3[0].color }}>
              {TOP3[0].initials}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-bold text-[#1F2933]">{TOP3[0].name.split(' ')[0]}</p>
              <p className="text-[11px] text-[#6B7280]">{TOP3[0].xp.toLocaleString()} XP</p>
            </div>
            <div className="mt-3 flex h-32 w-28 flex-col items-center justify-center rounded-t-2xl bg-[#B88A5A]/15">
              <span className="text-4xl">🥇</span>
              <span className="text-base font-bold text-[#B88A5A]">#1</span>
            </div>
          </div>

          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-md" style={{ background: TOP3[2].color }}>
              {TOP3[2].initials}
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs font-bold text-[#1F2933]">{TOP3[2].name.split(' ')[0]}</p>
              <p className="text-[11px] text-[#6B7280]">{TOP3[2].xp.toLocaleString()} XP</p>
            </div>
            <div className="mt-3 flex h-16 w-24 flex-col items-center justify-center rounded-t-2xl bg-[#D4A13A]/10">
              <span className="text-3xl">🥉</span>
              <span className="text-sm font-bold text-[#D4A13A]">#3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Full Table */}
        <div className="lg:col-span-2 rounded-[18px] border border-[#E4E6DE] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#E4E6DE] p-5">
            <h2 className="text-sm font-bold text-[#1F2933]">All Rankings — July 2026</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F3F4EF] bg-[#F8F8F5]">
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
                      <span className={cn('text-base font-bold', u.rank === 1 ? 'text-[#B88A5A]' : u.rank === 2 ? 'text-[#9AA59E]' : u.rank === 3 ? 'text-[#D4A13A]' : 'text-[#6B7280]')}>
                        {u.rank <= 3 ? ['🥇', '🥈', '🥉'][u.rank - 1] : `#${u.rank}`}
                      </span>
                    </td>
                    <td className="py-3.5 pl-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: u.color }}>
                          {u.initials}
                        </div>
                        <div>
                          <p className={cn('text-sm font-semibold', u.isYou ? 'text-[#78866B]' : 'text-[#1F2933]')}>
                            {u.name}{u.isYou && ' ← You'}
                          </p>
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

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Your Stats */}
          <div className="rounded-[18px] border border-[#78866B]/20 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-[#1F2933]">Your Stats</h3>
            <div className="space-y-3">
              {[{ label: 'Your Rank', value: '#5 of 1,204' },
                { label: 'XP This Month', value: '2,840 XP' },
                { label: 'Badges Earned', value: '9 badges' },
                { label: 'Current Streak', value: '🔥 7 days' }].map(s => (
                <div key={s.label} className="flex items-center justify-between rounded-xl bg-[#F3F4EF] px-4 py-2.5">
                  <span className="text-xs text-[#6B7280]">{s.label}</span>
                  <span className="text-xs font-bold text-[#1F2933]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Earn XP */}
          <div className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-[#1F2933]">How to Earn XP</h3>
            <ul className="space-y-2.5 text-xs text-[#6B7280]">
              {[
                ['✅', 'Complete a lesson', '+10 XP'],
                ['📚', 'Finish a course', '+200 XP'],
                ['💬', 'Post in community', '+5 XP'],
                ['❤️', 'Get 10 likes', '+25 XP'],
                ['🎓', 'Earn a certificate', '+500 XP'],
                ['🔥', 'Daily streak bonus', '+15 XP'],
              ].map(([emoji, action, xp]) => (
                <li key={action} className="flex items-center justify-between">
                  <span>{emoji} {action}</span>
                  <span className="font-semibold text-[#78866B]">{xp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
