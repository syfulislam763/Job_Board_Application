"use client"

import Image from "next/image"
import Link from "next/link"
import AnimateIn from "@/components/AnimateIn"


const BG_SRC     = "/img/BG.png"
const JOB_BG_SRC = "/img/job_bg.png"


type TagVariant = "fulltime" | "marketing" | "design" | "engineering" | "remote"

interface Tag {
  label: string
  variant: TagVariant
}

interface Job {
  id: number
  title: string
  company: string
  location: string
  logo: string
  logoAlt: string
  logoBg: string
  tags: Tag[]
}


const tagStyles: Record<TagVariant, string> = {
  fulltime:    "border-[#56CDAD] text-[#56CDAD]",
  marketing:   "border-[#FFB836] text-[#FFB836]",
  design:      "border-[#4640DE] text-[#4640DE]",
  engineering: "border-[#FF6550] text-[#FF6550]",
  remote:      "border-[#56CDAD] text-[#56CDAD]",
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "/img/logos/nomad.png",
    logoAlt: "Nomad",
    logoBg: "bg-[#f0faf6]",
    tags: [
      { label: "Full-Time",  variant: "fulltime"  },
      { label: "Marketing",  variant: "marketing" },
      { label: "Design",     variant: "design"    },
    ],
  },
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    logo: "/img/logos/netlify.png",
    logoAlt: "Netlify",
    logoBg: "bg-[#e8f4fb]",
    tags: [
      { label: "Full-Time",  variant: "fulltime"  },
      { label: "Marketing",  variant: "marketing" },
      { label: "Design",     variant: "design"    },
    ],
  },
  {
    id: 3,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    logo: "/img/logos/dropbox.png",
    logoAlt: "Dropbox",
    logoBg: "bg-[#eaf4fd]",
    tags: [
      { label: "Full-Time",  variant: "fulltime"  },
      { label: "Marketing",  variant: "marketing" },
      { label: "Design",     variant: "design"    },
    ],
  },
  {
    id: 4,
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    logo: "/img/logos/maze.png",
    logoAlt: "Maze",
    logoBg: "bg-[#eef0ff]",
    tags: [
      { label: "Full-Time",  variant: "fulltime"  },
      { label: "Marketing",  variant: "marketing" },
      { label: "Design",     variant: "design"    },
    ],
  },
  {
    id: 5,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    logo: "/img/logos/terraform.png",
    logoAlt: "Terraform",
    logoBg: "bg-[#f0eeff]",
    tags: [
      { label: "Full-Time",  variant: "fulltime"  },
      { label: "Marketing",  variant: "marketing" },
      { label: "Design",     variant: "design"    },
    ],
  },
  {
    id: 6,
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    logo: "/img/logos/udacity.png",
    logoAlt: "Udacity",
    logoBg: "bg-[#eef6ff]",
    tags: [
      { label: "Full-Time",  variant: "fulltime"  },
      { label: "Marketing",  variant: "marketing" },
      { label: "Design",     variant: "design"    },
    ],
  },
  {
    id: 7,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    logo: "/img/logos/packer.png",
    logoAlt: "Packer",
    logoBg: "bg-[#fff1ee]",
    tags: [
      { label: "Full-Time",  variant: "fulltime"  },
      { label: "Marketing",  variant: "marketing" },
      { label: "Design",     variant: "design"    },
    ],
  },
  {
    id: 8,
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    logo: "/img/logos/webflow.png",
    logoAlt: "Webflow",
    logoBg: "bg-[#4353ff]",
    tags: [
      { label: "Full-Time",  variant: "fulltime"  },
      { label: "Marketing",  variant: "marketing" },
      { label: "Design",     variant: "design"    },
    ],
  },
]


function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex flex-row gap-3 bg-white rounded-1 px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 hover:border-[#4640DE] hover:shadow-[0_4px_20px_rgba(70,64,222,0.10)] transition-all duration-200 cursor-pointer"
    >
      {/* Logo */}
      <div className={`w-12 h-12 rounded-xl ${job.logoBg} flex items-center justify-center overflow-hidden shrink-0`}>
        <Image
          src={job.logo}
          alt={job.logoAlt}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>

      <div>
        <div>
          <h3 className="font-bold text-[#1a1a3e] text-[0.97rem] leading-snug group-hover:text-[#4640DE] transition-colors">
            {job.title}
          </h3>
          <p className="text-[0.78rem] text-gray-400 mt-0.5">
            {job.company}
            <span className="mx-1.5 text-gray-300">•</span>
            {job.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-1">
          {job.tags.map((tag) => (
            <span
              key={tag.label}
              className={`text-[0.7rem] font-medium px-3 py-0.75 rounded-full border ${tagStyles[tag.variant]}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}


export default function LatestJobsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">

      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src={BG_SRC}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>


      <div className="absolute top-0 bottom-0 right-0 w-[80%] h-full z-10 pointer-events-none select-none">
        <Image
          src={JOB_BG_SRC}
          alt=""
          fill
          className="object-contain object-bottom-right"
          priority
        />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[88%] lg:max-w-[86%] py-14 md:py-20">

        <AnimateIn variant="fadeUp" duration={500} delay={0}>
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h2 className="font-extrabold text-[1.6rem] md:text-[2rem] leading-tight">
              <span className="text-[#1a1a3e]">Latest </span>
              <span className="text-[#4640DE]">jobs open</span>
            </h2>

            <Link
              href="/jobs"
              className="hidden md:flex items-center gap-2 text-[0.85rem] font-semibold text-[#4640DE] hover:gap-3 transition-all duration-200"
            >
              Show all jobs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {jobs.map((job, i) => (
            <AnimateIn
              key={job.id}
              variant="fadeUp"
              duration={500}
              delay={(i % 2) * 80 + Math.floor(i / 2) * 80}
            >
              <JobCard job={job} />
            </AnimateIn>
          ))}
        </div>


        <AnimateIn variant="fadeUp" duration={400} delay={jobs.length * 60}>
          <div className="mt-8 flex md:hidden justify-center">
            <Link
              href="/jobs"
              className="flex items-center gap-2 text-[0.85rem] font-semibold text-[#4640DE] border border-[#4640DE] rounded-full px-6 py-2.5 hover:bg-[#4640DE] hover:text-white transition-colors duration-200"
            >
              Show all jobs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}