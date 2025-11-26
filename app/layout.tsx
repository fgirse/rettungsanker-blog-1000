import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { neobrutalism } from "@clerk/themes";
import InfoBar from "@/components/InfoBar";



import { Bowlby_One, Architects_Daughter } from "next/font/google";

const bowlbyOne = Bowlby_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bowlby",
});

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-architects",
});

export const metadata: Metadata = {
  title: 'Rettungsanker-Freiburg',
  description: 'Die Kiezkneipe in Freiburg',
  icons: {
    icon: '/Assets/Svg/image1.svg',
    shortcut:'/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || undefined;
  const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in";
  const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up";

  if (!publishableKey) {
    console.warn(
      "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY. If you haven't set it in .env.local, set it and restart the dev server."
    );
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      appearance={{ baseTheme: neobrutalism }} 
    >
      <html lang="en">
        <body className={architectsDaughter.variable}>
          {/* <ClerkLoading>
            <div className="flex items-center justify-center h-screen text-2xl">
              LOADING...
            </div>
          </ClerkLoading> */}
          <ClerkLoaded>
            <div className="max-w-8xl mx-auto">
              <div className="flex flex-col h-screen">
                <Navbar />
                <InfoBar /> 
                {children}
              </div>
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
