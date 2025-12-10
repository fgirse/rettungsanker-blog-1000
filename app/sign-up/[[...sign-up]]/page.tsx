/**
 * Imports the `SignUp` component from the `@clerk/nextjs` library.
 * This component provides a sign-up form for users to create an account.
 */
'use client';

import { SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md">
        {isClient && (
          <SignUp 
            afterSignUpUrl="/" 
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
