'use client';

/**
 * Sign-Up Page
 * 
 * Uses Clerk's SignUp component for user registration.
 * Marked as 'use client' because SignUp requires client-side interactivity.
 * 
 * If the form doesn't appear:
 * 1. Check browser console (F12) for errors
 * 2. Verify NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set in environment
 * 3. Check Clerk Dashboard that your domain is whitelisted
 */
import { SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if Clerk is loaded
    const checkClerk = () => {
      if (typeof window !== 'undefined' && (window as any).Clerk) {
        setIsReady(true);
        console.log("✓ Clerk loaded successfully");
      } else {
        console.warn("⚠ Clerk not yet loaded, waiting...");
        setTimeout(checkClerk, 100);
      }
    };
    
    checkClerk();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md">
        {!isReady && (
          <div className="text-center text-gray-300 animate-pulse">
            <p>Loading authentication...</p>
          </div>
        )}
        <SignUp 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full shadow-lg",
            },
          }}
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
}
