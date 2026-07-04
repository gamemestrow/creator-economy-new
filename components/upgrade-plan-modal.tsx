'use client'

import { useState } from 'react'
import { Check, X, Crown, Zap, Rocket, Shield, Loader2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const plans = [
  {

    id: 'free',
    name: 'Free',
    price: '0 rupees ',
    description: 'Perfect for new creators getting started.',

    features: [
      '1 Course',
      '100 Students',
      'Basic Community',
      'Basic Analytics',
      'Email Support'
    ],
    current: true,
  },
  {

    id: 'basic',
    name: 'Basic',
    price: '3000 rupees',
    description: 'Essential tools for growing your community.',
    features: [
      'Up to 1,000 active members',
      'Enhanced course builder',
      'Basic custom branding',
      'Email support',
      'Intermediate analytics'
    ],
    icon: <Shield className="w-6 h-6 text-green-500" />,
    color: 'bg-green-50'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '10000 rupees',
    description: 'Advanced features for professional creators.',
    features: [
      'Unlimited active members',
      'Advanced course builder',
      'Full custom branding',
      'Priority payouts',
      'Detailed analytics',
      'Email marketing tools'
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '200000 rupees',
    description: 'The ultimate toolkit for large organizations.',
    features: [
      'Everything in Medium',
      'White Label Mobile App',
      'Dedicated Account Manager',
      'API Access',
      'Custom Integrations',
      '24/7 Support'
    ],
  },
]

interface UpgradePlanModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade?: (planId: string) => Promise<void>
}

export function UpgradePlanModal({ isOpen, onClose, onUpgrade }: UpgradePlanModalProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpgrade = async (planId: string) => {
    if (!onUpgrade) return

    setLoadingPlan(planId)
    setError(null)

    try {
      await onUpgrade(planId)
      onClose()
    } catch (err) {
      console.error('Upgrade error:', err)
      setError('Failed to process upgrade. Please try again.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-7xl bg-background rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-8 border-b bg-muted/30 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">
                  Upgrade Your Plan
                </h2>

                <p className="text-muted-foreground">
                  Choose the perfect plan for your creator business.
                </p>

                {error && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg max-w-md mx-auto">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => {
                  const isLoading = loadingPlan === plan.id

                  return (
                    <div
                      key={plan.name}
                      className="relative flex flex-col p-6 rounded-xl border-2 transition-all 
                         'border-primary shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:scale-105 z-10 bg-background' 
                          
                      "
                    >

                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${plan.color}`}>
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{plan.name}</h3>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-black">{plan.price}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6 h-10">
                        {plan.description}
                      </p>

                      <div className="space-y-4 mb-8 flex-1">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3 text-sm">
                            <div className="mt-1 bg-green-100 rounded-full p-0.5">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full font-bold h-11 gap-2"
                        disabled={plan.current || !!loadingPlan}
                        onClick={() => handleUpgrade(plan.id)}
                      >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-6 border-t text-center text-sm text-muted-foreground">
              All plans include secure payments, analytics,
              and creator tools.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}