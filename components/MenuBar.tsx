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
import Bulleye from "../public/Assets/Svg/Bulleye.svg";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <div className="bg-cyan-950 rounded-b-xl lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <ul className="flex justify-between py-4 px-6">
        <div>
          <Link href="/">
            <li className="font-bowlby uppercase px-1 py-1 lg:text-sm font-bold rounded-lg hover:bg-orange-400">Start</li>
          </Link>
        </div>
        <div className="flex items-center justify-start">
             <Link href="/about">
            <li className="font-bowlby uppercase px-1 py-1 lg:text-sm font-bold rounded-lg hover:bg-orange-400">über uns</li>
          </Link>
             <Link href="/drinks">
             <div className="flex items-center">    
             <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-20 lg:h-20 inline-block mr-1" />
             </div>
            <li className="font-bowlby uppercase px-1 py-1 lg:text-sm font-bold rounded-lg hover:bg-orange-400">Angebot</li>
          </Link>
             <Link href="/sportarena">
            <li className="font-bowlby uppercase px-1 py-1 lg:text-sm font-bold rounded-lg hover:bg-orange-400">sportarena</li>
          </Link>
             <Link href="/wohin">
            <li className="font-bowlby uppercase px-1 py-1 lg:text-sm font-bold rounded-lg hover:bg-orange-400">wohin ?</li>
          </Link>
          <Link href="/client">
            <li className="font-bowlby uppercase px-1 py-1 lg:text-sm font-bold rounded-lg hover:bg-orange-400">Blog Page</li>
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          {!userId ? (
            <>
              <Link href="/sign-in" className="uppercase bg-slate-400 p-2 rounded-lg border hover:bg-orange-400">
                <li>Anmeldung</li>
              </Link>
              <Link href="/sign-up" className="uppercase bg-slate-500 p-2 rounded-lg border hover:bg-orange-400">
                <li>Registrierung</li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="uppercasebg-slate-600 p-2 rounded-lg border hover:bg-orange-400">
                <li>Profil</li>
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
