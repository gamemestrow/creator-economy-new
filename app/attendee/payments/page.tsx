'use client'

import { useState } from 'react'
import { CreditCard, Receipt, Download, CheckCircle, Clock, AlertCircle, DollarSign, Wallet, ArrowDownLeft, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

const TRANSACTIONS = [
  { id: 'TXN001', product: 'React Fundamentals', date: 'Jun 15, 2026', amount: 49.99, status: 'Paid', method: '•••• 4242' },
  { id: 'TXN002', product: 'Advanced TypeScript', date: 'May 28, 2026', amount: 79.99, status: 'Paid', method: '•••• 4242' },
  { id: 'TXN003', product: 'Pro Plan — Monthly', date: 'Jul 1, 2026', amount: 29.00, status: 'Paid', method: '•••• 8821' },
  { id: 'TXN004', product: 'CSS Mastery', date: 'Apr 10, 2026', amount: 44.99, status: 'Paid', method: 'UPI' },
  { id: 'TXN005', product: 'UI/UX Bootcamp', date: 'Mar 20, 2026', amount: 69.99, status: 'Refunded', method: '•••• 4242' },
  { id: 'TXN006', product: 'Node.js & Express', date: 'Feb 5, 2026', amount: 59.99, status: 'Paid', method: 'UPI' },
]

const SUBSCRIPTIONS = [
  { id: 1, name: 'Pro Plan', price: 29, period: 'month', renewal: 'Aug 1, 2026', status: 'Active', features: ['All Courses', 'Live Events', 'Certificates', 'Priority Support'] },
]

const INVOICES = [
  { id: 'INV-2026-007', date: 'Jul 1, 2026', amount: 29.00, item: 'Pro Plan — July 2026' },
  { id: 'INV-2026-006', date: 'Jun 15, 2026', amount: 49.99, item: 'React Fundamentals' },
  { id: 'INV-2026-005', date: 'May 28, 2026', amount: 79.99, item: 'Advanced TypeScript' },
  { id: 'INV-2026-004', date: 'Jun 1, 2026', amount: 29.00, item: 'Pro Plan — June 2026' },
  { id: 'INV-2026-003', date: 'Apr 10, 2026', amount: 44.99, item: 'CSS Mastery' },
]

const statusStyles: Record<string, string> = {
  Paid: 'bg-[#4F8A5B]/10 text-[#4F8A5B] border-[#4F8A5B]/20',
  Refunded: 'bg-[#D96A5F]/10 text-[#D96A5F] border-[#D96A5F]/20',
  Pending: 'bg-[#D4A13A]/10 text-[#D4A13A] border-[#D4A13A]/20',
}

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'subscriptions' | 'invoices' | 'wallet'>('transactions')
  const tabs = [
    { key: 'transactions', label: 'Transactions' },
    { key: 'subscriptions', label: 'Subscriptions' },
    { key: 'invoices', label: 'Invoices' },
    { key: 'wallet', label: 'Wallet' },
  ] as const

  const totalSpent = TRANSACTIONS.filter(t => t.status === 'Paid').reduce((s, t) => s + t.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2933]">Payments</h1>
        <p className="text-sm text-[#6B7280]">Manage your purchases, subscriptions, and billing</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Spent', value: `₹${totalSpent.toFixed(2)}`, emoji: '💳' },
          { label: 'Active Subs', value: SUBSCRIPTIONS.length, emoji: '🔄' },
          { label: 'Invoices', value: INVOICES.length, emoji: '🧾' },
          { label: 'Next Renewal', value: 'Aug 1', emoji: '📅' },
        ].map(s => (
          <div key={s.label} className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm text-center">
            <div className="text-2xl">{s.emoji}</div>
            <p className="mt-1 text-xl font-bold text-[#1F2933]">{s.value}</p>
            <p className="text-xs text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-[#E4E6DE] bg-white p-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={cn('shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all', activeTab === t.key
              ? 'bg-[#78866B] text-white shadow-sm'
              : 'text-[#6B7280] hover:text-[#1F2933]')}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Transactions */}
      {activeTab === 'transactions' && (
        <div className="rounded-[18px] border border-[#E4E6DE] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#E4E6DE] p-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1F2933]">All Transactions</h2>
            <button className="flex items-center gap-2 rounded-lg border border-[#E4E6DE] px-3 py-1.5 text-xs font-medium text-[#6B7280] hover:text-[#78866B]">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F3F4EF] bg-[#F8F8F5]">
                  <th className="py-3 pl-5 text-left text-xs font-semibold text-[#6B7280]">Transaction</th>
                  <th className="py-3 text-left text-xs font-semibold text-[#6B7280]">Date</th>
                  <th className="py-3 text-left text-xs font-semibold text-[#6B7280]">Method</th>
                  <th className="py-3 pr-5 text-right text-xs font-semibold text-[#6B7280]">Amount</th>
                  <th className="py-3 pr-5 text-right text-xs font-semibold text-[#6B7280]">Status</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map(t => (
                  <tr key={t.id} className="border-b border-[#F3F4EF] hover:bg-[#F8F8F5] transition-colors">
                    <td className="py-4 pl-5">
                      <p className="text-sm font-semibold text-[#1F2933]">{t.product}</p>
                      <p className="text-[11px] text-[#6B7280]">{t.id}</p>
                    </td>
                    <td className="py-4 text-sm text-[#6B7280]">{t.date}</td>
                    <td className="py-4 text-sm text-[#6B7280]">{t.method}</td>
                    <td className="py-4 pr-5 text-right text-sm font-bold text-[#1F2933]">₹{t.amount.toFixed(2)}</td>
                    <td className="py-4 pr-5 text-right">
                      <span className={cn('rounded-full border px-2.5 py-0.5 text-[11px] font-semibold', statusStyles[t.status] || statusStyles.Paid)}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subscriptions */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-4">
          {SUBSCRIPTIONS.map(sub => (
            <div key={sub.id} className="rounded-[18px] border border-[#78866B]/20 bg-gradient-to-br from-white to-[#F8F8F5] p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[#1F2933]">{sub.name}</span>
                    <span className="rounded-full bg-[#4F8A5B]/10 border border-[#4F8A5B]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#4F8A5B]">Active</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-[#78866B]">₹{sub.price}<span className="text-sm font-normal text-[#6B7280]">/{sub.period}</span></p>
                  <p className="mt-1 text-xs text-[#6B7280]">Renews {sub.renewal}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sub.features.map(f => (
                      <span key={f} className="flex items-center gap-1 rounded-full bg-[#78866B]/10 px-3 py-1 text-xs font-medium text-[#78866B]">
                        <CheckCircle className="h-3 w-3" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="rounded-xl border border-[#E4E6DE] px-4 py-2 text-sm font-semibold text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">Manage</button>
                  <button className="rounded-xl border border-[#D96A5F]/30 px-4 py-2 text-sm font-semibold text-[#D96A5F] hover:bg-[#D96A5F]/5 transition-colors">Cancel</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoices */}
      {activeTab === 'invoices' && (
        <div className="rounded-[18px] border border-[#E4E6DE] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#E4E6DE] p-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1F2933]">Invoices</h2>
            <button className="flex items-center gap-2 rounded-lg bg-[#78866B] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#65735A] transition-colors">
              <Download className="h-3.5 w-3.5" /> Download All
            </button>
          </div>
          <div className="divide-y divide-[#F3F4EF]">
            {INVOICES.map(inv => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#F8F8F5] transition-colors">
                <div>
                  <p className="text-sm font-semibold text-[#1F2933]">{inv.item}</p>
                  <p className="text-[11px] text-[#6B7280]">{inv.id} · {inv.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-[#1F2933]">₹{inv.amount.toFixed(2)}</span>
                  <button className="flex items-center gap-1.5 rounded-lg border border-[#E4E6DE] px-3 py-1.5 text-xs font-medium text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
                    <Download className="h-3 w-3" /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wallet */}
      {activeTab === 'wallet' && (
        <div className="space-y-4">
          <div className="rounded-[20px] bg-gradient-to-r from-[#65735A] to-[#78866B] p-8 text-white shadow-lg">
            <p className="text-sm font-medium text-white/70">Wallet Balance</p>
            <p className="mt-1 text-4xl font-bold">₹0.00</p>
            <p className="mt-2 text-xs text-white/60">Wallet coming soon — use card or UPI for payments</p>
            <button disabled className="mt-4 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-white opacity-50 cursor-not-allowed">
              Add Funds
            </button>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[18px] border border-dashed border-[#E4E6DE] py-12 text-center">
            <Wallet className="h-10 w-10 text-[#9AA59E]" />
            <p className="mt-3 text-sm font-semibold text-[#1F2933]">No wallet transactions yet</p>
            <p className="mt-1 text-xs text-[#6B7280]">Wallet transactions will appear here</p>
          </div>
        </div>
      )}
    </div>
  )
}
