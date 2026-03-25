"use client"

import Image from "next/image"
import Link from "next/link"
import AnimateIn from "@/components/AnimateIn"
const BLUE_BG_SRC       = "/img/blue_bg.png"
const DASHBOARD_IMG_SRC = "/img/dashboard_image.png"

const BLUE_BG_WIDTH = "86%"

export default function CTASection() {
  return (
    <section className="relative w-full bg-white overflow-hidden  ">

      <div className="hidden md:block relative">

        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none"
          style={{ width: BLUE_BG_WIDTH }}
        >
          <Image
            src={BLUE_BG_SRC}
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto flex items-center min-h-65 lg:min-h-50 py-10 gap-10"
          style={{ width: BLUE_BG_WIDTH }}
        >

          <div className="w-[40%] shrink-0 flex flex-col gap-5 pl-10 lg:pl-14">
            <AnimateIn variant="fadeUp" duration={500} delay={0}>
              <h2 className="font-extrabold text-white text-[1.8rem] lg:text-[2.2rem] leading-[1.2]">
                Start posting<br />jobs today
              </h2>
            </AnimateIn>
            <AnimateIn variant="fadeUp" duration={500} delay={80}>
              <p className="text-white/80 text-[0.88rem] lg:text-[0.94rem]">
                Start posting jobs for only $10.
              </p>
            </AnimateIn>
            <AnimateIn variant="fadeUp" duration={500} delay={160}>
              <div>
                <Link
                  href="/signup"
                  className="inline-block border-2 border-white text-white font-bold text-[0.85rem] px-8 py-3 rounded-md hover:bg-white hover:text-[#4640DE] transition-colors duration-200 whitespace-nowrap"
                >
                  Sign Up For Free
                </Link>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn variant="fadeLeft" duration={600} delay={200} className="flex-1 flex items-baseline justify-center pt-4 pr-4">
            <Image
              src={DASHBOARD_IMG_SRC}
              alt="QuickHire dashboard"
              width={660}
              height={100}
              className="w-[90%] h-auto object-contain mt-9"
              priority
            />
          </AnimateIn>

        </div>
      </div>

      <div className="md:hidden relative mx-auto rounded-1 overflow-hidden" style={{ width: "92%" }}>
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={BLUE_BG_SRC}
            alt=""
            fill
            className="object-fill h-auto object-center"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 pt-10 pb-0 gap-5 text-center">

          <AnimateIn variant="fadeUp" duration={500} delay={0}>
            <h2 className="font-extrabold text-white text-[1.7rem] leading-[1.2]">
              Start posting jobs<br />today
            </h2>
          </AnimateIn>

          <AnimateIn variant="fadeUp" duration={500} delay={80}>
            <p className="text-white/80 text-[0.88rem]">
              Start posting jobs for only $10.
            </p>
          </AnimateIn>

          <AnimateIn variant="fadeUp" duration={500} delay={160} className="w-full">
            <Link
              href="/signup"
              className="w-full text-center bg-white text-[#4640DE] font-bold text-[0.9rem] px-6 py-3 rounded-md border-2 border-white hover:bg-transparent hover:text-white transition-colors duration-200"
            >
              Sign Up For Free
            </Link>
          </AnimateIn>

          <AnimateIn variant="fadeUp" duration={600} delay={240} className="w-full mt-2">
            <Image
              src={DASHBOARD_IMG_SRC}
              alt="QuickHire dashboard"
              width={720}
              height={460}
              className="w-full h-auto object-contain rounded-tl-lg rounded-tr-lg"
              priority
            />
          </AnimateIn>

        </div>
      </div>

    </section>
  )
}