import React from 'react'
import AnimatedHero from '@/components/animated-logo';
const Hero = () => {
  return (
    <section className='mt-[-8vh] bg-[url("/Assets/Img/lighthouse.png")] bg-cover bg-no-repeat bg-center lg:mt-0 lg:bg-[url("/Assets/Svg/5555.svg")] lg:bg-contain lg:bg-no-repeat lg:bg-center h-screen w-full flex items-center justify-center'>
      <AnimatedHero />
    </section>
  )
}

export default Hero
