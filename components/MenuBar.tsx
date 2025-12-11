
/**
 * Renders a user button component provided by the Clerk.js library.
 * This component allows users to interact with their account, such as
 * logging out or accessing their profile.
 */

import { UserButton, useAuth } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Bulleye from "../public/Assets/Svg/Bulleye.svg";
import LogoNeu from "../public/Assets/Img/LogoNeu.png";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export default function MenuBar() {
  return (
    <Navbar fluid rounded className="bg-red-400 py-[3vh]">
      <NavbarBrand as={Link} href="/">
      <Image src={LogoNeu} width={120} height={120} className="mr- h-9 sm:h-12" alt="RettungsankerLogo" />
        {/*<span className="self-center whitespace-nowrap text-gray-50 text-xl font-semibold dark:text-white">Flowbite React</span>*/}
      </NavbarBrand>
      <NavbarToggle className="text-gray-50"/>
      <NavbarCollapse>
        <div className="mb-3 flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={50} height={50} />
        <NavbarLink className="uppercase text-3xl hover:bg-orange-400 lg:text-xl xl:text-2xl  font-bowlby text-white" href="/" active>Home</NavbarLink>
        </div>
       <div className="mb-3 flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={50} height={50} />
        <NavbarLink className="uppercase text-3xl hover:bg-orange-400 lg:text-xl xl:text-2xl  font-bowlby text-white" href="/about" active>über uns</NavbarLink>
        </div>
        <div className="mb-3 flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={50} height={50} />
        <NavbarLink className="uppercase text-3xl hover:bg-orange-400 lg:text-xl xl:text-2xl  font-bowlby text-white" href="/drinks" active>angebot</NavbarLink>
        </div>
        <div className="mb-3 flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={50} height={50} />
        <NavbarLink className="uppercase mb-3 text-3xl hover:bg-orange-400 lg:text-xl xl:text-2xl  font-bowlby text-white" href="/sportarena" active>sportarena</NavbarLink>
        </div>
        <div className="mb-3 flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={50} height={50} />
        <NavbarLink className="uppercase text-3xl hover:bg-orange-400 lg:text-xl xl:text-2xl  font-bowlby text-white" href="/wohin" active>wohin?</NavbarLink>
        </div>
        <div className="mb-3 flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={50} height={50} />
        <NavbarLink className="uppercase text-3xl hover:bg-orange-400 lg:text-xl xl:text-2xl  font-bowlby text-white" href="/client" active>blog</NavbarLink>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}


{/*const MenuBar = () => {
  const { userId } = useAuth();
  return (
    <Navbar  className="py-[4vh] bg-cyan-950 rounded-b-xl lg:bg-[url=('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <div className="flex items-center justify-between">
        <NavbarBrand className="relative left-[2vw]" href="/">
          <Image src={LogoNeu} width={120} className="mr-3 h-6 sm:h-9" alt="RettungsankerLogo" />
        </NavbarBrand>
      </div>
     
      <NavbarCollapse className="gap-3">
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
        <NavbarLink className="uppercase hover:bg-orange-400 lg:text-xl  xl:text-2xl   font-bowlby text-white" href="/" active>Home</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
        <NavbarLink className="uppercase hover:bg-orange-400 lg:text-xl  xl:text-2xl   font-bowlby text-white" href="/about" active>über uns</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
        <NavbarLink className="uppercase hover:bg-orange-400 lg:text-xl  xl:text-2xl   font-bowlby text-white" href="/drinks" active>angebot</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
        <NavbarLink className="uppercase hover:bg-orange-400 lg:text-xl  xl:text-2xl   font-bowlby text-white" href="/sportarena" active>sportarena</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
        <NavbarLink className="uppercase hover:bg-orange-400 lg:text-xl  xl:text-2xl   font-bowlby text-white" href="/wohin" active>wohin?</NavbarLink>
        </div>
        <div className="flex items-center gap-2 lg:gap-5 lg:mr-5 ">
        <Image src={Bulleye} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" alt="Bulleye" width={40} height={40} />
        <NavbarLink className="uppercase hover:bg-orange-400 lg:text-xl  xl:text-2xl   font-bowlby text-white" href="/client" active>blog</NavbarLink>
        </div>
      </NavbarCollapse>
     
      <div className=" lg:flex gap-6 items-center">
          {!userId ? (
            <>
              <Link className="text-white bg-slate-400 border px-2 py-1 rounded-lg hover:bg-orange-500 no-underline" href="/sign-in">
                Anmelden
              </Link>
              <Link className="text-white bg-slate-600 border px-2 py-1 rounded-lg hover:bg-orange-500 no-underline" href="/sign-up">
                Registrieren
              </Link>
            </>
          ) : (
            <>
              <Link className="no-underline" href="/profile">
                Profile
              </Link>
              <div className="flex items-center">
                <UserButton />
              </div>
            </>
          )}
        </div>
          <NavbarToggle className="text-white text-xl bg-cyan-950" />
    </Navbar>
  );
}*/}
