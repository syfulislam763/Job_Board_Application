'use client'

import { useRouter } from "next/navigation"

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

const TAG_PALETTES = [
  { bg: '#E8F5E9', text: '#2E7D32' },
  { bg: '#EDE7F6', text: '#5E35B1' },
  { bg: '#E3F2FD', text: '#1565C0' },
  { bg: '#FFF3E0', text: '#E65100' },
  { bg: '#FCE4EC', text: '#AD1457' },
  { bg: '#E0F7FA', text: '#00695C' },
]


export default function JobCard({ job, id, onClick }: { job: Job; id?:string, onClick?: () => void }) {
  
  const router = useRouter();

  const handleViewJobDetails = () => {
    router.replace(`/jobs/${id}`)
  }
  
  return (
    <button
      onClick={handleViewJobDetails}
      className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-left w-full transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-[#C7D2FE] cursor-pointer"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: job.company.color + '18' }}>
          <span className="font-['Sora',sans-serif] text-[18px] font-extrabold" style={{ color: job.company.color }}>{job.company.initial}</span>
        </div>
        <span className="text-[12px] font-semibold text-[#4B6BF5] border border-[#4B6BF5] rounded-lg px-3 py-1 whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif]">
          {job.type}
        </span>
      </div>
      <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] text-[#0F1B2D] mb-1">{job.title}</div>
      <div className="flex items-center gap-1.5 text-[13px] text-[#6B7589] font-medium mb-3">
        <span>{job.company.name}</span>
        <span className="text-[#C8CDD8] text-[10px]">●</span>
        <span>{job.location}</span>
      </div>
      <p className="text-[13px] text-[#8E97A8] leading-relaxed mb-4 line-clamp-2">
        {job.description.split('\n')[0]}
      </p>
      <div className="flex flex-wrap gap-2">
        {job.tags.slice(0, 3).map((t, i) => {
          const p = TAG_PALETTES[i % TAG_PALETTES.length]
          return (
            <span key={t} className="text-[12px] font-semibold px-3 py-1 rounded-full whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif]" style={{ background: p.bg, color: p.text }}>
              {t}
            </span>
          )
        })}
      </div>
    </button>
  )
}