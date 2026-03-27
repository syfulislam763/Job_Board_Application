'use client'
import Footer from "../Footer";

type Page = 'home' | 'jobs' | 'login' | 'signup' | 'companies'


const TAG_PALETTES = [
  { bg: '#E8F5E9', text: '#2E7D32' },
  { bg: '#EDE7F6', text: '#5E35B1' },
  { bg: '#E3F2FD', text: '#1565C0' },
  { bg: '#FFF3E0', text: '#E65100' },
  { bg: '#FCE4EC', text: '#AD1457' },
  { bg: '#E0F7FA', text: '#00695C' },
]

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

export default function CompanyDetailPage({ company, onBack, onNavigate }: { company: Company; onBack: () => void; onNavigate?: (page: Page) => void }) {
  return (
    <>
      <main className="min-h-screen bg-[#F5F6FA]">

        {/* Back bar */}
        <div className="bg-white border-b border-[#E5E8F0]">
          <div className="max-w-300 mx-auto px-6 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7589] bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#0F1B2D] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Companies
            </button>
          </div>
        </div>

        <div className="max-w-300 mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

            {/* ── LEFT ── */}
            <div className="flex flex-col gap-5">

              {/* Header Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: company.color + '18' }}>
                    <span className="font-['Sora',sans-serif] text-[26px] font-extrabold" style={{ color: company.color }}>{company.initial}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                      <h1 className="font-['Sora',sans-serif] font-extrabold text-[24px] text-[#0F1B2D]">{company.name}</h1>
                      <span className="text-[12px] font-semibold text-[#4B6BF5] border border-[#4B6BF5] rounded-lg px-3 py-1 whitespace-nowrap shrink-0">
                        {company.openRoles} open roles
                      </span>
                    </div>
                    <div className="text-[13px] font-semibold text-[#4B6BF5] mb-1">{company.industry}</div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7589]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#6B7589" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#6B7589" strokeWidth="2"/></svg>
                      {company.location}
                    </div>
                  </div>
                </div>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {[
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#6B7589" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#6B7589" strokeWidth="2" strokeLinecap="round"/></svg>, label: `Founded ${company.founded}` },
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#6B7589" strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke="#6B7589" strokeWidth="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#6B7589" strokeWidth="2"/></svg>, label: `${company.size} employees` },
                    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6B7589" strokeWidth="2"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#6B7589" strokeWidth="2"/></svg>, label: company.website },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {company.tags.map((t, i) => {
                    const p = TAG_PALETTES[i % TAG_PALETTES.length]
                    return (
                      <span key={t} className="text-[12px] font-semibold px-3 py-1 rounded-full font-['Plus_Jakarta_Sans',sans-serif]" style={{ background: p.bg, color: p.text }}>
                        {t}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* About Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <h2 className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-3">About {company.name}</h2>
                <p className="text-[14px] text-[#4A5568] leading-relaxed">{company.description}</p>
              </div>

              {/* Mission Card */}
              <div className="bg-[#F8F9FF] border border-[#C7D2FE] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#4B6BF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <h2 className="font-['Sora',sans-serif] font-bold text-[15px] text-[#4B6BF5]">Our Mission</h2>
                </div>
                <p className="text-[14px] text-[#374151] leading-relaxed italic">&ldquo;{company.mission}&rdquo;</p>
              </div>

              {/* Perks Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <h2 className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-4">Perks & Benefits</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {company.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2 bg-[#F5F6FA] rounded-xl px-3 py-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="text-[12px] font-semibold text-[#0F1B2D]">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-24 flex flex-col gap-4">

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                <h3 className="font-['Sora',sans-serif] font-bold text-[14px] text-[#0F1B2D] mb-4">Company Overview</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Industry', value: company.industry },
                    { label: 'Company Size', value: `${company.size} employees` },
                    { label: 'Founded', value: company.founded },
                    { label: 'Headquarters', value: company.location },
                    { label: 'Website', value: company.website },
                    { label: 'Open Roles', value: `${company.openRoles} positions` },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#9AA5B4] uppercase tracking-wide shrink-0">{item.label}</span>
                      <span className="text-[12px] font-semibold text-[#0F1B2D] text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                <h3 className="font-['Sora',sans-serif] font-bold text-[14px] text-[#0F1B2D] mb-3">Follow {company.name}</h3>
                <div className="flex flex-col gap-2">
                  {company.socials.linkedin && (
                    <a href={company.socials.linkedin} className="flex items-center gap-2.5 text-[13px] font-semibold text-[#0A66C2] bg-[#EEF4FF] rounded-xl px-3 py-2.5 no-underline hover:bg-[#DBEAFE] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                      LinkedIn
                    </a>
                  )}
                  {company.socials.twitter && (
                    <a href={company.socials.twitter} className="flex items-center gap-2.5 text-[13px] font-semibold text-[#0F1B2D] bg-[#F5F6FA] rounded-xl px-3 py-2.5 no-underline hover:bg-[#E5E8F0] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0F1B2D"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      X (Twitter)
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={() => onNavigate?.('jobs')}
                className="w-full py-3.5 bg-[#4B6BF5] text-white text-[14px] font-bold rounded-xl border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-97 transition-all duration-150"
              >
                View Open Roles ({company.openRoles})
              </button>
            </div>

          </div>
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </>
  )
}





