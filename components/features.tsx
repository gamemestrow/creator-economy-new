'use client'

import { Users, BookOpen, MessageSquare, BarChart3, CreditCard, Zap, Gamepad2, Bot } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Audience Management',
    description: 'Organize and engage with your audience through segmentation and personalized communications.'
  },
  {
    icon: BookOpen,
    title: 'Course Platform',
    description: 'Create, sell, and manage online courses with a built-in learning management system.'
  },
  {
    icon: MessageSquare,
    title: 'Community Building',
    description: 'Foster engaged communities with discussion forums, groups, and member interactions.'
  },
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description: 'Securely process payments with multiple payment methods and instant settlements.'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track performance with detailed analytics, revenue reports, and audience insights.'
  },
  {
    icon: Zap,
    title: 'Email Marketing',
    description: 'Send targeted email campaigns and WhatsApp messages to grow your business.'
  },
  {
    icon: Gamepad2,
    title: 'Gamification',
    description: 'Engage users with badges, points, and leaderboards to boost retention.'
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Automate responses and get AI-powered recommendations for growth.'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A complete toolkit for creators to manage, monetize, and grow their audience across all channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
