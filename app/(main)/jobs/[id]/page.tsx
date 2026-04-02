import Footer from "@/components/Footer"
import ApplySection from "@/components/jobs/ApplySection"
import { getJobDetails } from "@/components/jobs/jobsAction"
import Link from "next/link"

const TAG_PALETTES = [
  { bg: '#E8F5E9', text: '#2E7D32' },
  { bg: '#EDE7F6', text: '#5E35B1' },
  { bg: '#E3F2FD', text: '#1565C0' },
  { bg: '#FFF3E0', text: '#E65100' },
  { bg: '#FCE4EC', text: '#AD1457' },
  { bg: '#E0F7FA', text: '#00695C' },
]

function renderDescription(text: string) {
  if(!text)return ""
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



export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const job = ( await getJobDetails(id) )

  // console.log("jobs de", JSON.stringify(job, null, 2))
  return (
    <>
      <main className="min-h-screen bg-[#F5F6FA]">

        <div className="bg-white border-b border-[#E5E8F0]">
          <div className="max-w-300 mx-auto px-6 py-4">
            
            <Link href="/jobs"
              className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7589] font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#0F1B2D] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Jobs
            </Link>
          </div>
        </div>

        <div className="max-w-300 mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            <div className="flex flex-col gap-5">

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: job?.company?.color + '18' }}>
                    <span className="font-['Sora',sans-serif] text-[22px] font-extrabold" style={{ color: job?.company?.color }}>{job?.company?.initial}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                      <h1 className="font-['Sora',sans-serif] font-extrabold text-[22px] text-[#0F1B2D]">{job?.title}</h1>
                      <span className="text-[12px] font-semibold text-[#4B6BF5] border border-[#4B6BF5] rounded-lg px-3 py-1 whitespace-nowrap shrink-0">
                        {job?.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[14px] text-[#6B7589] font-medium">
                      <span className="font-semibold text-[#0F1B2D]">{job?.company?.name}</span>
                      <span className="text-[#C8CDD8] text-[10px]">●</span>
                      <span>{job?.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-5">
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#6B7589" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#6B7589" strokeWidth="2"/></svg>
                    {job?.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2v10l4 2" stroke="#6B7589" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="10" stroke="#6B7589" strokeWidth="2"/></svg>
                    {new Date(job?.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#4B6BF5] bg-[#EEF1FF] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2v10l4 2" stroke="#4B6BF5" strokeWidth="2" strokeLinecap="round"/><rect x="2" y="7" width="20" height="14" rx="2" stroke="#4B6BF5" strokeWidth="2"/></svg>
                    {job?.salary}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    {job?.category}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {(job.tags ?? []).map((t:string, i:number) => {
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
              <ApplySection job={job} />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}