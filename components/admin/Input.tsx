'use client'

export default function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {


  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[0.85rem] text-[#1a1a3e] placeholder:text-gray-300 focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 transition-all bg-white" />
  )

  
}