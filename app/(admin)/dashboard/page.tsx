"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/admin/Sidebar";
import DashboardView from "@/components/admin/DashboardView";
import CompanyFormView from "@/components/admin/CompanyFormView";
import JobFormView from "@/components/admin/JobFormView";
import { adminApi } from "@/services/admin";
import { useJobBoardStore } from "@/hooks/useJobBoardStore";

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


export default function AdminPanel() {
  const [view, setView]         = useState<AdminView>("dashboard")
  const [company, setCompany]   = useState<CompanyProfile | null>(SEED_COMPANY)
  const [jobs, setJobs]         = useState<Job[]>(SEED_JOBS)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const access_token = useJobBoardStore((s) => s.auth.token)

  //create company from here
  const saveCompany = (c: CompanyProfile) => {
    
    if(company?.name){
      //update company


    }else{
      //new company setup


    }
  
    setCompany(c)
    console.log("company", c)
    //setView("dashboard")
  }


  const fetchAll = async () => {
    if(!access_token)return;


    try{
      const [companyRes] = await Promise.all([adminApi.own_company(access_token)])




    }catch(err:any){
      console.log("err", err.response.data)
    }


  }

  
  const getOwnCompany = async () => {
    if (!access_token) return
    try {
      const res = await adminApi.own_company(access_token)
      console.log(res.data)
    } catch(e: any) {

      console.log("err", e.response)
    }
  }

  useEffect(() => {
    getOwnCompany()
  }, [access_token, view])


  //post job from here
  const publishJob = (data: Omit<Job, "id" | "createdAt">) => {
    if (editingJob) {
      setJobs(prev => prev.map(j => j.id === editingJob.id ? { ...editingJob, ...data } : j))
      setEditingJob(null)


      //update job

    } else {
      const newJob: Job = { ...data, id: `j${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) }
      setJobs(prev => [newJob, ...prev])


      //create new job


    }
    setView("dashboard")
  }

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id))
    //delete job from here
  }

  const editJob = (job: Job) => {

    //update job from here
    setEditingJob(job)
    setView("edit-job")
  }

  const statusChange = (id: string, status: Job["status"]) => {
    //update status of job 
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j))
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
          <CompanyFormView company={company} onSave={saveCompany} />
        )}
        {(view === "post-job" || view === "edit-job") && (
          <JobFormView company={company} editJob={editingJob}
            onSave={publishJob} onCancel={() => navigate("dashboard")} onNavigate={navigate} />
        )}
      </main>
    </div>
  )
}