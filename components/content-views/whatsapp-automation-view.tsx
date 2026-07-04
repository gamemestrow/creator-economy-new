'use client'

import { MessageCircle, Plus, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const automationData = [
  { name: 'Mon', sent: 120, delivered: 115, failed: 5 },
  { name: 'Tue', sent: 150, delivered: 145, failed: 5 },
  { name: 'Wed', sent: 180, delivered: 175, failed: 5 },
  { name: 'Thu', sent: 220, delivered: 210, failed: 10 },
  { name: 'Fri', sent: 190, delivered: 185, failed: 5 },
  { name: 'Sat', sent: 140, delivered: 135, failed: 5 },
  { name: 'Sun', sent: 100, delivered: 95, failed: 5 },
]

const automations = [
  { id: 1, name: 'Welcome Series', trigger: 'New Subscriber', messages: 5, active: true, sent: 1250 },
  { id: 2, name: 'Purchase Follow-up', trigger: 'After Purchase', messages: 3, active: true, sent: 890 },
  { id: 3, name: 'Abandoned Cart', trigger: 'Cart Abandoned', messages: 2, active: true, sent: 450 },
  { id: 4, name: 'VIP Exclusive', trigger: 'Manual', messages: 1, active: false, sent: 0 },
]

export function WhatsAppAutomationView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">WhatsApp Automation</h1>
          <p className="text-muted-foreground mt-2">Create automated message sequences for WhatsApp</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition">
          <Plus className="w-5 h-5" />
          New Automation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Sent</p>
              <p className="text-3xl font-bold text-foreground mt-1">5,280</p>
            </div>
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Delivered Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-1">97.2%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Automations</p>
              <p className="text-3xl font-bold text-primary mt-1">3</p>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Failed Messages</p>
              <p className="text-3xl font-bold text-red-600 mt-1">145</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Weekly Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={automationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }} />
            <Line type="monotone" dataKey="sent" stroke="#78866B" strokeWidth={2} />
            <Line type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Automations List */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Your Automations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Trigger</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Messages</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Sent</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {automations.map((automation) => (
                <tr key={automation.id} className="border-b border-border hover:bg-muted">
                  <td className="px-6 py-4 text-sm text-foreground font-medium">{automation.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{automation.trigger}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{automation.messages} messages</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      automation.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-muted text-foreground'
                    }`}>
                      {automation.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{automation.sent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-muted rounded-lg transition">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
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
