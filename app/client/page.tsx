/**
 * Indicates that this file is a client-side React component.
 * This directive tells Next.js to render this component on the client-side instead of the server-side.
 * Enhanced with retry logic to handle cases where user data is delayed.
 */
"use client";
import { useClerkUserWithRetry } from "@/lib/hooks/useClerkUserWithRetry";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const ClientPage = () => {
  const { isLoaded, isSignedIn, user, hasValidData, isRetrying, retryCount } = useClerkUserWithRetry();

  if (!isLoaded) {
    return (
      <section className="h-screen mt-12">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-gray-300">Loading...</p>
        </div>
      </section>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  if (!hasValidData && !isRetrying) {
    return (
      <section className="h-screen mt-12">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl text-white mb-4">Welcome!</h1>
          <p className="text-gray-300 mb-4">
            Your profile is loading. If this takes too long, please refresh the page.
          </p>
          <a 
            href="/api/health/clerk" 
            className="text-blue-400 underline text-sm"
          >
            Check status
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen mt-12">
      <div className="w-full flex flex-col items-center">
        <Image
          src="/Assets/Img/LogoAlt.png"
          alt="Rettungsanker Logo"
          width={300}
          height={50}
          className=""
        />
        <div className="py-6 flex flex-col items-center text-2xl">
          <p className="w-2/3 text-center text-gray-100">
            Hello, {user?.firstName || user?.username}! <br />
            Willkommen im <br />
            <span className="text-red-700 text-3xl text-shadow-lg headingA lg:text-7xl">
              rettungsanker-blog
            </span>
            <br />
            Click auf den unteren Button um zum Blog zu gelangen.
          </p>
          <Link href="/blog">
            <div className="cursor-pointer mt-20 px-8 py-3 border uppercase bg-slate-700 hover:bg-red-700 text-white text-lg font-bold rounded-lg transition-colors duration-200">
              Zum Blog
            </div>
          </Link>
        </div>
      </div>
      {isRetrying && (
        <div className="text-center mt-4 text-yellow-400 text-sm">
          Syncing your profile... (attempt {retryCount})
        </div>
      )}
    </section>
  );
};

export default ClientPage;
