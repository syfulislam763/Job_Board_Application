'use server';



export async function getAllJobs(query:string | null) {
  const url = query ? `${process.env.API_URL}/jobs/?${query}`: `${process.env.API_URL}/jobs/`
  const res = await fetch(url, {
    method:'GET',
    next: { tags: ["jobs"] },    
  })
  if (!res.ok) return []
  return res.json()
}

export async function getJobDetails(id:string) {
  const res = await fetch(`${process.env.API_URL}/jobs/${id}`, {
    method:'GET',
    next: { tags: ["jobs"] },    
  })
  if (!res.ok) return []
  return res.json()
}