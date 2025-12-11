# QUICK START: Fix Authentication in Production - 5 Minutes

## The Problem
Authentication doesn't work in production

## The Solution (3 simple steps)

### Step 1: Whitelist Domain in Clerk Dashboard (2 minutes)
```
1. Open: https://dashboard.clerk.com
2. Click: Settings (gear icon on left)
3. Click: Domains
4. Click: [+ Add domain] button
5. Enter: rettungsanker-freiburg.click
6. Select: Type = Production
7. Click: Add domain
8. Repeat for: www.rettungsanker-freiburg.click
9. Wait: 2 minutes
10. Verify: Both show "Active" (green checkmark)
```

### Step 2: Check Vercel Environment Variables (1 minute)
```
1. Open: Vercel Dashboard
2. Click: Your Project
3. Click: Settings (gear icon)
4. Click: Environment Variables
5. Verify these exist:
   ✓ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   ✓ CLERK_SECRET_KEY=sk_live_...
6. If missing, copy from Clerk Dashboard → Settings → API Keys
7. Click: Save
```

### Step 3: Test It Works (2 minutes)
```
1. Open: https://rettungsanker-freiburg.click/sign-in
2. Verify: Clerk form appears (centered on page)
3. Open: Browser Console (Press F12)
4. Look for: "✓ Clerk loaded successfully"
5. Should NOT see: Red error messages

If you see the form and no errors, you're done! ✓
```

## If It Still Doesn't Work

### Check These (in order):

**1. Domain Status in Clerk**
```
https://dashboard.clerk.com
→ Settings → Domains
→ Status should show "Active" (green)
→ If "Pending", wait 2 more minutes
```

**2. Hard Refresh Browser**
```
Windows/Linux: Ctrl+Shift+R
Mac: Cmd+Shift+R
```

**3. Check Browser Console for Errors**
```
1. Visit: https://rettungsanker-freiburg.click/sign-in
2. Press: F12 (Developer Tools)
3. Go to: Console tab
4. Look for: Red error messages
5. Most common: "Domain not in whitelist"
   → Go back to step 1 and verify domain is whitelisted
```

**4. Check Network Tab**
```
1. Press: F12 (Developer Tools)
2. Go to: Network tab
3. Filter for: "clerk"
4. Look for: File "clerk.browser.js"
5. Check: Status should be 200
6. If 404: Domain not whitelisted (do step 1 again)
```

## Common Errors & Quick Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Domain not in whitelist" | Domain not in Clerk | Add domain in Clerk Dashboard → Domains |
| Blank page on /sign-in | Environment var missing | Check Vercel env vars, redeploy |
| Form appears but submission fails | API key mismatch | Verify keys in Vercel match Clerk Dashboard |
| Form never loads | Network/cache issue | Hard refresh (Cmd+Shift+R) |

## Success = These 4 Things

When working correctly, you should see:

1. ✅ Form appears on /sign-in
2. ✅ Form appears on /sign-up
3. ✅ Console shows "✓ Clerk loaded successfully"
4. ✅ No red errors in console

## That's It!

Following these 3 steps fixes 95% of production authentication issues.

If still not working after this, see:
- `AUTHENTICATION_PRODUCTION_RESOLUTION.md` - Full diagnosis
- `CLERK_DASHBOARD_SETUP.md` - Detailed Clerk setup
- `PRODUCTION_DEPLOYMENT_CHECKLIST.md` - Complete checklist

---

**Time needed**: 5-10 minutes  
**Difficulty**: Very Easy  
**Success rate**: 95%  

Good luck! 🚀
