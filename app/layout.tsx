import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navigation from "@/components/NavbarClient";
import { neobrutalism } from "@clerk/themes";
import InfoBar from "@/components/InfoBar";
import { Bowlby_One, Architects_Daughter } from "next/font/google";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import ScrollToTopButton from "@/components/BackToTop/ScrollToTop";
import { Scroll } from "lucide-react";

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

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
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in";
  const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "/sign-up";

  if (!publishableKey) {
    console.error(
      "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable"
    );
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      afterSignInUrl="/"
      afterSignUpUrl="/"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      appearance={{ baseTheme: neobrutalism }}
    >
       <html lang='en' suppressHydrationWarning className="overflow-x-hidden">
        <body className={` ${bowlbyOne.variable} ${architectsDaughter.variable} overflow-x-hidden lg:pb-0 pb-24`}>
          <ClerkLoading>
            <div className="flex items-center justify-center w-full h-screen text-2xl bg-slate-900">
              Loading...
            </div>
          </ClerkLoading>
          
          <ClerkLoaded>
            <Suspense fallback={<div className="h-24 bg-gray-100"></div>}>
              <Navigation userId={null} />
            </Suspense>
            <Suspense fallback={<div className="h-5 bg-yellow-600"></div>}>
              <InfoBar /> 
            </Suspense>
            <main className="flex flex-col w-full overflow-x-hidden">
              {children}
            </main> 

            <ScrollToTopButton />
            <Footer />
          </ClerkLoaded>
        
        </body>
      </html>
    </ClerkProvider>

);
}
