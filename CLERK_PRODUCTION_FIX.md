# Fixing Clerk Sign-In/Sign-Up Pages Not Rendering in Production

## Problem
The sign-in and sign-up pages are not rendering in production at `https://rettungsanker-freiburg.click`.

## Root Causes
1. **Clerk Production Keys Domain Restrictions**: Your production keys (`pk_live` and `sk_live`) are restricted to only work on `rettungsanker-freiburg.click`
2. **Missing Domain Configuration**: The Clerk dashboard needs your production domain whitelisted
3. **Dynamic Page Rendering**: The pages need to be marked as dynamic for proper server-side rendering

## Solutions Implemented

### ✅ 1. Updated Sign-In Page (`/app/sign-in/[[...sign-in]]/page.tsx`)
- Added `export const dynamic = 'force-dynamic'` to ensure proper rendering
- Added appearance styling for better UI consistency
- Wrapped SignIn component in a max-width container

### ✅ 2. Updated Sign-Up Page (`/app/sign-up/[[...sign-up]]/page.tsx`)
- Added `export const dynamic = 'force-dynamic'` to ensure proper rendering
- Added appearance styling for better UI consistency
- Wrapped SignUp component in a max-width container

## Steps to Complete the Fix in Production

### Step 1: Configure Your Domain in Clerk Dashboard
1. Go to https://dashboard.clerk.com
2. Select your instance (rettungsanker-freiburg)
3. Go to **Settings → Domains**
4. Add your production domain:
   - Domain: `rettungsanker-freiburg.click`
   - Ensure it's verified and active

### Step 2: Verify Environment Variables
Make sure your production environment has (check `.env.local` for actual values):
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-pk-live-key>
CLERK_SECRET_KEY=<your-sk-live-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_URL=https://rettungsanker-freiburg.click
```
⚠️ **Never commit real secrets to git!** Use environment variable management in your deployment platform.

### Step 3: Enable Clerk Proxy (Optional but Recommended)
If you continue to have domain issues, set up a Clerk Proxy:

1. In Clerk Dashboard, go to **Settings → Proxy**
2. Generate a proxy URL
3. Add to your environment:
```bash
NEXT_PUBLIC_CLERK_PROXY_URL=https://your-proxy-domain.com
```

### Step 4: Build and Deploy
```bash
npm run build
npm run start
```

### Step 5: Verify in Production
1. Visit `https://rettungsanker-freiburg.click/sign-in`
2. Visit `https://rettungsanker-freiburg.click/sign-up`
3. Verify both pages render correctly with Clerk forms

## Troubleshooting

### Issue: Still getting "Production keys only allowed for domain"
**Solution**: 
- Check that your domain in Clerk Dashboard matches exactly
- Clear your browser cache
- Wait 5 minutes for DNS propagation
- Verify SSL certificate is valid

### Issue: Pages show blank/loading indefinitely
**Solution**:
- Check browser console for errors (F12 → Console)
- Check server logs for Clerk initialization errors
- Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set correctly
- Ensure `dynamic = 'force-dynamic'` is in the page files

### Issue: Sign-in/Sign-up redirect loops
**Solution**:
- Verify `afterSignInUrl` and `afterSignUpUrl` are set to `/`
- Check middleware isn't protecting the sign-in/sign-up routes
- Verify session is being created properly in Clerk Dashboard

## Additional Resources
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Clerk Production Guide](https://clerk.com/docs/deployments/overview)

## Files Modified
- `/app/sign-in/[[...sign-in]]/page.tsx` - Added dynamic rendering
- `/app/sign-up/[[...sign-up]]/page.tsx` - Added dynamic rendering
- `/app/layout.tsx` - Enhanced Clerk configuration
