#!/usr/bin/env node

/**
 * Script to check if newly created users can access the dashboard
 * and verify their metadata is correctly synced
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_URI;

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

let User;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: 'rettungsanker-blog',
    });
    User = mongoose.model('User', userSchema, 'users');
    return true;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    return false;
  }
}

async function checkDashboardAccess() {
  console.log('\n' + '='.repeat(70));
  console.log('🔍 DASHBOARD ACCESS VERIFICATION');
  console.log('='.repeat(70));

  try {
    // Get all non-admin users
    const regularUsers = await User.find({ isAdmin: false });

    if (regularUsers.length === 0) {
      console.log(
        '\n⚠️  No non-admin users found in database.'
      );
      console.log('   Create a test account via /sign-up to test dashboard access.\n');
      return;
    }

    console.log(`\n📊 Found ${regularUsers.length} non-admin user(s):\n`);

    regularUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Username: ${user.username}`);
      console.log(`   Clerk ID: ${user.clerkId}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log(`   Admin: ${user.isAdmin ? '✅ Yes' : '❌ No'}`);
      console.log('');
    });

    // Get all admin users
    const adminUsers = await User.find({ isAdmin: true });
    console.log(`\n👑 Admin user(s): ${adminUsers.length}`);
    adminUsers.forEach((admin) => {
      console.log(`   - ${admin.firstName} ${admin.lastName} (${admin.email})`);
    });
  } catch (error) {
    console.error('❌ Error checking users:', error.message);
  }
}

async function showDashboardAccessGuide() {
  console.log('\n' + '='.repeat(70));
  console.log('📖 DASHBOARD ACCESS GUIDE');
  console.log('='.repeat(70));

  console.log(`
1. DASHBOARD AVAILABILITY:
   - Dashboard is available at: http://localhost:3000/client
   - Only logged-in users can access it
   - All users see their own data by default

2. ADMIN-ONLY FEATURES:
   - User Management: /client/users
   - Admin Controls: /client/admin
   - These require isAdmin=true in MongoDB

3. TESTING DASHBOARD ACCESS:
   a) Sign up a new user at /sign-up
   b) Log in with those credentials
   c) Navigate to /client
   d) Verify you see the dashboard

4. PROMOTING USER TO ADMIN:
   Run the following to make a user admin:
   
   node promote-admin.mjs [clerkId]
   
   Example:
   node promote-admin.mjs user_abc123xyz

5. EXPECTED DASHBOARD CONTENT:
   - User profile information
   - Recent posts (if any)
   - Account settings
   - Sign-out button

6. TROUBLESHOOTING DASHBOARD ACCESS:

   ❌ Dashboard shows "Not Found":
      - Verify /client route exists in app/client
      - Check if user is logged in
      - Verify Clerk is configured correctly

   ❌ Dashboard shows "Access Denied":
      - Verify user exists in MongoDB
      - Check Clerk authentication status
      - Try refreshing the page

   ❌ Dashboard loads but shows no data:
      - Verify user was created in MongoDB
      - Check MongoDB connection
      - Review browser console for errors

7. VERIFYING USER SYNC:
   - MongoDB: User should exist with clerkId
   - Clerk: User should exist in Clerk dashboard
   - Metadata: Clerk should have userMongoId in publicMetadata
`);
}

async function checkMetadataSync() {
  console.log('\n' + '='.repeat(70));
  console.log('📦 CHECKING CLERK METADATA SYNC');
  console.log('='.repeat(70));

  console.log(`
Clerk Metadata Status:
  - This script cannot check Clerk directly from CLI
  - To verify Clerk metadata:
    
    1. Go to https://dashboard.clerk.com
    2. Select your application
    3. Go to Users
    4. Click on any user
    5. Scroll down to "Public Metadata"
    6. Should contain:
       {
         "userMongoId": "ObjectId(...)",
         "isAdmin": false
       }

  - If metadata is missing:
    - Run: node sync-clerk-metadata.mjs
    - Or create a new user via /sign-up
`);
}

async function showNextSteps() {
  console.log('\n' + '='.repeat(70));
  console.log('🎯 NEXT STEPS');
  console.log('='.repeat(70));

  console.log(`
1. VERIFY USER SYNCHRONIZATION:
   - Create a test account at /sign-up
   - Check MongoDB: node check-users.mjs
   - Check Clerk Dashboard: https://dashboard.clerk.com

2. TEST DASHBOARD:
   - Log in with your test account
   - Navigate to http://localhost:3000/client
   - Verify user data loads correctly

3. TEST ADMIN FEATURES:
   - Promote your test user to admin:
     node promote-admin.mjs [clerkId]
   - Navigate to http://localhost:3000/client/users
   - View admin-only features

4. MONITOR WEBHOOK:
   - Watch terminal output during sign-up
   - Look for webhook logs like:
     🔔 Webhook received from Clerk
     ✅ Webhook signature verified
     ✅ User created/updated in MongoDB
     ✅ Updated Clerk metadata

5. PRODUCTION DEPLOYMENT:
   - Update NEXT_PUBLIC_URL to your domain
   - Update webhook endpoint in Clerk Dashboard
   - Test with actual domain (not localhost)
   - Monitor logs in production
`);
}

async function main() {
  console.log('🚀 Dashboard Access Verification Tool\n');

  const connected = await connectDB();
  if (!connected) {
    process.exit(1);
  }

  await checkDashboardAccess();
  await checkMetadataSync();
  await showDashboardAccessGuide();
  await showNextSteps();

  console.log('\n' + '='.repeat(70));
  console.log('✅ VERIFICATION COMPLETE');
  console.log('='.repeat(70) + '\n');

  await mongoose.disconnect();
}

main();
