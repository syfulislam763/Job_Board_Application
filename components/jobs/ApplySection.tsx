'use client'

import { useState } from "react"
import ApplyForm from "./ApplyForm"

interface Company {
  _id: string
  name: string
  industry: string
  location: string
  size: string
  founded: string
  website: string
  initial: string
  color: string
  description: string
  mission: string
  tags: string[]
  perks: string[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface Job {
  _id: string
  title: string
  company: Company
  location: string
  category: string
  description: string
  createdAt: string
  type: string
  salary: string
  tags: string[]
  featured: boolean
  status: 'active' | 'inactive'
  createdBy: string
  updatedAt: string
}

export default function ApplySection({ job }: { job: Job }) {
  const [showApplyForm, setShowApplyForm] = useState(false)

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
      {!showApplyForm ? (
        <>
          <h2 className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-1.5">
            Interested in this role?
          </h2>
          <p className="text-[13px] text-[#6B7589] leading-relaxed mb-5">
            Submit your application in minutes. The {job?.company?.name} team reviews all applications within 5 business days.
          </p>

          <div className="bg-[#F8F9FF] rounded-xl p-4 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: job?.company?.color + '18' }}>
                <span className="font-['Sora',sans-serif] text-[14px] font-extrabold" style={{ color: job?.company?.color }}>{job?.company?.initial}</span>
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#0F1B2D]">{job?.company?.name}</div>
                <div className="text-[11px] text-[#6B7589]">{job?.location}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Salary', value: job?.salary },
                { label: 'Type', value: job?.type },
                { label: 'Category', value: job?.category },
                { label: 'Posted', value: new Date(job?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
              ].map((item) => (
                <div key={item?.label}>
                  <div className="text-[10px] font-bold text-[#9AA5B4] uppercase tracking-wide">{item?.label}</div>
                  <div className="text-[12px] font-semibold text-[#0F1B2D] mt-0.5">{item?.value}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowApplyForm(true)}
            className="w-full py-3.5 bg-[#4B6BF5] text-white text-[14px] font-bold rounded-xl border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-97 transition-all duration-150"
          >
            Apply Now
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D]">Apply for this role</h2>
            <button
              onClick={() => setShowApplyForm(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F5F6FA] border-none cursor-pointer text-[#6B7589] hover:bg-[#E5E8F0] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          <ApplyForm job={job} onClose={() => setShowApplyForm(false)} />
        </>
      )}
    </div>
  )
}