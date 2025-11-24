"use client"

import React from 'react';

export default function InfoBar() {
  return (
    <>
      <div className="w-[100vw] h-[4vh] z-30 top-0 md:top-[8vh] lg:top-[8vh] lg:h-[5vh] mx-auto flex flex-row items-center justify-start gap-x-6 bg-yellow-600">
        <div className=" flex flex-row gap-x-2 px-2 lg:flex-row lg:items-center lg:justify-evenly">
          <svg
            className="h-5 w-5"
            fill="#ffcc00"
            stroke="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            ></path>
          </svg>
          <p className="mt-[2.9px] font-mono text-[.55rem] text-gray-100 lg:text-[.66rem] xl:text-[.9rem]  2xl:text-[1.13rem]">
            0761 383 867 47
          </p>
        </div>

        <div className="flex flex-row items-center gap-x-1 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-x-1">
          <svg
            className="w-5 h-5"
            fill="#ffcc00"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <p className="font-mono text-[.55rem] text-gray-100 lg:text-[.55rem] xl:text-[.9rem]  2xl:text-[1.1rem]">
            rettungsanker-freiburg@gmx.de
          </p>
        </div>
        <div>
          <p className="hidden font-mono text-gray-100 lg:block lg:text-[.55rem] xl:text-[.9rem]  2xl:text-[1.1rem]">
            Öffnungszeiten: Montag bis Donnerstag: 18-24 Uhr Freitag und
            Samstag: 15-03 Uhr Sonntags: geschlossen
          </p>
        </div>
      </div>
    </>
  );
}
