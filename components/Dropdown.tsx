import { Dropdown, DropdownItem } from "flowbite-react";
import Link from "next/link";
import { PiSailboatDuotone, PiCastleTurretDuotone, PiInfoDuotone  } from "react-icons/pi";
import Image from "next/image";
import Bulleye from "@/public/Assets/Svg/Bulleye.svg";

export default function Component() {
  return (
    <div className=" flex items-center gap-4">
      <div className="">
        <Image src={Bulleye} alt="" width={80} height={80} />
      </div>
      <div suppressHydrationWarning>
        <Dropdown
          className="bg-yellow-500 z-50 "
          label={<span className="w-[6vw] lg:text-3xl uppercase">über uns</span>}
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
    </div>
  );
}
