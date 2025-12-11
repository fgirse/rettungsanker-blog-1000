# Production Authentication Deployment Checklist

## 🔴 CRITICAL - Must Do Before Deployment

### 1. Verify Clerk Domain Configuration
**This is the #1 reason authentication fails in production**

```
Go to: https://dashboard.clerk.com
1. Select your application instance
2. Navigate to: Settings → Domains
3. Verify production domain exists:
   ☐ rettungsanker-freiburg.click (main domain)
   ☐ www.rettungsanker-freiburg.click (with www)
4. Type should be "Production"
5. Status should be "Active" (green checkmark)
6. Click "Save" if you made any changes
7. Wait 2-5 minutes for DNS propagation
```

**Test after adding domain:**
```bash
# Visit production URL
https://rettungsanker-freiburg.click/sign-in

# Open browser DevTools (F12)
# Look in Network tab for "clerk" files
# Should load successfully with 200 status
```

### 2. Verify Environment Variables in Vercel
```
Go to: Vercel Dashboard → Project → Settings → Environment Variables

Required variables (Production):
☐ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_[your_key]
☐ CLERK_SECRET_KEY=sk_live_[your_key]

Key checks:
☐ Keys start with pk_live_ and sk_live_ (NOT pk_test_)
☐ Both keys match exactly with Clerk Dashboard API Keys
☐ Apply to all environments (Production, Preview, Development)
☐ Save/Deploy changes
```

**To find your keys:**
1. Go to: https://dashboard.clerk.com
2. Settings → API Keys
3. Copy keys (show full key if needed)

### 3. Verify Pages Are Client Components
```
File: app/sign-in/[[...sign-in]]/page.tsx
Line 1 should be: 'use client';
☐ Verified

File: app/sign-up/[[...sign-up]]/page.tsx
Line 1 should be: 'use client';
☐ Verified
```

## 🟡 IMPORTANT - Do Before First Deployment

### 4. Update ClerkProvider Configuration
```
File: app/layout.tsx
Lines 55-64 should match this pattern:

<ClerkProvider
  publishableKey={publishableKey || ""}
  appearance={{ baseTheme: neobrutalism }}
>

NOT these deprecated props:
✗ signInUrl
✗ signUpUrl
✗ afterSignInUrl
✗ afterSignUpUrl

☐ Verified
```

### 5. Build and Test Locally
```bash
# Clean build
rm -rf .next
npm run build

# Expected output should show:
# ✓ Compiled successfully
# ├ ƒ /sign-in/[[...sign-in]]
# ├ ƒ /sign-up/[[...sign-up]]

☐ Build succeeds

# Start dev server
npm run dev

# Visit http://localhost:3000/sign-in
# Verify Clerk form renders
# Check console for "✓ Clerk loaded successfully"

☐ Form renders locally
☐ No console errors
```

### 6. Middleware Configuration Check
```
File: middleware.ts

Verify public routes include:
☐ '/sign-in(.*)'
☐ '/sign-up(.*)'

Should look like:
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  // ... other public routes
]);

☐ Verified
```

## 🟢 DEPLOYMENT - Ready to Deploy

### 7. Git Commit and Push
```bash
git add -A
git commit -m "Production auth fix: Add domain whitelist and env verification"
git push origin main

# Vercel should auto-deploy
☐ Pushed to GitHub
☐ Vercel deployment triggered
```

### 8. Verify Production Deployment
After Vercel deployment completes:

```bash
# Wait 2-3 minutes for build to complete

# Visit production domain
https://rettungsanker-freiburg.click/sign-in

# Open Browser DevTools (F12)
# Check:
☐ Form renders (not blank)
☐ Console shows "✓ Clerk loaded successfully"
☐ Network tab shows clerk.js file loaded (200 status)
☐ No red errors in console
```

### 9. Test Authentication Flow
```
1. Click "Create account" or similar
2. Enter test email: test@example.com
3. Verify email form appears
4. Enter code (check email or console)
5. Complete signup
6. Should redirect to homepage (/)
7. Verify user is authenticated

☐ Sign-up works end-to-end
☐ Redirect to home succeeds
☐ User appears authenticated
```

### 10. Test Sign-In Flow
```
1. Visit /sign-in
2. Enter email used in step 9
3. Enter code
4. Should redirect to homepage
5. Verify user remains logged in

☐ Sign-in works
☐ Session persists
```

## 🔍 Troubleshooting During Deployment

### Issue: Clerk form doesn't appear on production
**Check these in order:**
1. Domain whitelisted in Clerk Dashboard? → See step 1
2. Environment variables set in Vercel? → See step 2
3. Build succeeded? → Check Vercel logs
4. Page marked as 'use client'? → See step 3
5. Browser cache? → Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Form appears but submission fails
1. Check browser console for CORS error
2. Verify domain is whitelisted (step 1)
3. Verify API keys match (step 2)
4. Restart Vercel deployment

### Issue: Authentication works but redirect fails
1. Check middleware configuration (step 6)
2. Verify ClerkProvider config (step 4)
3. Check protected route patterns

## 📋 Complete Checklist

Pre-Deployment:
- [ ] Clerk domain whitelisted (CRITICAL)
- [ ] Vercel environment variables set (CRITICAL)
- [ ] Pages marked as 'use client'
- [ ] ClerkProvider config simplified
- [ ] Local build succeeds
- [ ] Clerk form renders locally
- [ ] No console errors locally
- [ ] Middleware configured
- [ ] Git committed

Deployment:
- [ ] Pushed to GitHub
- [ ] Vercel deployment started
- [ ] Deployment completed successfully
- [ ] Production domain loads /sign-in
- [ ] Clerk form renders on production
- [ ] No errors in browser console
- [ ] Clerk JS script loads (Network tab)
- [ ] Sign-up flow works end-to-end
- [ ] Sign-in flow works end-to-end
- [ ] User sessions persist

Post-Deployment:
- [ ] Monitor Vercel deployment logs
- [ ] Check Clerk Dashboard for auth activity
- [ ] Test with real user signup/login
- [ ] Monitor for errors in browser console

## 🚀 Quick Deployment Command

```bash
# Everything in one go:

# 1. Clean build
rm -rf .next

# 2. Test build locally
npm run build

# 3. If successful, commit and push
git add -A
git commit -m "Production auth deployment"
git push origin main

# 4. Vercel will auto-deploy
# Wait for deployment to complete (~5 minutes)

# 5. Test production
open https://rettungsanker-freiburg.click/sign-in
# Verify form appears and works
```

## 📞 If All Else Fails

### Step-by-Step Debugging

1. **Check Vercel Logs**
   ```
   Vercel Dashboard → Deployments → Select recent → Logs
   Look for errors containing "Clerk" or "environment"
   ```

2. **Check Clerk Dashboard**
   ```
   https://dashboard.clerk.com → Insights
   Check for failed authentication attempts
   Look for domain-related errors
   ```

3. **Browser Console Debug**
   ```
   Production page → F12 → Console
   Look for errors starting with "Clerk" or "CORS"
   Screenshot any errors
   ```

4. **Test API Keys**
   ```
   Visit: https://your-domain.com/api/debug/clerk-config
   Should show:
   - publishableKeyLoaded: true
   - secretKeyStatus: SET
   ```

5. **Contact Support**
   - Clerk Support: https://dashboard.clerk.com/support
   - Include: Screenshot of error, domain name, error message

## ✅ Success Indicators

Production authentication is working when:
1. ✅ Sign-in page loads Clerk form
2. ✅ Sign-up page loads Clerk form
3. ✅ Can enter email and receive code
4. ✅ Can complete authentication
5. ✅ Redirect to home page works
6. ✅ User session persists
7. ✅ Protected routes work (if applicable)
8. ✅ No errors in browser console
9. ✅ Clerk Dashboard shows auth activity
10. ✅ Real user can sign up/in

---

## Summary

**Most Common Issues:**
1. 🔴 Domain not whitelisted in Clerk Dashboard (80% of cases)
2. 🟡 Environment variables not set in Vercel (15% of cases)
3. 🟢 Page not marked as 'use client' (5% of cases)

**First Action:** Check Clerk Dashboard → Settings → Domains
**Second Action:** Check Vercel → Environment Variables
**Third Action:** Hard refresh browser and check console

Good luck! 🚀
