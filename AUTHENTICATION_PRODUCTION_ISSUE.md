# Production Authentication Issue - Comprehensive Diagnosis

## Symptoms
- Clerk forms may not be rendering
- Authentication flow doesn't work
- Users can't sign in/up in production

## Root Causes to Check

### 1. **Clerk Publishable Key Not Found**
```typescript
// In layout.tsx
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
}
```

**Action**: Verify in Vercel:
```
Settings → Environment Variables
Check: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
```

### 2. **Domain Not Whitelisted in Clerk**
This is the **MOST COMMON** issue.

**Action**: Go to Clerk Dashboard:
```
1. https://dashboard.clerk.com
2. Select your application instance
3. Settings → Domains
4. Verify your production domain is listed:
   - rettungsanker-freiburg.click
   - www.rettungsanker-freiburg.click
   - *.rettungsanker-freiburg.click (optional)
5. If not, add them with type "Production"
6. Wait 2-5 minutes for changes to take effect
```

### 3. **Clerk JS Script Not Loading**
**Action**: Open browser DevTools on production sign-in page:
```
1. Press F12 → Network tab
2. Filter for "clerk"
3. Look for: clerk.rettungsanker-freiburg.click
4. Should see file "clerk.browser.js" with 200 status
5. If 404 or fails: Domain not whitelisted (see #2)
```

### 4. **CORS/Domain Mismatch**
**Action**: Check browser console for errors:
```
1. Press F12 → Console tab
2. Look for red errors starting with "Clerk" or "CORS"
3. Common error: "Domain not in whitelist"
```

### 5. **API Keys Mismatch**
**Action**: Verify keys in Vercel match Clerk Dashboard:
```
Vercel Environment Variables:
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (should start with pk_live_)
- CLERK_SECRET_KEY (should start with sk_live_)

Clerk Dashboard → API Keys:
- Should match exactly
- Use LIVE keys, not TEST keys
```

## Quick Verification Checklist

- [ ] Visit production URL `/sign-in`
- [ ] Clerk form renders?
  - If NO → Check domain whitelisting (issue #2)
  - If YES → Continue
- [ ] Try entering email → Does it proceed?
  - If NO → Check #1, #5
  - If YES → Check #3, #4
- [ ] Complete authentication → Redirect works?
  - If NO → Check middleware/redirect config
  - If YES → ✅ Working

## Environment Variable Verification

Run this test endpoint:

```typescript
// app/api/debug/clerk-config/route.ts
export async function GET() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY ? "SET" : "NOT SET";
  
  return Response.json({
    publishableKeyLoaded: !!publishableKey,
    publishableKeyFormat: publishableKey?.substring(0, 10) + "...",
    secretKeyStatus: secretKey,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
```

Then visit: `https://yourdomain.com/api/debug/clerk-config`

Expected output:
```json
{
  "publishableKeyLoaded": true,
  "publishableKeyFormat": "pk_live_...",
  "secretKeyStatus": "SET",
  "environment": "production",
  "timestamp": "2025-12-11T..."
}
```

## Fix Priority Order

### 🔴 CRITICAL - Do First
1. **Verify domain is whitelisted in Clerk Dashboard**
   - This fixes 80% of production auth issues

### 🟡 IMPORTANT - Do Second
2. **Verify environment variables in Vercel**
   - Check keys are `pk_live_` and `sk_live_`, not `pk_test_`

### 🟢 OPTIONAL - Do Third
3. **Check browser console for specific errors**
   - May indicate other configuration issues

## Testing Flow

```bash
# 1. Local testing (should work)
npm run dev
# Visit http://localhost:3000/sign-in
# Clerk form should render

# 2. Production testing
# Visit https://rettungsanker-freiburg.click/sign-in
# Clerk form should render
# Try signing in with test email

# 3. If fails, check:
# - Clerk Dashboard domain whitelist
# - Vercel environment variables
# - Browser console errors (F12)
```

## Detailed Troubleshooting

### Scenario 1: Form doesn't render at all
```
Causes:
1. Domain not whitelisted ← MOST LIKELY
2. Environment variables not set
3. Page not marked as 'use client'

Fix:
1. Whitelist domain in Clerk Dashboard
2. Add env vars to Vercel
3. Verify page has 'use client' at top
```

### Scenario 2: Form renders but submission fails
```
Causes:
1. CORS issue
2. API key mismatch
3. Secret key not set

Fix:
1. Check domain whitelist again
2. Verify keys match Clerk Dashboard
3. Restart Vercel deployment
```

### Scenario 3: Authentication works but redirect fails
```
Causes:
1. afterSignInUrl not set correctly
2. Middleware blocking redirect
3. Protected route not configured

Fix:
1. Check layout.tsx ClerkProvider config
2. Verify middleware allows authenticated users
3. Check protected route patterns match
```

## Next Steps

1. **Immediately**: Check Clerk Dashboard domain whitelist
2. **Then**: Verify environment variables in Vercel
3. **Test**: Visit production `/sign-in` page
4. **Debug**: Check browser console for specific errors
5. **Fix**: Address any errors found

If issue persists after these steps, check `PRODUCTION_TROUBLESHOOTING.md` for advanced debugging.
