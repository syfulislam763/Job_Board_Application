"use client"

import { useState } from "react"
import Sidebar from "@/components/admin/Sidebar";
import DashboardView from "@/components/admin/DashboardView";
import CompanyFormView from "@/components/admin/CompanyFormView";
import JobFormView from "@/components/admin/JobFormView";

type AdminView = "dashboard" | "company-setup" | "post-job" | "edit-job"

interface CompanyProfile {
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
}

interface Job {
  id: string
  title: string
  location: string
  type: string
  salary: string
  category: string
  description: string
  tags: string[]
  featured: boolean
  createdAt: string
  status: "active" | "draft" | "closed"
}



const SEED_COMPANY: CompanyProfile = {
  name: "Acme Corp", industry: "Technology", location: "San Francisco, USA",
  size: "500 – 1,000", founded: "2015", website: "acmecorp.com",
  initial: "A", color: "#4640DE",
  description: "Acme Corp builds world-class developer tools used by teams at Fortune 500 companies worldwide.",
  mission: "To make software development faster, simpler, and more delightful for every team on earth.",
  tags: ["SaaS", "B2B", "Cloud", "API"],
  perks: ["Remote Friendly", "Equity / RSUs", "Health Insurance", "L&D Budget", "Unlimited PTO"],
}

const SEED_JOBS: Job[] = [
  { id: "j1", title: "Senior Frontend Engineer", location: "Remote", type: "Remote", salary: "$120k – $160k", category: "Development", description: "Build next-gen UIs with React and TypeScript.", tags: ["React", "TypeScript", "Figma"], featured: true,  createdAt: "2025-03-18", status: "active" },
  { id: "j2", title: "Product Designer",         location: "San Francisco, USA", type: "Full-time", salary: "$90k – $130k",  category: "Design",       description: "Lead design across our core product suite.", tags: ["Figma", "Prototyping", "Design"], featured: false, createdAt: "2025-03-12", status: "active" },
  { id: "j3", title: "DevOps Engineer",           location: "Remote", type: "Remote", salary: "$110k – $150k", category: "Engineering",  description: "Own our cloud infrastructure and CI/CD pipelines.", tags: ["AWS", "Go", "SQL"], featured: false, createdAt: "2025-03-05", status: "draft"  },
]


export default function AdminPanel() {
  const [view, setView]         = useState<AdminView>("dashboard")
  const [company, setCompany]   = useState<CompanyProfile | null>(SEED_COMPANY)
  const [jobs, setJobs]         = useState<Job[]>(SEED_JOBS)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  const saveCompany = (c: CompanyProfile) => {
    setCompany(c)
    setView("dashboard")
  }

  const publishJob = (data: Omit<Job, "id" | "createdAt">) => {
    if (editingJob) {
      setJobs(prev => prev.map(j => j.id === editingJob.id ? { ...editingJob, ...data } : j))
      setEditingJob(null)
    } else {
      const newJob: Job = { ...data, id: `j${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) }
      setJobs(prev => [newJob, ...prev])
    }
    setView("dashboard")
  }

  const deleteJob = (id: string) => setJobs(prev => prev.filter(j => j.id !== id))

  const editJob = (job: Job) => {
    setEditingJob(job)
    setView("edit-job")
  }

  const statusChange = (id: string, status: Job["status"]) =>
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j))

  const navigate = (v: AdminView) => {
    if (v !== "edit-job") setEditingJob(null)
    setView(v)
  }

  return (
    <div className="flex min-h-screen bg-[#f7f7fc]">
      <Sidebar view={view} onNavigate={navigate} company={company} jobCount={jobs.length} />

      <main className="flex-1 overflow-y-auto">
        {(view === "dashboard") && (
          <DashboardView company={company} jobs={jobs} onNavigate={navigate}
            onDeleteJob={deleteJob} onEditJob={editJob} onStatusChange={statusChange} />
        )}
        {(view === "company-setup") && (
          <CompanyFormView company={company} onSave={saveCompany} />
        )}
        {(view === "post-job" || view === "edit-job") && (
          <JobFormView company={company} editJob={editingJob}
            onSave={publishJob} onCancel={() => navigate("dashboard")} />
        )}
      </main>
    </div>
  )
}