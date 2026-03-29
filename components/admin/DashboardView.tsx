'use client';
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";


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

const STATUS_STYLES: Record<Job["status"], string> = {
  active: "bg-[#e8f7f3] text-[#2EAD85]",
  draft:  "bg-[#f5f5f5] text-gray-400",
  closed: "bg-[#fde8e8] text-[#E05454]",
}


export default function DashboardView({ company, jobs, onNavigate, onDeleteJob, onEditJob, onStatusChange }: {
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