"use client"

import { useState } from "react"
import Link from "next/link";
import { Trash2, X, Menu } from "lucide-react";
import { useJobBoardStore } from "@/hooks/useJobBoardStore";
import { useRouter } from "next/navigation";

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

const navItems = [
  {
    key: "dashboard" as AdminView, label: "Dashboard", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    )
  },
  {
    key: "company-setup" as AdminView, label: "Company Profile", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    )
  },
  {
    key: "post-job" as AdminView, label: "Post a Job", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    )
  },
]

function SidebarContent({ view, onNavigate, company, jobCount, onClose }: {
  view: AdminView
  onNavigate: (v: AdminView) => void
  company: CompanyProfile | null
  jobCount: number
  onClose?: () => void
}) {
  const logout = useJobBoardStore((s) => s.logout);
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 cursor-pointer py-5 border-b border-gray-100 flex items-center gap-3">
        <Link href={"/"} className="flex items-center gap-3">
        
          <div className="w-8 h-8 rounded-lg bg-[#4640DE] flex items-center justify-center">
            <img
              src="/img/icon.png"
              alt="QuickHire logo"
              className="w-8 h-8 rounded-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="flex-1">
            <p className="font-extrabold text-[#1a1a3e] text-[0.88rem] leading-none">QuickHire</p>
            <p className="text-[0.62rem] text-gray-400 font-medium leading-none mt-0.5">Admin Panel</p>
          </div>
        
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors md:hidden"
          >
            <X size={30} />
          </button>
        )}
      </div>

      {company?.name && (
        <div className="mx-4 my-4 p-3 rounded-xl bg-[#f7f7fc] flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-base shrink-0"
            style={{ backgroundColor: company.color }}
          >
            {company.initial}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#1a1a3e] text-[0.8rem] truncate">{company.name}</p>
            <p className="text-[0.65rem] text-gray-400 truncate">{jobCount} job{jobCount !== 1 ? "s" : ""} posted</p>
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => {
              onNavigate(item.key)
              onClose?.()
            }}
            className={[
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.82rem] font-semibold transition-all duration-150",
              view === item.key ? "bg-[#4640DE] text-white" : "text-gray-500 hover:bg-gray-50 hover:text-[#1a1a3e]",
            ].join(" ")}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div
        onClick={() => {
          logout()
          router.push("/")
        }}
        className="px-5 py-4 border-t border-gray-100 flex items-center gap-3 hover:bg-amber-100 cursor-pointer"
      >
        <Trash2 color="red" size={20} />
        <div>
          <p className="text-[0.78rem] font-bold text-[#1a1a3e]">Logout</p>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ view, onNavigate, company, jobCount }: {
  view: AdminView
  onNavigate: (v: AdminView) => void
  company: CompanyProfile | null
  jobCount: number
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <aside className="hidden md:flex w-60 shrink-0 bg-white border-r border-gray-100 flex-col h-screen sticky top-0">
        <SidebarContent
          view={view}
          onNavigate={onNavigate}
          company={company}
          jobCount={jobCount}
        />
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-5 left-5 z-50 w-12 h-12 rounded-full bg-[#4640DE] text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={[
          "md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <SidebarContent
          view={view}
          onNavigate={onNavigate}
          company={company}
          jobCount={jobCount}
          onClose={() => setMobileOpen(false)}
        />
      </aside>
    </>
  )
}