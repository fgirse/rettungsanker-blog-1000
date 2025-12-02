
"use client";

import Link from "next/link";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";

export default function DropdownMenu() {
  return (
    <Dropdown className="z-50 text-2xl uppercase" label="über uns">
      <DropdownHeader>
        <span className="block text-sm"></span>
        <span className="block truncate text-sm font-medium"></span>
      </DropdownHeader>
      <Link href="/about/team">
        <DropdownItem icon={HiViewGrid} className="uppercase text-xl hover:bg-yellow-600">team</DropdownItem>
      </Link>
      <Link href="/about/history">
        <DropdownItem icon={HiCog} className="uppercase text-xl hover:bg-yellow-600">geschichte</DropdownItem>
      </Link>
      <Link href="/impressum">
        <DropdownItem icon={HiCurrencyDollar} className="uppercase text-xl hover:bg-yellow-600">impressum</DropdownItem>
      </Link>
      <DropdownDivider />
      
    </Dropdown>
  );
}
