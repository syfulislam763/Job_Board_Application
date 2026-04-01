
import Footer from "@/components/Footer"
import JobCard from "@/components/jobs/JobCard"
import Link from "next/link"

const CATEGORIES = ['Design', 'Development', 'Engineering', 'Product', 'Marketing']
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

  if (!matched) return <div className="p-10 text-center text-[#6B7589]">Category not found.</div>

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
                  key={job.id}
                  job={job}
                  id={job.id.toString()}
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