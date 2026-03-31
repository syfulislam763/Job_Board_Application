

"use client"

import { useEffect, useState } from "react"
import Sidebar from "./Sidebar";
import DashboardView from "./DashboardView";
import CompanyFormView from "./CompanyFormView";
import JobFormView from "./JobFormView";
import { adminApi } from "@/services/admin";
import { useJobBoardStore } from "@/hooks/useJobBoardStore";
import { 
    createCompanyAction,
    updateCompanyAction,
    createJobAction,
    updateJobAction,
    deleteJobAction

} from "./adminActions";

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
  _id?: string | undefined
}

interface Job {
  _id: string
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
  companyId?: string
}



const SEED_COMPANY: CompanyProfile = {
  name: "", industry: "", location: "",
  size: "", founded: "", website: "",
  initial: "", color: "",
  description: "",
  mission: "",
  tags: [],
  perks: [],
}

const SEED_JOBS: Job[] = [
  // { id: "j1", title: "Senior Frontend Engineer", location: "Remote", type: "Remote", salary: "$120k – $160k", category: "Development", description: "Build next-gen UIs with React and TypeScript.", tags: ["React", "TypeScript", "Figma"], featured: true,  createdAt: "2025-03-18", status: "active" },
  // { id: "j2", title: "Product Designer",         location: "San Francisco, USA", type: "Full-time", salary: "$90k – $130k",  category: "Design",       description: "Lead design across our core product suite.", tags: ["Figma", "Prototyping", "Design"], featured: false, createdAt: "2025-03-12", status: "active" },
  // { id: "j3", title: "DevOps Engineer",           location: "Remote", type: "Remote", salary: "$110k – $150k", category: "Engineering",  description: "Own our cloud infrastructure and CI/CD pipelines.", tags: ["AWS", "Go", "SQL"], featured: false, createdAt: "2025-03-05", status: "draft"  },
]


export default function AdminPanel({company, jobs}: {company:CompanyProfile,jobs:Job[]}) {
  const [view, setView]         = useState<AdminView>("dashboard");
  const [saved, setSaved] = useState(false)
//   const [company, setCompany]   = useState<CompanyProfile | null>(SEED_COMPANY)
//   const [jobs, setJobs]         = useState<Job[]>(SEED_JOBS)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const access_token = useJobBoardStore((s) => s.auth.token)

  const saveCompany = async (c: CompanyProfile) => {
    // console.log("hello", company);
    // console.log("company", c)
    setSaved(true)
    if(!company?.name){
      const res = await createCompanyAction(c)
      setSaved(false)
    }else{
      if(!company._id)return;
      const res = await updateCompanyAction(c, company?._id)
      setSaved(false)
    }

    
    setView("dashboard")
  }


 
  //post job from here
  const publishJob = async (data: Omit<Job, "_id" | "createdAt" | "company">) => {
    const payload = {...data, companyId: company?._id}
    if (editingJob) {
      const res = await updateJobAction(editingJob._id, data);
      setEditingJob(null)
      
      console.log("updated job", res)

    } else {
      
        const res = await createJobAction(payload);
        console.log("saved job", res);

    }
    setView("dashboard")
  }

  const deleteJob = async (id: string) => {
    const res = await deleteJobAction(id);
    console.log("job deleted", res);
    //setView("dashboard")

  }

  const editJob = (job: Job) => {
    setEditingJob(job)
    setView("edit-job")
  }

  const statusChange = async (id: string, status: Job["status"], job:Omit<Job, "_id" | "createdAt" | "company">) => {
    const payload = { title: job.title, location: job.location, type: job.type, salary: job.salary, category: job.category, description: job.description, tags: job.tags, featured: job.featured, status: status }


    const res = await updateJobAction(id, payload);
    console.log("status changed", res);
    setView("dashboard")
  }

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
          <CompanyFormView saved={saved} setSaved={setSaved} company={company} onSave={saveCompany} />
        )}
        {(view === "post-job" || view === "edit-job") && (
          <JobFormView company={company} editJob={editingJob}
            onSave={publishJob} onCancel={() => navigate("dashboard")} onNavigate={navigate} />
        )}
      </main>
    </div>
  )
}