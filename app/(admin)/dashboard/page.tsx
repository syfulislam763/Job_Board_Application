// app/(admin)/dashboard/page.tsx
import AdminPanel from "@/components/admin/AdminPanel"
import { cookies } from "next/headers"



const SEED_COMPANY = {
  name: "", industry: "", location: "",
  size: "", founded: "", website: "",
  initial: "", color: "",
  description: "",
  mission: "",
  tags: [],
  perks: [],
}

async function getCompany(token: string) {
  const res = await fetch(`${process.env.API_URL}/companies/me`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ["company"] },  
  })
  if (!res.ok) return SEED_COMPANY
  return res.json()
}

async function getJobs(token: string, id:string) {
  const res = await fetch(`${process.env.API_URL}/jobs/company/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ["jobs"] },    
  })
  if (!res.ok) return []
  return res.json()
}

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value ?? ""
  //console.log(token, "token")
  const company = await getCompany(token);
  let jobs = [];
  if(company){
    jobs = await getJobs(token, company?._id);
  }
  // const [company, jobs] = await Promise.all([
  //   getCompany(token),
  //   getJobs(token),
  // ])

  

  // console.log(company);
  // console.log(jobs)

  return <AdminPanel company={company} jobs={jobs} />
}