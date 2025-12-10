"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface UseClerkUserWithRetryReturn {
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  user: any;
  hasValidData: boolean;
  isRetrying: boolean;
  retryCount: number;
}

/**
 * Custom hook to fetch Clerk user data with automatic retry logic.
 * Useful for handling cases where user data is not immediately available
 * (e.g., webhook still processing, metadata not synced yet).
 * 
 * @param maxRetries - Maximum number of retries (default: 5)
 * @returns Object with user data and retry status
 */
export function useClerkUserWithRetry(maxRetries = 5): UseClerkUserWithRetryReturn {
  const { isLoaded, isSignedIn, user } = useUser();
  const [hasValidData, setHasValidData] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    // Check if we have valid user data
    const hasData = user && (user.firstName || user.username || user.primaryEmailAddress);
    
    if (hasData) {
      setHasValidData(true);
      console.log("✅ User data available:", {
        username: user.username,
        firstName: user.firstName,
        email: user.primaryEmailAddress?.emailAddress,
      });
      return;
    }

    // Retry if we haven't exceeded max retries
    if (retryCount < maxRetries) {
      const timeout = setTimeout(() => {
        console.warn(`⚠️  User data not available, retrying... (attempt ${retryCount + 1}/${maxRetries})`);
        setRetryCount(prev => prev + 1);
        
        // Force user reload if available
        if (user?.reload) {
          user.reload().catch((err: any) => {
            console.error("Error reloading user:", err);
          });
        }
      }, 1000 * Math.pow(1.5, retryCount)); // Exponential backoff: 1s, 1.5s, 2.25s, etc.

      return () => clearTimeout(timeout);
    } else {
      // Max retries reached
      console.error(`❌ Max retries (${maxRetries}) reached. User data still unavailable.`);
      setHasValidData(false);
    }
  }, [isLoaded, isSignedIn, user, retryCount, maxRetries]);

  return {
    isLoaded,
    isSignedIn,
    user,
    hasValidData,
    isRetrying: retryCount > 0 && retryCount < maxRetries,
    retryCount,
  };
}
