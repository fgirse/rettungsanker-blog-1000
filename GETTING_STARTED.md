# 🚀 Getting Started: User Sign-Up & Synchronization

Welcome! This guide will help you verify and test the user sign-up synchronization system in your Clerk + Next.js + MongoDB application.

## Quick Start

### 1. Prerequisites
- ✅ Application running: `npm run dev`
- ✅ MongoDB connected (verified in logs)
- ✅ Clerk configured with webhooks
- ✅ Environment variables set (.env.local)

### 2. Verify System Health

```bash
# Check if everything is configured correctly
npm run health:check

# Or with node directly
node health-check.mjs
```

This will verify:
- ✅ Environment variables are set
- ✅ All required files exist
- ✅ MongoDB connection works
- ✅ Webhook handler is configured
- ✅ User collection is accessible

### 3. Test User Creation

```bash
# Simulate the user creation process
npm run test:signup

# Or with node directly
node test-signup-sync.mjs
```

This will:
- ✅ Simulate a Clerk webhook event
- ✅ Test the `createOrUpdateUser()` function
- ✅ Verify MongoDB user creation and retrieval
- ✅ Test database cleanup

### 4. Create a Real Test Account

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Navigate to sign-up:**
   - Open http://localhost:3000/sign-up
   - Fill in the form with test data
   - Click "Sign Up"

3. **Monitor webhook in real-time:**
   ```bash
   # In a new terminal
   npm run monitor:webhook
   ```

4. **Check if user was created in MongoDB:**
   ```bash
   npm run check:users
   ```

5. **Verify dashboard access:**
   ```bash
   npm run check:dashboard
   ```

## Troubleshooting

### Problem: Webhook Not Being Called

**Solution:**
1. Check webhook configuration in Clerk Dashboard
2. Verify `WEBHOOK_SECRET` is correct
3. Test locally with ngrok:
   ```bash
   ngrok http 3000
   ```
4. Update `NEXT_PUBLIC_URL` in .env.local with ngrok URL
5. Update webhook endpoint in Clerk Dashboard

**Debug:**
```bash
npm run debug:webhook
```

### Problem: User Created in Clerk but Not in MongoDB

**Solution:**
1. Check MongoDB connection:
   ```bash
   npm run test:db
   ```
2. Verify webhook logs for errors
3. Check MongoDB user document format
4. Try recreating a test user

**Debug:**
```bash
npm run check:users
npm run debug:webhook
```

### Problem: Dashboard Not Loading

**Solution:**
1. Verify user exists in MongoDB
2. Check if you're logged in to Clerk
3. Verify `/client` route exists
4. Check browser console for errors

**Debug:**
```bash
npm run check:dashboard
```

## Available Commands

```bash
# Testing & Verification
npm run test:signup          # Simulate user creation
npm run test:db             # Test MongoDB connection
npm run check:users         # List all users in MongoDB
npm run check:dashboard     # Check dashboard access
npm run health:check        # Full system health check

# Configuration & Debugging
npm run debug:webhook       # Debug webhook configuration
npm run monitor:webhook     # Monitor webhook events in real-time
npm run sync:metadata       # Sync Clerk metadata for all users
npm run promote:admin       # Promote user to admin

# Development
npm run dev                 # Start development server
npm run build               # Build for production
npm run start               # Start production server
npm run lint                # Run ESLint
```

## System Architecture

```
┌─────────────────────┐
│   User Signs Up     │
│     at /sign-up     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Clerk Creates User Account     │
│  Generates Clerk ID             │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Clerk Sends Webhook Event      │
│  Event Type: user.created       │
└──────────┬──────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  POST /api/webhooks/clerk            │
│  1. Verify webhook signature         │
│  2. Extract user data                │
│  3. Call createOrUpdateUser()        │
│  4. Update Clerk metadata (retry)    │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  User Document Created in MongoDB    │
│  Fields: clerkId, email, name, etc   │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  ✅ User Fully Synchronized          │
│  Available in MongoDB & Clerk        │
└──────────────────────────────────────┘
```

## Key Files

| File | Purpose |
|------|---------|
| `app/api/webhooks/clerk/route.ts` | Webhook handler - processes Clerk events |
| `lib/actions/user.js` | User CRUD operations for MongoDB |
| `lib/models/user.model.js` | MongoDB user schema definition |
| `lib/mongodb/mongoose.js` | MongoDB connection management |
| `middleware.ts` | Clerk middleware for authentication |
| `.env.local` | Environment variables configuration |

## Common Scenarios

### Scenario 1: First-Time Setup

```bash
# 1. Start the app
npm run dev

# 2. Verify everything is working
npm run health:check

# 3. Create a test account
# - Go to http://localhost:3000/sign-up
# - Fill in form and click Sign Up

# 4. Check if user was created
npm run check:users

# 5. Test dashboard
npm run check:dashboard
```

### Scenario 2: Webhook Not Working

```bash
# 1. Check configuration
npm run debug:webhook

# 2. Monitor for webhooks
npm run monitor:webhook

# 3. Create test account
# - Go to http://localhost:3000/sign-up
# - Fill in form and click Sign Up

# 4. Check logs and database
npm run check:users
```

### Scenario 3: Promote User to Admin

```bash
# 1. Get user's Clerk ID
npm run check:users
# Look for: Clerk ID: user_abc123xyz

# 2. Promote user
npm run promote:admin
# Follow prompts to enter Clerk ID

# 3. Verify admin status
npm run check:users
```

## Environment Variables Checklist

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk Dashboard
- [ ] `CLERK_SECRET_KEY` - From Clerk Dashboard
- [ ] `WEBHOOK_SECRET` - From Clerk Webhook Settings
- [ ] `NEXT_PUBLIC_URL` - Your app URL (or ngrok for local testing)
- [ ] `MONGODB_URL` - MongoDB connection string
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Set to `/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Set to `/sign-up`

## Production Deployment

Before deploying to production:

1. **Update URLs:**
   ```bash
   NEXT_PUBLIC_URL=https://your-production-domain.com
   ```

2. **Update Webhook in Clerk Dashboard:**
   - Set endpoint to: `https://your-production-domain.com/api/webhooks/clerk`

3. **Verify Credentials:**
   - All environment variables are set correctly
   - MongoDB connection works
   - Webhook secret is correct

4. **Test:**
   ```bash
   npm run health:check
   npm run test:signup
   ```

5. **Deploy:**
   ```bash
   npm run build
   npm start
   ```

6. **Monitor:**
   - Watch webhook delivery in Clerk Dashboard
   - Monitor MongoDB for new users
   - Check application logs for errors

## Getting Help

### Debug Tools Available

1. **Health Check** - Comprehensive system status
   ```bash
   npm run health:check
   ```

2. **Webhook Debug** - Configuration verification
   ```bash
   npm run debug:webhook
   ```

3. **User Listing** - See all users in MongoDB
   ```bash
   npm run check:users
   ```

4. **Dashboard Check** - Verify dashboard access
   ```bash
   npm run check:dashboard
   ```

5. **Real-time Monitoring** - Watch webhook events
   ```bash
   npm run monitor:webhook
   ```

### Check Logs

Look for these patterns in your application logs:

✅ **Success:**
```
🔔 Webhook received from Clerk
✅ Webhook signature verified
👤 Processing user
✅ User created/updated in MongoDB
✅ Updated Clerk metadata
```

❌ **Errors:**
```
❌ WEBHOOK_SECRET is not set
❌ Webhook verification failed
❌ Error creating/updating user
❌ Error updating Clerk metadata
```

## Next Steps

After verifying user synchronization works:

1. **Test all routes** - Ensure dashboard and other protected routes work
2. **Set up monitoring** - Configure log aggregation for production
3. **Create test users** - Create several test accounts and verify all sync correctly
4. **Test admin features** - Promote a user to admin and test admin-only features
5. **Performance testing** - Load test webhook handling
6. **Security review** - Audit webhook signature verification and error handling

## Support Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Svix Webhook Documentation](https://docs.svix.com)

---

**Need help?** Check the troubleshooting guides:
- `SIGNUP_SYNC_COMPLETE_GUIDE.md` - Detailed synchronization guide
- `WEBHOOK_TROUBLESHOOTING.md` - Webhook-specific troubleshooting
- `USER_SYNC_SOLUTION.md` - User synchronization solutions
