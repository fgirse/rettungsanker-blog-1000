"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoNeu from '@/public/Assets/Img/LogoNeu.png'
import Bulleye from '@/public/Assets/Svg/Bulleye.svg' 
import { UserButton, useUser } from '@clerk/nextjs'
import Headline from './Headline'

interface MenuebarClientProps {
  userId: string | null;
}

const MenuebarClient = ({ userId }: MenuebarClientProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useUser();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header>
    <nav className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-yellow-900 bg-zinc-900 lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-no-repeat lg:bg-center lg:h-[13vh]">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mx-auto max-w-screen-xl gap-4">
            {/* Logo and Primary Menu */}
            <div className="flex justify-between items-center w-full lg:w-auto">
                <Link href="/" className="flex items-center">
                    <Image src={LogoNeu} width={120} height={90} className="lg:relative lg:right-[10vw] " alt="Rettungsanker-Logo" />
                </Link>
                
                {/* Menu Items - Main Row */}
                <ul className="hidden lg:flex flex-row items-center space-x-4 font-medium">
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70">Start</Link>
                        </div>
                    </li>
                    <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="w-36 uppercase text-2xl inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base px-4 py-2.5 focus:outline-none" type="button">
                                    über uns
  <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
</button>

{/* Dropdown menu */}
<div id="dropdownDelay" className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
    <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDelayButton">
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</a>
      </li>
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Settings</a>
      </li>
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Earnings</a>
      </li>
      <li>
        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</a>
      </li>
    </ul>
</div>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/about" className="block w-28 text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70">über uns</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/drinks" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70">Angebot</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/sportarena" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70">sportarena</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/wohin" className="block w-28  text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70">wohin ?</Link>
                        </div>
                    </li>
                    <li>
                       
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/client" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70">blog</Link>
                        </div>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-100 rounded-lg lg:hidden hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded={isMobileMenuOpen}>
                    <span className="sr-only">Open main menu</span>
                    <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg className={`w-6 h-6 ${isMobileMenuOpen ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>

            {/* Auth Buttons - Right Side */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {!userId ? (
                <>
                  <Link href="/sign-in" className="flex-1 lg:flex-none">
                    <div className="uppercase bg-slate-400 text-center py-1 px-1 text-lg border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">anmelden</div>
                  </Link>
                  <Link href="/sign-up" className="flex-1 lg:flex-none">
                    <div className="uppercase bg-slate-600 text-center py-1 px-1 text-lg border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">registrieren</div>
                  </Link>
                </>
              ) : (
                <>
                <h1 className="px-1 text-xs border rounded text-white lg:text-xs">Hallo {user?.firstName}  !</h1>
                  <Link className=" lg:flex-none" href="/dashboard/create-post">
                    <div className="bg-white text-center py-1 text-lg border shadow-xl rounded-full cursor-pointer hover:bg-amber-500">
                      <svg className="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                      </svg>
                    </div>
                  </Link>
                  <Link className="flex-1 lg:flex-none" href="/profile">
                    <div className="uppercase bg-slate-500 text-center py-1 text-lg border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">Profile</div>
                  </Link>
                  <div className="flex items-center" suppressHydrationWarning>
                    <UserButton />
                  </div>
                </>
              )}
            </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="flex flex-col gap-4 mt-4 lg:hidden" id="mobile-menu-2">
                <ul className="flex flex-col font-medium gap-4">
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70">Start</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/about" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70">über uns</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/drinks" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70">Angebot</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/sportarena" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70">sportarena</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/wohin" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70">wohin ?</Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Image src={Bulleye} alt="Bulleye" width={40} height={40} className=""/>
                            <Link href="/client" className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70">client</Link>
                        </div>
                    </li>
                </ul>
            </div>
        )}
    </nav>
</header>
  )
}

export default MenuebarClient


