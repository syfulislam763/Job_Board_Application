import api from "@/lib/axios";




///companies/me

export const adminApi = {
  own_company: (token:string) =>
    api.get("/companies/me", {
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }),

  get_company_jobs: (companyId:string) =>
    api.post(`/jobs/company/${companyId}`),
}