'use client';

import { SignIn } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure Clerk is fully loaded before showing UI
    if (isLoaded) {
      setIsReady(true);
      // If user is already signed in, redirect to home
      if (userId) {
        router.push('/');
      }
    }
  }, [isLoaded, userId, router]);

  if (!isReady) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-950 to-blue-900">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white rounded-lg shadow-lg",
            },
          }}
        />
      </div>
    </div>
  );
}
