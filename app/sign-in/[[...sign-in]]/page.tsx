/**
 * Imports the `SignIn` component from the `@clerk/nextjs` library.
 * This component provides a sign-in interface for users, allowing them to authenticate with the application.
 */
import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In",
  description: "Sign in to Rettungsanker",
};

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <SignIn 
        afterSignInUrl="/" 
        redirectUrl="/"
      />
    </div>
  );
}
