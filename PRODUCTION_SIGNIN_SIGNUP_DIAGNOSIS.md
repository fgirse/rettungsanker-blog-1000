# Production Issue: No Access to Sign-In and Sign-Up Pages

## Symptoms
- Users cannot access `/sign-in` or `/sign-up` pages in production
- Pages show 404 errors or redirect to home page
- Local development works fine

## Root Causes (Check in Order)

### 1. **Missing or Incorrect Clerk Environment Variables** (MOST LIKELY)

The ClerkProvider in your layout needs these variables in production:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_KEY
CLERK_SECRET_KEY=sk_live_YOUR_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

**Check in Vercel/your deployment platform:**
1. Go to Project Settings → Environment Variables
2. Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
3. Verify `CLERK_SECRET_KEY` is set
4. Verify they start with `pk_live_` and `sk_live_` (production keys)

**Problem**: If these are missing or using `pk_test_` keys, ClerkProvider fails to initialize, causing routing issues.

---

### 2. **Middleware Blocking Access**

Your middleware might be interfering. Check `/middleware.ts`:

```typescript
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/client(.*)',
  '/api/user(.*)',
  '/api/posts(.*)'
]);
```

**Sign-in and sign-up are NOT in the protected list**, so they should be accessible.

**If still blocked**, add explicit bypass:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/client(.*)',
  '/api/user(.*)',
  '/api/posts(.*)'
]);

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
  '/impressum'
]);

export default clerkMiddleware(async (auth, req) => {
  // Public routes can be accessed without auth
  if (isPublicRoute(req)) {
    return; // Allow access
  }

  // Protected routes require authentication
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    
    if (!userId) {
      return (await auth()).redirectToSignIn();
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

---

### 3. **Clerk Domain Whitelist**

Even though the pages exist, Clerk might not load if your domain isn't whitelisted.

**Fix:**
1. Go to https://dashboard.clerk.com
2. Select your instance
3. Settings → Domains
4. Ensure `rettungsanker-freiburg.click` is listed
5. Add if missing

---

### 4. **Clerk SDK Version Issue**

Your pages are server components (correct), but older Clerk SDK might not support them.

**Check your package.json:**
```bash
npm list @clerk/nextjs
```

Should be `6.30.0` or higher.

**If outdated:**
```bash
npm install @clerk/nextjs@latest
```

---

### 5. **Build Cache Issue**

Sometimes old builds are cached in production.

**Solution:**
1. Rebuild and redeploy
2. Clear Vercel cache if using Vercel:
   - Go to Project → Settings → Deployments
   - Click the 3-dots menu → Redeploy
   - Ensure "Use existing Build Cache?" is unchecked

---

## Diagnostic Steps

### Step 1: Check Environment Variables
Run in your production environment:
```bash
# Check if variables are set
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo $CLERK_SECRET_KEY
```

Expected: Both should print values starting with `pk_live_` and `sk_live_`

### Step 2: Check Browser Console
1. Visit `https://rettungsanker-freiburg.click/sign-in`
2. Open DevTools (F12)
3. Check Console tab for errors
4. Look for Clerk-related errors

### Step 3: Check Server Logs
Look for these patterns in your deployment logs:
```
Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Error initializing Clerk
ClerkProvider failed
```

### Step 4: Test Directly
Try accessing:
- `https://rettungsanker-freiburg.click/sign-in`
- `https://rettungsanker-freiburg.click/sign-up`

If 404: Pages are not being served
If blank page or redirect: Clerk initialization issue
If forms visible: Working!

---

## Quick Fix Checklist

- [ ] Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set in deployment
- [ ] Verify `CLERK_SECRET_KEY` is set in deployment
- [ ] Confirm keys start with `pk_live_` and `sk_live_`
- [ ] Check Clerk domain whitelist includes your production domain
- [ ] Rebuild and redeploy (clear cache)
- [ ] Check browser console for errors
- [ ] Check server logs for Clerk errors
- [ ] Update @clerk/nextjs to latest version if old

---

## Solution Order (Most to Least Likely)

1. **Missing environment variables** - 70% chance this is the issue
2. **Wrong API keys (test instead of live)** - 20% chance
3. **Domain not whitelisted** - 5% chance
4. **Middleware blocking** - 3% chance
5. **SDK version issue** - 2% chance

---

## Recommended Action

**Do this first:**
1. Go to your deployment platform (Vercel)
2. Check Environment Variables
3. Verify both Clerk keys are set and start with `pk_live_` and `sk_live_`
4. Redeploy
5. Test `/sign-in` and `/sign-up`

If still not working, check the logs and share what you see.

---

**Files to check:**
- `/app/layout.tsx` - ClerkProvider configuration
- `/middleware.ts` - Route protection
- `/app/sign-in/[[...sign-in]]/page.tsx` - Sign-in page
- `/app/sign-up/[[...sign-up]]/page.tsx` - Sign-up page

**Environment file:**
- `.env.local` - Should have Clerk keys (for reference only, use deployment platform for production)
