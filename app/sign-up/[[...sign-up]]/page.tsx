/**
 * Imports the `SignUp` component from the `@clerk/nextjs` library.
 * This component provides a sign-up form for users to create an account.
 */
import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up",
  description: "Create an account at Rettungsanker",
};

// Mark this as a dynamic page to ensure proper rendering in production
export const dynamic = 'force-dynamic';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md">
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
      </div>
    </div>
  );
}
