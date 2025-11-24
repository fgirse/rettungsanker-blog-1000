"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import Logo from "@/public/Assets/Img/LogoNeu.png";

export default function AnimatedLogo() {
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef1 = useRef<HTMLHeadingElement>(null)
  const textRef2 = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Set initial state to invisible
    gsap.set([logoRef.current, textRef1.current, textRef2.current], {
      opacity: 0,
      y: -30,
    })

    // Create timeline for sequential animations
    const tl = gsap.timeline()

    // Animate logo first
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.in",
    })

    // Then animate first text element
    tl.to(
      textRef1.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.in",
      },
      "-=0.6", // Start 0.6s before previous animation ends
    )

    // Finally animate second text element
    tl.to(
      textRef2.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.in",
      },
      "-=0.8", // Start 0.8s before previous animation ends for overlap
    )
  }, [])

  return (
    <div className="flex flex-col items-center gap-8">
      <div ref={logoRef} className="relative top-[-6vh] w-64 h-64 lg:hidden">
        <Image
          src={Logo}
          alt="Rettungsanker Logo"
          width={500}
          className="object-contain"
          priority
        />
      </div>
      <h1
        ref={textRef1}
        className="relative top-[3vh]  headingE text-[38vw] md:text-[30vw] lg:text-[24vw] text-amber-50 text-center tracking-wide lg:top-[-12vh]"
      >
        die
      </h1>
      <h1
        ref={textRef2}
        className="relative top-[-9vh] lg:top-[-33vh] headingA text-[10vw] md:text-7xl lg:text-[7vw] text-amber-700 text-center tracking-wide"
      >
        kiezkneipe
      </h1>
    </div>
  )
}
