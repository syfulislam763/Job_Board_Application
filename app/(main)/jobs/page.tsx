'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer';
import JobDetailPage from '@/components/jobs/JobDetailPage';
import JobCard from '@/components/jobs/JobCard';
import { useRouter } from 'next/navigation';
import { getAllJobs } from '@/components/jobs/jobsAction';

type Page = 'home' | 'jobs' | 'login' | 'signup' | 'companies'

interface JobsPageProps {
  onNavigate?: (page: Page) => void
}


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



export default function JobsPage({ onNavigate }: JobsPageProps) {
  const [keyword, setKeyword] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState('All')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([])
  const router = useRouter()

  const getJobs = async () => {
    const res = await getAllJobs(null);
    setJobs(res?.data ?? [])
    console.log(res, "jobs")
  }

  useEffect(() => {
    getJobs();
  }, [])

  const filtered = jobs.filter((j) => {
    const matchKeyword =
      !keyword ||
      j.title.toLowerCase().includes(keyword.toLowerCase()) ||
      j.company.name.toLowerCase().includes(keyword.toLowerCase()) ||
      j.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase()))
    const matchCategory = activeCategory === 'All' || j.category === activeCategory
    const matchType = activeType === 'All' || j.type === activeType
    return matchKeyword && matchCategory && matchType
  })

  return (
    <>
      <main className="min-h-screen bg-[#F5F6FA]">

        <div className="bg-white border-b border-[#E5E8F0]">
          <div className="max-w-300 mx-auto px-6 py-10">
            <h1 className="font-['Sora',sans-serif] font-extrabold text-[clamp(1.6rem,3vw,2.2rem)] text-[#0F1B2D]">
              Find Your Perfect Job
            </h1>
            <p className="text-[13px] text-[#6B7589] mt-1.5">
              {filtered.length} job{filtered.length !== 1 ? 's' : ''} available
            </p>


            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2.5 px-4 bg-white border-[1.5px] border-[#E5E8F0] rounded-[14px] flex-1 min-w-60 transition-colors focus-within:border-[#4B6BF5]">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <circle cx="11" cy="11" r="8" stroke="#6B7589" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="#6B7589" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search by title, company or skill..."
                  className="w-full py-3.5 bg-transparent border-none outline-none text-[14px] font-medium text-[#0F1B2D] font-['Plus_Jakarta_Sans',sans-serif] placeholder:text-[#6B7589]"
                />
                {keyword && (
                  <button onClick={() => setKeyword('')} className="text-[#6B7589] hover:text-[#0F1B2D] bg-transparent border-none cursor-pointer transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                )}
              </div>
              <button className="bg-[#4B6BF5] text-white text-[14px] font-bold px-6 py-3.5 rounded-[14px] border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-97 transition-all whitespace-nowrap">
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-300 mx-auto px-6 py-8">

          <div className="flex flex-wrap gap-6 mb-7">
            <div>
              <p className="text-[11px] font-bold text-[#6B7589] uppercase tracking-widest mb-2.5">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`text-[13px] font-semibold px-4 py-2 rounded-xl border-[1.5px] cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] transition-all duration-150 ${
                      activeCategory === cat ? 'bg-[#4B6BF5] text-white border-[#4B6BF5]' : 'bg-white text-[#0F1B2D] border-[#E5E8F0] hover:border-[#4B6BF5] hover:text-[#4B6BF5]'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#6B7589] uppercase tracking-widest mb-2.5">Job Type</p>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((type) => (
                  <button key={type} onClick={() => setActiveType(type)}
                    className={`text-[13px] font-semibold px-4 py-2 rounded-xl border-[1.5px] cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] transition-all duration-150 ${
                      activeType === type ? 'bg-[#0F1B2D] text-white border-[#0F1B2D]' : 'bg-white text-[#0F1B2D] border-[#E5E8F0] hover:border-[#0F1B2D] hover:text-[#0F1B2D]'
                    }`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>


          {filtered.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
              {filtered.map((job) => (
                <JobCard key={job._id} job={job} id={job._id.toString()} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl py-16 px-6 text-center">
              <div className="w-14 h-14 bg-[#F5F6FA] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#6B7589" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="#6B7589" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-1.5">No jobs found</div>
              <p className="text-[13px] text-[#6B7589]">Try different keywords or clear your filters.</p>
              <button
                onClick={() => { setKeyword(''); setActiveCategory('All'); setActiveType('All') }}
                className="mt-4 text-[13px] font-bold text-[#4B6BF5] bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#3451D1] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </>
  )
}