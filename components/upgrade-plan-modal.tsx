'use client'

import { Check, X, Crown, Zap, Rocket } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for new creators getting started.',
    features: [
      'Up to 100 active members',
      'Basic course builder',
      'Community forums',
      'Standard payouts',
      'Basic analytics'
    ],
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    color: 'bg-blue-50',
    current: true
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Advanced features for growing creators.',
    features: [
      'Unlimited active members',
      'Advanced course builder',
      'Custom branding',
      'Priority payouts',
      'Detailed analytics',
      'Email marketing tools'
    ],
    icon: <Crown className="w-6 h-6 text-purple-500" />,
    color: 'bg-purple-50',
    popular: true
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    description: 'The ultimate toolkit for large organizations.',
    features: [
      'Everything in Pro',
      'White-label mobile app',
      'Dedicated account manager',
      'API access',
      'SSO & Advanced security',
      'Custom integrations'
    ],
    icon: <Rocket className="w-6 h-6 text-orange-500" />,
    color: 'bg-orange-50'
  }
]

interface UpgradePlanModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpgradePlanModal({ isOpen, onClose }: UpgradePlanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-background rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b bg-muted/30 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Upgrade Your Plan</h2>
                <p className="text-muted-foreground">
                  Choose the plan that's right for your growing business and unlock advanced features to scale your impact.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative flex flex-col p-6 rounded-xl border-2 transition-all ${
                      plan.popular 
                        ? 'border-primary shadow-xl md:scale-105 z-10 bg-background' 
                        : 'border-border bg-card'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                        MOST POPULAR
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${plan.color}`}>
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-black">{plan.price}</span>
                          <span className="text-muted-foreground ml-1">{plan.period}</span>
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
                      variant={plan.current ? 'outline' : plan.popular ? 'default' : 'secondary'}
                      className="w-full font-bold h-11"
                      disabled={plan.current}
                    >
                      {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-muted/30 border-t text-center text-sm text-muted-foreground">
              <p>All plans include 14-day free trial. Need more? <button className="text-primary font-semibold hover:underline">Contact sales</button> for custom enterprise solutions.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
