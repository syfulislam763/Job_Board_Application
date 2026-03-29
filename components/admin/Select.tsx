'use client'

export default function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  
    return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[0.85rem] text-[#1a1a3e] focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 transition-all bg-white appearance-none cursor-pointer">
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
  
}