
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import BottomNavigation from "./BottomNavigation";
import LogoNeu from '../public/Assets/Img/LogoNeu.png';
import Image from "next/image";

export function Component() {
  return (
    <><Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
      <div className="">  
        <Image src={LogoNeu} className="" alt="Rettungsanker LogoNeu" width={130} height={40} />

        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem href="/team">Team</DropdownItem>
          <DropdownItem href="/history">Geschichte</DropdownItem>
          <DropdownItem href="/impressum">Impressum</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink className="rounded-r-full uppercase text-3xl font-bowlby" href="/drinks">angebot</NavbarLink>
        <NavbarLink href="/sportarena">sportarena</NavbarLink>
        <NavbarLink href="/wohin">Wohin?</NavbarLink>
      </NavbarCollapse>
    </Navbar><BottomNavigation /></>          
  );
}
export default Component;
