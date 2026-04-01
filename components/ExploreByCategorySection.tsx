"use client"

import Link from "next/link"
import AnimateIn from "@/components/AnimateIn"

interface Category {
  id: number
  label: string
  jobCount: number
  href: string
  featured?: boolean
  icon: React.ReactNode
}

const Icons = {
  Design: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      <path d="M15 5l3 3" />
    </svg>
  ),
  Sales: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="14" />
    </svg>
  ),
  Marketing: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12A10 10 0 0112 22" />
      <path d="M3.4 7A10 10 0 0112 2" />
      <path d="M5 3L3 7l4 2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9V5" />
      <path d="M15 12h4" />
    </svg>
  ),
  Finance: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  Technology: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Engineering: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Business: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  HumanResource: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
}

const categories: Category[] = [
  { id: 1, label: "Design",         jobCount: 235, href: "/category/design_jobs",         icon: Icons.Design        },
  { id: 2, label: "Sales",          jobCount: 756, href: "/category/sales_jobs",          icon: Icons.Sales         },
  { id: 3, label: "Marketing",      jobCount: 140, href: "/category/marketing_jobs",      icon: Icons.Marketing, featured: false },
  { id: 4, label: "Finance",        jobCount: 325, href: "/category/finance_jobs",        icon: Icons.Finance       },
  { id: 5, label: "Technology",     jobCount: 436, href: "/category/technology_jobs",     icon: Icons.Technology    },
  { id: 6, label: "Engineering",    jobCount: 542, href: "/category/engineering_jobs",    icon: Icons.Engineering   },
  { id: 7, label: "Business",       jobCount: 211, href: "/category/business_jobs",       icon: Icons.Business      },
  { id: 8, label: "Human Resource", jobCount: 346, href: "/category/human-resource_jobs", icon: Icons.HumanResource },
]

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function DesktopCard({ cat }: { cat: Category }) {
  const base     = "group relative flex flex-col justify-between p-6 border transition-all duration-200 cursor-pointer h-full"
  const normal   = "border-gray-200 bg-white text-[#1a1a3e] hover:bg-[#4640DE] hover:border-[#4640DE] hover:text-white"
  const featured = "bg-[#4640DE] border-[#4640DE] text-white"
  return (
    <Link href={cat.href} className={[base, cat.featured ? featured : normal].join(" ")}>
      <div className={["w-10 h-10 mb-6 transition-colors duration-200",
        cat.featured ? "text-white" : "text-[#4640DE] group-hover:text-white",
      ].join(" ")}>
        {cat.icon}
      </div>
      <div>
        <h3 className="font-bold text-[1rem] mb-1">{cat.label}</h3>
        <div className="flex items-center gap-2 text-[0.8rem] opacity-80">
          <span>{cat.jobCount} jobs available</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </div>
      </div>
    </Link>
  )
}

function MobileRow({ cat }: { cat: Category }) {
  return (
    <Link href={cat.href} className="group flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 shrink-0 text-[#4640DE] group-hover:text-[#3530c4] transition-colors">
        {cat.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#1a1a3e] text-[0.9rem]">{cat.label}</p>
        <p className="text-[0.75rem] text-gray-400">{cat.jobCount} jobs available</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#4640DE] transition-colors shrink-0" />
    </Link>
  )
}

export default function ExploreByCategorySection() {
  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-full md:max-w-[86%]">

        <AnimateIn variant="fadeUp" duration={500} delay={0} className="">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h2 className="font-extrabold text-[1.6rem] md:text-[2rem] leading-tight">
              <span className="text-[#1a1a3e]">Explore by </span>
              <span className="text-[#26A4FF]">category</span>
            </h2>
            <Link
              href="/jobs"
              className="hidden md:flex items-center gap-2 text-[0.85rem] font-semibold text-[#4640DE] hover:gap-3 transition-all duration-200"
            >
              Show all jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateIn>

        
        <div className="hidden md:grid grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <AnimateIn
              key={cat.id}
              variant="fadeUp"
              duration={500}
              delay={(i % 4) * 80 + Math.floor(i / 4) * 80}
              className=""
            >
              <DesktopCard cat={cat} />
            </AnimateIn>
          ))}
        </div>

        
        <div className="md:hidden flex flex-col px-5">
          {categories.map((cat, i) => (
            <AnimateIn
              key={cat.id}
              variant="fadeLeft"
              duration={450}
              delay={i * 60}
              className=""
            >
              <MobileRow cat={cat} />
            </AnimateIn>
          ))}
        </div>

        <AnimateIn variant="fadeUp" duration={400} delay={categories.length * 60} className="">
          <div className="mt-6 flex md:hidden px-5">
            <Link
              href="/jobs"
              className="flex items-center gap-2 text-[0.85rem] font-semibold text-[#4640DE] hover:gap-3 transition-all duration-200"
            >
              Show all jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}