/**
 * Imports the `SignIn` component from the `@clerk/nextjs` library.
 * This component provides a sign-in interface for users, allowing them to authenticate with the application.
 */
import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In",
  description: "Sign in to Rettungsanker",
};

// Mark this as a dynamic page to ensure proper rendering in production
export const dynamic = 'force-dynamic';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md">
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
      </div>
    </div>
  );
}
