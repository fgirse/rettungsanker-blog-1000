"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

interface AuthButtonsProps {
  userId: string | null | undefined;
}

export default function AuthButtons({ userId }: AuthButtonsProps) {
  return (
    <div className="flex gap-x-2 items-center">
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
  );
}
