"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"

type AnimationVariant =
  | "fadeUp"      
  | "fadeDown"    
  | "fadeLeft"   
  | "fadeIn"  
  | "scaleUp" 
  | "fadeRight" 
const hiddenClasses: Record<AnimationVariant, string> = {
  fadeUp:    "opacity-0 translate-y-10",
  fadeDown:  "opacity-0 -translate-y-10",
  fadeLeft:  "opacity-0 -translate-x-10",
  fadeRight: "opacity-0 translate-x-10",
  fadeIn:    "opacity-0",
  scaleUp:   "opacity-0 scale-95",
}

const visibleClasses = "opacity-100 translate-y-0 translate-x-0 scale-100"

interface AnimateInProps {
  children: React.ReactNode
  variant?: AnimationVariant
  delay?: number        
  duration?: number     
  className?: string   
  threshold?: number
  rootMargin?: string
}

export default function AnimateIn({
  children,
  variant    = "fadeUp",
  delay      = 0,
  duration   = 600,
  className  = "",
  threshold,
  rootMargin,
}: AnimateInProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, rootMargin, once:false })

  return (
    <div
      ref={ref}
      className={[
        "transition-all ease-out will-change-transform",
        isVisible ? visibleClasses : hiddenClasses[variant],
        className,
      ].join(" ")}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay:    isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  )
}