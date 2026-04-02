
import Footer from "@/components/Footer"
import JobCard from "@/components/jobs/JobCard"
import { getAllJobs } from "@/components/jobs/jobsAction"
import Link from "next/link"

const CATEGORIES = ['Design', 'Development', 'Engineering', 'Product', 'Marketing']
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

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.toLowerCase() + '_jobs',
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params
   const categoryName = slug.replace('_jobs', '')
  const matched = CATEGORIES.find((c) => c.toLowerCase() === categoryName.toLowerCase());

  if (!matched) return <div className="p-10 text-center text-[#6B7589]">Category not found.
    <Link className="text-blue-500" href={"/"}> Go back</Link>
  </div>
  
  const JOBS: Job[] = (await getAllJobs(null) )?.data ?? [];

  const jobs = JOBS.filter((j) => j.category.toLowerCase() === matched?.toLowerCase())

  return (
    <>
      <main className="min-h-screen bg-[#F5F6FA]">

        <div className="bg-white border-b border-[#E5E8F0]">
          <div className="max-w-300 mx-auto px-6 py-10">
            <Link
              href="/"
              className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7589] font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#0F1B2D] transition-colors mb-5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </Link>

            <h1 className="font-['Sora',sans-serif] font-extrabold text-[clamp(1.6rem,3vw,2.2rem)] text-[#0F1B2D]">
              {matched} Jobs
            </h1>
            <p className="text-[13px] text-[#6B7589] mt-1.5">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} in {matched}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}_jobs`}
                  className={`text-[13px] font-semibold px-4 py-2 rounded-xl border-[1.5px] font-['Plus_Jakarta_Sans',sans-serif] transition-all duration-150 ${
                    cat === matched
                      ? 'bg-[#4B6BF5] text-white border-[#4B6BF5]'
                      : 'bg-white text-[#0F1B2D] border-[#E5E8F0] hover:border-[#4B6BF5] hover:text-[#4B6BF5]'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-300 mx-auto px-6 py-8">
          {jobs.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  id={job._id.toString()}
                  //onClick={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl py-16 px-6 text-center">
              <div className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-1.5">No jobs in this category</div>
              <p className="text-[13px] text-[#6B7589]">Check back later or browse other categories.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}