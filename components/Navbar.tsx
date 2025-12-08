"use client";
import { useState } from "react"; 
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs"; 
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

import Image from "next/image";     
import LogoNeu from "../public/Assets/Img/LogoNeu.png";
import Bulleye from "../public/Assets/Svg/Bulleye.svg";
import BottomNavigation from "./BottomNavigation";

interface MenuebarClientProps {
  userId: string | null;
}

const MenuebarClient = ({ userId }: MenuebarClientProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <Navbar fluid rounded className="bg-slate-800 py-3 md:py-5 lg:py-8 xl:py-10 2xl:py-12 flex items-center justify-between">
        <NavbarBrand href="">
          <Image 
            src={LogoNeu} 
            className="w-8 h-auto sm:w-10 md:w-12 lg:w-14 xl:w-16 2xl:w-20" 
            alt="LogoNeu" 
            width={80} 
            height={80} 
          />
        </NavbarBrand>
        
        {/* Menu Items - Always visible, proper structure */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 flex-1 px-2 lg:px-4">
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
            <Link href="/" className="uppercase text-gray-50 hover:bg-orange-400 px-2 lg:px-3 py-1 lg:py-2 rounded font-bowlby text-xs lg:text-sm xl:text-base 2xl:text-lg">
              Home
            </Link>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
            <Link href="/about" className="uppercase text-gray-50 hover:bg-orange-400 px-2 lg:px-3 py-1 lg:py-2 rounded font-bowlby text-xs lg:text-sm xl:text-base 2xl:text-lg">
              über uns
            </Link>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
            <Link href="/drinks" className="uppercase text-gray-50 hover:bg-orange-400 px-2 lg:px-3 py-1 lg:py-2 rounded font-bowlby text-xs lg:text-sm xl:text-base 2xl:text-lg">
              angebot
            </Link>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
            <Link href="/sportarena" className="uppercase text-gray-50 hover:bg-orange-400 px-2 lg:px-3 py-1 lg:py-2 rounded font-bowlby text-xs lg:text-sm xl:text-base 2xl:text-lg">
              sportarena
            </Link>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
            <Link href="/wohin" className="uppercase text-gray-50 hover:bg-orange-400 px-2 lg:px-3 py-1 lg:py-2 rounded font-bowlby text-xs lg:text-sm xl:text-base 2xl:text-lg">
              wohin?
            </Link>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
            <Link href="/client" className="uppercase text-gray-50 hover:bg-orange-400 px-2 lg:px-3 py-1 lg:py-2 rounded font-bowlby text-xs lg:text-sm xl:text-base 2xl:text-lg relative">
              blog
              <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs lg:text-sm xl:text-base font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                neu
              </span>
            </Link>
          </div>
        </div>

        {/* Right side - Auth buttons and toggle */}
        <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
          {/* Desktop Auth Buttons - visible on lg and above */}
          {!userId && (
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/sign-in">
                <div className="uppercase bg-slate-400 text-center py-1 px-2 lg:px-3 text-xs lg:text-sm xl:text-base border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500 font-medium">
                  anmelden
                </div>
              </Link>
              <Link href="/sign-up">
                <div className="uppercase bg-slate-600 text-center py-1 px-2 lg:px-3 text-xs lg:text-sm xl:text-base border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500 font-medium">
                  registrieren
                </div>
              </Link>
            </div>
          )}
          
          {/* Custom Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 text-gray-50 rounded-lg hover:bg-slate-700 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            )}
          </button>
        </div>
      </Navbar>

      {/* Mobile Menu - Main menu items only */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-800 px-3 sm:px-4 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3 pb-20">
          <Link href="/" className="uppercase text-gray-50 hover:bg-orange-400 px-2 sm:px-3 py-1.5 sm:py-2 rounded block text-sm sm:text-base font-medium">Home</Link>
          <Link href="/about" className="uppercase text-gray-50 hover:bg-orange-400 px-2 sm:px-3 py-1.5 sm:py-2 rounded block text-sm sm:text-base font-medium">über uns</Link>
          <Link href="/drinks" className="uppercase text-gray-50 hover:bg-orange-400 px-2 sm:px-3 py-1.5 sm:py-2 rounded block text-sm sm:text-base font-medium">angebot</Link>
          <Link href="/sportarena" className="uppercase text-gray-50 hover:bg-orange-400 px-2 sm:px-3 py-1.5 sm:py-2 rounded block text-sm sm:text-base font-medium">sportarena</Link>
          <Link href="/wohin" className="uppercase text-gray-50 hover:bg-orange-400 px-2 sm:px-3 py-1.5 sm:py-2 rounded block text-sm sm:text-base font-medium">wohin?</Link>
          <Link href="/client" className="uppercase text-gray-50 hover:bg-orange-400 px-2 sm:px-3 py-1.5 sm:py-2 rounded block text-sm sm:text-base font-medium relative">
            blog
            <span className="absolute top-0 sm:top-1 -right-6 sm:-right-8 inline-flex items-center justify-center px-1 sm:px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
              neu
            </span>
          </Link>
        </div>
      )}

      {/* Bottom Menu for Mobile and Tablet - Auth Buttons and Profile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-slate-800 border-t border-gray-600 px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex items-center justify-between gap-1 sm:gap-2 md:gap-3 z-50">
        {!userId ? (
          <>
            <Link href="/sign-in" className="flex-1">
              <div className="uppercase bg-slate-400 text-center py-1.5 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500 font-medium">
                anmelden
              </div>
            </Link>
            <Link href="/sign-up" className="flex-1">
              <div className="uppercase bg-slate-600 text-center py-1.5 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500 font-medium">
                registrieren
              </div>
            </Link>
          </>
        ) : (
          <>
            <div className="flex-1 min-w-0">
              <h1 className="text-xs sm:text-sm text-white text-center truncate font-medium">
                {user?.firstName}
              </h1>
            </div>
            <Link href="/dashboard/create-post" className="flex-1">
              <div className="bg-white text-center py-1.5 sm:py-2 px-1 sm:px-2 border shadow-xl rounded-full cursor-pointer hover:bg-amber-500">
                <svg
                  className="text-gray-800 w-4 sm:w-5 h-4 sm:h-5 mx-auto"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </div>
            </Link>
            <Link href="/profile" className="flex-1">
              <div className="uppercase bg-slate-500 text-center py-1.5 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500 font-medium">
                Profile
              </div>
            </Link>
            <div className="flex-1 flex justify-center" suppressHydrationWarning>
              <UserButton />
            </div>
          </>
        )}
      </div>

      {/* Desktop User Profile Section - visible on lg and above when logged in */}
      {userId && (
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 px-3 lg:px-4 ml-2 lg:ml-4 border-l border-gray-600">
          <h1 className="text-xs lg:text-sm xl:text-base text-white font-medium whitespace-nowrap">
            Hallo {user?.firstName} !
          </h1>
          <Link href="/dashboard/create-post">
            <div className="bg-white text-center py-1 lg:py-1.5 px-1.5 lg:px-2 border shadow-xl rounded-full cursor-pointer hover:bg-amber-500">
              <svg
                className="text-gray-800 w-4 lg:w-5 xl:w-6 h-4 lg:h-5 xl:h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </div>
          </Link>
          <Link href="/profile">
            <div className="uppercase bg-slate-500 text-center py-1 lg:py-1.5 px-2 lg:px-3 text-xs lg:text-sm xl:text-base border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500 font-medium">
              Profile
            </div>
          </Link>
          <div suppressHydrationWarning>
            <UserButton />
          </div>
        </div>
      )}
    </>
  );
};

export function Component() {
  const { user } = useUser();
  return <MenuebarClient userId={user?.id ?? null} />;
}

export default Component;
