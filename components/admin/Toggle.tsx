'use client'

export default function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  
    return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(!value)}
        className={["relative w-11 h-6 rounded-full transition-colors duration-200", value ? "bg-[#4640DE]" : "bg-gray-200"].join(" ")}>
        <span className={["absolute ml-1 left-0 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200", value ? "translate-x-4" : "translate-x-0"].join(" ")} />
      </button>
      <span className="text-[0.82rem] text-gray-500">{label}</span>
    </div>
  )

  
}