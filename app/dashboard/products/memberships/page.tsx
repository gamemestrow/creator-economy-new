'use client'

import { useEffect, useState } from 'react'
import { Plus, Users, CreditCard, Trash2, Loader2, X, Star, Check } from 'lucide-react'
import { useRequireRole } from '@/lib/use-auth-redirect'
import { useCreatorMemberships } from '@/lib/hooks/use-creator-data'
import { createMembership, deleteMembership } from '@/lib/firestore/memberships'
import { Membership } from '@/lib/firestore/types'
import { usePageState } from '@/contexts/PageStatesContext'

function MembershipCard({ membership, onDelete }: { membership: Membership, onDelete: (id: string) => void }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all relative group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Star className="w-6 h-6" />
        </div>
        <button
          onClick={() => {
            if (window.confirm('Delete this membership plan?')) {
              onDelete(membership.membershipId)
            }
          }}
          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">{membership.name}</h3>
      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{membership.description}</p>

      <div className="space-y-4 mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">${membership.price}</span>
          <span className="text-muted-foreground text-sm">/{membership.billingCycle}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{membership.memberCount || 0} active members</span>
        </div>
      </div>

      <div className="space-y-2 border-t border-border pt-4">
        {membership.features?.slice(0, 3).map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="w-3 h-3 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
        {membership.features?.length > 3 && (
          <p className="text-[10px] text-primary font-medium">+{membership.features.length - 3} more features</p>
        )}
      </div>
    </div>
  )
}

export default function MembershipsPage() {
  const { user } = useRequireRole(['creator', 'attendee'])
  const { memberships, loading, refresh } = useCreatorMemberships(user?.uid || '')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const { setpageState } = usePageState()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 19,
    billingCycle: 'monthly' as const,
    features: ['Community Access', 'Exclusive Content', 'Weekly Live Q&A'],
  })

  useEffect(() => {
    setpageState(formData)
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsCreating(true)
      await createMembership({
        ...formData,
        creatorId: user.uid,
        isPublished: true,
      })
      setShowCreateModal(false)
      setFormData({
        name: '',
        description: '',
        price: 19,
        billingCycle: 'monthly',
        features: ['Community Access', 'Exclusive Content', 'Weekly Live Q&A'],
      })
      await refresh()
    } catch (error) {
      console.error('Failed to create membership:', error)
      alert('Failed to create membership.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMembership(id)
      await refresh()
    } catch (error) {
      console.error('Failed to delete membership:', error)
      alert('Failed to delete membership.')
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Memberships</h1>
            <p className="text-muted-foreground mt-2">Create and manage recurring membership plans</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Plan
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-card border border-border rounded-xl animate-pulse" />
            ))}
          </div>
        ) : memberships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {memberships.map(m => (
              <MembershipCard key={m.membershipId} membership={m} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-card border border-dashed border-border rounded-2xl text-center">
            <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold text-foreground">No membership plans</h3>
            <p className="text-muted-foreground max-w-sm mt-2">
              Offer exclusive content and community access with recurring subscription plans.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-6 text-primary hover:underline font-bold"
            >
              Create your first plan
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Create Membership Plan</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Plan Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., VIP Inner Circle"
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Price ($)</label>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Billing Cycle</label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="lifetime">Lifetime</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 flex items-center justify-center gap-2"
                >
                  {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
