'use client'
import React, {useState} from "react"
import Field from "./Field"
import Input from "./Input"
import TagPicker from "./TagPicker"
import Select from "./Select"
import Textarea from "./Textarea"
import Toggle from "./Toggle"

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


type AdminView = "dashboard" | "company-setup" | "post-job" | "edit-job"

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


const blankJob = (): Omit<Job, "id" | "createdAt"> => ({
  title: "", location: "", type: "", salary: "", category: "",
  description: "", tags: [], featured: false, status: "active",
})

export default function JobFormView({ company, editJob, onSave, onCancel, onNavigate }: {
  company: CompanyProfile | null
  editJob: Job | null
  onSave: (job: Omit<Job, "id" | "createdAt">) => void
  onCancel: () => void,
  onNavigate: (v:AdminView) => void
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
        {company?.name && (
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
          {company?.name ?

            <button onClick={() => onSave(form)} disabled={!valid}
            className="flex items-center gap-2 bg-[#4640DE] text-white font-bold text-[0.85rem] px-8 py-3 rounded-lg hover:bg-[#3530c4] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
            {editJob ? "Save Changes" : "Publish Job"}
          </button>

          :

          <button onClick={() => onNavigate("company-setup")}
            className="flex items-center gap-2 bg-[#4640DE] text-white font-bold text-[0.85rem] px-8 py-3 rounded-lg hover:bg-[#3530c4] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
            {"Create a company profile to post job"}
          </button>
        
          }
        </div>
      </div>
    </div>
  )
}



