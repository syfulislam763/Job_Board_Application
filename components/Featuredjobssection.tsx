"use client"

import Image from "next/image"
import Link from "next/link"
import AnimateIn from "@/components/AnimateIn"


type TagVariant = "marketing" | "design" | "business" | "technology" | "engineering" | "remote"

interface Tag {
  label: string
  variant: TagVariant
}

interface FeaturedJob {
  id: number
  title: string
  company: string
  location: string
  description: string
  logo: string
  logoAlt: string
  logoBg: string
  employmentType: string
  tags: Tag[]
}


const tagStyles: Record<TagVariant, string> = {
  marketing:   "bg-[#fff0e8] text-[#FF8C00]",
  design:      "bg-[#e8f7f3] text-[#2EAD85]",
  business:    "bg-[#eeeeff] text-[#4640DE]",
  technology:  "bg-[#fde8e8] text-[#E05454]",
  engineering: "bg-[#e8f0ff] text-[#3B82F6]",
  remote:      "bg-[#e8f7f3] text-[#2EAD85]",
}


const featuredJobs: FeaturedJob[] = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    logo: "/img/logos/revolut.png",
    logoAlt: "Revolut",
    logoBg: "bg-black",
    employmentType: "Full Time",
    tags: [
      { label: "Marketing", variant: "marketing" },
      { label: "Design",    variant: "design"    },
    ],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    logo: "/img/logos/dropbox.png",
    logoAlt: "Dropbox",
    logoBg: "bg-[#eaf4fd]",
    employmentType: "Full Time",
    tags: [
      { label: "Design",   variant: "design"   },
      { label: "Business", variant: "business" },
    ],
  },
  {
    id: 3,
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    description: "Pitch is looking for Customer Manager to join marketing t ...",
    logo: "/img/logos/pitch.png",
    logoAlt: "Pitch",
    logoBg: "bg-black",
    employmentType: "Full Time",
    tags: [
      { label: "Marketing", variant: "marketing" },
    ],
  },
  {
    id: 4,
    title: "Visual Designer",
    company: "Blinkist",
    location: "Granada, Spain",
    description: "Blinkist is looking for Visual Designer to help team desi ...",
    logo: "/img/logos/blinkist.png",
    logoAlt: "Blinkist",
    logoBg: "bg-[#e8f9f1]",
    employmentType: "Full Time",
    tags: [
      { label: "Design", variant: "design" },
    ],
  },
  {
    id: 5,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    description: "ClassPass is looking for Product Designer to help us ...",
    logo: "/img/logos/classpass.png",
    logoAlt: "ClassPass",
    logoBg: "bg-[#e8f0ff]",
    employmentType: "Full Time",
    tags: [
      { label: "Marketing", variant: "marketing" },
      { label: "Design",    variant: "design"    },
    ],
  },
  {
    id: 6,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    logo: "/img/logos/canva.png",
    logoAlt: "Canva",
    logoBg: "bg-[#e8f9f1]",
    employmentType: "Full Time",
    tags: [
      { label: "Design",   variant: "design"   },
      { label: "Business", variant: "business" },
    ],
  },
  {
    id: 7,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    description: "GoDaddy is looking for Brand Strategist to join the team ...",
    logo: "/img/logos/godaddy.png",
    logoAlt: "GoDaddy",
    logoBg: "bg-[#f5f5f5]",
    employmentType: "Full Time",
    tags: [
      { label: "Marketing", variant: "marketing" },
    ],
  },
  {
    id: 8,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    logo: "/img/logos/twitter.png",
    logoAlt: "Twitter",
    logoBg: "bg-[#e8f4fd]",
    employmentType: "Full Time",
    tags: [
      { label: "Technology", variant: "technology" },
    ],
  },
]


function FeaturedJobCard({ job }: { job: FeaturedJob }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className={[
        "group flex flex-col bg-white border border-gray-200 p-5",
        "hover:border-[#4640DE] ",
        "transition-all duration-200 cursor-pointer h-full",
      ].join(" ")}
    >

      <div className="flex items-start justify-between gap-2 mb-4">
        <div
          className={[
            "w-11 h-11 rounded-lg flex items-center justify-center overflow-hidden shrink-0",
            job.logoBg,
          ].join(" ")}
        >
          <Image
            src={job.logo}
            alt={job.logoAlt}
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        <span className="text-[0.7rem] font-semibold text-[#4640DE] border border-[#4640DE] rounded px-2.5 py-0.75 whitespace-nowrap shrink-0">
          {job.employmentType}
        </span>
      </div>

      <h3 className="font-bold text-[#1a1a3e] text-[0.95rem] leading-snug group-hover:text-[#4640DE] transition-colors mb-1">
        {job.title}
      </h3>

      <p className="text-[0.75rem] text-gray-400 mb-3">
        {job.company}
        <span className="mx-1.5 text-gray-300">•</span>
        {job.location}
      </p>

      <p
        className="text-[0.78rem] text-gray-500 leading-relaxed mb-4 flex-1 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {job.tags.map((tag) => (
          <span
            key={tag.label}
            className={[
              "text-[0.68rem] font-semibold px-3 py-0.75 rounded-full",
              tagStyles[tag.variant],
            ].join(" ")}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </Link>
  )
}


export default function FeaturedJobsSection() {
  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-full md:max-w-[86%]">

        <AnimateIn variant="fadeUp" duration={500} delay={0}>
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h2 className="font-extrabold text-[1.6rem] md:text-[2rem] leading-tight">
              <span className="text-[#1a1a3e]">Featured </span>
              <span className="text-[#26A4FF]">jobs</span>
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

        <div className="hidden md:grid md:grid-cols-4 gap-5">
          {featuredJobs.map((job, i) => (
            <AnimateIn
              key={job.id}
              variant="fadeUp"
              duration={500}
              delay={(i % 4) * 80 + Math.floor(i / 4) * 80}
              className=""
            >
              <FeaturedJobCard job={job} />
            </AnimateIn>
          ))}
        </div>

        <div
          className="md:hidden flex gap-4 overflow-x-auto pb-3 mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
        >
          {featuredJobs.map((job, i) => (
            <AnimateIn
              key={job.id}
              variant="fadeLeft"
              duration={450}
              delay={i * 60}
              className="shrink-0 w-[75vw] max-w-70"
            >
              <FeaturedJobCard job={job} />
            </AnimateIn>
          ))}

          <div className="shrink-0 w-2" aria-hidden="true" />
        </div>

        <AnimateIn variant="fadeUp" duration={400} delay={featuredJobs.length * 60}>
          <div className="mt-6 flex md:hidden">
            <Link
              href="/jobs"
              className="flex items-center gap-2 text-[0.85rem] font-semibold text-[#4640DE] hover:gap-3 transition-all duration-200"
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