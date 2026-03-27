'use client'

import { useState } from "react"
import Footer from "../Footer"
import ApplyForm from "./ApplyForm"


type Page = 'home' | 'jobs' | 'login' | 'signup' | 'companies'

interface JobsPageProps {
  onNavigate?: (page: Page) => void
}


interface Job {
  id: number
  title: string
  company: string
  location: string
  category: string
  description: string
  created_at: string
  type: string
  salary: string
  tags: string[]
  featured: boolean
  initial: string
  color: string
}
const CATEGORIES = ['All', 'Design', 'Development', 'Engineering', 'Product', 'Marketing']
const JOB_TYPES = ['All', 'Full-time', 'Remote', 'Part-time', 'Contract']

const TAG_PALETTES = [
  { bg: '#E8F5E9', text: '#2E7D32' },
  { bg: '#EDE7F6', text: '#5E35B1' },
  { bg: '#E3F2FD', text: '#1565C0' },
  { bg: '#FFF3E0', text: '#E65100' },
  { bg: '#FCE4EC', text: '#AD1457' },
  { bg: '#E0F7FA', text: '#00695C' },
]



export default function JobDetailPage({
  job,
  onBack,
  onNavigate,
}: {
  job: Job
  onBack: () => void
  onNavigate?: (page: Page) => void
}) {
  const [showApplyForm, setShowApplyForm] = useState(false)

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <br key={i} />
      const parts = line.split(/(\*\*.*?\*\*)/g)
      return (
        <p key={i} className="text-[14px] text-[#4A5568] leading-relaxed">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j} className="font-bold text-[#0F1B2D]">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      )
    })
  }

  return (
    <>
      <main className="min-h-screen bg-[#F5F6FA]">

        <div className="bg-white border-b border-[#E5E8F0]">
          <div className="max-w-300 mx-auto px-6 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7589] bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#0F1B2D] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Jobs
            </button>
          </div>
        </div>

        <div className="max-w-300 mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            <div className="flex flex-col gap-5">

              {/* Header Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: job.color + '18' }}>
                    <span className="font-['Sora',sans-serif] text-[22px] font-extrabold" style={{ color: job.color }}>{job.initial}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                      <h1 className="font-['Sora',sans-serif] font-extrabold text-[22px] text-[#0F1B2D]">{job.title}</h1>
                      <span className="text-[12px] font-semibold text-[#4B6BF5] border border-[#4B6BF5] rounded-lg px-3 py-1 whitespace-nowrap shrink-0">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[14px] text-[#6B7589] font-medium">
                      <span className="font-semibold text-[#0F1B2D]">{job.company}</span>
                      <span className="text-[#C8CDD8] text-[10px]">●</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-5">
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#6B7589" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#6B7589" strokeWidth="2"/></svg>
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2v10l4 2" stroke="#6B7589" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="10" stroke="#6B7589" strokeWidth="2"/></svg>
                    {new Date(job.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#4B6BF5] bg-[#EEF1FF] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2v10l4 2" stroke="#4B6BF5" strokeWidth="2" strokeLinecap="round"/><rect x="2" y="7" width="20" height="14" rx="2" stroke="#4B6BF5" strokeWidth="2"/></svg>
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    {job.category}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags.map((t, i) => {
                    const p = TAG_PALETTES[i % TAG_PALETTES.length]
                    return (
                      <span key={t} className="text-[12px] font-semibold px-3 py-1 rounded-full font-['Plus_Jakarta_Sans',sans-serif]" style={{ background: p.bg, color: p.text }}>
                        {t}
                      </span>
                    )
                  })}
                </div>
              </div>

  
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <h2 className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-4">Job Description</h2>
                <div className="flex flex-col gap-1">
                  {renderDescription(job.description)}
                </div>
              </div>
            </div>

            <div className="sticky top-24">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                {!showApplyForm ? (
                  <>
                    <h2 className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-1.5">
                      Interested in this role?
                    </h2>
                    <p className="text-[13px] text-[#6B7589] leading-relaxed mb-5">
                      Submit your application in minutes. The {job.company} team reviews all applications within 5 business days.
                    </p>

                    {/* Company quick info */}
                    <div className="bg-[#F8F9FF] rounded-xl p-4 mb-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: job.color + '18' }}>
                          <span className="font-['Sora',sans-serif] text-[14px] font-extrabold" style={{ color: job.color }}>{job.initial}</span>
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-[#0F1B2D]">{job.company}</div>
                          <div className="text-[11px] text-[#6B7589]">{job.location}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Salary', value: job.salary },
                          { label: 'Type', value: job.type },
                          { label: 'Category', value: job.category },
                          { label: 'Posted', value: new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="text-[10px] font-bold text-[#9AA5B4] uppercase tracking-wide">{item.label}</div>
                            <div className="text-[12px] font-semibold text-[#0F1B2D] mt-0.5">{item.value}</div>
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
            </div>

          </div>
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </>
  )
}