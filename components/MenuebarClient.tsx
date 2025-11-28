"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoNeu from '@/public/Assets/Img/LogoNeu.png'
import Bulleye from '@/public/Assets/Svg/Bulleye.svg' 
import { UserButton } from '@clerk/nextjs'

interface MenuebarClientProps {
  userId: string | null;
}

const MenuebarClient = ({ userId }: MenuebarClientProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <header>
    <nav className="lg: h-[12vh]  border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-[url('/Assets/Svg/Wood3.svg')]  bg-red-900 lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-no-repeat lg:bg-center rounded-b-xl ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" className="flex items-center">
                <Image src={LogoNeu} width={120} height={90} className="mr-3 h-6 sm:h-9" alt="Rettungsanker-Logo" />
                {/*<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>*/}
            </Link>
            <div className="flex items-center lg:order-2">
                <div className="flex gap-6 items-center">
          {!userId ? (
            <>
              <Link href="/sign-in">
                <li className="list-none w-28 bg-slate-400 text-center py-1 lg:text-3xl border  shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">Login</li>
              </Link>
              <Link href="/sign-up">
                <li className="list-none w-32 bg-slate-600 text-center py-1 lg:text-3xl border  shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">Sign Up</li>
              </Link>
            </>
          ) : (
            <div className="list-none">
              <Link href="/profile">
                <li>Profile</li>
              </Link>
              <li className="flex items-center">
                <UserButton />
              </li>
            </div>
          )}
        </div>
                <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded={isMobileMenuOpen}>
                    <span className="sr-only">Open main menu</span>
                    <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg className={`w-6 h-6 ${isMobileMenuOpen ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
            <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <div className="flex items-center">
                                <Image src={Bulleye} alt="Bulleye" width={50} height={50} className=""/>
                                <Link href="/" className="block text-[1.333rem] px-2 rounded-lg uppercase py-2 pr-4 pl-3 text-gray-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-orange-500/70 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-orange-500/70 dark:border-gray-700">Start</Link>
                        </div>
                </li>
                    <li>
                        <div className="flex items-center">
                                <Image src={Bulleye} alt="Bulleye" width={50} height={50} className=""/>
                                <Link href="/about" className="block text-[1.333rem] px-2 rounded-lg uppercase py-2 pr-4 pl-3 text-gray-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-orange-500/70 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-orange-500/70 dark:border-gray-700">über uns</Link>
                        </div>
                </li>
                   <li>
                        <div className="flex items-center">
                                <Image src={Bulleye} alt="Bulleye" width={50} height={50} className=""/>
                                <Link href="/drinks" className="block text-[1.333rem] px-2 rounded-lg uppercase py-2 pr-4 pl-3 text-gray-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-orange-500/70 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-orange-500/70 dark:border-gray-700">Angebot</Link>
                        </div>
                </li>
                    <li>
                        <div className="flex items-center">
                                <Image src={Bulleye} alt="Bulleye" width={50} height={50} className=""/>
                                <Link href="/sportarena" className="block text-[1.333rem] px-2 rounded-lg uppercase py-2 pr-4 pl-3 text-gray-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-orange-500/70 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-orange-500/70 dark:border-gray-700">sportarena</Link>
                        </div>
                </li>
                    <li>
                        <div className="flex items-center">
                                <Image src={Bulleye} alt="Bulleye" width={50} height={50} className=""/>
                                <Link href="/wohin" className="block text-[1.333rem] px-2 rounded-lg uppercase py-2 pr-4 pl-3 text-gray-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-orange-500/70 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-orange-500/70 dark:border-gray-700">wohin ?</Link>
                        </div>
                </li>
                    <li>
                        <div className="flex items-center">
                                <Image src={Bulleye} alt="Bulleye" width={50} height={50} className=""/>
                                <Link href="/client" className="block text-[1.333rem] px-2 rounded-lg uppercase py-2 pr-4 pl-3 text-gray-100 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-orange-500/70 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-orange-500/70 dark:border-gray-700">client</Link>
                        </div>
                </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
  )
}

export default MenuebarClient
