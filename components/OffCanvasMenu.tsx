"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Bulleye from "../public/Assets/Svg/Bulleye.svg";
import Dropdown from "@/components/Dropdown";
import { FiMenu, FiX } from "react-icons/fi";

export default function OffCanvasMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 right-4 z-50 bg-stone-200 hover:bg-orange-500 p-2 rounded-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
          onMouseDown={(e) => {
            // Prevent closing if clicking on dropdown or menu
            if ((e.target as HTMLElement).closest('.lg\\:hidden.fixed.top-0')) {
              e.preventDefault();
            }
          }}
        ></div>
      )}

      {/* Off-Canvas Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[66vw] bg-red-700/70 shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-20 px-6">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 font-bowlby uppercase text-[1.66rem] md:text-[2.0rem]] font-bold rounded-lg hover:bg-orange-400 p-2"
                onClick={closeMenu}
              >
                <Image
                  src={Bulleye}
                  alt="Bulleye"
                  width={24}
                  height={24}
                  className="w-9 h-9"
                />
                <span className="font-bowlby">start</span>
              </Link>
            </li>

            <li>
              <div onClick={(e) => e.stopPropagation()}>
                <Dropdown />
              </div>
            </li>

            <li>
              <Link
                href="/drinks"
                className="flex items-center gap-2 font-bowlby uppercase text-[1.66rem] font-bold rounded-lg hover:bg-orange-400 p-2"
                onClick={closeMenu}
              >
                <Image
                  src={Bulleye}
                  alt="Bulleye"
                  width={24}
                  height={24}
                  className="w-9 h-9"
                />
                <span className="font-bowlby">angebot</span>
              </Link>
            </li>

            <li>
              <Link
                href="/sportarena"
                className="flex items-center gap-2 font-bowlby uppercase text-[1.66rem] font-bold rounded-lg hover:bg-orange-400 p-2"
                onClick={closeMenu}
              >
                <Image
                  src={Bulleye}
                  alt="Bulleye"
                  width={24}
                  height={24}
                  className="w-9 h-9"
                />
                <span className="font-bowlby">sportarena</span>
              </Link>
            </li>

            <li>
              <Link
                href="/wohin"
                className="flex items-center gap-2 font-bowlby uppercase text-[1.66rem] font-bold rounded-lg hover:bg-orange-400 p-2"
                onClick={closeMenu}
              >
                <Image
                  src={Bulleye}
                  alt="Bulleye"
                  width={24}
                  height={24}
                  className="w-9 h-9"
                />
                <span className="font-bowlby">wohin?</span>
              </Link>
            </li>

            <li>
              <Link
                href="/client"
                className="flex items-center gap-2 font-bowlby uppercase text-[1.66rem] font-bold rounded-lg hover:bg-orange-400 p-2"
                onClick={closeMenu}
              >
                <Image
                  src={Bulleye}
                  alt="Bulleye"
                  width={24}
                  height={24}
                  className="w-9 h-9"
                />
                <span className="font-bowlby">blog</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
