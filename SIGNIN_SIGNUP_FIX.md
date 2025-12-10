# Fix: Sign-In/Sign-Up Pages Not Connecting

## Root Cause
Your application is using **production Clerk keys** (`pk_live` and `sk_live`) which are **locked to the domain `rettungsanker-freiburg.click`**. When running locally on `localhost:3000`, these keys fail to initialize properly, causing the SignIn and SignUp components to render empty.

## Solution: Use Development Keys for Local Development

### Step 1: Get Your Development Keys
1. Go to **https://dashboard.clerk.com**
2. Select your instance (rettungsanker-freiburg)
3. Go to **API Keys** in the left sidebar
4. You'll see TWO sections:
   - **Frontend API Key** (starts with `pk_test`)
   - **Backend API Key** (starts with `sk_test`)

Copy both keys.

### Step 2: Update `.env.local` for Local Development
Replace the production keys with your development keys:

```bash
# For LOCAL DEVELOPMENT - use pk_test and sk_test
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_DEV_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_DEV_KEY_HERE

# Localhost for local development
NEXT_PUBLIC_URL=http://localhost:3000

# Keep these the same
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Step 3: Restart Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Test Sign-In and Sign-Up
- Visit: `http://localhost:3000/sign-in`
- Visit: `http://localhost:3000/sign-up`
- Both pages should now display the Clerk sign-in/sign-up forms

## For Production Deployment

When deploying to production at `https://rettungsanker-freiburg.click`, ensure your environment variables are:

```bash
# Production keys - retrieve from Clerk Dashboard (API Keys section)
# Use your pk_live and sk_live keys from your Clerk instance
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_PRODUCTION_KEY
CLERK_SECRET_KEY=sk_live_YOUR_PRODUCTION_KEY

# Production URL
NEXT_PUBLIC_URL=https://rettungsanker-freiburg.click

# Domain must be whitelisted in Clerk Dashboard → Settings → Domains
```

## Environment Variable Management

**Best Practice**: Use environment variable management in your deployment platform:
- **Vercel**: Set variables in Project Settings → Environment Variables
- **Other platforms**: Use their secrets/environment variable management

**Never commit sensitive keys to git!**

## Troubleshooting

### Issue: Still blank after restart
**Solution**: 
- Hard refresh browser (Cmd+Shift+R on Mac)
- Clear browser cache
- Check browser console (F12 → Console) for errors
- Verify you're using correct `pk_test` (not `pk_live`)

### Issue: "Publishable key is invalid"
**Solution**: 
- Verify the key starts with `pk_test` for development
- Copy the EXACT key from Clerk Dashboard
- Make sure there are no extra spaces

### Issue: Clerk script failing to load
**Solution**:
- Check Network tab (F12 → Network)
- Look for `clerk.com` requests
- If they fail, verify your Clerk Dashboard is accessible
- Check if you have ad blockers blocking Clerk

## Files to Monitor
- `.env.local` - Contains sensitive keys (never commit!)
- `app/layout.tsx` - ClerkProvider configuration
- `app/sign-in/[[...sign-in]]/page.tsx` - SignIn component
- `app/sign-up/[[...sign-up]]/page.tsx` - SignUp component

## Important Notes
- ✅ Development keys (`pk_test`) work on any localhost domain
- ❌ Production keys (`pk_live`) only work on whitelisted domains
- Each environment should have its own keys
- Never use production keys for local development
