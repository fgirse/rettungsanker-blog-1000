/**
 * Renders a user button component provided by the Clerk.js library.
 * This component allows users to interact with their account, such as
 * logging out or accessing their profile.
 */
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import LogoNeu from "@/public/Assets/Img/LogoNeu.png";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <div className="bg-red-950 h-[28vh] lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-no-repeat lg:bg-center rounded-b-xl">
      <Link href="/"  className="relative top-[5vh] left-6">
        <div className="">
          <Image src={LogoNeu} alt="Logo Rettungsanker" width={100} height={100} className="h-12 w-auto" />
        </div>
      </Link>
      
      <ul className="mb-7 lg:text-2xl uppercase flex justify-end gap-x-12 py-3 px-6">
        <div className="flex items-center gap-2">
           <Image src="/Assets/Svg/Bulleye.svg" alt="Logo Rettungsanker" width={75} height={75} className=""/>
          <Link href="/">
         
            <li>Home</li>
          </Link>
        </div>
             <div className="flex items-center gap-2">
           <Image src="/Assets/Svg/Bulleye.svg" alt="Logo Rettungsanker" width={75} height={75} className=""/>
          <Link href="/about">
         
            <li>über uns</li>
          </Link>
        </div>
                <div className="flex items-center gap-2">
           <Image src="/Assets/Svg/Bulleye.svg" alt="Logo Rettungsanker" width={75} height={75} className=""/>
          <Link href="/drinks">
            <li>drinks</li>
          </Link>
        </div>
               <div className="flex items-center gap-2">
           <Image src="/Assets/Svg/Bulleye.svg" alt="Logo Rettungsanker" width={75} height={75} className=""/>
          <Link href="/sportarena">
            <li>sportarena</li>
          </Link>
        </div>
                <div className="flex items-center gap-2">
           <Image src="/Assets/Svg/Bulleye.svg" alt="Logo Rettungsanker" width={75} height={75} className=""/>
          <Link href="/wohin">
            <li>wohin?</li>
          </Link>
        </div>
        <div className="flex items-center gap-2">
                
           <Image src="/Assets/Svg/Bulleye.svg" alt="Logo Rettungsanker" width={75} height={75} className=""/>
          <Link href="/client">
         
            <li>client</li>
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          {!userId ? (
            <>
              <Link href="/sign-in">
                <li className="w-28 bg-slate-400 text-center py-1 lg:text-3xl border  shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">Login</li>
              </Link>
              <Link href="/sign-up">
                <li className="w-32 bg-slate-600 text-center py-1 lg:text-3xl border  shadow-xl rounded-lg cursor-pointer hover:bg-amber-500">Sign Up</li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <li>Profile</li>
              </Link>
              <li className="flex items-center">
                <UserButton />
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
