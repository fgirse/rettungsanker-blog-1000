# 🔐 Clerk User Sign-Up Synchronization - Quick Start

## ⚡ TL;DR - Get Started in 30 Seconds

```bash
# 1. Verify system is healthy
npm run health:check

# 2. Start the app
npm run dev

# 3. Create a test account at http://localhost:3000/sign-up

# 4. Check if user was created in MongoDB
npm run check:users

# ✅ Done! If user appears, everything works
```

## 🆘 Something Not Working?

### User not appearing in MongoDB?

```bash
# Debug configuration
npm run debug:webhook

# Monitor webhooks in real-time
npm run monitor:webhook
# Then create another test account
```

### Need to see what's actually in the database?

```bash
npm run check:users
```

### Dashboard not loading?

```bash
npm run check:dashboard
```

### System not healthy?

```bash
npm run health:check
# Shows exactly what's wrong
```

## 📚 Complete Guides

| Guide | When to Use |
|-------|------------|
| **GETTING_STARTED.md** | First time setup or confused where to start |
| **SIGNUP_SYNC_COMPLETE_GUIDE.md** | Understand the entire flow and architecture |
| **TESTING_BUNDLE.md** | Need to debug or test something specific |
| **IMPLEMENTATION_SUMMARY.md** | Want to know what was fixed and why |

## 🔧 All Available Commands

```bash
# 🏥 Health & Status
npm run health:check          # Full system check
npm run test:db              # Test database connection
npm run check:users          # List all users
npm run check:dashboard      # Check dashboard access

# 🧪 Testing & Simulation
npm run test:signup          # Simulate user creation flow

# 🔍 Debugging
npm run debug:webhook        # Debug webhook configuration
npm run monitor:webhook      # Watch for webhook events

# ⚙️ Maintenance
npm run sync:metadata        # Sync Clerk metadata
npm run promote:admin        # Make a user admin

# 🚀 Development
npm run dev                  # Start development server
npm run build                # Build for production
npm run start                # Start production server
npm run lint                 # Run linter
```

## ✅ How It Works (Simple Version)

1. User signs up at `/sign-up`
2. Clerk creates the account
3. Clerk sends webhook to `/api/webhooks/clerk`
4. We create user in MongoDB
5. We update Clerk with MongoDB ID
6. ✅ User synced and can access dashboard

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "User created in Clerk but not in MongoDB" | Run `npm run debug:webhook` - check WEBHOOK_SECRET |
| "Webhook not being called" | Update webhook URL in Clerk Dashboard to match `NEXT_PUBLIC_URL` |
| "Dashboard shows 'Not Found'" | Verify user exists: `npm run check:users` |
| "Everything seems down" | Run `npm run health:check` |

## 🔐 Environment Variables Needed

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_URL=https://your-domain.com
MONGODB_URL=mongodb+srv://...
```

## 🌐 Local Testing with Webhook

To test webhooks locally, use ngrok:

```bash
# 1. Install ngrok (if not already installed)
brew install ngrok

# 2. Start ngrok
ngrok http 3000

# 3. Copy the URL (e.g., https://abc123.ngrok-free.app)

# 4. Update .env.local
NEXT_PUBLIC_URL=https://abc123.ngrok-free.app

# 5. Update Clerk Dashboard webhook endpoint to:
# https://abc123.ngrok-free.app/api/webhooks/clerk

# 6. Start your app
npm run dev

# 7. Create test account and watch for webhook
npm run monitor:webhook
```

## 📊 Testing Checklist

- [ ] `npm run health:check` passes
- [ ] `npm run test:signup` completes successfully
- [ ] Can create account at `/sign-up`
- [ ] User appears in `npm run check:users`
- [ ] Webhook logs show successful processing
- [ ] Clerk metadata contains MongoDB ID
- [ ] Dashboard loads at `/client`

## 🚀 Deploying to Production

1. Update `.env.local` with production values:
   ```bash
   NEXT_PUBLIC_URL=https://your-production-domain.com
   MONGODB_URL=mongodb+srv://... (production)
   ```

2. Update webhook in Clerk Dashboard:
   - URL: `https://your-production-domain.com/api/webhooks/clerk`

3. Run final test:
   ```bash
   npm run health:check
   ```

4. Build and deploy:
   ```bash
   npm run build
   npm start
   ```

## 🎯 Key Files

- **Webhook Handler:** `app/api/webhooks/clerk/route.ts`
- **User Logic:** `lib/actions/user.js`
- **User Schema:** `lib/models/user.model.js`
- **Config:** `.env.local`
- **Middleware:** `middleware.ts`

## 💡 Pro Tips

1. Watch real-time logs while creating an account:
   ```bash
   npm run dev 2>&1 | grep -E "(Webhook|Error|user|created)"
   ```

2. Check MongoDB directly:
   ```bash
   mongodb_compass # or web interface at atlas.mongodb.com
   ```

3. Save webhook responses for debugging:
   - In Clerk Dashboard → Webhooks → Endpoints → Recent attempts

4. Use multiple terminals:
   - Terminal 1: `npm run dev` (app)
   - Terminal 2: `npm run monitor:webhook` (watch for events)
   - Terminal 3: `npm run check:users` (verify users)

## 📞 Still Stuck?

1. **Read the guides:**
   - `GETTING_STARTED.md` - Comprehensive setup
   - `SIGNUP_SYNC_COMPLETE_GUIDE.md` - Detailed explanation

2. **Run diagnostics:**
   ```bash
   npm run health:check        # What's broken?
   npm run debug:webhook       # Configuration issues?
   npm run test:signup         # Logic issues?
   npm run check:users         # Database issues?
   ```

3. **Check the code:**
   - Look for `console.log` statements showing what went wrong
   - Compare with expected logs in guides

4. **Verify environment:**
   - Are all variables in `.env.local`?
   - Did you restart the app after changing `.env.local`?
   - Is the app actually running on port 3000?

## 🎓 Understanding the Logs

### ✅ Success - You should see:
```
🔔 Webhook received from Clerk
✅ Webhook signature verified
👤 Processing user
✅ User created/updated in MongoDB
✅ Updated Clerk metadata
```

### ❌ Error - Watch for:
```
❌ WEBHOOK_SECRET is not set
❌ Webhook verification failed
❌ Error creating/updating user
❌ Error updating Clerk metadata
```

---

**Questions?** Check the full documentation:
- 📖 `GETTING_STARTED.md` - Start here
- 📋 `SIGNUP_SYNC_COMPLETE_GUIDE.md` - Deep dive
- 🧪 `TESTING_BUNDLE.md` - Troubleshooting
- ✅ `IMPLEMENTATION_SUMMARY.md` - What was done

**Status:** ✅ **PRODUCTION READY**
