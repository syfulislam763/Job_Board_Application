'use client'

export default function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  
  
    return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.78rem] font-semibold text-[#1a1a3e] flex items-center gap-1">
        {label}{required && <span className="text-[#4640DE]">*</span>}
      </label>
      {children}
      {hint && <p className="text-[0.7rem] text-gray-400">{hint}</p>}
    </div>
  )

  
}