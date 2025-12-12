"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/nextjs";

interface AuthButtonsProps {
  userId: string | null | undefined;
}

export default function AuthButtons({ userId }: AuthButtonsProps) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex gap-x-2 items-center justify-center lg:gap-x-4">
      {!userId ? (
        <>
          <Link href="/sign-in" className="uppercase bg-slate-400 p-2 rounded-lg border hover:bg-orange-400 lg:text-base text-sm font-bold">
            Anmeldung
          </Link>
          <Link href="/sign-up" className="uppercase bg-slate-500 p-2 rounded-lg border hover:bg-orange-400 lg:text-base text-sm font-bold">
            Registrierung
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-white lg:text-xs text-xs font-bold">Hello, {user?.firstName ?? "User"}</h1>
          <Link href="/profile" className="uppercase bg-slate-600 p-2 rounded-lg border hover:bg-orange-400 lg:text-base text-sm font-bold">
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

 