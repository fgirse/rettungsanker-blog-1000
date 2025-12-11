# Clerk Dashboard Configuration - Step by Step

## The Main Issue: Domain Not Whitelisted

This is the #1 reason why sign-in/sign-up doesn't work in production.

## Solution: Add Your Domain to Clerk Dashboard

### Step 1: Go to Clerk Dashboard
```
1. Open: https://dashboard.clerk.com
2. Sign in with your account
3. Select the application for "Rettungsanker-Freiburg"
```

### Step 2: Navigate to Domains
```
In the left sidebar:
→ Settings (gear icon)
→ Click on "Domains"
```

You should see a page like:
```
Domains
Applications need to be added to your domains list
to work in production. Add your domain now.

[+ Add domain] button
```

### Step 3: Add Your Production Domain

**Click the [+ Add domain] button**

Enter your domain:
```
Domain: rettungsanker-freiburg.click
Type: Production (dropdown)
```

Click "Add domain"

### Step 4: Add WWW Domain (Optional but Recommended)

**Click the [+ Add domain] button again**

Enter:
```
Domain: www.rettungsanker-freiburg.click
Type: Production
```

Click "Add domain"

### Step 5: Verify DNS (May Be Needed)

After adding domains, you might see:
```
Status: Pending
Verification needed
```

If you see DNS verification instructions:
1. Go to your domain registrar (where you bought rettungsanker-freiburg.click)
2. Add the CNAME record Clerk provides
3. Wait 2-5 minutes for DNS to propagate
4. Come back to Clerk and click "Verify"

**If you don't see verification instructions, skip this step**

### Step 6: Verify Status is Active

After a few minutes, you should see:
```
✅ rettungsanker-freiburg.click (Active)
✅ www.rettungsanker-freiburg.click (Active)
```

If status is still "Pending", wait a few more minutes and refresh the page.

## Verify API Keys Are Set

### Step 1: Go to API Keys

In Clerk Dashboard:
```
Settings (gear icon)
→ API Keys
```

### Step 2: Check Your Keys

You should see:
```
Publishable Key
pk_live_[YOUR_PUBLISHABLE_KEY_HERE]

Secret Key
sk_live_[YOUR_SECRET_KEY_HERE]
```

**Important:**
- Publishable key starts with `pk_live_`
- Secret key starts with `sk_live_`
- If they start with `pk_test_` or `sk_test_`, you're in test mode

### Step 3: Copy Keys to Vercel

Now that you have the keys:

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add or update:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = pk_live_...
   - `CLERK_SECRET_KEY` = sk_live_...
4. Click "Save"
5. Vercel will automatically redeploy

## Verify Everything is Connected

### In Clerk Dashboard

```
Settings → Domains
☑️ rettungsanker-freiburg.click (Active)
☑️ www.rettungsanker-freiburg.click (Active)

Settings → API Keys
☑️ Publishable Key shown (pk_live_...)
☑️ Secret Key shown (sk_live_...)
```

### In Vercel Dashboard

```
Settings → Environment Variables
☑️ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_live_...
☑️ CLERK_SECRET_KEY = sk_live_...

Deployments → Status
☑️ Latest deployment: Success (green checkmark)
```

## Test It Works

### Visit Your Production Site

```bash
# Open in browser:
https://rettungsanker-freiburg.click/sign-in

# What you should see:
1. Page loads
2. Clerk sign-in form appears (centered on page)
3. Email input field visible
4. Submit button visible
5. No error messages

# If this works, your authentication is configured correctly!
```

### Check Browser Console

Press F12 to open Developer Tools:
1. Go to Console tab
2. Look for: "✓ Clerk loaded successfully"
3. Should NOT see red error messages
4. Should NOT see "Domain not whitelisted" error

### Test Sign-In Flow

1. Enter a test email: test@example.com
2. Click "Continue" or "Sign In"
3. You should see email verification screen
4. If stuck, check console for errors (F12)

## Common Issues & Fixes

### Issue: "Domain not whitelisted"

**Error message looks like:**
```
Error: Domain not in whitelist
```

**Fix:**
1. Go to Clerk Dashboard → Settings → Domains
2. Check if your domain is listed
3. If NOT listed → Add it (see Step 3 above)
4. If listed as "Pending" → Wait 5 minutes for activation
5. Hard refresh browser (Ctrl+Shift+R) and try again

### Issue: "pk_test_ instead of pk_live_"

**Error:**
```
Using test keys (pk_test_) in production
```

**Fix:**
1. In Clerk Dashboard → Settings → API Keys
2. You should be seeing LIVE keys (pk_live_)
3. If showing test keys, make sure you're on the right environment/instance
4. Copy the LIVE keys (pk_live_ and sk_live_)
5. Update in Vercel environment variables

### Issue: Clerk form doesn't load

**Symptoms:**
- Page loads
- But Clerk form never appears
- Just blank white space

**Fix Steps:**
1. Check browser console (F12) for red errors
2. Go to Network tab (F12), look for "clerk" files
3. If clerk.js shows 404 or fails → Domain not whitelisted
4. If clerk.js loads fine (200) → Check Vercel logs

## Quick Reference

**What Clerk Dashboard should look like:**

```
✅ Domains section shows:
   - rettungsanker-freiburg.click (Active)
   - www.rettungsanker-freiburg.click (Active)

✅ API Keys section shows:
   - Publishable Key: pk_live_...
   - Secret Key: sk_live_...

✅ Webhooks section shows:
   - Endpoint: https://rettungsanker-freiburg.click/api/webhooks/clerk
   - Status: Enabled
```

**What Vercel should look like:**

```
✅ Environment Variables:
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_live_...
   - CLERK_SECRET_KEY = sk_live_...

✅ Recent Deployment:
   - Status: Success (green checkmark)
   - Shows "Deployed" timestamp
```

## Steps to Verify Everything Works

1. **Clerk Dashboard**: Add domain + Verify API keys
2. **Vercel**: Set environment variables + Trigger redeploy
3. **Wait**: 2-5 minutes for changes to take effect
4. **Browser**: Visit /sign-in and verify form loads
5. **Console**: Check F12 console for "Clerk loaded successfully"
6. **Test**: Try entering email and continuing
7. **Done**: If form appears and email loads, it's working!

## Support

If after following all these steps you still have issues:

1. **Check Clerk Dashboard Status**
   - Domains section should show all domains as "Active"
   - Not "Pending" or "Error"

2. **Check Vercel Logs**
   - Vercel Dashboard → Deployments → Recent deployment → Logs
   - Look for lines containing "Clerk" or "Environment"

3. **Check Browser Console**
   - Press F12 on production site
   - Look for red error messages
   - Screenshot any errors

4. **Contact Clerk Support**
   - Go to https://dashboard.clerk.com
   - Click "Help" in bottom right
   - Describe your domain whitelist issue

Good luck! 🚀
