'use client'

import { Save, Bell, Shield, Mail, Palette } from 'lucide-react'
import { useState } from 'react'

function SettingSection({ icon: Icon, title, description, children }: any) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-6">{description}</p>
          {children}
        </div>
      </div>
    </div>
  )
}

function ToggleSetting({ label, description, defaultChecked }: any) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="w-5 h-5 cursor-pointer"
      />
    </div>
  )
}

export default function SettingsPage() {
  const [organizationName, setOrganizationName] = useState('Cloud Platform')
  const [email, setEmail] = useState('admin@cloudplatform.com')

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account and platform settings</p>
        </div>

        {/* Organization Settings */}
        <SettingSection
          icon={Mail}
          title="Organization"
          description="Manage your organization details and general settings"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Organization Name</label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection
          icon={Bell}
          title="Notifications"
          description="Choose how you want to be notified about important updates"
        >
          <div className="space-y-1">
            <ToggleSetting
              label="Email Notifications"
              description="Receive updates via email"
              defaultChecked={true}
            />
            <ToggleSetting
              label="New User Registrations"
              description="Get notified when new users join"
              defaultChecked={true}
            />
            <ToggleSetting
              label="Payment Alerts"
              description="Receive alerts about payment failures"
              defaultChecked={true}
            />
            <ToggleSetting
              label="Course Updates"
              description="Get notified about course activity"
              defaultChecked={false}
            />
          </div>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection
          icon={Shield}
          title="Security"
          description="Manage your account security and access controls"
        >
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Change Password
            </button>
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-3">Two-Factor Authentication</p>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-input transition-colors text-foreground text-sm font-medium">
                Enable 2FA
              </button>
            </div>
          </div>
        </SettingSection>

        {/* Theme Settings */}
        <SettingSection
          icon={Palette}
          title="Appearance"
          description="Customize how the platform looks"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Theme</p>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                  Light
                </button>
                <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-input transition-colors font-medium">
                  Dark
                </button>
              </div>
            </div>
          </div>
        </SettingSection>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
          <p className="text-sm text-red-700 mb-4">Irreversible actions that cannot be undone</p>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            Delete Account
          </button>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4 pt-8 border-t border-border">
          <button className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-input transition-colors font-medium">
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
