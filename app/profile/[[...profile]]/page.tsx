/**
 * Renders the user's profile information.
 * This component is imported and used within the `Profile` component to display the user's profile details.
 * Enhanced with retry logic to handle webhook delays.
 */
import { UserProfile } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";

const Profile = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;
  
  if (!isAuth) {
    redirect("/");
  }

  let user = null;
  let retries = 0;
  const MAX_RETRIES = 3;

  // Retry fetching user data if not available immediately
  // This handles cases where the Clerk webhook is still processing
  while (!user && retries < MAX_RETRIES) {
    user = await currentUser();
    if (!user) {
      console.warn(`⚠️  User data not available, retrying... (attempt ${retries + 1}/${MAX_RETRIES})`);
      // Wait a bit before retrying (webhook might still be processing)
      await new Promise(resolve => setTimeout(resolve, 500 * (retries + 1)));
      retries++;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-8">
      {user ? (
        <>
          <h1 className="text-2xl text-white mb-4">
            {user.username || user.firstName || "User"}
          </h1>
          <p className="text-gray-300 mb-6 text-sm">
            {user.primaryEmailAddress?.emailAddress || "No email"}
          </p>
          <UserProfile />
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Loading Profile...</h1>
          <p className="text-gray-300 mb-4">
            If this takes too long, please refresh the page or check your Clerk settings.
          </p>
          <a 
            href="/api/health/clerk" 
            className="text-blue-400 underline text-sm"
          >
            Check health status
          </a>
        </div>
      )}
    </div>
  );
};

export default Profile;
