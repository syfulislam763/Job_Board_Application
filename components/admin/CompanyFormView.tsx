'use client'
import React, {useState} from "react"
import Field from "./Field"
import Input from "./Input"
import TagPicker from "./TagPicker"
import Select from "./Select"
import Textarea from "./Textarea"


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

const INDUSTRIES = ["Technology", "Fintech", "Design Tools", "Streaming & Entertainment", "Social Media & Technology", "Productivity Software", "Marketing Software", "Travel & Hospitality", "Music & Entertainment", "Consumer Electronics", "Cloud Infrastructure", "Project Management", "Healthcare", "Education"]
const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Contract", "Internship"]
const CATEGORIES = ["Design", "Development", "Engineering", "Product", "Marketing", "Finance", "Human Resource", "Business"]
const COMPANY_SIZES = ["1 – 10", "10 – 50", "50 – 200", "200 – 500", "500 – 1,000", "1,000 – 5,000", "5,000 – 10,000", "10,000 – 50,000", "100,000+"]
const PERK_OPTIONS = ["Remote Friendly", "Flexible Hours", "Health Insurance", "Dental & Vision", "Equity / RSUs", "Free Meals", "L&D Budget", "Conference Budget", "Home Office Stipend", "Unlimited PTO", "Parental Leave", "401k Match", "Annual Retreat", "Gym Membership"]
const TAG_OPTIONS = ["React", "TypeScript", "Node.js", "Python", "Go", "Kotlin", "Swift", "Java", "Figma", "Sketch", "Prototyping", "SQL", "AWS", "GCP", "ML", "AI", "SEO", "Content", "Analytics", "Strategy", "Leadership", "User Testing", "Marketing", "Design", "Engineering", "Business", "Finance", "HR"]
const COMPANY_TAGS = ["AI", "B2B", "B2C", "SaaS", "Mobile", "Cloud", "Payments", "Design", "Platform", "Marketplace", "Remote", "Hardware", "API", "Open Source"]
const ACCENT_COLORS = ["#4640DE", "#1DB954", "#FF5A5F", "#4285F4", "#0866FF", "#635BFF", "#FF7A59", "#E50914", "#A259FF", "#5E6AD2", "#FF8C00", "#56CDAD", "#E05454", "#FFB836"]



export default function CompanyFormView({ company, onSave, saved, setSaved }: {
  company: CompanyProfile | null
  onSave: (c: CompanyProfile) => void,
  saved: boolean,
  setSaved: (bool:boolean) => void
}) {
  const blank: CompanyProfile = { name: "", industry: "", location: "", size: "", founded: "", website: "", initial: "", color: "#4640DE", description: "", mission: "", tags: [], perks: [] }
  const [form, setForm] = useState<CompanyProfile>(company ?? blank)
  // const [saved, setSaved] = useState(false)

  const set = (patch: Partial<CompanyProfile>) => setForm(f => ({ ...f, ...patch }))

  const handleSave = () => {
    onSave(form)
    // setSaved(true)
    // setTimeout(() => setSaved(false), 2500)
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
