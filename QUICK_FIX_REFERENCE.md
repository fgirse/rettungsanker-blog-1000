# Quick Start: Fix Production User Data Access

## The Problem
Users can sign in but can't see their profile/user data in production.

## The Solution (5 steps)

### 1. Verify Clerk Domain Whitelist ⚠️ MOST IMPORTANT
```
https://dashboard.clerk.com
→ Select instance
→ Settings → Domains
→ ✓ Must include: rettungsanker-freiburg.click
→ Add if missing (type: Production)
```

### 2. Verify Webhook is Enabled
```
https://dashboard.clerk.com
→ Settings → Webhooks
→ ✓ Endpoint: https://rettungsanker-freiburg.click/api/webhooks/clerk
→ ✓ Status: Enabled
→ ✓ Secret: matches WEBHOOK_SECRET env var
```

### 3. Verify Environment Variables
Ensure in deployment platform (Vercel):
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_XXX`
- `CLERK_SECRET_KEY=sk_live_XXX`
- `WEBHOOK_SECRET=whsec_XXX`
- `MONGODB_URL=mongodb+srv://...`
- `NEXT_PUBLIC_URL=https://rettungsanker-freiburg.click`

### 4. Test Sign-In
```
1. Go to: https://rettungsanker-freiburg.click/sign-in
2. Sign in with test account
3. Should redirect to home
4. Navigate to: /profile or /client
5. Wait ~1-2 seconds
6. User data should appear
```

### 5. Debug if Not Working
**Check health endpoint:**
```bash
curl https://rettungsanker-freiburg.click/api/health/clerk
# After signing in - should show: authenticated: true, hasUserData: true
```

**Check webhook logs:**
```
https://dashboard.clerk.com
→ Settings → Webhooks
→ Click endpoint
→ Scroll to "Recent events"
→ Look for user.created event
→ Status should be 200
→ If not 200, check error message
```

## What Was Fixed

| Issue | Fix |
|-------|-----|
| Profile loads but shows nothing | Added retry logic (3-5 retries with backoff) |
| No feedback while loading | Added loading messages and retry count display |
| Can't debug issues | Added `/api/health/clerk` and `/api/debug/webhook-status` endpoints |
| Metadata sync sometimes fails | Increased webhook retry count from 3 to 5 |

## New Endpoints

**Health Check** (no auth needed):
```
GET /api/health/clerk
→ Returns: authentication status, user data availability, metadata
```

**Debug Guide** (requires sign-in):
```
GET /api/debug/webhook-status
→ Returns: debugging instructions, common issues, checklist
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Profile shows "Loading..." | Check domain whitelist in Clerk |
| Webhook failed (non-200) | Check WEBHOOK_SECRET matches |
| Still blank after waiting | Try health endpoint to diagnose |
| User not in database | Check MongoDB connection + webhook logs |

## Files Changed

1. `/app/profile/[[...profile]]/page.tsx` - Retry logic
2. `/app/client/page.tsx` - Better loading states
3. `/lib/hooks/useClerkUserWithRetry.ts` - New retry hook
4. `/app/api/health/clerk/route.ts` - Health check
5. `/app/api/debug/webhook-status/route.ts` - Debug guide
6. `/app/api/webhooks/clerk/route.ts` - More retries

## Need Help?

1. Check `/api/health/clerk` endpoint
2. Check `/api/debug/webhook-status` endpoint
3. Read `PRODUCTION_USER_DATA_FIX.md` in repo
4. Check Clerk Dashboard webhook logs
5. Check server logs for errors

---

**✅ Ready to test in production!**
