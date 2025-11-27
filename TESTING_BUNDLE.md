# 📋 Sign-Up Synchronization Testing Bundle

Complete testing and debugging tools for Clerk user synchronization with MongoDB.

## 🎯 Quick Reference

### I just set up the app. How do I verify everything works?

```bash
# 1. Check system health
npm run health:check

# 2. Test database connection
npm run test:db

# 3. Simulate user creation
npm run test:signup

# 4. Check all users in database
npm run check:users
```

### I created a user but it's not in MongoDB. What do I do?

```bash
# 1. Debug webhook configuration
npm run debug:webhook

# 2. Monitor for webhook events
npm run monitor:webhook

# 3. Create a test account at http://localhost:3000/sign-up

# 4. Check if user was created
npm run check:users

# 5. Check dashboard access
npm run check:dashboard
```

### I want to test the dashboard with a new user.

```bash
# 1. Create account at http://localhost:3000/sign-up

# 2. Check if user exists
npm run check:users

# 3. Check dashboard status
npm run check:dashboard

# 4. If you need admin access:
npm run promote:admin
```

## 📚 Available Commands

### System Health & Verification

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run health:check` | Full system health check | Status report + recommendations |
| `npm run debug:webhook` | Debug webhook configuration | Config status + setup instructions |
| `npm run check:users` | List all users in MongoDB | User list with details |
| `npm run check:dashboard` | Check dashboard access | Dashboard info + access guide |

### Testing & Simulation

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run test:signup` | Simulate user creation workflow | Step-by-step test results |
| `npm run test:db` | Test MongoDB connection | Connection status |

### Monitoring & Debugging

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run monitor:webhook` | Real-time webhook monitoring | Instructions for webhook watching |
| `npm run sync:metadata` | Sync Clerk metadata for all users | Sync results |
| `npm run promote:admin` | Promote a user to admin | Interactive admin promotion |

### Development

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔧 Troubleshooting Flowchart

```
User signs up at /sign-up
         │
         ▼
    Did user appear
    in MongoDB within
    a few seconds?
         │
    ┌────┴────┐
   YES        NO
    │         │
    ▼         ▼
Check dashboard ──→ Run: npm run debug:webhook
   │                    │
   ├─ Works? ─→ ✅ Good! ├─ Problem found?
   │                    │
   └─ Fails? ┐          └─ No error?
        │    │               │
        ▼    ▼               ▼
      Run:  Run:         Monitor webhook:
      npm   npm          npm run monitor:webhook
      run   run          Create new test account
      check debug        Check logs carefully
      dash  webhook
      board
```

## 📝 Detailed Troubleshooting Guide

### Scenario 1: User Not Appearing in MongoDB

**What to check:**

1. Is the webhook being called?
   ```bash
   npm run monitor:webhook
   # Create test account and watch for logs
   ```

2. Is the webhook configuration correct?
   ```bash
   npm run debug:webhook
   # Check for ❌ marks
   ```

3. Can MongoDB be accessed?
   ```bash
   npm run test:db
   # Should show "Connected to MongoDB"
   ```

4. What's the actual database state?
   ```bash
   npm run check:users
   # Should show recently created users
   ```

**Common causes:**
- ❌ `WEBHOOK_SECRET` is wrong
- ❌ `NEXT_PUBLIC_URL` doesn't match Clerk webhook endpoint
- ❌ MongoDB connection string is wrong
- ❌ Network issues (firewall blocking webhooks)

### Scenario 2: Webhook Received But User Not Saved

**Error message:** "Webhook received from Clerk" but no user in database

**What to check:**

1. Check webhook logs in app console
   ```
   Look for: "❌ Error creating/updating user"
   ```

2. Test user creation directly
   ```bash
   npm run test:signup
   ```

3. Check MongoDB collection
   ```bash
   npm run check:users
   ```

**Common causes:**
- ❌ MongoDB connection timeout
- ❌ Duplicate email or username in database
- ❌ Missing required fields in webhook payload
- ❌ Schema mismatch

### Scenario 3: Clerk Metadata Not Syncing

**Symptom:** User created in MongoDB but Clerk's `publicMetadata` doesn't have `userMongoId`

**What to check:**

1. This is expected to fail silently (webhook still succeeds)

2. Manually sync metadata:
   ```bash
   npm run sync:metadata
   ```

3. Check Clerk Dashboard:
   - Go to Users
   - Click on the user
   - Scroll to "Public Metadata"
   - Should show: `{"userMongoId": "...", "isAdmin": false}`

**Common causes:**
- ⚠️ Clerk API rate limiting (webhook retries should handle this)
- ⚠️ Temporary network issue
- ⚠️ Clerk secret key incorrect

### Scenario 4: Dashboard Access Issues

**Symptom:** Dashboard won't load or shows "Access Denied"

**What to check:**

1. Are you logged in?
   - Check top-right corner for profile/logout button

2. Does user exist in MongoDB?
   ```bash
   npm run check:users
   # Should show your test user
   ```

3. Is the user an admin?
   ```bash
   npm run check:dashboard
   # Shows user status
   ```

4. Does the route exist?
   - Check `app/client` directory exists

**Common causes:**
- ❌ Not logged in to Clerk
- ❌ User not in MongoDB
- ❌ Not enough permissions (admin check)
- ❌ Route not configured

## 🎬 Step-by-Step Testing

### Complete Test Workflow

```bash
# Step 1: Verify system is healthy
npm run health:check
# ✅ Should show all green checks

# Step 2: Test database
npm run test:db
# ✅ Should connect successfully

# Step 3: Simulate user creation
npm run test:signup
# ✅ Should create test user and clean up

# Step 4: Check current users
npm run check:users
# ✅ Should show any existing users

# Step 5: Start the app
npm run dev
# ✅ App should start on port 3000

# Step 6: In another terminal, monitor webhooks
npm run monitor:webhook
# ✅ Waiting for events

# Step 7: Create real test account
# - Go to http://localhost:3000/sign-up
# - Fill in form and sign up

# Step 8: Check webhook logs
# ✅ Watch the monitor:webhook terminal
# Should see: Webhook received, signature verified, user created, metadata synced

# Step 9: Verify in database
npm run check:users
# ✅ Should show your new test user

# Step 10: Test dashboard
npm run check:dashboard
# ✅ Should show access info
# Visit: http://localhost:3000/client
```

## 📊 Understanding the Output

### Health Check Output

```
✅ Environment Variable      - All required env vars are set
✅ File Structure            - All required files exist
✅ MongoDB Connection        - Can connect to database
✅ User Collection          - Collection accessible with X users
✅ Webhook Handler          - File contains all necessary checks
```

### User List Output

```
👤 User 1: John Doe
   Email: john@example.com
   Username: john_doe
   Clerk ID: user_abc123
   Created: 2024-01-15T10:30:00Z
   Admin: ❌ No

👑 Admin User Count: 1
```

### Test Sign-Up Output

```
📋 Simulating user creation workflow...
✅ User created in MongoDB
✅ User retrieved successfully
🧹 Test user cleaned up
```

## 🔐 Security Checklist

- [ ] `WEBHOOK_SECRET` is kept secret (not in git)
- [ ] `CLERK_SECRET_KEY` is kept secret (not in git)
- [ ] `MONGODB_URL` is kept secret (not in git)
- [ ] `.env.local` is in `.gitignore`
- [ ] Webhook signature is verified (Svix)
- [ ] No sensitive data in logs

## 🚀 Production Checklist

Before going to production:

- [ ] All tests pass with `npm run health:check`
- [ ] User creation works end-to-end
- [ ] Webhook is configured in Clerk Dashboard
- [ ] `NEXT_PUBLIC_URL` is set to production domain
- [ ] MongoDB uses production database
- [ ] Logging is set up for monitoring
- [ ] Error alerts are configured
- [ ] Backup/restore procedures are in place

## 📖 Additional Resources

- **Complete Guide:** `SIGNUP_SYNC_COMPLETE_GUIDE.md`
- **Getting Started:** `GETTING_STARTED.md`
- **Webhook Troubleshooting:** `WEBHOOK_TROUBLESHOOTING.md`
- **User Sync Solution:** `USER_SYNC_SOLUTION.md`

## 💡 Pro Tips

1. **Use ngrok for local webhook testing:**
   ```bash
   ngrok http 3000
   # Update NEXT_PUBLIC_URL and webhook endpoint in Clerk Dashboard
   ```

2. **Watch logs in real-time:**
   ```bash
   npm run dev 2>&1 | grep -E "(Webhook|Error|user)"
   ```

3. **Check MongoDB directly:**
   ```bash
   # Use MongoDB Atlas web interface or:
   mongosh "mongodb+srv://user:pass@cluster.mongodb.net/rettungsanker-blog"
   ```

4. **Test webhook manually:**
   - Use Svix CLI or Postman
   - Requires valid Svix signature
   - Better to use Clerk Dashboard webhook test feature

5. **Monitor in production:**
   - Set up log aggregation (e.g., Sentry, DataDog)
   - Configure alerts for webhook failures
   - Track user creation metrics

## 🆘 Still Having Issues?

1. **Read the full guides:**
   - `GETTING_STARTED.md` - Comprehensive setup guide
   - `SIGNUP_SYNC_COMPLETE_GUIDE.md` - Detailed explanation of the entire flow

2. **Run all debugging tools:**
   ```bash
   npm run health:check      # Find what's wrong
   npm run debug:webhook     # Check webhook config
   npm run test:signup       # Simulate the flow
   npm run check:users       # See actual database
   ```

3. **Check the code:**
   - `app/api/webhooks/clerk/route.ts` - Webhook handler
   - `lib/actions/user.js` - User creation logic
   - Look for console logs for detailed errors

4. **Verify environment:**
   - Is `.env.local` properly loaded?
   - Are all variables correct?
   - Is the app actually running?

## 📞 Support

For issues related to:
- **Clerk:** https://clerk.com/support
- **MongoDB:** https://docs.mongodb.com/support/
- **Next.js:** https://nextjs.org/docs
- **Svix Webhooks:** https://docs.svix.com/

---

**Remember:** The most common issue is incorrect or missing environment variables. Always start with:
```bash
npm run debug:webhook
```
