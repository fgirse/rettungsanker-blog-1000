# Action Guide: Fix Sign-In/Sign-Up Pages in Production

## Current Status
✅ Code is ready
❌ Production configuration needs verification

## What Was Fixed
1. ✅ Sign-in and sign-up page code (simplified, no 'use client' directive)
2. ✅ Middleware now explicitly allows `/sign-in` and `/sign-up` routes
3. ✅ Build completes successfully with no errors

## What You Need to Do (Production)

### STEP 1: Verify Clerk Environment Variables in Vercel
**This is the most likely cause of the issue**

1. Go to https://vercel.com
2. Select your project
3. Click **Settings**
4. Click **Environment Variables**
5. Look for these variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

**They MUST exist and MUST start with:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...`
- `CLERK_SECRET_KEY=sk_live_...`

**If they're missing or use `pk_test_` or `sk_test_`:**
- Get the correct production keys from: https://dashboard.clerk.com
- Select your instance → API Keys
- Copy `pk_live_*` and `sk_live_*` values
- Update them in Vercel

---

### STEP 2: Verify Clerk Domain Whitelist
1. Go to https://dashboard.clerk.com
2. Select your instance
3. Click **Settings** → **Domains**
4. Look for `rettungsanker-freiburg.click` in the list
5. If missing:
   - Click **Add domain**
   - Enter: `rettungsanker-freiburg.click`
   - Type: **Production**
   - Save

---

### STEP 3: Redeploy Your Application
1. Go to Vercel
2. Go to **Deployments**
3. Find the latest deployment
4. Click the **3-dot menu** (⋯)
5. Click **Redeploy**
6. **IMPORTANT**: Uncheck "Use existing Build Cache" to ensure fresh build
7. Click **Redeploy**
8. Wait for deployment to complete

---

### STEP 4: Test the Pages
After deployment completes:

1. Visit: `https://rettungsanker-freiburg.click/sign-in`
   - ✅ Should show Clerk sign-in form
   - ✅ Should NOT show 404 or redirect

2. Visit: `https://rettungsanker-freiburg.click/sign-up`
   - ✅ Should show Clerk sign-up form
   - ✅ Should NOT show 404 or redirect

3. Try signing in/signing up
   - ✅ Should create account
   - ✅ Should redirect to home page after success

---

### STEP 5: Troubleshooting

**If pages still don't work:**

#### Check Browser Console (F12)
Open DevTools → Console tab and look for errors like:
- `Clerk: Missing publishable key` → Missing env var
- `Domain not whitelisted` → Add domain in Clerk
- `CORS error` → Whitelist domain in Clerk

#### Check Vercel Logs
1. Go to Vercel Deployments
2. Click on the deployment
3. View **Logs**
4. Look for Clerk-related errors

#### Test Health Endpoints
```bash
# Should return JSON with authentication status
curl https://rettungsanker-freiburg.click/api/health/clerk

# If working, you should see:
{
  "status": "ok",
  "authenticated": false,
  "clerkLoaded": true
}
```

---

## Quick Checklist

Before and after changes:

- [ ] Environment variables set in Vercel (both keys)
- [ ] Both keys start with `pk_live_` and `sk_live_`
- [ ] Domain whitelisted in Clerk Dashboard
- [ ] Redeployed with cache cleared
- [ ] `/sign-in` page loads without 404
- [ ] `/sign-up` page loads without 404
- [ ] Clerk forms are visible
- [ ] Can attempt to sign in/sign up
- [ ] Browser console has no Clerk errors
- [ ] Vercel logs show no errors

---

## Code Changes Made

### Middleware Enhancement
```typescript
// NEW: Explicit public route matcher
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',     // ← NEW
  '/sign-up(.*)',     // ← NEW
  '/',
  '/about(.*)',
  '/drinks',
  // ... other public routes
]);

// NEW: Allow public routes without auth check
if (isPublicRoute(req)) {
  return; // Allow access
}
```

### Why This Helps
- Explicitly allows sign-in/sign-up routes
- Prevents any middleware interference
- Makes intent clear and maintainable

---

## Support Resources

- **Clerk Dashboard**: https://dashboard.clerk.com
- **Vercel Dashboard**: https://vercel.com
- **Health Check**: `https://rettungsanker-freiburg.click/api/health/clerk`
- **Debug Guide**: `https://rettungsanker-freiburg.click/api/debug/webhook-status`

---

## Expected Timeline

- ⏱️ Environment variable check: 2 minutes
- ⏱️ Domain whitelist check: 2 minutes
- ⏱️ Redeploy: 5-10 minutes
- ⏱️ Total: ~15-20 minutes

---

## Success Indicators

✅ You know it's working when:
1. `/sign-in` loads and shows Clerk form
2. `/sign-up` loads and shows Clerk form
3. You can enter email/password
4. You can create an account
5. You're redirected to home page after sign-up
6. You're redirected to home page after sign-in

---

**Commit**: `a75498f`
**Status**: 🚀 Ready to deploy
