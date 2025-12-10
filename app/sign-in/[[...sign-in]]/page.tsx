/**
 * Imports the `SignIn` component from the `@clerk/nextjs` library.
 * This component provides a sign-in interface for users, allowing them to authenticate with the application.
 */
'use client';

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md">
        {isClient && (
          <SignIn 
            afterSignInUrl="/" 
            redirectUrl="/"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-lg",
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
