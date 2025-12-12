"use client";

import { useState } from "react"; 

import Link from "next/link";

import { useRouter } from "next/navigation";

import { UserButton, useUser } from "@clerk/nextjs"; 

import {

    Dropdown,

  Navbar,

  NavbarBrand,

} from "flowbite-react";


import Image from "next/image";     

import LogoNeu from "../public/Assets/Img/LogoNeu.png";

import Bulleye from "../public/Assets/Svg/Bulleye.svg";

import DropdownMenu from "@/components/Dropdown";


interface NavbarClientProps {

  userId: string | null;

}

export default function BottomNavigation({ userId }: NavbarClientProps) {
  const router = useRouter();
  const { user } = useUser();

  return (
    <>
    {/* Bottom Menu for Mobile and Tablet - Auth Buttons and Profile */}

            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-red-600/50 border-t border-gray-100 px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex items-center justify-between gap-1 sm:gap-2 md:gap-3 z-70">

              {!userId ? (

                <>

                  <button

                    onClick={() => router.push('/sign-in')}

                    className="flex-1 uppercase bg-slate-400 text-center py-1.5 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500 font-medium"

                  >

                    anmelden

                  </button>

                  <button

                    onClick={() => router.push('/sign-up')}

                    className="flex-1 uppercase bg-slate-600 text-center py-1.5 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500 font-medium"

                  >

                    registrieren

                  </button>

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
    </>
  );
}
