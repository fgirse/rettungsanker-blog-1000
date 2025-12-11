
/**
 * Renders a user button component provided by the Clerk.js library.
 * This component allows users to interact with their account, such as
 * logging out or accessing their profile.
 */

'use client';

import { UserButton, useAuth } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Bulleye from "../public/Assets/Svg/Bulleye.svg";
import LogoNeu from "../public/Assets/Img/LogoNeu.png";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export default function MenuBar() {
  const { userId } = useAuth();

  return (
    <>
    <Navbar fluid rounded className="py-[4vh] bg-cyan-950 rounded-b-xl lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <NavbarBrand as={Link} href="/" className="relative left-[2vw]">
        <Image src={LogoNeu} width={120} height={120} className="mr-3 h-6 sm:h-9" alt="RettungsankerLogo" />
      </NavbarBrand>

      <div className="flex items-center lg:hidden">
        <NavbarToggle className="text-white hover:bg-orange-400" />
      </div>

      <NavbarCollapse className="gap-3 flex-row items-center">
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5">
          <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
          <NavbarLink as={Link} className="uppercase hover:bg-orange-400 lg:text-xl xl:text-2xl font-bowlby text-white" href="/">Home</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5">
          <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
          <NavbarLink as={Link} className="uppercase hover:bg-orange-400 lg:text-xl xl:text-2xl font-bowlby text-white" href="/about">über uns</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5">
          <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
          <NavbarLink as={Link} className="uppercase hover:bg-orange-400 lg:text-xl xl:text-2xl font-bowlby text-white" href="/drinks">angebot</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5">
          <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
          <NavbarLink as={Link} className="uppercase hover:bg-orange-400 lg:text-xl xl:text-2xl font-bowlby text-white" href="/sportarena">sportarena</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5">
          <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
          <NavbarLink as={Link} className="uppercase hover:bg-orange-400 lg:text-xl xl:text-2xl font-bowlby text-white" href="/wohin">wohin?</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5">
          <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
          <NavbarLink as={Link} className="uppercase hover:bg-orange-400 lg:text-xl xl:text-2xl font-bowlby text-white" href="/client">blog</NavbarLink>
        </div>

        {/* Auth buttons for mobile and desktop */}
        {!userId ? (
          <>
            <Link className="text-white bg-slate-400 border px-2 py-1 rounded-lg hover:bg-orange-500 no-underline text-center" href="/sign-in">
              Anmelden
            </Link>
            <Link className="text-white bg-slate-600 border px-2 py-1 rounded-lg hover:bg-orange-500 no-underline text-center" href="/sign-up">
              Registrieren
            </Link>
          </>
        ) : (
          <>
            <Link className="text-white no-underline" href="/profile">
              Profile
            </Link>
            <UserButton />
          </>
        )}
      </NavbarCollapse>
    </Navbar><div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-red-600/50 border border-default rounded-full bottom-4 left-1/2">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
         {/*<button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" /></svg>
            <span className="sr-only">Home</span>
          </button>
          <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>*/}
          <button data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" /></svg>
            <span className="sr-only">Anmelden</span>
          </button>
          <div id="tooltip-wallet" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Wallet
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <div className="flex items-center justify-center">
            <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-full w-8 h-8 focus:outline-none">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" /></svg>
              <span className="sr-only">New item</span>
            </button>
          </div>
          <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            NeuerBlog
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2" /></svg>
            <span className="sr-only">Settings</span>
          </button>
          <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Registrieren
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          {/*<button data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            <span className="sr-only">Profile</span>
          </button>
          <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Profile
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>*/}
        </div>
      </div>
      </>

  );
}
