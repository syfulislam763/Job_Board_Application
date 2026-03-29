
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export interface CompanyProfile {
  _id: string
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
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Job {
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
  status: 'active' | 'draft' | 'closed'
  company: CompanyProfile | string
  createdBy: string
}

export interface User {
  id: string
  email: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface JobMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}


interface JobBoardStore {
  auth: AuthState

  login: (user: User, token: string) => void
  logout: () => void

  company: {} | any,
  setCompany: (company: any) => void,

  companies: CompanyProfile[]
  selectedCompany: CompanyProfile | null

  setCompanies: (companies: CompanyProfile[]) => void
  addCompany: (company: CompanyProfile) => void
  updateCompany: (id: string, updated: Partial<CompanyProfile>) => void
  removeCompany: (id: string) => void
  setSelectedCompany: (company: CompanyProfile | null) => void

  jobs: Job[]
  selectedJob: Job | null
  jobMeta: JobMeta

  setJobs: (jobs: Job[], meta: JobMeta) => void
  addJob: (job: Job) => void
  updateJob: (id: string, updated: Partial<Job>) => void
  removeJob: (id: string) => void
  setSelectedJob: (job: Job | null) => void


  filters: {
    search: string
    location: string
    category: string
    type: string
    status: string
    page: number
    limit: number
  }

  setFilter: (key: keyof JobBoardStore['filters'], value: string | number) => void
  resetFilters: () => void
}


const defaultAuth: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const defaultFilters = {
  search: '',
  location: '',
  category: '',
  type: '',
  status: 'active',
  page: 1,
  limit: 10,
}

const defaultMeta: JobMeta = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
}


export const useJobBoardStore = create<JobBoardStore>()(
  persist(
    (set) => ({
      auth: defaultAuth,

      login: (user, token) =>
        set({
          auth: {
            user,
            token,
            isAuthenticated: true,
          },
        }),

      logout: () =>
        set({
          auth: defaultAuth,
        }),
      
      company: {},

      setCompany: (company:any) => {
        return set({company})
      },

      companies: [],
      selectedCompany: null,

      setCompanies: (companies) => set({ companies }),

      addCompany: (company) =>
        set((state) => ({
          companies: [company, ...state.companies],
        })),

      updateCompany: (id, updated) =>
        set((state) => ({
          companies: state.companies.map((c) =>
            c._id === id ? { ...c, ...updated } : c,
          ),
          selectedCompany:
            state.selectedCompany?._id === id
              ? { ...state.selectedCompany, ...updated }
              : state.selectedCompany,
        })),

      removeCompany: (id) =>
        set((state) => ({
          companies: state.companies.filter((c) => c._id !== id),
          selectedCompany:
            state.selectedCompany?._id === id ? null : state.selectedCompany,
        })),

      setSelectedCompany: (company) => set({ selectedCompany: company }),

      jobs: [],
      selectedJob: null,
      jobMeta: defaultMeta,

      setJobs: (jobs, meta) => set({ jobs, jobMeta: meta }),

      addJob: (job) =>
        set((state) => ({
          jobs: [job, ...state.jobs],
          jobMeta: {
            ...state.jobMeta,
            total: state.jobMeta.total + 1,
          },
        })),

      updateJob: (id, updated) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j._id === id ? { ...j, ...updated } : j,
          ),
          selectedJob:
            state.selectedJob?._id === id
              ? { ...state.selectedJob, ...updated }
              : state.selectedJob,
        })),

      removeJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j._id !== id),
          selectedJob:
            state.selectedJob?._id === id ? null : state.selectedJob,
          jobMeta: {
            ...state.jobMeta,
            total: Math.max(0, state.jobMeta.total - 1),
          },
        })),

      setSelectedJob: (job) => set({ selectedJob: job }),

      filters: defaultFilters,

      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
            ...(key !== 'page' && { page: 1 }),
          },
        })),

      resetFilters: () => set({ filters: defaultFilters }),
    }),

    {
      name: 'job-board-storage', 
      storage: createJSONStorage(() => localStorage),

    
      partialize: (state) => ({
        auth: state.auth,
        filters: state.filters,
      }),
    },
  ),
)


export const useAuth = () => useJobBoardStore((s) => s.auth)
export const useJobs = () => useJobBoardStore((s) => s.jobs)
export const useJobMeta = () => useJobBoardStore((s) => s.jobMeta)
export const useSelectedJob = () => useJobBoardStore((s) => s.selectedJob)
export const useCompanies = () => useJobBoardStore((s) => s.companies)
export const useSelectedCompany = () => useJobBoardStore((s) => s.selectedCompany)
export const useFilters = () => useJobBoardStore((s) => s.filters)