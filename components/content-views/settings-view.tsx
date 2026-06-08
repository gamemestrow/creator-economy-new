'use client'

import { Save, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export function SettingsView() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and platform settings</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Account Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" defaultValue="Anamika" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" defaultValue="Pamdey" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" defaultValue="anamika@cloud.app" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Save className="w-5 h-5" />
            Update Password
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: 'Email notifications', description: 'Receive important updates via email' },
            { label: 'Marketing emails', description: 'Receive news and promotional emails' },
            { label: 'SMS alerts', description: 'Receive critical alerts via SMS' },
            { label: 'Push notifications', description: 'Receive browser push notifications' },
          ].map((notif, i) => (
            <label key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{notif.label}</p>
                <p className="text-sm text-gray-500">{notif.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Connected Services</h3>
        <div className="space-y-3">
          {[
            { name: 'Stripe', connected: true },
            { name: 'PayPal', connected: false },
            { name: 'Mailchimp', connected: true },
            { name: 'Zapier', connected: false },
          ].map((service, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <p className="font-medium text-gray-900">{service.name}</p>
              {service.connected ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Connected</span>
              ) : (
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">Connect</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
