/**
 * Imports the `SignUp` component from the `@clerk/nextjs` library.
 * This component provides a sign-up form for users to create an account.
 */
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-900">Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <SignUp 
          afterSignUpUrl="/" 
          redirectUrl="/"
          routing="path"
          path="/sign-up"
        />
      </div>
    </Suspense>
  );
}
