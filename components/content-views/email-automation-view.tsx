'use client'

import { Plus, PlayCircle, PauseCircle, Trash2 } from 'lucide-react'

const automations = [
  { id: 1, name: 'Welcome Series', trigger: 'New Subscriber', emails: 3, status: 'active', active: true },
  { id: 2, name: 'Course Completion', trigger: 'Course Completed', emails: 2, status: 'active', active: true },
  { id: 3, name: 'Abandoned Cart', trigger: 'Cart Abandoned', emails: 4, status: 'active', active: true },
  { id: 4, name: 'Birthday Special', trigger: 'Birthday', emails: 1, status: 'paused', active: false },
  { id: 5, name: 'Win Back Campaign', trigger: 'No Purchase (90 days)', emails: 3, status: 'inactive', active: false },
]

export function EmailAutomationView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Automation</h1>
          <p className="text-gray-500 mt-1">Set up automated email sequences based on user actions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          New Automation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Automations', value: '5', change: '+1 this week' },
          { label: 'Active', value: '3', change: 'Currently running' },
          { label: 'Emails Sent', value: '24.5K', change: '+8.2% vs last week' },
          { label: 'Avg Open Rate', value: '42.3%', change: '+3.1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-gray-600 text-sm mt-4">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((auto) => (
          <div key={auto.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{auto.name}</h3>
                <div className="flex gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Trigger</p>
                    <p className="text-sm font-medium text-gray-700">{auto.trigger}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Emails</p>
                    <p className="text-sm font-medium text-gray-700">{auto.emails} emails in sequence</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Status</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                      auto.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : auto.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {auto.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {auto.active ? (
                  <button className="p-2 hover:bg-red-50 rounded-lg">
                    <PauseCircle className="w-5 h-5 text-red-600" />
                  </button>
                ) : (
                  <button className="p-2 hover:bg-green-50 rounded-lg">
                    <PlayCircle className="w-5 h-5 text-green-600" />
                  </button>
                )}
                <button className="p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
