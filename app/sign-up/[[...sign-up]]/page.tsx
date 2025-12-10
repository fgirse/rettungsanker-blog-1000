/**
 * Imports the `SignUp` component from the `@clerk/nextjs` library.
 * This component provides a sign-up form for users to create an account.
 */
import { SignUp } from "@clerk/nextjs";
import { ClerkLoaded } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up",
  description: "Create an account at Rettungsanker",
};

export default function SignUpPage() {
  return (
    <ClerkLoaded>
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <SignUp 
          afterSignUpUrl="/" 
          redirectUrl="/"
        />
      </div>
    </ClerkLoaded>
  );
}
