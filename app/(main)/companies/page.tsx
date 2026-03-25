'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'

// ─── Types ────────────────────────────────────────────────────
type Page = 'home' | 'jobs' | 'login' | 'signup' | 'companies'

interface CompaniesPageProps {
  onNavigate?: (page: Page) => void
}

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

// ─── Data ─────────────────────────────────────────────────────
const COMPANIES: Company[] = [
  {
    id: 1,
    name: 'Spotify',
    industry: 'Music & Entertainment',
    location: 'Stockholm, Sweden',
    size: '5,000 – 10,000',
    founded: '2006',
    website: 'spotify.com',
    initial: 'S',
    color: '#1DB954',
    openRoles: 12,
    tags: ['Music', 'Streaming', 'B2C', 'Mobile'],
    perks: ['Free Premium', 'Remote Friendly', 'Equity', 'Health Insurance', 'L&D Budget'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Spotify is the world's most popular audio streaming subscription service with more than 600 million users, including 236 million subscribers, across 184 markets. We are committed to unlocking the potential of human creativity—by giving a million creative artists the opportunity to live off their art and billions of fans the opportunity to enjoy and be inspired by it.`,
    mission: 'To unlock the potential of human creativity by giving a million creative artists the opportunity to live off their art.',
  },
  {
    id: 2,
    name: 'Airbnb',
    industry: 'Travel & Hospitality',
    location: 'San Francisco, USA',
    size: '6,000 – 8,000',
    founded: '2008',
    website: 'airbnb.com',
    initial: 'A',
    color: '#FF5A5F',
    openRoles: 8,
    tags: ['Travel', 'Marketplace', 'B2C', 'Platform'],
    perks: ['Travel Credits', 'Remote First', 'Equity', 'Wellness Budget', 'Flexible PTO'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Airbnb was born in 2007 when two hosts welcomed three guests to their San Francisco home, and has since grown to over 4 million hosts who have welcomed over 1.5 billion guest arrivals in almost every country across the globe. Every day, hosts offer unique stays and activities that make it possible for guests to experience the world in a more authentic, connected way.`,
    mission: 'To create a world where anyone can belong anywhere, providing healthy travel that is local, authentic, diverse, inclusive and sustainable.',
  },
  {
    id: 3,
    name: 'Google',
    industry: 'Technology',
    location: 'Mountain View, USA',
    size: '100,000+',
    founded: '1998',
    website: 'google.com',
    initial: 'G',
    color: '#4285F4',
    openRoles: 47,
    tags: ['Search', 'Cloud', 'AI', 'Advertising'],
    perks: ['Free Meals', 'On-Campus Gyms', 'RSUs', '20% Time', 'Relocation'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics. Google's mission is to organize the world's information and make it universally accessible and useful.`,
    mission: 'To organize the world\'s information and make it universally accessible and useful.',
  },
  {
    id: 4,
    name: 'Meta',
    industry: 'Social Media & Technology',
    location: 'Menlo Park, USA',
    size: '70,000+',
    founded: '2004',
    website: 'meta.com',
    initial: 'M',
    color: '#0866FF',
    openRoles: 31,
    tags: ['Social', 'AR/VR', 'Advertising', 'AI'],
    perks: ['Free Meals', 'Transportation', 'RSUs', 'Family Planning', 'Parental Leave'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Meta builds technologies that help people connect, find communities and grow businesses. When Facebook launched in 2004, it changed the way people connect. Apps like Messenger, Instagram and WhatsApp further empowered billions around the world. Now, Meta is moving beyond 2D screens toward immersive experiences like augmented and virtual reality.`,
    mission: 'To give people the power to build community and bring the world closer together.',
  },
  {
    id: 5,
    name: 'Apple',
    industry: 'Consumer Electronics',
    location: 'Cupertino, USA',
    size: '160,000+',
    founded: '1976',
    website: 'apple.com',
    initial: 'A',
    color: '#555555',
    openRoles: 19,
    tags: ['Hardware', 'Software', 'Design', 'Privacy'],
    perks: ['Product Discounts', 'Education', 'Health Programs', 'ESPP', 'Commuter Benefits'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the world's largest technology company by revenue and one of the world's most valuable companies. Apple designs, develops, and sells consumer electronics, computer software, and online services with a reputation for premium design and deep integration between hardware and software.`,
    mission: 'To bring the best user experience to customers through innovative hardware, software, and services.',
  },
  {
    id: 6,
    name: 'Stripe',
    industry: 'Fintech',
    location: 'San Francisco, USA',
    size: '7,000 – 8,000',
    founded: '2010',
    website: 'stripe.com',
    initial: 'S',
    color: '#635BFF',
    openRoles: 14,
    tags: ['Payments', 'API', 'B2B', 'Infrastructure'],
    perks: ['Remote First', 'Equity', 'Co-Working Stipend', 'Annual Retreat', 'Health Benefits'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world's largest enterprises to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities. Our mission is to increase the GDP of the internet.`,
    mission: 'To increase the GDP of the internet by building economic infrastructure for the internet.',
  },
  {
    id: 7,
    name: 'HubSpot',
    industry: 'Marketing Software',
    location: 'Cambridge, USA',
    size: '7,000 – 9,000',
    founded: '2006',
    website: 'hubspot.com',
    initial: 'H',
    color: '#FF7A59',
    openRoles: 9,
    tags: ['CRM', 'Marketing', 'SaaS', 'B2B'],
    perks: ['Unlimited PTO', 'Remote Flex', 'Conference Budget', 'Wellness', 'ESPP'],
    socials: { linkedin: '#', twitter: '#' },
    description: `HubSpot is a leading CRM platform that provides software and support to help businesses grow better. Our platform includes marketing, sales, service, and website management products that start free and scale to meet your needs at any stage of growth. HubSpot also has a community of over 200,000 certified professionals globally.`,
    mission: 'To help millions of organizations grow better.',
  },
  {
    id: 8,
    name: 'Netflix',
    industry: 'Streaming & Entertainment',
    location: 'Los Gatos, USA',
    size: '12,000 – 15,000',
    founded: '1997',
    website: 'netflix.com',
    initial: 'N',
    color: '#E50914',
    openRoles: 22,
    tags: ['Streaming', 'Content', 'B2C', 'AI'],
    perks: ['Unlimited PTO', 'Free Netflix', 'Top Pay', 'Remote Access', 'Health Benefits'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Netflix is one of the world's leading entertainment services with 270 million paid memberships in over 190 countries enjoying TV series, films and games across a wide variety of genres and languages. Members can play, pause and resume watching as much as they want, anytime, anywhere, and can change their plans at any time.`,
    mission: 'To entertain the world — to delight and engage our members with the best possible entertainment experience.',
  },
  {
    id: 9,
    name: 'Notion',
    industry: 'Productivity Software',
    location: 'San Francisco, USA',
    size: '500 – 1,000',
    founded: '2016',
    website: 'notion.so',
    initial: 'N',
    color: '#000000',
    openRoles: 6,
    tags: ['Productivity', 'SaaS', 'B2B', 'Collaboration'],
    perks: ['Remote First', 'Equity', 'L&D Budget', 'Home Office', 'Health Benefits'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Notion is the connected workspace where better, faster work happens. Today's teams use Notion as an all-in-one place to write, plan, collaborate and organize — with AI at the center of it all. Notion combines the power of a note-taking app, project management tool, and wiki into one flexible workspace.`,
    mission: 'To make toolmaking ubiquitous — to give everyone the tools to build the tools that work for them.',
  },
  {
    id: 10,
    name: 'Figma',
    industry: 'Design Tools',
    location: 'San Francisco, USA',
    size: '1,000 – 2,000',
    founded: '2012',
    website: 'figma.com',
    initial: 'F',
    color: '#A259FF',
    openRoles: 11,
    tags: ['Design', 'SaaS', 'Collaboration', 'B2B'],
    perks: ['Equity', 'Remote Flex', 'Design Budget', 'Health Insurance', 'Parental Leave'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications for macOS and Windows. The feature set of Figma focuses on use in user interface and user experience design, with an emphasis on real-time collaboration, utilising a variety of vector graphics editor and prototyping tools.`,
    mission: 'To make design accessible to everyone and help teams build better products, together.',
  },
  {
    id: 11,
    name: 'Vercel',
    industry: 'Cloud Infrastructure',
    location: 'San Francisco, USA',
    size: '500 – 1,000',
    founded: '2015',
    website: 'vercel.com',
    initial: 'V',
    color: '#000000',
    openRoles: 7,
    tags: ['Cloud', 'DevTools', 'Frontend', 'Infrastructure'],
    perks: ['Remote First', 'Equity', 'Tech Stipend', 'Flexible Hours', 'Health Benefits'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration. Vercel enables teams to iterate quickly and develop, preview, and ship delightful user experiences, where performance is the default.`,
    mission: 'To enable frontend teams to do their best work — building and iterating on web experiences without configuration or infrastructure concerns.',
  },
  {
    id: 12,
    name: 'Linear',
    industry: 'Project Management',
    location: 'Remote',
    size: '50 – 200',
    founded: '2019',
    website: 'linear.app',
    initial: 'L',
    color: '#5E6AD2',
    openRoles: 4,
    tags: ['Productivity', 'SaaS', 'Developer Tools', 'B2B'],
    perks: ['Fully Remote', 'Equity', 'Async Culture', 'Top Equipment', 'Health Benefits'],
    socials: { linkedin: '#', twitter: '#' },
    description: `Linear is a purpose-built tool for planning and building products. It's used by some of the world's best product teams to manage and streamline software projects, issues, and roadmaps. Linear is built for speed with a focus on keyboard shortcuts and a minimal, refined interface that stays out of your way.`,
    mission: 'To bring back a sense of craft, speed, and purpose to software development.',
  },
]

const INDUSTRIES = ['All', 'Technology', 'Fintech', 'Design Tools', 'Streaming & Entertainment', 'Social Media & Technology', 'Productivity Software', 'Marketing Software', 'Travel & Hospitality', 'Music & Entertainment', 'Consumer Electronics', 'Cloud Infrastructure', 'Project Management']

const TAG_PALETTES = [
  { bg: '#E8F5E9', text: '#2E7D32' },
  { bg: '#EDE7F6', text: '#5E35B1' },
  { bg: '#E3F2FD', text: '#1565C0' },
  { bg: '#FFF3E0', text: '#E65100' },
  { bg: '#FCE4EC', text: '#AD1457' },
  { bg: '#E0F7FA', text: '#00695C' },
]

// ─── Company Card ─────────────────────────────────────────────
function CompanyCard({ company, onClick }: { company: Company; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-left w-full transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-[#C7D2FE] cursor-pointer"
    >
      {/* Logo + Open Roles badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: company.color + '18' }}>
          <span className="font-['Sora',sans-serif] text-[20px] font-extrabold" style={{ color: company.color }}>{company.initial}</span>
        </div>
        <span className="text-[11px] font-semibold text-[#4B6BF5] border border-[#4B6BF5] rounded-lg px-2.5 py-1 whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif]">
          {company.openRoles} open roles
        </span>
      </div>

      {/* Name + Industry */}
      <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] text-[#0F1B2D] mb-0.5">{company.name}</div>
      <div className="text-[12px] text-[#4B6BF5] font-semibold mb-2">{company.industry}</div>

      {/* Location + Size */}
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

      {/* Description snippet */}
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

// ─── Company Detail Page ──────────────────────────────────────
function CompanyDetailPage({ company, onBack, onNavigate }: { company: Company; onBack: () => void; onNavigate?: (page: Page) => void }) {
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

            {/* ── RIGHT: Sidebar ── */}
            <div className="sticky top-24 flex flex-col gap-4">

              {/* Quick Stats */}
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

              {/* Social Links */}
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

              {/* CTA */}
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

// ─── Companies Page (main) ────────────────────────────────────
export default function CompaniesPage({ onNavigate }: CompaniesPageProps) {
  const [keyword, setKeyword] = useState('')
  const [activeIndustry, setActiveIndustry] = useState('All')
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  if (selectedCompany) {
    return (
      <CompanyDetailPage
        company={selectedCompany}
        onBack={() => setSelectedCompany(null)}
        onNavigate={onNavigate}
      />
    )
  }

  const filtered = COMPANIES.filter((c) => {
    const matchKeyword =
      !keyword ||
      c.name.toLowerCase().includes(keyword.toLowerCase()) ||
      c.industry.toLowerCase().includes(keyword.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase()))
    const matchIndustry = activeIndustry === 'All' || c.industry === activeIndustry
    return matchKeyword && matchIndustry
  })

  // Unique industries from data
  const industries = ['All', ...Array.from(new Set(COMPANIES.map((c) => c.industry)))]

  return (
    <>
      <main className="min-h-screen bg-[#F5F6FA]">

        {/* Page Header */}
        <div className="bg-white border-b border-[#E5E8F0]">
          <div className="max-w-300 mx-auto px-6 py-10">
            <h1 className="font-['Sora',sans-serif] font-extrabold text-[clamp(1.6rem,3vw,2.2rem)] text-[#0F1B2D]">
              Browse Companies
            </h1>
            <p className="text-[13px] text-[#6B7589] mt-1.5">
              {filtered.length} compan{filtered.length !== 1 ? 'ies' : 'y'} hiring now
            </p>

            {/* Search */}
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
                  placeholder="Search by company name, industry or tag..."
                  className="w-full py-3.5 bg-transparent border-none outline-none text-[14px] font-medium text-[#0F1B2D] font-['Plus_Jakarta_Sans',sans-serif] placeholder:text-[#6B7589]"
                />
                {keyword && (
                  <button onClick={() => setKeyword('')} className="text-[#6B7589] hover:text-[#0F1B2D] bg-transparent border-none cursor-pointer transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-300 mx-auto px-6 py-8">

          {/* Industry Filter */}
          <div className="mb-7">
            <p className="text-[11px] font-bold text-[#6B7589] uppercase tracking-widest mb-2.5">Industry</p>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`text-[13px] font-semibold px-4 py-2 rounded-xl border-[1.5px] cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] transition-all duration-150 ${
                    activeIndustry === ind
                      ? 'bg-[#4B6BF5] text-white border-[#4B6BF5]'
                      : 'bg-white text-[#0F1B2D] border-[#E5E8F0] hover:border-[#4B6BF5] hover:text-[#4B6BF5]'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
              {filtered.map((company) => (
                <CompanyCard key={company.id} company={company} onClick={() => setSelectedCompany(company)} />
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
              <div className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-1.5">No companies found</div>
              <p className="text-[13px] text-[#6B7589]">Try a different keyword or industry filter.</p>
              <button
                onClick={() => { setKeyword(''); setActiveIndustry('All') }}
                className="mt-4 text-[13px] font-bold text-[#4B6BF5] bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#3451D1] transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </>
  )
}