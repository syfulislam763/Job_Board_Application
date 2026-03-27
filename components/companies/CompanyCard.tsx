'use client'

interface Company {
  id: number
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
  openRoles: number
  tags: string[]
  perks: string[]
  socials: { linkedin?: string; twitter?: string }
}


const TAG_PALETTES = [
  { bg: '#E8F5E9', text: '#2E7D32' },
  { bg: '#EDE7F6', text: '#5E35B1' },
  { bg: '#E3F2FD', text: '#1565C0' },
  { bg: '#FFF3E0', text: '#E65100' },
  { bg: '#FCE4EC', text: '#AD1457' },
  { bg: '#E0F7FA', text: '#00695C' },
]


export default function CompanyCard({ company, onClick }: { company: Company; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-left w-full transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-[#C7D2FE] cursor-pointer"
    >

      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: company.color + '18' }}>
          <span className="font-['Sora',sans-serif] text-[20px] font-extrabold" style={{ color: company.color }}>{company.initial}</span>
        </div>
        <span className="text-[11px] font-semibold text-[#4B6BF5] border border-[#4B6BF5] rounded-lg px-2.5 py-1 whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif]">
          {company.openRoles} open roles
        </span>
      </div>

      <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] text-[#0F1B2D] mb-0.5">{company.name}</div>
      <div className="text-[12px] text-[#4B6BF5] font-semibold mb-2">{company.industry}</div>


      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center gap-1 text-[12px] text-[#6B7589] font-medium">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#6B7589" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#6B7589" strokeWidth="2"/></svg>
          {company.location}
        </span>
        <span className="flex items-center gap-1 text-[12px] text-[#6B7589] font-medium">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#6B7589" strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke="#6B7589" strokeWidth="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#6B7589" strokeWidth="2"/></svg>
          {company.size}
        </span>
      </div>

      <p className="text-[13px] text-[#8E97A8] leading-relaxed mb-4 line-clamp-2">{company.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {company.tags.slice(0, 3).map((t, i) => {
          const p = TAG_PALETTES[i % TAG_PALETTES.length]
          return (
            <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif]" style={{ background: p.bg, color: p.text }}>
              {t}
            </span>
          )
        })}
      </div>
    </button>
  )
}
