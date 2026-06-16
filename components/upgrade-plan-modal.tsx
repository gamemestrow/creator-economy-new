'use client'

import { X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for creators getting started.',
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
    name: 'Basic',
    price: '$19',
    period: '/month',
    description: 'Best for growing creators.',
    features: [
      '10 Courses',
      '1,000 Students',
      'Communities',
      'Email Marketing',
      'Custom Branding',
      'Priority Support'
    ],
  },
  {
    name: 'Medium',
    price: '$49',
    period: '/month',
    description: 'Most popular choice for scaling businesses.',
    features: [
      'Unlimited Courses',
      '10,000 Students',
      'Automation Workflows',
      'Memberships',
      'Advanced Analytics',
      'Affiliate System',
      'Priority Support'
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/month',
    description: 'Enterprise-grade creator platform.',
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
}

export function UpgradePlanModal({
  isOpen,
  onClose,
}: UpgradePlanModalProps) {
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
            className="relative w-full max-w-7xl bg-background rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
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
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative flex flex-col p-6 rounded-xl border-2 transition-all ${
                      plan.popular
                        ? 'border-primary shadow-xl scale-105'
                        : 'border-border'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-xl font-bold">
                        {plan.name}
                      </h3>

                      <div className="flex items-end gap-1 mt-2">
                        <span className="text-4xl font-black">
                          {plan.price}
                        </span>

                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 min-h-[50px]">
                      {plan.description}
                    </p>

                    <div className="space-y-3 flex-1">
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full mt-8"
                      variant={
                        plan.current
                          ? 'outline'
                          : plan.popular
                          ? 'default'
                          : 'secondary'
                      }
                      disabled={plan.current}
                    >
                      {plan.current
                        ? 'Current Plan'
                        : `Upgrade to ${plan.name}`}
                    </Button>
                  </div>
                ))}
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