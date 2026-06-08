'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for new creators',
    features: [
      'Up to 1,000 audience members',
      'Basic course hosting',
      '5 email campaigns/month',
      'Standard analytics',
      'Community support',
      'Cloud storage (2GB)'
    ],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'For growing creators',
    features: [
      'Up to 10,000 audience members',
      'Advanced course features',
      '50 email campaigns/month',
      'Advanced analytics',
      'Priority email support',
      'Cloud storage (50GB)',
      'API access',
      'Custom branding'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For established businesses',
    features: [
      'Unlimited audience',
      'White-label solution',
      'Unlimited campaigns',
      'Real-time analytics',
      '24/7 phone support',
      'Unlimited storage',
      'Dedicated account manager',
      'Custom integrations'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your creator journey. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 transition ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white scale-105 shadow-xl'
                  : 'bg-white border border-slate-200 text-slate-900 hover:border-slate-300'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-4 ${plan.highlighted ? 'text-blue-100' : 'text-slate-600'}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={plan.highlighted ? 'text-blue-100' : 'text-slate-600'}>{plan.period}</span>
              </div>

              <Link
                href="/dashboard/main"
                className={`block text-center py-3 px-6 rounded-lg font-semibold mb-8 transition ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
