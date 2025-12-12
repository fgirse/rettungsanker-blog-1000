/**
 * Renders a user button component provided by the Clerk.js library.
 * This component allows users to interact with their account, such as
 * logging out or accessing their profile.
 */
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Bulleye from "../public/Assets/Svg/Bulleye.svg";
import LogoNeu from "../public/Assets/Img/LogoNeu.png";
import Dropdown from "@/components/Dropdown";
import AuthButtons from "@/components/AuthButtons";
import OffCanvasMenu from "@/components/OffCanvasMenu";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block rounded-b-xl lg:bg-[url('/Assets/Svg/Wood3.svg')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
        <div className="flex justify-between items-center py-4 px-6 gap-x-4">
          <ul className="flex justify-center items-center gap-4">
            <li>
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <Link className="font-bowlby uppercase px-1 py-1 lg:text-[0.66rem] font-bold rounded-lg hover:bg-orange-400" href="/">start</Link>
              </div>
            </li>

            <li>
              <Dropdown />
            </li>

            <li>
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <Link className="font-bowlby uppercase px-1 py-1 lg:text-[0.66rem] font-bold rounded-lg hover:bg-orange-400" href="/drinks">angebot</Link>
              </div>
            </li>

            <li>
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <Link className="font-bowlby uppercase px-1 py-1 lg:text-[0.66rem] font-bold rounded-lg hover:bg-orange-400" href="/sportarena">sportarena</Link>
              </div>
            </li>

            <li>
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <Link className="font-bowlby uppercase px-1 py-1 lg:text-[0.66rem] font-bold rounded-lg hover:bg-orange-400" href="/wohin">wohin ?</Link>
              </div>
            </li>

            <li>
              <div className="flex items-center">
                <Image src={Bulleye} alt="Bulleye" width={24} height={24} className="w-4 h-4 lg:w-12 lg:h-12 inline-block mr-2" />
                <Link className="font-bowlby uppercase px-1 py-1 lg:text-[0.66rem] font-bold rounded-lg hover:bg-orange-400" href="/client">blog</Link>
              </div>
            </li>
          </ul>

          <AuthButtons userId={userId} />
        </div>
      </div>

      {/* Mobile & Tablet Navigation */}
      <div className="lg:hidden bg-red-800">
        <div className="flex justify-between items-center py-3 px-4">
          <Link href="/" className="flex items-center">
            <Image 
              src={LogoNeu} 
              alt="Logo" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <OffCanvasMenu />
        </div>
      </div>

      {/* Mobile & Tablet Bottom Navigation (Auth Buttons) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-red-600/50 border-t border-orange-400 rounded-t-xl">
        <div className="flex justify-center items-center py-3 px-4">
          <AuthButtons userId={userId} />
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="lg:hidden h-24"></div>
    </>
  );
};

export default Navbar;
