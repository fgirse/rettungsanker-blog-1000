/**
 * Renders a user button component provided by the Clerk.js library.
 * This component allows users to interact with their account, such as
 * logging out or accessing their profile.
 */
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <div className="bg-cyan-950 rounded-b-xl lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <ul className="flex justify-between py-4 px-6">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/client">
            <li>Client Page</li>
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          {!userId ? (
            <>
              <Link href="/sign-in">
                <li>Anmeldung</li>
              </Link>
              <Link href="/sign-up" className="bg-slate-400 p-2 rounded-lg border hover:bg-orange-400">
                <li>Registrierung</li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="bg-slate-600 p-2 rounded-lg border hover:bg-orange-400">
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
