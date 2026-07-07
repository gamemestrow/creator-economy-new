'use client'

import { useState } from 'react'
import { Award, Download, Share2, Eye, Lock, CheckCircle, Star, Shield, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const EARNED_CERTS = [
  { id: 1, courseName: 'React Fundamentals', instructor: 'Sarah Chen', completionDate: 'June 15, 2026', grade: 'A+', score: 96, verificationCode: 'TM-RF-2026-8472', hours: '24h' },
  { id: 2, courseName: 'Advanced TypeScript', instructor: 'Rahul Sharma', completionDate: 'May 28, 2026', grade: 'A', score: 91, verificationCode: 'TM-TS-2026-3891', hours: '32h' },
  { id: 3, courseName: 'CSS Mastery', instructor: 'Tom Styles', completionDate: 'April 10, 2026', grade: 'A+', score: 98, verificationCode: 'TM-CSS-2026-1024', hours: '18h' },
]

const LOCKED_CERTS = [
  { id: 4, courseName: 'Full-Stack Development', instructor: 'Maria Full Stack', progress: 68, lessonsLeft: 12 },
  { id: 5, courseName: 'Database Design', instructor: 'Emily Database', progress: 35, lessonsLeft: 24 },
]

function CertificatePreview({ cert, onClose }: { cert: typeof EARNED_CERTS[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg text-[#6B7280] hover:text-[#1F2933]">
          <X className="h-4 w-4" />
        </button>
        {/* Certificate Design */}
        <div className="relative overflow-hidden rounded-2xl border-4 border-[#B88A5A] bg-white p-8 shadow-2xl">
          {/* Corner decorations */}
          <div className="absolute left-4 top-4 h-12 w-12 border-l-4 border-t-4 border-[#B88A5A]/40 rounded-tl-lg" />
          <div className="absolute right-4 top-4 h-12 w-12 border-r-4 border-t-4 border-[#B88A5A]/40 rounded-tr-lg" />
          <div className="absolute left-4 bottom-4 h-12 w-12 border-l-4 border-b-4 border-[#B88A5A]/40 rounded-bl-lg" />
          <div className="absolute right-4 bottom-4 h-12 w-12 border-r-4 border-b-4 border-[#B88A5A]/40 rounded-br-lg" />

          <div className="relative z-10 text-center">
            <div className="mb-2 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B88A5A]/10">
                <Award className="h-7 w-7 text-[#B88A5A]" />
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">Certificate of Completion</p>
            <h2 className="mt-4 text-2xl font-bold text-[#1F2933]">This is to certify that</h2>
            <p className="mt-2 text-3xl font-bold text-[#78866B]">Anamika Pandey</p>
            <p className="mt-3 text-sm text-[#6B7280]">has successfully completed</p>
            <h3 className="mt-2 text-xl font-bold text-[#1F2933]">{cert.courseName}</h3>
            <p className="mt-1 text-sm text-[#6B7280]">with a grade of <strong className="text-[#B88A5A]">{cert.grade}</strong> ({cert.score}%)</p>
            <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-6 border-t border-[#E4E6DE] pt-4">
              <div className="text-center">
                <p className="text-xs text-[#6B7280]">Completion Date</p>
                <p className="text-sm font-semibold text-[#1F2933]">{cert.completionDate}</p>
              </div>
              <div className="h-8 w-px bg-[#E4E6DE]" />
              <div className="text-center">
                <p className="text-xs text-[#6B7280]">Instructor</p>
                <p className="text-sm font-semibold text-[#1F2933]">{cert.instructor}</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-[#F3F4EF] px-4 py-2 inline-flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-[#78866B]" />
              <span className="text-[11px] font-mono text-[#6B7280]">Verification: {cert.verificationCode}</span>
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="mt-3 flex justify-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-[#78866B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#65735A] transition-colors">
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-[#E4E6DE] bg-white px-5 py-2.5 text-sm font-semibold text-[#1F2933] hover:border-[#78866B]/30 transition-colors">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CertificatesPage() {
  const [preview, setPreview] = useState<typeof EARNED_CERTS[0] | null>(null)

  return (
    <>
      {preview && <CertificatePreview cert={preview} onClose={() => setPreview(null)} />}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#1F2933]">Certificates</h1>
          <p className="text-sm text-[#6B7280]">Your earned credentials and course completions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[{ label: 'Earned', value: EARNED_CERTS.length, emoji: '🏆' },
            { label: 'Locked', value: LOCKED_CERTS.length, emoji: '🔒' },
            { label: 'Shared', value: 2, emoji: '📤' },
            { label: 'Verified', value: 3, emoji: '✅' }].map(s => (
            <div key={s.label} className="rounded-[18px] border border-[#E4E6DE] bg-white p-5 shadow-sm text-center">
              <div className="text-2xl">{s.emoji}</div>
              <p className="mt-1 text-2xl font-bold text-[#1F2933]">{s.value}</p>
              <p className="text-xs text-[#6B7280]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Earned */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1F2933]">Earned Certificates</h2>
            <button className="flex items-center gap-2 rounded-xl border border-[#E4E6DE] bg-white px-4 py-2 text-sm font-semibold text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
              <Download className="h-4 w-4" /> Download All
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EARNED_CERTS.map(cert => (
              <div key={cert.id} className="group relative overflow-hidden rounded-[18px] border border-[#B88A5A]/20 bg-gradient-to-br from-white to-[#F8F8F5] p-5 shadow-sm transition-all duration-250 hover:shadow-md hover:-translate-y-0.5">
                {/* Certificate mini design */}
                <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-[#B88A5A]/30 rounded-tr-md" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B88A5A]/10">
                  <Award className="h-6 w-6 text-[#B88A5A]" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#1F2933]">{cert.courseName}</h3>
                <p className="mt-0.5 text-xs text-[#6B7280]">by {cert.instructor}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-full bg-[#4F8A5B]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#4F8A5B]">{cert.grade}</span>
                  <span className="text-xs text-[#6B7280]">{cert.score}% · {cert.hours}</span>
                </div>
                <p className="mt-2 flex items-center gap-1 text-[11px] text-[#6B7280]">
                  <CheckCircle className="h-3 w-3 text-[#4F8A5B]" /> Completed {cert.completionDate}
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-[#6B7280]">
                  <Shield className="h-3 w-3 text-[#78866B]" /> {cert.verificationCode}
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setPreview(cert)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E4E6DE] py-2 text-xs font-semibold text-[#6B7280] hover:border-[#78866B]/30 hover:text-[#78866B] transition-colors">
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#78866B] py-2 text-xs font-semibold text-white hover:bg-[#65735A] transition-colors">
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#1F2933]">Complete to Unlock</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LOCKED_CERTS.map(cert => (
              <div key={cert.id} className="rounded-[18px] border border-dashed border-[#E4E6DE] bg-[#F3F4EF] p-5 opacity-80">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4E6DE]">
                    <Lock className="h-5 w-5 text-[#6B7280]" />
                  </div>
                  <span className="rounded-full border border-[#E4E6DE] bg-white px-2.5 py-0.5 text-[11px] text-[#6B7280]">{cert.progress}% done</span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#6B7280]">{cert.courseName}</h3>
                <p className="mt-0.5 text-xs text-[#9AA59E]">by {cert.instructor}</p>
                <div className="mt-3 overflow-hidden rounded-full bg-[#E4E6DE] h-1.5">
                  <div className="h-1.5 rounded-full bg-[#78866B] transition-all" style={{ width: `${cert.progress}%` }} />
                </div>
                <p className="mt-2 text-[11px] text-[#6B7280]">{cert.lessonsLeft} lessons remaining to unlock</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
