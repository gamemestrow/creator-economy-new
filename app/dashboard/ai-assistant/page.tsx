'use client'

import { Plus, MoreHorizontal, Brain, Zap, MessageSquare, TrendingUp, MessageCircle, BarChart3 } from 'lucide-react'
import { ChatInterface } from '@/components/chat-interface'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePageInView } from 'framer-motion'
import { usePageState } from '@/contexts/PageStatesContext'

const aiAssistants = [
  {
    id: 1,
    name: 'Customer Support Bot',
    status: 'Active',
    interactions: 12400,
    successRate: 87.3,
    responseTime: '0.8s',
    language: 'English',
  },
  {
    id: 2,
    name: 'Content Generator',
    status: 'Active',
    interactions: 8200,
    successRate: 92.1,
    responseTime: '2.1s',
    language: 'Multi-language',
  },
  {
    id: 3,
    name: 'Course Recommender',
    status: 'Beta',
    interactions: 4100,
    successRate: 78.5,
    responseTime: '1.2s',
    language: 'English',
  },
]

const aiUsageStats = [
  {
    metric: 'Total Conversations',
    value: '24.7K',
    change: '+12.3%',
    icon: '💬',
  },
  {
    metric: 'Avg Satisfaction',
    value: '4.6/5',
    change: '+0.3',
    icon: '⭐',
  },
  {
    metric: 'Cost Savings',
    value: '₹12.4K',
    change: '+34%',
    icon: '💰',
  },
  {
    metric: 'User Satisfaction',
    value: '89.2%',
    change: '+8.1%',
    icon: '😊',
  },
]

export default function AIAssistantPage() {
  const [view, setView] = useState<'dashboard' | 'chat'>('dashboard')

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">AI Assistant</h1>
              <p className="text-muted-foreground mt-1">Manage AI-powered assistants and automation</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-muted p-1 rounded-lg flex items-center gap-1 mr-4">
                <Button 
                  variant={view === 'dashboard' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setView('dashboard')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant={view === 'chat' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setView('chat')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Test Chat
                </Button>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Assistant
              </Button>
            </div>
          </div>
        </div>

        {view === 'chat' ? (
          <div className="max-w-4xl mx-auto py-8">
            <ChatInterface />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {aiUsageStats.map((stat, idx) => (
                <div key={idx} className="bg-card rounded-lg p-6 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.metric}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Assistants Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden mb-8">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Active Assistants</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Assistant Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Interactions</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Success Rate</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Avg Response</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Language</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiAssistants.map((assistant) => (
                      <tr key={assistant.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{assistant.name}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            assistant.status === 'Active' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {assistant.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{assistant.interactions.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{assistant.successRate}%</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{assistant.responseTime}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{assistant.language}</td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Model Training */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Model Training & Fine-tuning</h2>
              <div className="space-y-4">
                {[
                  { name: 'Customer Support Bot', progress: 87, status: 'Training' },
                  { name: 'Content Generator', progress: 100, status: 'Complete' },
                  { name: 'Course Recommender', progress: 45, status: 'Training' },
                ].map((model, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{model.name}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        model.status === 'Complete' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${model.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{model.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
