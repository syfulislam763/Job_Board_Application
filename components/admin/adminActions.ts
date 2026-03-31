// actions/adminActions.ts
"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const API = process.env.API_URL

async function getToken() {
  return (await cookies()).get("token")?.value ?? ""
}

export async function createCompanyAction(data: any) {
  const token  = await getToken();

  const res = await fetch(`${API}/companies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  revalidateTag("company", "default") 
  return res.json()
}

export async function updateCompanyAction(data: any, id:string) {
  const res = await fetch(`${API}/companies/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  revalidateTag("company",  "default")  
  return res.json()
}

export async function createJobAction(data: any) {
  const res = await fetch(`${API}/jobs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  revalidateTag("jobs",  "default")  
  return res.json()  
}

export async function updateJobAction(id: string, data: any) {
  const res = await fetch(`${API}/jobs/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  revalidateTag("jobs",  "default");
  return res.json()
}

export async function deleteJobAction(id: string) {
  const res = await fetch(`${API}/jobs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${await getToken()}` },
  })
  revalidateTag("jobs",  "default");
  return res.json()
}