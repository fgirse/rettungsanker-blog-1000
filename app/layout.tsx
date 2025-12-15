import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, ClerkLoading } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Navigation from "@/components/MenuBar";
import InfoBar from "@/components/InfoBar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/BackToTop/ScrollToTop";
import { Bowlby_One, Architects_Daughter } from "next/font/google";
import { Suspense } from "react";

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
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/Assets/Svg/image1.svg',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

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
      <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
        <body
          className={`${bowlbyOne.variable} ${architectsDaughter.variable} overflow-x-hidden lg:pb-0 pb-24`}
        >
          <ClerkLoading>
            <div className="text-2xl">LOADING...</div>
          </ClerkLoading>

          <Suspense fallback={<div className="h-24 bg-gray-100"></div>}>
            <Navigation />
          </Suspense>

          <Suspense fallback={<div className="h-5 bg-yellow-600"></div>}>
            <InfoBar />
          </Suspense>

          <main>{children}</main>

          <ScrollToTopButton />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}