'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'


type Page = 'home' | 'jobs' | 'login' | 'signup' | 'companies'

interface JobsPageProps {
  onNavigate?: (page: Page) => void
}


interface Job {
  id: number
  title: string
  company: string
  location: string
  category: string
  description: string
  created_at: string
  type: string
  salary: string
  tags: string[]
  featured: boolean
  initial: string
  color: string
}

const JOBS: Job[] = [
  {
    id: 1,
    title: 'UI/UX Designer',
    company: 'Spotify',
    location: 'New York, USA',
    type: 'Full-time',
    salary: '$80k – $120k',
    tags: ['Figma', 'Sketch', 'Prototyping'],
    created_at: '2025-02-28',
    featured: true,
    initial: 'S',
    color: '#1DB954',
    category: 'Design',
    description: `Spotify is looking for a talented UI/UX Designer to join our growing product team in New York. You'll work closely with product managers and engineers to craft delightful, intuitive experiences for millions of listeners worldwide.

**Responsibilities:**
- Design end-to-end user experiences for web and mobile platforms
- Create wireframes, prototypes, and high-fidelity mockups
- Conduct user research and usability testing sessions
- Collaborate with cross-functional teams to ship polished product features
- Maintain and evolve our design system

**Requirements:**
- 3+ years of product design experience
- Expert proficiency in Figma and prototyping tools
- Strong portfolio demonstrating end-to-end design thinking
- Experience working in an Agile environment
- Excellent communication and presentation skills

**Benefits:**
- Competitive salary and equity package
- Health, dental and vision insurance
- Flexible remote work options
- Annual learning & development budget
- Free Spotify Premium for life`,
  },
  {
    id: 2,
    title: 'Senior React Developer',
    company: 'Airbnb',
    location: 'Remote',
    type: 'Remote',
    salary: '$100k – $150k',
    tags: ['React', 'TypeScript', 'Node.js'],
    created_at: '2025-03-01',
    featured: true,
    initial: 'A',
    color: '#FF5A5F',
    category: 'Development',
    description: `Airbnb is hiring a Senior React Developer to help build the next generation of our host and guest experiences. This is a fully remote role with high ownership and impact.

**Responsibilities:**
- Build performant, accessible React components at scale
- Lead technical architecture decisions for frontend systems
- Mentor junior developers and conduct code reviews
- Collaborate with designers to implement pixel-perfect interfaces
- Write comprehensive tests and maintain high code quality

**Requirements:**
- 5+ years of frontend development experience
- Deep expertise in React, TypeScript, and modern tooling
- Experience with Node.js and REST/GraphQL APIs
- Strong understanding of web performance and accessibility
- Excellent problem-solving skills

**Benefits:**
- Fully remote, work from anywhere
- Competitive compensation + equity
- $2,000/year travel credits
- Comprehensive health benefits
- Home office stipend`,
  },
  {
    id: 3,
    title: 'Android Developer',
    company: 'Google',
    location: 'Mountain View, USA',
    type: 'Full-time',
    salary: '$120k – $180k',
    tags: ['Kotlin', 'Java', 'Android SDK'],
    created_at: '2025-02-27',
    featured: false,
    initial: 'G',
    color: '#4285F4',
    category: 'Engineering',
    description: `Google is seeking an Android Developer to work on core Android platform features used by billions of people. You'll join a world-class team in Mountain View pushing the boundaries of mobile technology.

**Responsibilities:**
- Develop and maintain high-quality Android applications
- Optimize application performance and memory usage
- Work on Android SDK components and developer-facing APIs
- Collaborate with platform teams across Google
- Contribute to open source Android projects

**Requirements:**
- 4+ years of Android development experience
- Proficiency in Kotlin and Java
- Deep knowledge of Android SDK, Jetpack, and Material Design
- Experience with CI/CD pipelines and testing frameworks
- BS/MS in Computer Science or equivalent

**Benefits:**
- Industry-leading compensation and RSUs
- On-campus perks and amenities
- Comprehensive healthcare coverage
- 20% innovation time
- Relocation assistance provided`,
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'Meta',
    location: 'San Francisco, USA',
    type: 'Full-time',
    salary: '$130k – $200k',
    tags: ['Strategy', 'Analytics', 'Leadership'],
    created_at: '2025-02-25',
    featured: false,
    initial: 'M',
    color: '#0866FF',
    category: 'Product',
    description: `Meta is looking for an experienced Product Manager to drive strategy and execution for key features across our social platforms. You'll have significant impact on products used by billions daily.

**Responsibilities:**
- Define and execute product roadmap aligned with business goals
- Gather and synthesize user feedback and quantitative data
- Partner with engineering, design, and data science teams
- Drive cross-functional alignment on product priorities
- Lead go-to-market planning and execution

**Requirements:**
- 5+ years of product management experience
- Strong analytical and data-driven decision-making skills
- Experience shipping consumer products at scale
- Excellent stakeholder management and communication
- MBA or equivalent experience preferred

**Benefits:**
- Highly competitive salary and RSU package
- Comprehensive medical, dental, and vision
- Free meals and transportation
- Family planning benefits
- Generous parental leave policy`,
  },
  {
    id: 5,
    title: 'UX Researcher',
    company: 'Apple',
    location: 'Cupertino, USA',
    type: 'Full-time',
    salary: '$90k – $130k',
    tags: ['User Testing', 'Interviews', 'Data'],
    created_at: '2025-02-22',
    featured: false,
    initial: 'A',
    color: '#555555',
    category: 'Design',
    description: `Apple is seeking a UX Researcher to uncover deep human insights that shape the future of our products. You'll work in a highly collaborative environment at the intersection of technology and humanity.

**Responsibilities:**
- Plan and conduct qualitative and quantitative research studies
- Interview users and synthesize findings into actionable insights
- Collaborate with designers and PMs to influence product direction
- Develop research frameworks and methodologies
- Present findings to senior leadership

**Requirements:**
- 3+ years of UX research experience
- Proficiency in a range of research methodologies
- Strong analytical and synthesis skills
- Excellent written and verbal communication
- Experience in consumer technology preferred

**Benefits:**
- Apple hardware and software perks
- Comprehensive benefits package
- On-campus wellness programs
- Education reimbursement
- Employee stock purchase program`,
  },
  {
    id: 6,
    title: 'Backend Engineer',
    company: 'Stripe',
    location: 'Remote',
    type: 'Remote',
    salary: '$110k – $160k',
    tags: ['Go', 'PostgreSQL', 'AWS'],
    created_at: '2025-02-26',
    featured: false,
    initial: 'S',
    color: '#635BFF',
    category: 'Development',
    description: `Stripe is hiring a Backend Engineer to help build the financial infrastructure of the internet. Our systems process hundreds of billions of dollars annually, and quality engineering is everything to us.

**Responsibilities:**
- Design and build highly reliable distributed systems
- Own features end-to-end from design to production
- Improve system observability, reliability, and performance
- Collaborate with product teams across Stripe
- Participate in on-call rotations

**Requirements:**
- 4+ years of backend engineering experience
- Strong experience with Go, PostgreSQL, or similar
- Deep understanding of distributed systems and reliability
- Experience with cloud platforms (AWS, GCP)
- Rigorous approach to testing and code quality

**Benefits:**
- Remote-first culture
- Competitive salary and equity
- Annual retreat to meet the team
- $1,000/month co-working stipend
- Comprehensive health and wellness benefits`,
  },
  {
    id: 7,
    title: 'Marketing Manager',
    company: 'HubSpot',
    location: 'Boston, USA',
    type: 'Full-time',
    salary: '$70k – $100k',
    tags: ['SEO', 'Content', 'Analytics'],
    created_at: '2025-03-01',
    featured: false,
    initial: 'H',
    color: '#FF7A59',
    category: 'Marketing',
    description: `HubSpot is looking for a Marketing Manager to lead growth campaigns and content strategy for our inbound platform. You'll help marketers around the world discover and adopt our tools.

**Responsibilities:**
- Develop and execute multi-channel marketing campaigns
- Own SEO strategy and content calendar
- Analyze campaign performance and optimize for ROI
- Collaborate with sales on lead generation initiatives
- Manage agency relationships and creative production

**Requirements:**
- 3+ years of B2B marketing experience
- Strong understanding of SEO and content marketing
- Proficiency in HubSpot (naturally!) and analytics tools
- Data-driven mindset with strong reporting skills
- Excellent project management skills

**Benefits:**
- Unlimited vacation policy
- Flexible work arrangements
- Education and conference budget
- Monthly wellness reimbursement
- Employee stock purchase plan`,
  },
  {
    id: 8,
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Remote',
    type: 'Remote',
    salary: '$130k – $190k',
    tags: ['Python', 'ML', 'SQL'],
    created_at: '2025-02-24',
    featured: false,
    initial: 'N',
    color: '#E50914',
    category: 'Engineering',
    description: `Netflix is seeking a Data Scientist to join our algorithms team and help power the recommendations engine that serves 270+ million members worldwide. Your work will directly influence what people watch next.

**Responsibilities:**
- Build and evaluate machine learning models for content recommendations
- Analyze large-scale datasets to extract actionable insights
- Partner with product and engineering to deploy models at scale
- Conduct A/B experiments and measure impact
- Publish findings internally and at conferences

**Requirements:**
- 4+ years of data science or ML engineering experience
- Proficiency in Python, SQL, and ML frameworks (PyTorch, TensorFlow)
- Experience with large-scale data pipelines
- Strong statistical foundation
- PhD or MS in relevant field preferred

**Benefits:**
- Top-of-market compensation
- Unlimited PTO with expectation of use
- Free Netflix for life
- Remote-first with optional office access
- Best-in-class health benefits`,
  },
]

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


function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-left w-full transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-[#C7D2FE] cursor-pointer"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: job.color + '18' }}>
          <span className="font-['Sora',sans-serif] text-[18px] font-extrabold" style={{ color: job.color }}>{job.initial}</span>
        </div>
        <span className="text-[12px] font-semibold text-[#4B6BF5] border border-[#4B6BF5] rounded-lg px-3 py-1 whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif]">
          {job.type}
        </span>
      </div>
      <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] text-[#0F1B2D] mb-1">{job.title}</div>
      <div className="flex items-center gap-1.5 text-[13px] text-[#6B7589] font-medium mb-3">
        <span>{job.company}</span>
        <span className="text-[#C8CDD8] text-[10px]">●</span>
        <span>{job.location}</span>
      </div>
      <p className="text-[13px] text-[#8E97A8] leading-relaxed mb-4 line-clamp-2">
        {job.description.split('\n')[0]}
      </p>
      <div className="flex flex-wrap gap-2">
        {job.tags.slice(0, 3).map((t, i) => {
          const p = TAG_PALETTES[i % TAG_PALETTES.length]
          return (
            <span key={t} className="text-[12px] font-semibold px-3 py-1 rounded-full whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif]" style={{ background: p.bg, color: p.text }}>
              {t}
            </span>
          )
        })}
      </div>
    </button>
  )
}


function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#0F1B2D] mb-2">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function inputClass(err?: string) {
  return `w-full px-4 py-3 text-[14px] font-medium text-[#0F1B2D] font-['Plus_Jakarta_Sans',sans-serif] placeholder:text-[#9AA5B4] bg-white border rounded-xl outline-none transition-colors ${
    err ? 'border-red-400 focus:border-red-500' : 'border-[#E5E8F0] focus:border-[#4B6BF5]'
  }`
}


function ApplyForm({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', resumeUrl: '', coverNote: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.resumeUrl.trim()) e.resumeUrl = 'Resume URL is required'
    else if (!/^https?:\/\//.test(form.resumeUrl)) e.resumeUrl = 'Must start with http:// or https://'
    if (!form.coverNote.trim()) e.coverNote = 'Cover note is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-['Sora',sans-serif] font-bold text-[18px] text-[#0F1B2D] mb-2">Application Sent!</h3>
        <p className="text-[13px] text-[#6B7589] max-w-72 leading-relaxed mb-6">
          Your application for <strong>{job.title}</strong> at {job.company} has been submitted. We'll be in touch soon.
        </p>
        <button
          onClick={onClose}
          className="bg-[#4B6BF5] text-white text-[14px] font-bold px-8 py-3 rounded-xl border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] transition-colors"
        >
          Back to Job
        </button>
      </div>
    )
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full Name" error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
          className={inputClass(errors.name)}
        />
      </Field>

      <Field label="Email Address" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className={inputClass(errors.email)}
        />
      </Field>

      <Field label="Resume Link (URL)" error={errors.resumeUrl}>
        <input
          type="url"
          value={form.resumeUrl}
          onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
          placeholder="https://drive.google.com/your-resume"
          className={inputClass(errors.resumeUrl)}
        />
      </Field>

      <Field label="Cover Note" error={errors.coverNote}>
        <textarea
          value={form.coverNote}
          onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
          placeholder="Tell us why you're a great fit for this role..."
          rows={4}
          className={`${inputClass(errors.coverNote)} resize-none`}
        />
      </Field>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 text-[14px] font-bold text-[#0F1B2D] bg-transparent border-[1.5px] border-[#E5E8F0] rounded-xl cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:border-[#0F1B2D] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-3 text-[14px] font-bold text-white bg-[#4B6BF5] border-none rounded-xl cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-97 transition-all"
        >
          Submit Application
        </button>
      </div>
    </form>
  )
}

function JobDetailPage({
  job,
  onBack,
  onNavigate,
}: {
  job: Job
  onBack: () => void
  onNavigate?: (page: Page) => void
}) {
  const [showApplyForm, setShowApplyForm] = useState(false)

  const renderDescription = (text: string) => {
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

  return (
    <>
      <main className="min-h-screen bg-[#F5F6FA]">

        <div className="bg-white border-b border-[#E5E8F0]">
          <div className="max-w-300 mx-auto px-6 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[13px] font-semibold text-[#6B7589] bg-transparent border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#0F1B2D] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Jobs
            </button>
          </div>
        </div>

        <div className="max-w-300 mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            <div className="flex flex-col gap-5">

              {/* Header Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: job.color + '18' }}>
                    <span className="font-['Sora',sans-serif] text-[22px] font-extrabold" style={{ color: job.color }}>{job.initial}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                      <h1 className="font-['Sora',sans-serif] font-extrabold text-[22px] text-[#0F1B2D]">{job.title}</h1>
                      <span className="text-[12px] font-semibold text-[#4B6BF5] border border-[#4B6BF5] rounded-lg px-3 py-1 whitespace-nowrap shrink-0">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[14px] text-[#6B7589] font-medium">
                      <span className="font-semibold text-[#0F1B2D]">{job.company}</span>
                      <span className="text-[#C8CDD8] text-[10px]">●</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-5">
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#6B7589" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="#6B7589" strokeWidth="2"/></svg>
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2v10l4 2" stroke="#6B7589" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="10" stroke="#6B7589" strokeWidth="2"/></svg>
                    {new Date(job.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#4B6BF5] bg-[#EEF1FF] px-3 py-1.5 rounded-lg">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2v10l4 2" stroke="#4B6BF5" strokeWidth="2" strokeLinecap="round"/><rect x="2" y="7" width="20" height="14" rx="2" stroke="#4B6BF5" strokeWidth="2"/></svg>
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7589] bg-[#F5F6FA] px-3 py-1.5 rounded-lg">
                    {job.category}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags.map((t, i) => {
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
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
                {!showApplyForm ? (
                  <>
                    <h2 className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D] mb-1.5">
                      Interested in this role?
                    </h2>
                    <p className="text-[13px] text-[#6B7589] leading-relaxed mb-5">
                      Submit your application in minutes. The {job.company} team reviews all applications within 5 business days.
                    </p>

                    {/* Company quick info */}
                    <div className="bg-[#F8F9FF] rounded-xl p-4 mb-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: job.color + '18' }}>
                          <span className="font-['Sora',sans-serif] text-[14px] font-extrabold" style={{ color: job.color }}>{job.initial}</span>
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-[#0F1B2D]">{job.company}</div>
                          <div className="text-[11px] text-[#6B7589]">{job.location}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Salary', value: job.salary },
                          { label: 'Type', value: job.type },
                          { label: 'Category', value: job.category },
                          { label: 'Posted', value: new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="text-[10px] font-bold text-[#9AA5B4] uppercase tracking-wide">{item.label}</div>
                            <div className="text-[12px] font-semibold text-[#0F1B2D] mt-0.5">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowApplyForm(true)}
                      className="w-full py-3.5 bg-[#4B6BF5] text-white text-[14px] font-bold rounded-xl border-none cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] hover:bg-[#3451D1] active:scale-97 transition-all duration-150"
                    >
                      Apply Now
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-['Sora',sans-serif] font-bold text-[16px] text-[#0F1B2D]">Apply for this role</h2>
                      <button
                        onClick={() => setShowApplyForm(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F5F6FA] border-none cursor-pointer text-[#6B7589] hover:bg-[#E5E8F0] transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                    <ApplyForm job={job} onClose={() => setShowApplyForm(false)} />
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </>
  )
}


export default function JobsPage({ onNavigate }: JobsPageProps) {
  const [keyword, setKeyword] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState('All')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // If a job is selected, show the detail page
  if (selectedJob) {
    return (
      <JobDetailPage
        job={selectedJob}
        onBack={() => setSelectedJob(null)}
        onNavigate={onNavigate}
      />
    )
  }

  const filtered = JOBS.filter((j) => {
    const matchKeyword =
      !keyword ||
      j.title.toLowerCase().includes(keyword.toLowerCase()) ||
      j.company.toLowerCase().includes(keyword.toLowerCase()) ||
      j.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase()))
    const matchCategory = activeCategory === 'All' || j.category === activeCategory
    const matchType = activeType === 'All' || j.type === activeType
    return matchKeyword && matchCategory && matchType
  })

  return (
    <>
      <main className="min-h-screen bg-[#F5F6FA]">

        {/* ── Page Header ── */}
        <div className="bg-white border-b border-[#E5E8F0]">
          <div className="max-w-300 mx-auto px-6 py-10">
            <h1 className="font-['Sora',sans-serif] font-extrabold text-[clamp(1.6rem,3vw,2.2rem)] text-[#0F1B2D]">
              Find Your Perfect Job
            </h1>
            <p className="text-[13px] text-[#6B7589] mt-1.5">
              {filtered.length} job{filtered.length !== 1 ? 's' : ''} available
            </p>

            {/* Search Bar */}
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

          {/* ── Filters ── */}
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

          {/* ── Results Grid ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
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