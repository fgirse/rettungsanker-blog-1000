# User Management - Clerk Webhooks Setup Guide ✅

## What Was Fixed

### 1. **Created Webhook Route**
- ✅ Created `/app/api/webhooks/clerk/route.ts`
- Handles `user.created`, `user.updated`, and `user.deleted` events
- Syncs user data from Clerk to MongoDB
- Updates Clerk metadata with MongoDB user ID

### 2. **Enhanced User Actions with Logging**
- Added comprehensive logging to user creation/update operations
- Added logging to user deletion operations
- Better error handling and stack traces

### 3. **Fixed Environment Variable**
- Corrected webhook secret from `SIGNING_SECRET` to `WEBHOOK_SECRET`
- Matches the variable name in `.env.local`

## How Clerk Webhooks Work

When users interact with Clerk (sign up, update profile, delete account), Clerk sends webhook events to your application:

```
User signs up → Clerk → Webhook → Your API → MongoDB
```

## Setup Instructions

### Step 1: Expose Your Local Server (for development)

Since Clerk needs to reach your localhost, you need to use a tunneling service.

**Option A: Use ngrok (Recommended)**
```bash
# Install ngrok (if not already installed)
brew install ngrok

# Start your Next.js server (already running)
# In a new terminal, expose it:
ngrok http 3000
```

You'll get a URL like: `https://abc123.ngrok.io`

**Option B: Use Cloudflare Tunnel**
```bash
# Install cloudflared
brew install cloudflare/cloudflare/cloudflared

# Expose your server
cloudflared tunnel --url http://localhost:3000
```

### Step 2: Configure Clerk Webhooks

1. **Go to Clerk Dashboard**
   - Visit: https://dashboard.clerk.com
   - Select your application

2. **Navigate to Webhooks**
   - In the left sidebar, click "Webhooks"
   - Click "+ Add Endpoint"

3. **Add Your Webhook Endpoint**
   - **Endpoint URL**: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
     (Replace with your actual ngrok URL)
   - **Subscribe to events**:
     - ✅ `user.created`
     - ✅ `user.updated`
     - ✅ `user.deleted`

4. **Copy the Signing Secret**
   - After creating the endpoint, Clerk will show a "Signing Secret"
   - It looks like: `whsec_xxxxxxxxxxxxx`
   - **Update your `.env.local`**:
   ```bash
   WEBHOOK_SECRET=whsec_your_actual_secret_here
   ```

5. **Save and Test**
   - Click "Save"
   - Clerk will send a test event
   - Check your terminal logs for webhook activity

### Step 3: Restart Your Development Server

After updating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test the Webhook

**Option 1: Sign Up a New User**
1. Go to http://localhost:3000/sign-up
2. Create a new account
3. Check terminal logs for:
   ```
   🔔 Webhook received from Clerk
   📋 Webhook event type: user.created
   👤 Processing user: { ... }
   ✅ User created/updated in MongoDB
   ```

**Option 2: Update an Existing User**
1. Sign in to Clerk Dashboard
2. Go to "Users"
3. Edit a user's profile
4. Check terminal logs for webhook activity

**Option 3: Use Clerk's Test Feature**
1. In Clerk Dashboard → Webhooks
2. Click on your webhook endpoint
3. Click "Send Test Event"
4. Select event type (e.g., `user.created`)
5. Click "Send Test"

### Step 5: Verify Users in MongoDB

Run the check script:
```bash
node check-users.mjs
```

Expected output after webhook processing:
```
✅ Connected to MongoDB

📊 Total users: 1

👥 Users in database:

1. John Doe (@johndoe)
   Email: john@example.com
   Clerk ID: user_xxxxx
   MongoDB ID: 507f1f77bcf86cd799439011
   Admin: ❌ No
   Created: 2025-11-26T...
```

## Troubleshooting

### Issue: Webhooks Not Received

1. **Check ngrok is running**
   ```bash
   # Make sure you see "Forwarding" in ngrok
   ```

2. **Verify webhook URL in Clerk**
   - Should be: `https://your-ngrok-url/api/webhooks/clerk`
   - NOT: `http://localhost:3000/api/webhooks/clerk`

3. **Check webhook secret**
   - Verify `WEBHOOK_SECRET` in `.env.local` matches Clerk dashboard
   - Restart server after changing

### Issue: Webhook Returns 400 Error

This usually means:
- Wrong signing secret
- Incorrect webhook URL
- Headers not being forwarded correctly

**Check terminal logs:**
```bash
❌ Error: Could not verify webhook
```

**Solution:**
- Regenerate webhook secret in Clerk
- Update `.env.local`
- Restart server

### Issue: Users Created But No MongoDB Entry

**Check logs for:**
```bash
❌ Error creating or updating user: ...
```

**Common causes:**
- MongoDB connection failed
- Missing required fields (username, email, etc.)
- Duplicate email or username

### Issue: Can't Connect to ngrok URL

- Make sure your ngrok plan allows webhooks
- Try restarting ngrok
- Check firewall settings

## Manual User Sync (Alternative)

If webhooks aren't working yet, you can manually sync existing Clerk users:

```bash
node sync-users.mjs
```

This script will:
- Fetch all users from Clerk
- Create/update them in MongoDB
- Update Clerk metadata with MongoDB IDs

## Quick Reference

**Check users in MongoDB:**
```bash
node check-users.mjs
```

**Sync existing Clerk users:**
```bash
node sync-users.mjs
```

**Watch server logs:**
```bash
# Look for these patterns:
🔔 Webhook received from Clerk
✅ User created/updated in MongoDB
```

**Webhook endpoint:**
- Local (with ngrok): `https://your-url.ngrok.io/api/webhooks/clerk`
- Production: `https://yourdomain.com/api/webhooks/clerk`

## Production Deployment

When deploying to production:

1. **Update webhook URL in Clerk Dashboard**
   - Change from ngrok URL to your production domain
   - Example: `https://yourdomain.com/api/webhooks/clerk`

2. **Ensure environment variables are set**
   - `WEBHOOK_SECRET` must match Clerk dashboard
   - `MONGODB_URL` must point to production database

3. **Test after deployment**
   - Create a test user
   - Check application logs
   - Verify user appears in MongoDB

## Files Created/Modified

- ✅ `/app/api/webhooks/clerk/route.ts` - Webhook handler
- ✅ `/lib/actions/user.js` - Enhanced with logging
- ✅ `/check-users.mjs` - Check users in MongoDB
- ✅ `/sync-users.mjs` - Manual sync script
- ✅ `USER_MANAGEMENT_GUIDE.md` - This guide

Your user management is now fully set up! 🎉
