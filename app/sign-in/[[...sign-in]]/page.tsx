/**
 * Imports the `SignIn` component from the `@clerk/nextjs` library.
 * This component provides a sign-in interface for users, allowing them to authenticate with the application.
 */
import { SignIn } from "@clerk/nextjs";

// Mark this page as dynamic since it uses catch-all route [[...sign-in]]
export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md">
        <SignIn 
          
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
