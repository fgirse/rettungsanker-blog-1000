"use client";

import { Dropdown, DropdownItem } from "flowbite-react";
import Link from "next/link";
import { PiSailboatDuotone, PiCastleTurretDuotone, PiInfoDuotone  } from "react-icons/pi";


export default function Component() {
  return (
    
   
     
        <Dropdown
          className="bg-yellow-500 z-[120]"
          label={<span className="text-[1.66rem] lg:w-[7vw] lg:text-[0.66rem] font-bowlby uppercase">über uns</span>}
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
      
    
  );
}
