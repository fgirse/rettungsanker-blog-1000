"use client"

import React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import Logo from "@/public/Assets/Img/LogoAlt.png";
import MarqueeCooperateComp from "./MarqueeCooperateComp";

interface AnimatedLogoProps {
  header1?: string
  header2?: string
}

export default function AnimatedLogo({ header1 = "die", header2 = "kiezkneipe" }: AnimatedLogoProps) {
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
    <div className="mt-2 flex flex-col items-center gap-0">
      <div ref={logoRef} className="relative top-[43vh] w-[90vw] md:top-[25vh] md:w-[44vw] lg:hidden">
        <Image
          src={Logo}
          alt="Rettungsanker Logo"
          width={500}
          height={20}
          className="object-contain"
          priority
        />
      </div>
      <h1
        ref={textRef1}
        className="relative top-[80vh]  headingE text-[38vw] md:top-[60vh] md:text-[30vw] lg:text-[24vw] text-amber-50 text-center tracking-wide lg:top-[20vh] mb-16 lg:mb-12"
      >
        {header1}
      </h1>
      <h1
        ref={textRef2}
        className="relative top-[64vh] md:top-[45vh] lg:top-[-1vh] headingA text-[10vw] md:text-6xl lg:text-[7vw] text-red-700 text-center tracking-wide mb-12"
      >
        {header2}
      </h1>
      <div className="mt-[50vh] md:mt-[33vh] lg:mt-[-16vh] mb-1">
        <MarqueeCooperateComp />
      </div>
    </div>
  )
}
