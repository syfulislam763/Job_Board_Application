"use client"

import Image from "next/image"
import AnimateIn from "@/components/AnimateIn"

const VODAFONE_SRC = "/img/vodafone-2017-logo.png"
const INTEL_SRC   = "/img/intel-3.png"
const TESLA_SRC   = "/img/tesla-91.png"
const AMD_SRC     = "/img/amd-logo-1.png"
const TALKIT_SRC  = "/img/talkit1.png"

const logos = [
  { src: VODAFONE_SRC, alt: "Vodafone", width: 120 },
  { src: INTEL_SRC,   alt: "Intel",    width: 80  },
  { src: TESLA_SRC,   alt: "Tesla",    width: 80 },
  { src: AMD_SRC,     alt: "AMD",      width: 90  },
  { src: TALKIT_SRC,  alt: "Talkit",   width: 90  },
]

export default function CompaniesSection() {
  return (
    <section className="w-full bg-white py-6">
      <div className="mx-auto w-full max-w-full md:max-w-[86%]">

        {/* Label — fades in first */}
        <AnimateIn variant="fadeUp" duration={500} delay={0} className="">
          <p className="text-[0.78rem] text-gray-400 mb-5">
            Companies we helped grow
          </p>
        </AnimateIn>

        {/* Logos row — each logo staggers in individually */}
        <div className="flex items-center justify-start md:justify-between gap-6 flex-wrap md:flex-nowrap">
          {logos.map((logo, i) => (
            <AnimateIn
              key={logo.alt}
              variant="fadeUp"
              duration={500}
              delay={i * 100} 
              className=""
            >
              <div className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={40}
                  className="h-7 md:h-8 w-auto object-contain grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-200"
                />
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}