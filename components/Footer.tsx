'use client'

import Image from 'next/image'
import { useState } from 'react'

type Page = 'home' | 'jobs' | 'login' | 'signup' | 'companies'

interface FooterProps {
  onNavigate?: (page: Page) => void
}

// Maps link labels to their Page route
const NAV_MAP: Record<string, Page> = {
  'Companies': 'companies',
  'Find Jobs': 'jobs',
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  // Renders a nav link — button if navigable, plain <a> otherwise
  const NavLink = ({ label }: { label: string }) => {
    const page = NAV_MAP[label]
    if (page && onNavigate) {
      return (
        <button
          onClick={() => onNavigate(page)}
          className="text-[13px] text-white/45 hover:text-white transition-colors duration-150 bg-transparent border-none cursor-pointer text-left p-0 font-['Plus_Jakarta_Sans',sans-serif]"
        >
          {label}
        </button>
      )
    }
    return (
      <a href="#" className="text-[13px] text-white/45 hover:text-white transition-colors duration-150">
        {label}
      </a>
    )
  }

  return (
    <footer className="bg-[#1C1C2E] text-white items-center justify-center">
      <div className="px-6 sm:px-15 lg:px-25">

        {/* TOP SECTION */}
        <div className="pt-10 pb-8 md:pt-14 md:pb-12">
          <div className="flex flex-col gap-8 md:grid md:grid-cols-[1.6fr_1fr_1fr_1.8fr] md:gap-6 lg:gap-10">

            {/* 1. BRAND */}
            <div>
              <button
                onClick={() => onNavigate?.('home')}
                className="flex items-center gap-2.5 mb-4 bg-transparent border-none cursor-pointer p-0 group"
              >
                <Image src="/img/icon.png" height={16} width={16} alt='' />
                <span
                  className="text-[16px] font-bold text-white tracking-tight group-hover:text-white/80 transition-colors duration-150"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  QuickHire
                </span>
              </button>
              <p className="text-[13px] leading-[1.8] text-white/45 max-w-52.5">
                Great platform for the job seeker that passionate about startups. Find your dream job easier.
              </p>
            </div>

            {/* 2 & 3. LINKS */}
            <div className="grid grid-cols-2 gap-6 md:contents">

              {/* About */}
              <div>
                <h4 className="text-[13.5px] font-bold text-white mb-4 tracking-wide">
                  About
                </h4>
                <ul className="flex flex-col gap-3">
                  {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map((link) => (
                    <li key={link}>
                      <NavLink label={link} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-[13.5px] font-bold text-white mb-4 tracking-wide">
                  Resources
                </h4>
                <ul className="flex flex-col gap-3">
                  {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map((link) => (
                    <li key={link}>
                      <NavLink label={link} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. NEWSLETTER */}
            <div>
              <h4 className="text-[13.5px] font-bold text-white mb-2.5 tracking-wide">
                Get job notifications
              </h4>
              <p className="text-[12.5px] text-white/45 leading-relaxed mb-4">
                The latest job news, articles, sent to your inbox weekly.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-[#4B6BF5] transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="w-full bg-[#4B6BF5] hover:bg-[#3451D1] active:scale-[0.98] text-white text-[13px] font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  {subscribed ? 'Sent ✓' : 'Subscribe'}
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/8" />

        {/* BOTTOM BAR */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/30 order-2 sm:order-1">
            2021 @ QuickHire. All rights reserved.
          </p>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <a href="#" aria-label="Facebook" className="w-8.5 h-8.5 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/35 transition-all duration-200">
              <Image src="/icons/facebook.png" width={15} height={15} alt="Facebook" className="opacity-50 hover:opacity-100 transition-opacity duration-200" />
            </a>
            <a href="#" aria-label="Instagram" className="w-8.5 h-8.5 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/35 transition-all duration-200">
              <Image src="/icons/instagram.png" width={15} height={15} alt="Instagram" className="opacity-50 hover:opacity-100 transition-opacity duration-200" />
            </a>
            <a href="#" aria-label="Website" className="w-8.5 h-8.5 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/35 transition-all duration-200">
              <Image src="/icons/website.png" width={15} height={15} alt="Website" className="opacity-50 hover:opacity-100 transition-opacity duration-200" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-8.5 h-8.5 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/35 transition-all duration-200">
              <Image src="/icons/linkedin.png" width={15} height={15} alt="LinkedIn" className="opacity-50 hover:opacity-100 transition-opacity duration-200" />
            </a>
            <a href="#" aria-label="Twitter" className="w-8.5 h-8.5 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/35 transition-all duration-200">
              <Image src="/icons/twitter.png" width={15} height={15} alt="Twitter" className="opacity-50 hover:opacity-100 transition-opacity duration-200" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}