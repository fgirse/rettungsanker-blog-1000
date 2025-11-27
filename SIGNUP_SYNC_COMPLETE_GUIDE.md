# 🚀 Complete Sign-Up User Synchronization Guide

## Overview

This guide explains how user synchronization works in the Clerk + Next.js + MongoDB application, specifically focusing on the user creation flow when someone signs up through Clerk.

## Architecture

```
┌─────────────────┐
│  User Signs Up  │
│    via Clerk    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Clerk Webhook Event    │
│  (user.created)         │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  POST /api/webhooks/clerk            │
│  - Verify webhook signature (Svix)   │
│  - Extract user data from Clerk      │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  createOrUpdateUser() Function       │
│  - Connect to MongoDB                │
│  - Create/Update user document       │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Update Clerk Metadata               │
│  - Store MongoDB ID in Clerk         │
│  - Set admin status                  │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  ✅ User Created & Synchronized      │
│  - Available in MongoDB              │
│  - Metadata synced to Clerk          │
└──────────────────────────────────────┘
```

## Step-by-Step: What Happens During Sign-Up

### 1. User Initiates Sign-Up
- User navigates to `/sign-up`
- Clerk Sign-Up component is displayed
- User fills in email, password, name, etc.

### 2. Clerk Creates User
- Clerk validates the information
- User account is created in Clerk's system
- Clerk generates a unique `user_id`

### 3. Webhook is Triggered
- Clerk sends a webhook event to your configured endpoint
- Event type: `user.created`
- Payload includes: user ID, name, email, profile picture, etc.

### 4. Webhook Handler Processes User
The webhook handler (`/api/webhooks/clerk/route.ts`) performs:

```typescript
// 1. Verify webhook signature (Svix verification)
// 2. Parse the webhook payload
// 3. Call createOrUpdateUser()
// 4. If successful, update Clerk metadata with MongoDB ID
```

### 5. MongoDB User Creation
The `createOrUpdateUser()` function:
- Connects to MongoDB
- Finds or creates a user document with:
  - `clerkId`: Clerk's user ID
  - `email`: User's email address
  - `firstName`: User's first name
  - `lastName`: User's last name
  - `username`: User's unique username
  - `isAdmin`: Admin flag (default: false)

### 6. Clerk Metadata Update
After MongoDB user is created:
- Webhook handler updates Clerk's public metadata
- Stores MongoDB user ID in `publicMetadata.userMongoId`
- Sets admin status in `publicMetadata.isAdmin`
- Uses retry logic (3 attempts with exponential backoff)

## Environment Configuration

### Required Environment Variables (.env.local)

```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Webhook Configuration
WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=https://your-domain.com

# MongoDB
MONGODB_URL=mongodb+srv://...

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Getting the WEBHOOK_SECRET

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **Webhooks** (or **Backend API** → **Webhooks**)
4. Click **Create Endpoint** or view existing endpoint
5. Set URL to: `https://your-domain.com/api/webhooks/clerk`
6. Select events: `user.created`, `user.updated`, `user.deleted`
7. Copy the signing secret

## Testing Locally

### 1. Start the Application

```bash
npm run dev
```

### 2. Run Configuration Debug

```bash
node debug-webhook-config.mjs
```

This will verify:
- ✅ Environment variables are set
- ✅ Webhook endpoint exists
- ✅ MongoDB connection string is configured

### 3. Simulate User Creation

```bash
node test-signup-sync.mjs
```

This will:
- ✅ Simulate the `createOrUpdateUser()` function
- ✅ Test MongoDB user creation
- ✅ Verify user retrieval
- ✅ Clean up test data

### 4. Manual Testing with Live Webhook

1. Open http://localhost:3000/sign-up
2. Create a test account with:
   - Email: test_[timestamp]@example.com
   - Password: SecurePassword123!
   - First Name: Test
   - Last Name: User
3. Monitor application logs for:
   - ✅ "Webhook received from Clerk"
   - ✅ "Webhook signature verified"
   - ✅ "User created/updated in MongoDB"
   - ✅ "Updated Clerk metadata"
4. Verify in MongoDB:
   ```bash
   node check-users.mjs
   ```
5. Check Clerk Dashboard:
   - Navigate to the user's profile
   - Verify `publicMetadata` contains `userMongoId`

## Troubleshooting

### Issue: Webhook Not Being Called

**Symptoms:**
- No webhook logs in console
- User created in Clerk but not in MongoDB

**Solutions:**
1. Verify webhook endpoint is configured in Clerk Dashboard
2. Check that `WEBHOOK_SECRET` is correct
3. Ensure `NEXT_PUBLIC_URL` is correct and accessible
4. Use ngrok for local testing:
   ```bash
   ngrok http 3000
   ```
   Then set `NEXT_PUBLIC_URL=https://your-ngrok-url.ngrok-free.app`

### Issue: Webhook Called But MongoDB User Not Created

**Symptoms:**
- Webhook logs show "Webhook signature verified"
- Error logs mention MongoDB connection

**Solutions:**
1. Verify `MONGODB_URL` is correct
2. Check MongoDB connection:
   ```bash
   node test-mongodb.mjs
   ```
3. Verify MongoDB user has correct permissions
4. Check for duplicate email/username in database

### Issue: Clerk Metadata Not Updated

**Symptoms:**
- User created in MongoDB
- But Clerk's public metadata doesn't have `userMongoId`

**Solutions:**
1. This is expected to fail silently (webhook still succeeds)
2. Check application logs for retry attempts
3. Run metadata sync script:
   ```bash
   node sync-clerk-metadata.mjs
   ```
4. Manually update metadata via Clerk Dashboard or API

### Issue: "WEBHOOK_SECRET not configured"

**Symptoms:**
- Webhook handler returns 500 error
- Log: "WEBHOOK_SECRET is not set in environment"

**Solutions:**
1. Verify `.env.local` has `WEBHOOK_SECRET` set
2. Restart application: `npm run dev`
3. Check for typos in variable name
4. Ensure `.env.local` is not gitignored (it should be)

### Issue: "Signature verification failed"

**Symptoms:**
- Webhook handler returns 400 error
- Log: "Webhook verification failed"

**Solutions:**
1. Verify `WEBHOOK_SECRET` matches Clerk Dashboard
2. If using ngrok, make sure Clerk endpoint is updated to ngrok URL
3. Try creating a new webhook endpoint in Clerk Dashboard
4. Verify Svix headers are present

## Key Files

### Webhook Handler
- **File:** `app/api/webhooks/clerk/route.ts`
- **Purpose:** Receives and processes Clerk webhook events
- **Functions:**
  - POST: Main webhook handler
  - updateClerkMetadataWithRetry: Updates Clerk metadata with retry logic

### User Creation
- **File:** `lib/actions/user.js`
- **Function:** `createOrUpdateUser()`
- **Purpose:** Creates or updates user in MongoDB
- **Function:** `deleteUser()`
- **Purpose:** Deletes user from MongoDB

### User Model
- **File:** `lib/models/user.model.js`
- **Purpose:** Defines MongoDB user schema
- **Fields:** clerkId, email, firstName, lastName, username, profilePicture, isAdmin

### MongoDB Connection
- **File:** `lib/mongodb/mongoose.js`
- **Purpose:** Manages MongoDB connection pool
- **Supports:** Both `MONGODB_URI` and `MONGODB_URL` env vars

## Verification Checklist

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- [ ] `CLERK_SECRET_KEY` is set
- [ ] `WEBHOOK_SECRET` is set
- [ ] `NEXT_PUBLIC_URL` points to correct domain/ngrok
- [ ] Webhook endpoint configured in Clerk Dashboard
- [ ] `MONGODB_URL` is set and accessible
- [ ] Application can connect to MongoDB
- [ ] Webhook handler file exists at `app/api/webhooks/clerk/route.ts`
- [ ] User model defined in MongoDB
- [ ] Test sign-up works and creates user in MongoDB
- [ ] Clerk metadata contains MongoDB user ID after creation

## Debugging Commands

```bash
# Test MongoDB connection
node test-mongodb.mjs

# Check all users in database
node check-users.mjs

# Test user creation logic
node test-signup-sync.mjs

# Debug webhook configuration
node debug-webhook-config.mjs

# Sync existing users' Clerk metadata
node sync-clerk-metadata.mjs

# Promote user to admin
node promote-admin.mjs [user_id]
```

## Advanced: Custom User Fields

To add custom fields to users (e.g., phone, department, etc.):

1. **Update Schema** (`lib/models/user.model.js`):
   ```javascript
   const userSchema = new mongoose.Schema({
     // ...existing fields...
     phone: { type: String },
     department: { type: String },
   }, { timestamps: true });
   ```

2. **Update Webhook** (`app/api/webhooks/clerk/route.ts`):
   ```typescript
   // Extract custom fields from payload if available
   // Store in MongoDB
   ```

3. **Sync from Clerk Metadata** (optional):
   - Store custom fields in Clerk's private metadata
   - Retrieve in webhook and store in MongoDB

## Performance Considerations

- Webhook handler runs asynchronously in background
- Metadata update uses retry with exponential backoff
- MongoDB connection uses connection pooling
- Svix signature verification is fast (< 1ms)

## Security Considerations

- ✅ Webhook signature verified (Svix)
- ✅ `WEBHOOK_SECRET` never exposed to client
- ✅ MongoDB connection string secured in `.env.local`
- ✅ User data validated before storage
- ✅ No sensitive data in logs

## Next Steps

After sign-up synchronization is verified:

1. Test dashboard access for newly created users
2. Implement role-based access control
3. Add user profile update webhooks
4. Implement user analytics tracking
5. Add email notifications on account creation
