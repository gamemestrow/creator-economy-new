'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Loader2, AlertCircle } from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for new creators getting started',
    features: [
      'Up to 100 active members',
      'Basic course hosting',
      'Community forums',
      'Standard analytics',
      'Standard support',
      'Cloud storage (1GB)'
    ],
    cta: 'Get Started',
    highlighted: false
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '$15',
    period: '/month',
    description: 'Essential tools for growing creators',
    features: [
      'Up to 1,000 active members',
      'Enhanced course features',
      '5 email campaigns/month',
      'Intermediate analytics',
      'Email support',
      'Cloud storage (10GB)'
    ],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$39',
    period: '/month',
    description: 'Advanced features for scaling up',
    features: [
      'Unlimited active members',
      'Advanced course builder',
      '50 email campaigns/month',
      'Detailed analytics',
      'Priority email support',
      'Cloud storage (50GB)',
      'Custom branding'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/month',
    description: 'The ultimate toolkit for businesses',
    features: [
      'Everything in Pro',
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

interface PricingProps {
  onSelectPlan?: (planId: string) => Promise<void>
}

export function Pricing({ onSelectPlan }: PricingProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePlanSelect = async (planId: string) => {
    if (!onSelectPlan) return
    
    setLoadingPlan(planId)
    setError(null)
    
    try {
      await onSelectPlan(planId)
    } catch (err) {
      console.error('Plan selection error:', err)
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoadingPlan(null)
    }
  }

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
          
          {error && (
            <div className="mt-8 flex items-center justify-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg max-w-md mx-auto">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const planId = 'id' in plan ? (plan as any).id : plan.name.toLowerCase()
            const isLoading = loadingPlan === planId

            return (
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

                {onSelectPlan ? (
                  <button
                    onClick={() => handlePlanSelect(planId)}
                    disabled={!!loadingPlan}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold mb-8 transition ${
                      plan.highlighted
                        ? 'bg-white text-blue-600 hover:bg-blue-50 disabled:bg-blue-50/50'
                        : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
                    }`}
                  >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {plan.cta}
                  </button>
                ) : (
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
                )}

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
