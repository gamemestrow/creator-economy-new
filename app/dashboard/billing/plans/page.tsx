'use client'

import { Briefcase, CreditCard, ChevronRight, HelpCircle } from 'lucide-react'

export default function PlansPage() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plans</h1>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Current Plan
        </span>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Details */}
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-[#f5ebe6] text-[#b87050] rounded-xl shrink-0">
              <Briefcase className="w-8 h-8 fill-current" />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Basic - Zero Fixed Fee</h2>
              </div>
              
              {/* Transaction Charges */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 max-w-sm">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                  <span>Transaction Charges</span>
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                    <span>Commission</span>
                    <span>10%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                    <span>Convenience Fee</span>
                    <span>2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action */}
          <div className="bg-[#FFFBF7] border border-[#ffeedc] rounded-xl p-5 lg:w-96 text-center lg:text-left space-y-4">
            <p className="text-sm font-semibold text-gray-600 leading-normal">
              For more upgrade to <strong className="text-gray-900">Freedom</strong> or <strong className="text-gray-900">Enterprise Plan</strong> now
            </p>
            <button className="w-full py-2.5 bg-[#e06a28] hover:bg-[#ff733b] text-white font-bold rounded-lg transition shadow-sm text-sm">
              Upgrade now
            </button>
          </div>

        </div>

        {/* Plan Features Footer Description */}
        <div className="border-t border-gray-50 pt-5">
          <p className="text-gray-500 text-sm leading-relaxed">
            Unlimited services, unlimited landing pages, unlimited users, 10 free email credits per user, 
            20 GB Media Upload and more!
          </p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Invoices</h3>
        
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Invoice No.
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Billing Date
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm font-medium">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <CreditCard className="w-8 h-8 text-gray-300 stroke-[1.5px]" />
                      <span>No invoice history found.</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
