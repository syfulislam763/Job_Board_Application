'use client'
export default function Textarea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  
  
    return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[0.85rem] text-[#1a1a3e] placeholder:text-gray-300 focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 transition-all bg-white resize-none" />
  )
  
}