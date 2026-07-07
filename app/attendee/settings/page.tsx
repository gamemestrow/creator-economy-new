'use client'

import { useState } from 'react'
import { User, Bell, Lock, Palette, Globe, Shield, Link2, Check, Eye, EyeOff, Save, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

type SettingsTab = 'Account' | 'Notifications' | 'Privacy' | 'Appearance' | 'Language' | 'Security' | 'Connected'

const TABS: { key: SettingsTab; label: string; icon: typeof User }[] = [
  { key: 'Account', label: 'Account', icon: User },
  { key: 'Notifications', label: 'Notifications', icon: Bell },
  { key: 'Privacy', label: 'Privacy', icon: Lock },
  { key: 'Appearance', label: 'Appearance', icon: Palette },
  { key: 'Language', label: 'Language', icon: Globe },
  { key: 'Security', label: 'Security', icon: Shield },
  { key: 'Connected', label: 'Connected Accounts', icon: Link2 },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={cn('relative h-6 w-11 rounded-full border-2 transition-all', checked ? 'border-[#78866B] bg-[#78866B]' : 'border-[#E4E6DE] bg-[#F3F4EF]')}>
      <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all', checked ? 'left-[22px]' : 'left-0.5')} />
    </button>
  )
}

function InputField({ label, value, type = 'text', readOnly = false, placeholder = '' }: { label: string; value: string; type?: string; readOnly?: boolean; placeholder?: string }) {
  const [val, setVal] = useState(value)
  const [showPass, setShowPass] = useState(false)
  const isPass = type === 'password'

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-[#1F2933]">{label}</label>
      <div className="relative">
        <input type={isPass && !showPass ? 'password' : 'text'} value={val} onChange={e => setVal(e.target.value)}
          readOnly={readOnly} placeholder={placeholder}
          className={cn('w-full rounded-xl border border-[#E4E6DE] bg-white px-4 py-2.5 text-sm text-[#1F2933] outline-none transition-colors placeholder:text-[#6B7280]',
            readOnly ? 'bg-[#F3F4EF] text-[#6B7280]' : 'focus:border-[#78866B] focus:ring-1 focus:ring-[#78866B]/20')} />
        {isPass && (
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2933]">
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('Account')
  const [appearance, setAppearance] = useState<'light' | 'dark' | 'system'>('light')
  const [language, setLanguage] = useState('English')
  const [twoFA, setTwoFA] = useState(false)
  const [saved, setSaved] = useState(false)

  const [notifs, setNotifs] = useState({
    courseUpdates: true, communityReplies: true, mentions: true,
    eventReminders: true, payments: true, certificates: true, rewards: false, systemUpdates: false,
  })
  const [privacy, setPrivacy] = useState({
    publicProfile: true, showProgress: true, showCertificates: true, showActivity: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const ActiveIcon = TABS.find(t => t.key === activeTab)?.icon || User

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2933]">Settings</h1>
        <p className="text-sm text-[#6B7280]">Manage your account preferences and settings</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar Nav */}
        <div className="w-full shrink-0 rounded-[18px] border border-[#E4E6DE] bg-white p-3 shadow-sm lg:w-52">
          <nav className="space-y-0.5">
            {TABS.map(t => {
              const Icon = t.icon
              return (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all', activeTab === t.key
                    ? 'bg-[#78866B]/10 text-[#78866B]'
                    : 'text-[#6B7280] hover:bg-[#F3F4EF] hover:text-[#1F2933]')}>
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-[18px] border border-[#E4E6DE] bg-white p-6 shadow-sm">
          {/* Account */}
          {activeTab === 'Account' && (
            <div className="space-y-5">
              <h2 className="text-base font-bold text-[#1F2933]">Account Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField label="Full Name" value="Anamika Pandey" />
                <InputField label="Email Address" value="anamika.p@works.cloud" readOnly />
                <InputField label="Phone Number" value="+91 98765 43210" />
                <InputField label="Location" value="Mumbai, India" />
                <InputField label="Website" value="https://anamika.dev" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1F2933]">Bio</label>
                <textarea rows={3} defaultValue="Passionate developer learning full-stack web development."
                  className="w-full resize-none rounded-xl border border-[#E4E6DE] px-4 py-2.5 text-sm text-[#1F2933] outline-none focus:border-[#78866B] focus:ring-1 focus:ring-[#78866B]/20" />
              </div>
              <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-[#78866B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#65735A] transition-colors">
                {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Changes</>}
              </button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'Notifications' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1F2933]">Notification Preferences</h2>
              {Object.entries(notifs).map(([key, val]) => {
                const labels: Record<string, string> = {
                  courseUpdates: 'Course Updates', communityReplies: 'Community Replies',
                  mentions: 'Mentions', eventReminders: 'Event Reminders',
                  payments: 'Payment Notifications', certificates: 'Certificate Awards',
                  rewards: 'Rewards & Badges', systemUpdates: 'System Updates',
                }
                return (
                  <div key={key} className="flex items-center justify-between rounded-xl border border-[#E4E6DE] px-4 py-3">
                    <span className="text-sm font-medium text-[#1F2933]">{labels[key]}</span>
                    <Toggle checked={val} onChange={v => setNotifs(prev => ({ ...prev, [key]: v }))} />
                  </div>
                )
              })}
            </div>
          )}

          {/* Privacy */}
          {activeTab === 'Privacy' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1F2933]">Privacy Settings</h2>
              {Object.entries(privacy).map(([key, val]) => {
                const labels: Record<string, string> = {
                  publicProfile: 'Public Profile', showProgress: 'Show Learning Progress',
                  showCertificates: 'Show Certificates', showActivity: 'Show Recent Activity',
                }
                const descs: Record<string, string> = {
                  publicProfile: 'Let others find and view your profile', showProgress: 'Show your course progress on your profile',
                  showCertificates: 'Display your earned certificates', showActivity: 'Show your recent learning activity',
                }
                return (
                  <div key={key} className="flex items-center justify-between rounded-xl border border-[#E4E6DE] px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#1F2933]">{labels[key]}</p>
                      <p className="text-xs text-[#6B7280]">{descs[key]}</p>
                    </div>
                    <Toggle checked={val} onChange={v => setPrivacy(prev => ({ ...prev, [key]: v }))} />
                  </div>
                )
              })}
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'Appearance' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1F2933]">Appearance</h2>
              <div className="grid grid-cols-3 gap-3">
                {[['light', '☀️', 'Light'], ['dark', '🌙', 'Dark'], ['system', '💻', 'System']].map(([mode, emoji, label]) => (
                  <button key={mode} onClick={() => setAppearance(mode as any)}
                    className={cn('flex flex-col items-center gap-2 rounded-[18px] border p-6 transition-all', appearance === mode
                      ? 'border-[#78866B] bg-[#78866B]/5 shadow-sm'
                      : 'border-[#E4E6DE] hover:border-[#78866B]/30')}>
                    <span className="text-3xl">{emoji}</span>
                    <span className={cn('text-sm font-semibold', appearance === mode ? 'text-[#78866B]' : 'text-[#1F2933]')}>{label}</span>
                    {appearance === mode && <Check className="h-4 w-4 text-[#78866B]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Language */}
          {activeTab === 'Language' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1F2933]">Language & Region</h2>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1F2933]">Interface Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-[#E4E6DE] bg-white px-4 py-2.5 text-sm text-[#1F2933] outline-none focus:border-[#78866B]">
                  {['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Portuguese'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'Security' && (
            <div className="space-y-6">
              <h2 className="text-base font-bold text-[#1F2933]">Security Settings</h2>
              <div className="space-y-4 rounded-[18px] border border-[#E4E6DE] p-5">
                <h3 className="text-sm font-bold text-[#1F2933]">Change Password</h3>
                <InputField label="Current Password" value="" type="password" placeholder="Enter current password" />
                <InputField label="New Password" value="" type="password" placeholder="Min. 8 characters" />
                <InputField label="Confirm New Password" value="" type="password" placeholder="Confirm new password" />
                <button className="rounded-xl bg-[#78866B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#65735A] transition-colors">Update Password</button>
              </div>
              <div className="flex items-center justify-between rounded-[18px] border border-[#E4E6DE] p-5">
                <div>
                  <p className="text-sm font-bold text-[#1F2933]">Two-Factor Authentication</p>
                  <p className="text-xs text-[#6B7280]">Add an extra layer of security to your account</p>
                </div>
                <Toggle checked={twoFA} onChange={setTwoFA} />
              </div>
            </div>
          )}

          {/* Connected Accounts */}
          {activeTab === 'Connected' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1F2933]">Connected Accounts</h2>
              {[
                { name: 'Google', emoji: '🔵', desc: 'Sign in with Google', connected: true },
                { name: 'GitHub', emoji: '⚫', desc: 'Import projects from GitHub', connected: false },
                { name: 'Twitter / X', emoji: '🐦', desc: 'Share achievements on Twitter', connected: false },
                { name: 'LinkedIn', emoji: '💼', desc: 'Add certificates to LinkedIn', connected: false },
              ].map(acc => (
                <div key={acc.name} className="flex items-center justify-between rounded-[18px] border border-[#E4E6DE] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{acc.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#1F2933]">{acc.name}</p>
                      <p className="text-xs text-[#6B7280]">{acc.desc}</p>
                    </div>
                  </div>
                  {acc.connected ? (
                    <button className="rounded-xl border border-[#D96A5F]/30 px-4 py-2 text-xs font-semibold text-[#D96A5F] hover:bg-[#D96A5F]/5 transition-colors">Disconnect</button>
                  ) : (
                    <button className="rounded-xl bg-[#78866B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#65735A] transition-colors">Connect</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
