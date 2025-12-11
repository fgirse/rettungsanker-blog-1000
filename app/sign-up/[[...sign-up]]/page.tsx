/**
 * Imports the `SignUp` component from the `@clerk/nextjs` library.
 * This component provides a sign-up form for users to create an account.
 */
import { SignUp } from "@clerk/nextjs";

// Mark this page as dynamic since it uses catch-all route [[...sign-up]]
export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md">
        <SignUp 
          
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
