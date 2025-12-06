"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoNeu from "@/public/Assets/Img/LogoNeu.png";
import Bulleye from "@/public/Assets/Svg/Bulleye.svg";
import { UserButton, useUser } from "@clerk/nextjs";
import Headline from "./Headline";
import Arrow from "@/public/Assets/Svg/arrowred2.svg";
import  Dropdown  from "@/components/Dropdown";

interface MenuebarClientProps {
  userId: string | null;
}

const MenuebarClient = ({ userId }: MenuebarClientProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header suppressHydrationWarning>
      <nav suppressHydrationWarning className=" border-gray-200 px-4 lg:px-6 py-2.5 lg:py-12 dark:bg-slate-800 bg-zinc-900 lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-no-repeat lg:bg-center lg:h-[16vh]">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mx-auto max-w-screen-5xl gap-x-1">
          {/* Logo and Primary Menu */}
          <div className="flex justify-between items-center lg:w-[100vw]">
            <Link href="/" className="flex items-center">
            <div className="lg:mr-[2vw]">
              <Image
                src={LogoNeu}
                width={140}
                className=""
                alt="Rettungsanker-Logo"
              />
              </div>
            </Link>

            {/* Menu Items - Main Row */}
            <ul className="hidden lg:flex flex-row items-center justify-start space-x-3 font-medium">
              <li>
                <div className="flex items-center">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/"
                    className="block mr-5 w-[6vw] text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:text-sm xl:text-2xl 2xl:text-3xl lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70"
                  >
                    Start
                  </Link>
                </div>
              </li>
  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
              <Dropdown />
              <li>
                <div className="flex items-center">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/drinks"
                    className="block mr-16 w-[6vw] text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:text-sm xl:text-2xl 2xl:text-3xl lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70"
                  >
                    Angebot
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/sportarena"
                    className="block mr-20 w-[8vw] text-sm px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:text-lg xl:text-2xl 2xl:text-3xl lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70"
                  >
                    sportarena
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/wohin"
                    className="block mr-3 w-[7vw] text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400 lg:text-sm xl:text-2xl 2xl:text-3xl lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70"
                  >
                    wohin?
                  </Link>
                </div>
              </li>
              {/* Handmade arrow with NEW indicator */}

          
              <li className="">
                <div className="flex items-center relative group">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/client"
                    className="block text-lg px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 lg:p-0 dark:text-gray-400  xl:text-2xl 2xl:text-3xl  lg:text-sm lg:dark:hover:text-white lg:dark:hover:bg-orange-500/70 relative"
                  >
                    blog
                    <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                      neu
                    </span>
                  </Link>
                  
                </div>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-100 rounded-lg lg:hidden hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 lg:text-sm xl:text-2xl 2xl:text-3xl dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${isMobileMenuOpen ? "hidden" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-6 h-6 ${isMobileMenuOpen ? "" : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Auth Buttons - Right Side */}
          <div className="mt-5 mr-7 flex items-center gap-4 w-full lg:w-auto">
            {!userId ? (
              <>
                <Link href="/sign-in" className="flex-1 lg:flex-none">
                  <div className="uppercase bg-slate-400 text-center py-1 px-1 text-lg border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">
                    anmelden
                  </div>
                </Link>
                <Link href="/sign-up" className="flex-1 lg:flex-none">
                  <div className="uppercase bg-slate-600 text-center py-1 px-1 text-lg border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">
                    registrieren
                  </div>
                </Link>
              </>
            ) : (
              <>
                <h1 className="w-16 px-1 text-[0.5rem] border rounded text-white lg:text-[0.7rem]">
                  Hallo {user?.firstName} !
                </h1>
                <Link className=" lg:flex-none" href="/dashboard/create-post">
                  <div className="bg-white text-center py-1 text-lg border shadow-xl rounded-full cursor-pointer hover:bg-amber-500">
                    <svg
                      className="text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
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
                <Link className="flex-1 lg:flex-none" href="/profile">
                  <div className="uppercase bg-slate-500 text-center py-1 text-lg border shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">
                    Profile
                  </div>
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
          <div
            className="flex flex-col gap-4 mt-4 lg:hidden"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium gap-4">
              <li>
                <div className="flex items-center">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/"
                    className="block text-3xl  border-b px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70"
                  >
                    Start
                  </Link>
                </div>
              </li>
              <div className="flex items-center">
                <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
              <Dropdown />
              </div>
              <li>
                <div className="flex items-center">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/drinks"
                    className="block text-3xl  border-b px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70"
                  >
                    Angebot
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/sportarena"
                    className="block text-3xl  border-b px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70"
                  >
                    sportarena
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/wohin"
                    className="block text-3xl  border-b px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70"
                  >
                    wohin ?
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center relative">
                  <Image
                    src={Bulleye}
                    alt="Bulleye"
                    width={80}
                    height={80}
                    className=""
                  />
                  <Link
                    href="/client"
                    className="block text-3xl  border-b px-2 rounded-lg uppercase py-1 text-gray-100 hover:bg-orange-500/70 relative"
                  >
                    blog
                    <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                      neu
                    </span>
                  </Link>

                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MenuebarClient;
