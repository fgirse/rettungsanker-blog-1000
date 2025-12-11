# Production Deployment Troubleshooting Guide

## Quick Diagnosis Checklist

### ❌ Blank sign-in/sign-up pages (nothing renders)?

**Step 1: Check page component structure**
```bash
# Should have 'use client' at the top
grep "'use client'" app/sign-in/\[\[\...sign-in\]\]/page.tsx
```

Expected: ✅ `'use client';` on line 1

**Step 2: Verify build generates dynamic routes**
```bash
npm run build | grep "sign-in\|sign-up"
```

Expected: 
```
├ ƒ /sign-in/[[...sign-in]]
├ ƒ /sign-up/[[...sign-up]]
```

Symbol `ƒ` means dynamic = correct for Clerk pages

### ❌ Clerk form loads but authentication doesn't work?

**Step 1: Verify environment variables in Vercel**
```
Vercel Dashboard → Project → Settings → Environment Variables
```

Required variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_`)
- `CLERK_SECRET_KEY` (starts with `sk_`)
- Both should use **production keys** (pk_live_, sk_live_)

**Step 2: Check Clerk Dashboard settings**
```
Clerk Dashboard → Applications → YOUR_APP → Settings → Domains
```

Verify your production domain is whitelisted:
- Example: `rettungsanker-freiburg.click`
- Also include: `www.rettungsanker-freiburg.click`
- Also include: `*.rettungsanker-freiburg.click`

### ❌ Browser console shows Clerk JS errors?

**Check Network tab** for the Clerk JS script:
- Should load from: `https://clerk.[domain].click/npm/@clerk/clerk-js@5/...`
- Should return 200 status
- File size typically 200-300 KB

If 404 or fails to load:
1. Domain not whitelisted in Clerk Dashboard
2. DNS issue with custom domain
3. Clerk service down (rare)

### ❌ Authentication works but redirects don't work?

**Check ClerkProvider configuration** in `app/layout.tsx`:

```typescript
<ClerkProvider
  publishableKey={publishableKey}
  signInUrl="/sign-in"
  signUpUrl="/sign-up"
  afterSignInUrl="/"           // Where to redirect after login
  afterSignUpUrl="/"           // Where to redirect after signup
  signInFallbackRedirectUrl="/"  // Fallback redirect
  signUpFallbackRedirectUrl="/"  // Fallback redirect
>
```

### ❌ Page works locally but not in production?

**Common causes:**

1. **Missing environment variables in Vercel**
   - Solution: Add to Vercel Settings → Environment Variables

2. **Clerk domain not whitelisted**
   - Solution: Go to Clerk Dashboard → Settings → Domains

3. **Browser cache**
   - Solution: Hard refresh (Cmd+Shift+R on Mac)

4. **Different Clerk keys used**
   - Solution: Verify using `pk_live_` keys, not `pk_test_`

## Debugging Tools

### 1. Check Clerk Authentication Status

Create temporary debugging page:

```typescript
// app/api/debug/clerk/route.ts
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId, sessionId } = await auth();
  
  return Response.json({
    authenticated: !!userId,
    userId,
    sessionId,
    timestamp: new Date().toISOString(),
  });
}
```

Then visit: `https://yourdomain.com/api/debug/clerk`

### 2. Browser Console Check

Open browser Developer Tools (F12) → Console tab:

```javascript
// Check if Clerk is loaded
console.log(window.Clerk);

// Should output Clerk object with methods like:
// {
//   load: [Function],
//   isReady: [Boolean],
//   user: [Object],
//   session: [Object],
//   ...
// }
```

### 3. Network Tab Analysis

Open Developer Tools → Network tab, filter for "clerk":

| URL | Status | Size | Duration |
|-----|--------|------|----------|
| clerk.js | 200 | 250 KB | <2s |
| image (profile) | 200 | varies | varies |
| API calls | 200 | varies | varies |

### 4. Vercel Deployment Logs

```bash
# View deployment logs
vercel logs --prod

# Look for errors related to:
# - Next.js build failures
# - Missing environment variables
# - Clerk initialization errors
```

## Common Errors & Solutions

### Error: "Cannot read property 'isReady' of undefined"

**Cause**: Clerk JS not loaded, page not wrapped in ClerkProvider

**Solution**:
1. Check `app/layout.tsx` has `<ClerkProvider>`
2. Verify sign-in page has `'use client'`
3. Check environment variables are set

### Error: "Domain not whitelisted"

**Cause**: Clerk Dashboard doesn't recognize your domain

**Solution**:
1. Go to Clerk Dashboard
2. Settings → Application → Domains
3. Add your production domain
4. Save and wait 1-2 minutes for propagation

### Error: "PublishableKey is undefined"

**Cause**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` not set or has wrong format

**Solution**:
```bash
# Verify key format
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# Should output: pk_live_... (for production)
# Should NOT be: pk_test_... (that's for testing)
```

### Error: "Session expired / invalid"

**Cause**: Using expired test keys or wrong environment

**Solution**:
1. Generate new production keys from Clerk Dashboard
2. Update Vercel environment variables
3. Redeploy with new keys

## Performance Optimization

### 1. Reduce Clerk JS Bundle Size

Add to `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize external scripts
  experimental: {
    optimizePackageImports: ["@clerk/nextjs"],
  },
};

export default nextConfig;
```

### 2. Lazy Load Clerk Components

```typescript
'use client';

import dynamic from 'next/dynamic';

const SignIn = dynamic(() => import('@clerk/nextjs').then(mod => ({
  default: mod.SignIn,
})), {
  loading: () => <div>Loading authentication...</div>,
  ssr: false,
});

export default function SignInPage() {
  return <SignIn />;
}
```

### 3. Preload Clerk JS

Add to `app/layout.tsx`:

```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Preload Clerk JS for faster loading */}
        <link
          rel="preload"
          href="https://clerk.rettungsanker-freiburg.click/npm/@clerk/clerk-js@5/dist/clerk.browser.js"
          as="script"
        />
      </head>
      <body>
        {/* ... */}
      </body>
    </html>
  );
}
```

## Monitoring & Alerts

### 1. Set up Vercel Analytics

In Vercel Dashboard:
- Go to Analytics
- Monitor "sign-in" and "sign-up" page performance
- Alert if response time > 3 seconds

### 2. Monitor Clerk Dashboard

In Clerk Dashboard:
- Go to Insights
- Monitor authentication success rate
- Monitor failed authentication attempts

### 3. Browser Error Tracking

Consider adding error tracking (e.g., Sentry):

```typescript
'use client';

import { useEffect } from 'react';
import * as Sentry from "@sentry/nextjs";

export default function SignInPage() {
  useEffect(() => {
    // Track page view
    Sentry.captureMessage('User visiting sign-in page');
  }, []);

  return (
    // ... SignIn component
  );
}
```

## Rollback Plan

If sign-in/sign-up breaks in production:

### Quick Rollback
```bash
# Revert to previous working commit
git revert <commit-hash>
git push

# Vercel will automatically redeploy previous version
```

### Keep backup version
```bash
# Tag current working version
git tag v1.0.0-working
git push --tags

# Can always rollback to this tag if needed
git checkout v1.0.0-working
```

## Testing Checklist Before Deployment

- [ ] `npm run build` succeeds with no errors
- [ ] Build output shows `ƒ` for sign-in/sign-up routes
- [ ] `npm run dev` works locally
- [ ] Sign-in page renders Clerk form locally
- [ ] Sign-up page renders Clerk form locally
- [ ] Authentication flow works locally
- [ ] Clerk environment variables set in Vercel
- [ ] Domain whitelisted in Clerk Dashboard
- [ ] No console errors in browser DevTools
- [ ] Deployment to Vercel succeeds
- [ ] Production site loads sign-in/sign-up pages
- [ ] Clerk forms render on production
- [ ] Test authentication flow in production

## Emergency Contact

If experiencing critical issues with Clerk in production:

1. **Clerk Support**: https://dashboard.clerk.com/support
2. **Vercel Support**: https://vercel.com/support
3. **Next.js Documentation**: https://nextjs.org/docs
4. **GitHub Issues**: Search for similar issues

## Additional Resources

- [Clerk Next.js Documentation](https://clerk.com/docs/nextjs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Next.js Server/Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-and-client-components)
- [Clerk API Reference](https://clerk.com/docs/reference/backend-api)
