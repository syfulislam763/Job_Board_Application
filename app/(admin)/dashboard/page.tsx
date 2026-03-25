"use client"

import { useState } from "react"
import Link from "next/link"

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
type AdminView = "dashboard" | "company-setup" | "post-job" | "edit-job"

interface CompanyProfile {
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
}

interface Job {
  id: string
  title: string
  location: string
  type: string
  salary: string
  category: string
  description: string
  tags: string[]
  featured: boolean
  createdAt: string
  status: "active" | "draft" | "closed"
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const INDUSTRIES = ["Technology", "Fintech", "Design Tools", "Streaming & Entertainment", "Social Media & Technology", "Productivity Software", "Marketing Software", "Travel & Hospitality", "Music & Entertainment", "Consumer Electronics", "Cloud Infrastructure", "Project Management", "Healthcare", "Education"]
const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Contract", "Internship"]
const CATEGORIES = ["Design", "Development", "Engineering", "Product", "Marketing", "Finance", "Human Resource", "Business"]
const COMPANY_SIZES = ["1 – 10", "10 – 50", "50 – 200", "200 – 500", "500 – 1,000", "1,000 – 5,000", "5,000 – 10,000", "10,000 – 50,000", "100,000+"]
const PERK_OPTIONS = ["Remote Friendly", "Flexible Hours", "Health Insurance", "Dental & Vision", "Equity / RSUs", "Free Meals", "L&D Budget", "Conference Budget", "Home Office Stipend", "Unlimited PTO", "Parental Leave", "401k Match", "Annual Retreat", "Gym Membership"]
const TAG_OPTIONS = ["React", "TypeScript", "Node.js", "Python", "Go", "Kotlin", "Swift", "Java", "Figma", "Sketch", "Prototyping", "SQL", "AWS", "GCP", "ML", "AI", "SEO", "Content", "Analytics", "Strategy", "Leadership", "User Testing", "Marketing", "Design", "Engineering", "Business", "Finance", "HR"]
const COMPANY_TAGS = ["AI", "B2B", "B2C", "SaaS", "Mobile", "Cloud", "Payments", "Design", "Platform", "Marketplace", "Remote", "Hardware", "API", "Open Source"]
const ACCENT_COLORS = ["#4640DE", "#1DB954", "#FF5A5F", "#4285F4", "#0866FF", "#635BFF", "#FF7A59", "#E50914", "#A259FF", "#5E6AD2", "#FF8C00", "#56CDAD", "#E05454", "#FFB836"]

const STATUS_STYLES: Record<Job["status"], string> = {
  active: "bg-[#e8f7f3] text-[#2EAD85]",
  draft:  "bg-[#f5f5f5] text-gray-400",
  closed: "bg-[#fde8e8] text-[#E05454]",
}

// ─────────────────────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────────────────────
const SEED_COMPANY: CompanyProfile = {
  name: "Acme Corp", industry: "Technology", location: "San Francisco, USA",
  size: "500 – 1,000", founded: "2015", website: "acmecorp.com",
  initial: "A", color: "#4640DE",
  description: "Acme Corp builds world-class developer tools used by teams at Fortune 500 companies worldwide.",
  mission: "To make software development faster, simpler, and more delightful for every team on earth.",
  tags: ["SaaS", "B2B", "Cloud", "API"],
  perks: ["Remote Friendly", "Equity / RSUs", "Health Insurance", "L&D Budget", "Unlimited PTO"],
}

const SEED_JOBS: Job[] = [
  { id: "j1", title: "Senior Frontend Engineer", location: "Remote", type: "Remote", salary: "$120k – $160k", category: "Development", description: "Build next-gen UIs with React and TypeScript.", tags: ["React", "TypeScript", "Figma"], featured: true,  createdAt: "2025-03-18", status: "active" },
  { id: "j2", title: "Product Designer",         location: "San Francisco, USA", type: "Full-time", salary: "$90k – $130k",  category: "Design",       description: "Lead design across our core product suite.", tags: ["Figma", "Prototyping", "Design"], featured: false, createdAt: "2025-03-12", status: "active" },
  { id: "j3", title: "DevOps Engineer",           location: "Remote", type: "Remote", salary: "$110k – $150k", category: "Engineering",  description: "Own our cloud infrastructure and CI/CD pipelines.", tags: ["AWS", "Go", "SQL"], featured: false, createdAt: "2025-03-05", status: "draft"  },
]

// ─────────────────────────────────────────────────────────────
// TINY UI PRIMITIVES
// ─────────────────────────────────────────────────────────────
function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-semibold text-[#1a1a3e] flex items-center gap-1">
        {label}{required && <span className="text-[#4640DE]">*</span>}
      </label>
      {children}
      {hint && <p className="text-[0.7rem] text-gray-400">{hint}</p>}
    </div>
  )
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[0.85rem] text-[#1a1a3e] placeholder:text-gray-300 focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 transition-all bg-white" />
  )
}

function Textarea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[0.85rem] text-[#1a1a3e] placeholder:text-gray-300 focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 transition-all bg-white resize-none" />
  )
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[0.85rem] text-[#1a1a3e] focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 transition-all bg-white appearance-none cursor-pointer">
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function TagPicker({ selected, options, onChange, max }: { selected: string[]; options: string[]; onChange: (v: string[]) => void; max?: number }) {
  const toggle = (t: string) => {
    if (selected.includes(t)) onChange(selected.filter(x => x !== t))
    else if (!max || selected.length < max) onChange([...selected, t])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(t => (
        <button key={t} type="button" onClick={() => toggle(t)}
          className={["text-[0.72rem] font-semibold px-3 py-1.5 rounded-full border transition-all duration-150",
            selected.includes(t) ? "bg-[#4640DE] border-[#4640DE] text-white" : "bg-white border-gray-200 text-gray-500 hover:border-[#4640DE] hover:text-[#4640DE]",
          ].join(" ")}>{t}</button>
      ))}
    </div>
  )
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(!value)}
        className={["relative w-11 h-6 rounded-full transition-colors duration-200", value ? "bg-[#4640DE]" : "bg-gray-200"].join(" ")}>
        <span className={["absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200", value ? "translate-x-5.5" : "translate-x-0.5"].join(" ")} />
      </button>
      <span className="text-[0.82rem] text-gray-500">{label}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CONFIRM DIALOG
// ─────────────────────────────────────────────────────────────
function ConfirmDialog({ title, message, onConfirm, onCancel }: { title: string; message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-gray-100">
        <div className="w-10 h-10 rounded-full bg-[#fde8e8] flex items-center justify-center mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E05454" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
          </svg>
        </div>
        <h3 className="font-bold text-[#1a1a3e] text-[1rem] mb-1">{title}</h3>
        <p className="text-gray-400 text-[0.82rem] mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-gray-200 text-gray-500 font-semibold text-[0.82rem] py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 bg-[#E05454] text-white font-bold text-[0.82rem] py-2.5 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SIDEBAR NAV
// ─────────────────────────────────────────────────────────────
function Sidebar({ view, onNavigate, company, jobCount }: {
  view: AdminView
  onNavigate: (v: AdminView) => void
  company: CompanyProfile | null
  jobCount: number
}) {
  const navItems = [
    {
      key: "dashboard" as AdminView, label: "Dashboard", icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      key: "post-job" as AdminView, label: "Post a Job", icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )
    },
    {
      key: "company-setup" as AdminView, label: "Company Profile", icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        </svg>
      )
    },
  ]

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <Link href={"/"} className="px-5 cursor-pointer py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#4640DE] flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            <line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
          </svg>
        </div>
        <div>
          <p className="font-extrabold text-[#1a1a3e] text-[0.88rem] leading-none">QuickHire</p>
          <p className="text-[0.62rem] text-gray-400 font-medium leading-none mt-0.5">Admin Panel</p>
        </div>
      </Link>

      {/* Company badge */}
      {company && (
        <div className="mx-4 my-4 p-3 rounded-xl bg-[#f7f7fc] flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-base shrink-0"
            style={{ backgroundColor: company.color }}>
            {company.initial}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#1a1a3e] text-[0.8rem] truncate">{company.name}</p>
            <p className="text-[0.65rem] text-gray-400 truncate">{jobCount} job{jobCount !== 1 ? "s" : ""} posted</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(item => (
          <button key={item.key} onClick={() => onNavigate(item.key)}
            className={["w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.82rem] font-semibold transition-all duration-150",
              view === item.key ? "bg-[#4640DE] text-white" : "text-gray-500 hover:bg-gray-50 hover:text-[#1a1a3e]",
            ].join(" ")}>
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Admin badge */}
      <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#1a1a3e] flex items-center justify-center text-white text-[0.7rem] font-bold">A</div>
        <div>
          <p className="text-[0.78rem] font-bold text-[#1a1a3e]">Admin</p>
          <p className="text-[0.65rem] text-gray-400">admin@quickhire.com</p>
        </div>
      </div>
    </aside>
  )
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD VIEW
// ─────────────────────────────────────────────────────────────
function DashboardView({ company, jobs, onNavigate, onDeleteJob, onEditJob, onStatusChange }: {
  company: CompanyProfile | null
  jobs: Job[]
  onNavigate: (v: AdminView) => void
  onDeleteJob: (id: string) => void
  onEditJob: (job: Job) => void
  onStatusChange: (id: string, status: Job["status"]) => void
}) {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const active  = jobs.filter(j => j.status === "active").length
  const draft   = jobs.filter(j => j.status === "draft").length
  const featured = jobs.filter(j => j.featured).length

  const stats = [
    { label: "Total Jobs",    value: jobs.length, color: "#4640DE", bg: "#eeeeff" },
    { label: "Active",        value: active,       color: "#2EAD85", bg: "#e8f7f3" },
    { label: "Drafts",        value: draft,        color: "#FFB836", bg: "#fff8e8" },
    { label: "Featured",      value: featured,     color: "#FF5A5F", bg: "#fde8e8" },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-extrabold text-[1.7rem] text-[#1a1a3e] leading-tight">Dashboard</h1>
          <p className="text-gray-400 text-[0.88rem] mt-1">Manage your job listings and company profile.</p>
        </div>
        <button onClick={() => onNavigate("post-job")}
          className="flex items-center gap-2 bg-[#4640DE] text-white font-bold text-[0.82rem] px-5 py-2.5 rounded-lg hover:bg-[#3530c4] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Post a Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: s.bg }}>
              <span className="font-black text-[1rem]" style={{ color: s.color }}>{s.value}</span>
            </div>
            <p className="text-[0.75rem] font-semibold text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Company profile banner */}
      {!company ? (
        <div className="bg-[#f7f7fc] border-2 border-dashed border-gray-200 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="font-bold text-[#1a1a3e] text-[0.95rem]">No company profile yet</p>
            <p className="text-gray-400 text-[0.82rem] mt-0.5">Set up your company profile to start posting jobs.</p>
          </div>
          <button onClick={() => onNavigate("company-setup")}
            className="text-[0.82rem] font-bold text-[#4640DE] border border-[#4640DE] rounded-lg px-4 py-2 hover:bg-[#4640DE] hover:text-white transition-colors">
            Set Up Profile
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0"
            style={{ backgroundColor: company.color }}>
            {company.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#1a1a3e] text-[0.95rem]">{company.name}</p>
            <p className="text-[0.75rem] text-gray-400">{company.industry} · {company.location} · Est. {company.founded}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {company.tags.map(t => (
                <span key={t} className="text-[0.65rem] font-semibold bg-[#eeeeff] text-[#4640DE] px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
          <button onClick={() => onNavigate("company-setup")}
            className="text-[0.78rem] font-semibold text-gray-400 hover:text-[#4640DE] transition-colors shrink-0">
            Edit Profile
          </button>
        </div>
      )}

      {/* Jobs table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1a1a3e] text-[1rem]">Job Listings</h2>
          <span className="text-[0.75rem] text-gray-400">{jobs.length} total</span>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#f7f7fc] flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0c0d0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
              </svg>
            </div>
            <p className="font-semibold text-gray-400 text-[0.88rem]">No jobs posted yet</p>
            <button onClick={() => onNavigate("post-job")} className="mt-3 text-[0.8rem] font-bold text-[#4640DE] hover:underline">Post your first job →</button>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_120px_100px_80px_44px] gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50">
              {["Job Title", "Type", "Category", "Status", ""].map(h => (
                <p key={h} className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider">{h}</p>
              ))}
            </div>

            {/* Rows */}
            {jobs.map((job, i) => (
              <div key={job.id}
                className={["grid grid-cols-[1fr_120px_100px_80px_44px] gap-4 items-center px-5 py-4 transition-colors hover:bg-gray-50",
                  i < jobs.length - 1 ? "border-b border-gray-100" : "",
                ].join(" ")}>

                {/* Title */}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[#1a1a3e] text-[0.85rem]">{job.title}</p>
                    {job.featured && (
                      <span className="text-[0.6rem] font-bold bg-[#4640DE] text-white px-1.5 py-px rounded">FEAT</span>
                    )}
                  </div>
                  <p className="text-[0.72rem] text-gray-400 mt-0.5">{job.location} · {job.salary || "Salary TBD"}</p>
                  {job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {job.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-[0.62rem] bg-gray-100 text-gray-400 px-2 py-px rounded-full">{t}</span>
                      ))}
                      {job.tags.length > 3 && <span className="text-[0.62rem] text-gray-300">+{job.tags.length - 3}</span>}
                    </div>
                  )}
                  <p className="text-[0.65rem] text-gray-300 mt-1">{job.createdAt}</p>
                </div>

                {/* Type */}
                <p className="text-[0.78rem] text-gray-500">{job.type}</p>

                {/* Category */}
                <p className="text-[0.78rem] text-gray-500">{job.category}</p>

                {/* Status */}
                <select value={job.status}
                  onChange={e => onStatusChange(job.id, e.target.value as Job["status"])}
                  className={["text-[0.68rem] font-bold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none", STATUS_STYLES[job.status]].join(" ")}>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                </select>

                {/* Actions menu */}
                <div className="relative">
                  <button onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#1a1a3e] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="19" r="1" fill="currentColor" />
                    </svg>
                  </button>
                  {openMenu === job.id && (
                    <div className="absolute right-0 top-9 z-20 bg-white border border-gray-100 rounded-xl shadow-lg w-36 py-1.5 overflow-hidden">
                      <button onClick={() => { onEditJob(job); setOpenMenu(null) }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[0.78rem] font-semibold text-[#1a1a3e] hover:bg-gray-50 transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit Job
                      </button>
                      <button onClick={() => { setDeleteTarget(job.id); setOpenMenu(null) }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[0.78rem] font-semibold text-[#E05454] hover:bg-[#fde8e8] transition-colors">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm delete dialog */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete this job?"
          message="This action cannot be undone. The listing will be permanently removed."
          onConfirm={() => { onDeleteJob(deleteTarget); setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// COMPANY FORM VIEW
// ─────────────────────────────────────────────────────────────
function CompanyFormView({ company, onSave }: {
  company: CompanyProfile | null
  onSave: (c: CompanyProfile) => void
}) {
  const blank: CompanyProfile = { name: "", industry: "", location: "", size: "", founded: "", website: "", initial: "", color: "#4640DE", description: "", mission: "", tags: [], perks: [] }
  const [form, setForm] = useState<CompanyProfile>(company ?? blank)
  const [saved, setSaved] = useState(false)

  const set = (patch: Partial<CompanyProfile>) => setForm(f => ({ ...f, ...patch }))

  const handleSave = () => {
    onSave(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const valid = form.name && form.industry && form.location && form.description

  return (
    <div className="mx-auto p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-extrabold text-[1.7rem] text-[#1a1a3e] leading-tight">Company Profile</h1>
        <p className="text-gray-400 text-[0.88rem] mt-1">
          {company ? "Update your company profile. This information is shown to all candidates." : "Set up your company once. You can always edit it later."}
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Company Name" required>
            <Input value={form.name} onChange={v => set({ name: v, initial: v[0]?.toUpperCase() || "" })} placeholder="e.g. Acme Corp" />
          </Field>
          <Field label="Website">
            <Input value={form.website} onChange={v => set({ website: v })} placeholder="acmecorp.com" />
          </Field>
          <Field label="Industry" required>
            <Select value={form.industry} onChange={v => set({ industry: v })} options={INDUSTRIES} placeholder="Select industry" />
          </Field>
          <Field label="Headquarters" required>
            <Input value={form.location} onChange={v => set({ location: v })} placeholder="e.g. San Francisco, USA" />
          </Field>
          <Field label="Company Size">
            <Select value={form.size} onChange={v => set({ size: v })} options={COMPANY_SIZES} placeholder="Select size" />
          </Field>
          <Field label="Year Founded">
            <Input value={form.founded} onChange={v => set({ founded: v })} placeholder="e.g. 2015" />
          </Field>
        </div>

        {/* Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Logo Initial" hint="Single letter shown on the company badge">
            <Input value={form.initial} onChange={v => set({ initial: v.slice(0, 1).toUpperCase() })} placeholder="A" />
          </Field>
          <Field label="Brand Color">
            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-2 flex-1">
                {ACCENT_COLORS.map(col => (
                  <button key={col} type="button" onClick={() => set({ color: col })}
                    className={["w-7 h-7 rounded-full border-2 transition-all", form.color === col ? "border-[#1a1a3e] scale-110" : "border-transparent hover:scale-105"].join(" ")}
                    style={{ backgroundColor: col }} />
                ))}
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0 border border-gray-100"
                style={{ backgroundColor: form.color }}>
                {form.initial || "?"}
              </div>
            </div>
          </Field>
        </div>

        <Field label="About the Company" required>
          <Textarea value={form.description} onChange={v => set({ description: v })} placeholder="Describe what the company does, its culture, and why it's a great place to work..." rows={4} />
        </Field>

        <Field label="Company Mission">
          <Input value={form.mission} onChange={v => set({ mission: v })} placeholder="e.g. To organize the world's information and make it universally accessible." />
        </Field>

        <Field label="Company Tags" hint="Topics and focus areas (max 6)">
          <TagPicker selected={form.tags} options={COMPANY_TAGS} onChange={v => set({ tags: v.slice(0, 6) })} max={6} />
        </Field>

        <Field label="Perks & Benefits">
          <TagPicker selected={form.perks} options={PERK_OPTIONS} onChange={v => set({ perks: v })} />
        </Field>

        <div className="flex items-center justify-between pt-2">
          {saved && (
            <div className="flex items-center gap-2 text-[#2EAD85] text-[0.82rem] font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Profile saved!
            </div>
          )}
          <div className="ml-auto">
            <button onClick={handleSave} disabled={!valid}
              className="flex items-center gap-2 bg-[#4640DE] text-white font-bold text-[0.85rem] px-8 py-3 rounded-lg hover:bg-[#3530c4] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
              </svg>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// JOB FORM VIEW  (used for both post-job & edit-job)
// ─────────────────────────────────────────────────────────────
const blankJob = (): Omit<Job, "id" | "createdAt"> => ({
  title: "", location: "", type: "", salary: "", category: "",
  description: "", tags: [], featured: false, status: "active",
})

function JobFormView({ company, editJob, onSave, onCancel }: {
  company: CompanyProfile | null
  editJob: Job | null
  onSave: (job: Omit<Job, "id" | "createdAt">) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Omit<Job, "id" | "createdAt">>(
    editJob ? { title: editJob.title, location: editJob.location, type: editJob.type, salary: editJob.salary, category: editJob.category, description: editJob.description, tags: editJob.tags, featured: editJob.featured, status: editJob.status }
            : blankJob()
  )

  const set = (patch: Partial<typeof form>) => setForm(f => ({ ...f, ...patch }))
  const valid = form.title && form.location && form.type && form.category && form.description

  return (
    <div className="mx-auto p-8 max-w-5xl">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-[1.7rem] text-[#1a1a3e] leading-tight">
            {editJob ? "Edit Job" : "Post a New Job"}
          </h1>
          <p className="text-gray-400 text-[0.88rem] mt-1">
            {editJob ? "Update the listing details below." : "This job will be posted under your company profile."}
          </p>
        </div>
        {company && (
          <div className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-3 py-2 shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: company.color }}>
              {company.initial}
            </div>
            <span className="text-[0.78rem] font-bold text-[#1a1a3e]">{company.name}</span>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Job Title" required>
            <Input value={form.title} onChange={v => set({ title: v })} placeholder="e.g. Senior Product Designer" />
          </Field>
          <Field label="Location" required>
            <Input value={form.location} onChange={v => set({ location: v })} placeholder="e.g. Remote or New York, USA" />
          </Field>
          <Field label="Employment Type" required>
            <Select value={form.type} onChange={v => set({ type: v })} options={JOB_TYPES} placeholder="Select type" />
          </Field>
          <Field label="Category" required>
            <Select value={form.category} onChange={v => set({ category: v })} options={CATEGORIES} placeholder="Select category" />
          </Field>
          <Field label="Salary Range" hint="e.g. $80k – $120k / year">
            <Input value={form.salary} onChange={v => set({ salary: v })} placeholder="$80k – $120k" />
          </Field>
          <Field label="Listing Status">
            <Select value={form.status} onChange={v => set({ status: v as Job["status"] })} options={["active", "draft", "closed"]} />
          </Field>
        </div>

        <Field label="Featured Listing">
          <Toggle value={form.featured} onChange={v => set({ featured: v })} label={form.featured ? "Featured on homepage" : "Standard listing"} />
        </Field>

        <Field label="Job Description" required hint="Supports markdown: **bold**, - lists, ## headings">
          <Textarea value={form.description} onChange={v => set({ description: v })}
            placeholder={"Describe the role, responsibilities, requirements, and benefits...\n\n**Responsibilities:**\n- ...\n\n**Requirements:**\n- ..."}
            rows={9} />
        </Field>

        <Field label="Skill Tags" hint="Select all relevant technologies and skills">
          <TagPicker selected={form.tags} options={TAG_OPTIONS} onChange={v => set({ tags: v })} />
        </Field>

        <div className="flex items-center justify-between pt-2">
          <button onClick={onCancel}
            className="flex items-center gap-2 text-[0.85rem] font-semibold text-gray-400 hover:text-[#1a1a3e] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Cancel
          </button>
          <button onClick={() => onSave(form)} disabled={!valid}
            className="flex items-center gap-2 bg-[#4640DE] text-white font-bold text-[0.85rem] px-8 py-3 rounded-lg hover:bg-[#3530c4] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
            {editJob ? "Save Changes" : "Publish Job"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [view, setView]         = useState<AdminView>("dashboard")
  const [company, setCompany]   = useState<CompanyProfile | null>(SEED_COMPANY)
  const [jobs, setJobs]         = useState<Job[]>(SEED_JOBS)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  const saveCompany = (c: CompanyProfile) => {
    setCompany(c)
    setView("dashboard")
  }

  const publishJob = (data: Omit<Job, "id" | "createdAt">) => {
    if (editingJob) {
      setJobs(prev => prev.map(j => j.id === editingJob.id ? { ...editingJob, ...data } : j))
      setEditingJob(null)
    } else {
      const newJob: Job = { ...data, id: `j${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) }
      setJobs(prev => [newJob, ...prev])
    }
    setView("dashboard")
  }

  const deleteJob = (id: string) => setJobs(prev => prev.filter(j => j.id !== id))

  const editJob = (job: Job) => {
    setEditingJob(job)
    setView("edit-job")
  }

  const statusChange = (id: string, status: Job["status"]) =>
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j))

  const navigate = (v: AdminView) => {
    if (v !== "edit-job") setEditingJob(null)
    setView(v)
  }

  return (
    <div className="flex min-h-screen bg-[#f7f7fc]">
      <Sidebar view={view} onNavigate={navigate} company={company} jobCount={jobs.length} />

      <main className="flex-1 overflow-y-auto">
        {(view === "dashboard") && (
          <DashboardView company={company} jobs={jobs} onNavigate={navigate}
            onDeleteJob={deleteJob} onEditJob={editJob} onStatusChange={statusChange} />
        )}
        {(view === "company-setup") && (
          <CompanyFormView company={company} onSave={saveCompany} />
        )}
        {(view === "post-job" || view === "edit-job") && (
          <JobFormView company={company} editJob={editingJob}
            onSave={publishJob} onCancel={() => navigate("dashboard")} />
        )}
      </main>
    </div>
  )
}