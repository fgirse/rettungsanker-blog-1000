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
import { Dropdown, DropdownItem } from "flowbite-react";
import { PiSailboatDuotone, PiCastleTurretDuotone, PiInfoDuotone } from "react-icons/pi";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <>
      <div className="bg-cyan-950 rounded-b-xl lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
        <ul className="flex justify-center py-4 px-6">
          <li>
            <Link href="/">
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <span className="font-bowlby uppercase px-1 py-1 lg-[0.333rem] font-bold rounded-lg hover:bg-orange-400">Start</span>
              </div>
            </Link>
          </li>

          <li className="flex items-center justify-start">
            <div suppressHydrationWarning>
              <Dropdown
                className="bg-yellow-500 z-50"
                label={<span className="text-xl lg:w-[7vw] lg:text-xl font-bowlby uppercase">über uns</span>}
              >
                <Link href="/about/team">
                  <DropdownItem className="text-xl hover:bg-yellow-600 text-white" icon={PiSailboatDuotone}>&nbsp;Team</DropdownItem>
                </Link>
                <Link href="/about/history">
                  <DropdownItem className="text-xl hover:bg-yellow-600 text-white" icon={PiCastleTurretDuotone}>&nbsp;Geschichte</DropdownItem>
                </Link>
                <Link href="/impressum">
                  <DropdownItem className="text-xl hover:bg-yellow-600 text-white" icon={PiInfoDuotone}>&nbsp;Impressum</DropdownItem>
                </Link>
              </Dropdown>
            </div>
          </li>

          <li>
            <Link href="/drinks">
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <span className="font-bowlby uppercase px-1 py-1 lg-[0.333rem] font-bold rounded-lg hover:bg-orange-400">Angebot</span>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/sportarena">
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <span className="font-bowlby uppercase px-1 py-1 lg-[0.333rem] font-bold rounded-lg hover:bg-orange-400">sportarena</span>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/wohin">
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <span className="font-bowlby uppercase px-1 py-1 lg-[0.333rem] font-bold rounded-lg hover:bg-orange-400">wohin ?</span>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/client">
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <span className="font-bowlby uppercase px-1 py-1 lg-[0.333rem] font-bold rounded-lg hover:bg-orange-400">Blog Page</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-6 items-center">
        {!userId ? (
          <>
            <Link href="/sign-in" className="uppercase bg-slate-400 p-2 rounded-lg border hover:bg-orange-400">
              Anmeldung
            </Link>
            <Link href="/sign-up" className="uppercase bg-slate-500 p-2 rounded-lg border hover:bg-orange-400">
              Registrierung
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile" className="uppercase bg-slate-600 p-2 rounded-lg border hover:bg-orange-400">
              Profil
            </Link>
            <div className="flex items-center">
              <UserButton />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
