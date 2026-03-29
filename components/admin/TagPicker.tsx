


export default function TagPicker({ selected, options, onChange, max }: { selected: string[]; options: string[]; onChange: (v: string[]) => void; max?: number }) {
  
    const toggle = (t: string) => {
    if (selected.includes(t)) onChange(selected.filter(x => x !== t))
    else if (!max || selected.length < max) onChange([...selected, t])
  }


  return (
    <div className="flex flex-wrap gap-2">
      {options.map(t => (
        <button key={t} type="button" onClick={() => toggle(t)}
          className={["text-[0.72rem] font-semibold px-3 py-1.5 rounded-full border transition-all duration-150",
            selected.includes(t) ? "bg-[#4640DE] border-[#4640DE] text-white" : "bg-white border-gray-200 text-gray-500 hover:border-[#4640DE] hover:text-[#4640DE]",
          ].join(" ")}>{t}</button>
      ))}
    </div>
  )

}