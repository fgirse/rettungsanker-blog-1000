
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
    <Navbar fluid rounded className="py-[4vh] bg-cyan-950 rounded-b-xl lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-contain lg:bg-center lg:bg-no-repeat">
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
    </Navbar>
  );
}
