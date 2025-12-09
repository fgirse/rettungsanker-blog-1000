/**
 * Imports the `SignIn` component from the `@clerk/nextjs` library.
 * This component provides a sign-in interface for users, allowing them to authenticate with the application.
 */
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-900">Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <SignIn 
          afterSignInUrl="/" 
          redirectUrl="/"
          routing="path"
          path="/sign-in"
        />
      </div>
    </Suspense>
  );
}
