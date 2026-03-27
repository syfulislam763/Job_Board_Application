'use client'

import { useState } from "react"


type Page = 'home' | 'jobs' | 'login' | 'signup' | 'companies'



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


function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#0F1B2D] mb-2">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function inputClass(err?: string) {
  return `w-full px-4 py-3 text-[14px] font-medium text-[#0F1B2D] font-['Plus_Jakarta_Sans',sans-serif] placeholder:text-[#9AA5B4] bg-white border rounded-xl outline-none transition-colors ${
    err ? 'border-red-400 focus:border-red-500' : 'border-[#E5E8F0] focus:border-[#4B6BF5]'
  }`
}




export default function ApplyForm({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', resumeUrl: '', coverNote: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.resumeUrl.trim()) e.resumeUrl = 'Resume URL is required'
    else if (!/^https?:\/\//.test(form.resumeUrl)) e.resumeUrl = 'Must start with http:// or https://'
    if (!form.coverNote.trim()) e.coverNote = 'Cover note is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-['Sora',sans-serif] font-bold text-[18px] text-[#0F1B2D] mb-2">Application Sent!</h3>
        <p className="text-[13px] text-[#6B7589] max-w-72 leading-relaxed mb-6">
          Your application for <strong>{job.title}</strong> at {job.company} has been submitted. We'll be in touch soon.
        </p>
        <button
          onClick={onClose}
          className="bg-[#4B6BF5] text-white text-[14px] font-bold px-8 py-3 rounded-xl border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] transition-colors"
        >
          Back to Job
        </button>
      </div>
    )
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full Name" error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
          className={inputClass(errors.name)}
        />
      </Field>

      <Field label="Email Address" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className={inputClass(errors.email)}
        />
      </Field>

      <Field label="Resume Link (URL)" error={errors.resumeUrl}>
        <input
          type="url"
          value={form.resumeUrl}
          onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
          placeholder="https://drive.google.com/your-resume"
          className={inputClass(errors.resumeUrl)}
        />
      </Field>

      <Field label="Cover Note" error={errors.coverNote}>
        <textarea
          value={form.coverNote}
          onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
          placeholder="Tell us why you're a great fit for this role..."
          rows={4}
          className={`${inputClass(errors.coverNote)} resize-none`}
        />
      </Field>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 text-[14px] font-bold text-[#0F1B2D] bg-transparent border-[1.5px] border-[#E5E8F0] rounded-xl cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:border-[#0F1B2D] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-3 text-[14px] font-bold text-white bg-[#4B6BF5] border-none rounded-xl cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-97 transition-all"
        >
          Submit Application
        </button>
      </div>
    </form>
  )
}
