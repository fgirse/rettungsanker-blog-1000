import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { Bowlby_One, Architects_Daughter } from "next/font/google";
import { Suspense, lazy } from "react";

// Lazy load components that are not critical
const Navigation = lazy(() => import("@/components/NavbarClient"));
const InfoBar = lazy(() => import("@/components/InfoBar"));
const Footer = lazy(() => import("@/components/Footer"));
const ScrollToTopButton = lazy(() => import("@/components/BackToTop/ScrollToTop"));

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

  if (!publishableKey) {
    console.error(
      "CRITICAL: Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable. " +
      "Authentication will not work. Check Vercel environment variables."
    );
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey || ""}
      appearance={{ baseTheme: neobrutalism }}
    >
       <html lang='en' suppressHydrationWarning className="overflow-x-hidden">
        <body className={` ${bowlbyOne.variable} ${architectsDaughter.variable} overflow-x-hidden lg:pb-0 pb-24`}>
          <Suspense fallback={<div className="h-24 bg-gray-100"></div>}>
            <Navigation userId={null} />
          </Suspense>
          <Suspense fallback={<div className="h-5 bg-yellow-600"></div>}>
            <InfoBar /> 
          </Suspense>
          <main className="flex flex-col w-full overflow-x-hidden">
            {children}
          </main> 

          <Suspense fallback={null}>
            <ScrollToTopButton />
          </Suspense>
          <Suspense fallback={<footer className="h-40 bg-yellow-800"></footer>}>
            <Footer />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
