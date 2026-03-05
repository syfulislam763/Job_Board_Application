"use client"

import { useState } from "react"
import Image from "next/image"
import Footer from "@/components/Footer"
import LatestJobsSection from "@/components/LatestJobsSection"
import FeaturedJobsSection from "@/components/Featuredjobssection"
import CTASection from "@/components/CTASection"

const SCRATCH_UNDERLINE_SRC = "/img/Vector.png" 
const PATTERN_SRC = "/img/Pattern.png" 
const PERSON_SRC = "/img/Pic.png"     


const PERSON_WIDTH  = "90%"  
const PERSON_BOTTOM = "0"    

export default function HeroSection() {
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("Florence, Italy")

  const popularSearches = ["UI Designer", "UX Researcher", "Android", "Admin"]

  return (
    <main>
      <section className="relative w-full bg-[#f8f8fd] overflow-hidden min-h-85 md:min-h-150">

      
      <div className="pointer-events-none w-full mx-auto md:max-w-full h-full select-none md:block absolute inset-0 z-0">
        <Image
          src={PATTERN_SRC}
          alt=""
          fill
          className="object-contain object-bottom-right"
          priority
        />
      </div>

     
      <div
        className="hidden md:block w-full mx-auto max-w-full absolute top-20 bottom-0 inset-0 z-10 pointer-events-none select-none"
      >
        <Image
          src={PERSON_SRC}
          alt="Job seeker pointing"
          fill
          className="object-contain object-bottom-right"
          priority
        />
      </div>

      
      <div className="relative z-20 mx-auto max-w-full md:max-w-[90%] px-6 py-10  md:py-14 md:mt-20">
        <div className="w-full md:w-[70%]">

          {/* Heading */}
          <h1 className="font-extrabold leading-[1.15] text-[#1a1a3e] text-[2rem] md:text-[2.6rem] lg:text-[3rem]">
            Discover
            <br />
            more than
            <br />
            <span className="text-[#4640DE]">5000+ Jobs</span>
          </h1>

          {/* Scratch underline image */}
          <div className="mt-1 mb-4 w-50 md:w-67.4 h-4 relative">
            <Image
              src={SCRATCH_UNDERLINE_SRC}
              alt=""
              fill
              className="object-contain object-left"
              priority
            />
          </div>

          {/* Subtitle */}
          <p className="text-[0.88rem] md:text-[0.94rem] text-gray-500 leading-relaxed max-w-75">
            Great platform for the job seeker that searching for
            new career heights and passionate about startups.
          </p>

          {/* ── Desktop search bar (pill, single row) ── */}
          <div className="mt-6 hidden md:hidden lg:flex items-center bg-white rounder-1 shadow-md px-5 py-0 w-full h-13.5 relative">

            {/* Job title input */}
            <div className="flex items-center gap-2 w-[38%] min-w-0 pr-3">
              <svg className="w-3.75 h-3.75 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Job title or keyword"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 shrink-0" />

            {/* Location select */}
            <div className="flex items-center gap-1.5 pl-3 pr-1 w-[38%]">
              <svg className="w-3.75 h-3.75 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeWidth="2" />
                <circle cx="12" cy="9" r="2.5" strokeWidth="2" />
              </svg>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer appearance-none w-full"
              >
                <option>Florence, Italy</option>
                <option>Rome, Italy</option>
                <option>Milan, Italy</option>
                <option>New York, USA</option>
              </select>
              <svg className="w-3.25 h-3.25 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Search button — overlaps right edge of pill */}
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#4640DE] hover:bg-[#3530c4] active:bg-[#2d28b0] transition-colors text-white text-sm font-semibold rounded-1 w-[20%] px-5 h-8 shadow-lg whitespace-nowrap cursor-pointer">
              Search my job
            </button>
          </div>

          {/* ── Mobile search bar (stacked card) ── */}
          <div className="mt-6 flex lg:hidden flex-col bg-white rounded-1 shadow-md px-4 py-4 w-full gap-3">

            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Job title or keyword"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeWidth="2" />
                <circle cx="12" cy="9" r="2.5" strokeWidth="2" />
              </svg>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer appearance-none flex-1"
              >
                <option>Florence, Italy</option>
                <option>Rome, Italy</option>
                <option>Milan, Italy</option>
                <option>New York, USA</option>
              </select>
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <button className="w-full bg-[#4640DE] hover:bg-[#3530c4] active:bg-[#2d28b0] transition-colors text-white text-sm font-semibold rounded-1 py-3 shadow-md cursor-pointer">
              Search my job
            </button>
          </div>

          {/* Popular searches */}
          <p className="mt-4 text-[0.75rem] text-gray-500">
            <span className="font-semibold text-gray-600">Popular :</span>{" "}
            {popularSearches.map((term, i) => (
              <span key={term}>
                <button className="hover:text-[#4640DE] transition-colors cursor-pointer">
                  {term}
                </button>
                {i < popularSearches.length - 1 && ", "}
              </span>
            ))}
          </p>

        </div>
      </div>

    </section>


    <CTASection/>
    
    <FeaturedJobsSection/>
    
    
    <LatestJobsSection/>

    <Footer onNavigate={() => {}}/> 






    </main>
  )
}