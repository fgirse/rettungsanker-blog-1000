import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/client(.*)',
  '/api/user(.*)',
  '/api/posts(.*)'
]);

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/about(.*)',
  '/drinks',
  '/sportarena',
  '/wohin',
  '/blog',
  '/projects',
  '/search',
  '/impressum',
  '/api/health(.*)',
  '/api/debug(.*)',
  '/api/webhooks(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // Public routes can be accessed without authentication
  if (isPublicRoute(req)) {
    return; // Allow access
  }

  // If the current route is protected, check authentication
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    
    if (!userId) {
      // If user is not authenticated, redirect to sign-in
      return (await auth()).redirectToSignIn();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
