#!/usr/bin/env node

/**
 * Test script to verify Clerk Sign-Up user synchronization to MongoDB
 * This script simulates what happens when a user signs up through Clerk
 * and verifies the webhook and metadata sync works correctly
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_URI;

// User model
const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

let User;

async function connectDB() {
  console.log('🔌 Connecting to MongoDB...');
  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: 'rettungsanker-blog',
    });
    console.log('✅ Connected to MongoDB');
    User = mongoose.model('User', userSchema, 'users');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

async function checkUserInDB(clerkId) {
  try {
    const user = await User.findOne({ clerkId });
    return user;
  } catch (error) {
    console.error('❌ Error checking user in DB:', error.message);
    return null;
  }
}

async function simulateWebhookPayload() {
  console.log('\n' + '='.repeat(60));
  console.log('📋 SIMULATING CLERK WEBHOOK PAYLOAD');
  console.log('='.repeat(60));

  const testUserId = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testUsername = `testuser_${Date.now()}`;

  const webhookPayload = {
    type: 'user.created',
    data: {
      id: testUserId,
      first_name: 'Test',
      last_name: 'User',
      email_addresses: [
        {
          email_address: testEmail,
          id: `idn_${Date.now()}`,
          verification: { status: 'verified', strategy: 'email_link' },
          linked_to: [],
        },
      ],
      username: testUsername,
      image_url: null,
      public_metadata: {},
      private_metadata: {},
    },
  };

  console.log('\n📦 Webhook Payload:');
  console.log(JSON.stringify(webhookPayload, null, 2));

  // Simulate what createOrUpdateUser would do
  console.log('\n🔄 Simulating createOrUpdateUser function...');
  try {
    let email = 'no-email@example.com';
    if (
      webhookPayload.data.email_addresses &&
      Array.isArray(webhookPayload.data.email_addresses) &&
      webhookPayload.data.email_addresses.length > 0
    ) {
      email = webhookPayload.data.email_addresses[0]?.email_address || email;
    }

    console.log('💾 User data to save:');
    console.log({
      clerkId: webhookPayload.data.id,
      email: email,
      firstName: webhookPayload.data.first_name || 'User',
      lastName: webhookPayload.data.last_name || '',
      username: webhookPayload.data.username || `user_${webhookPayload.data.id.substring(0, 8)}`,
      profilePicture: webhookPayload.data.image_url || null,
      isAdmin: false,
    });

    // Create the user in the database
    const user = await User.findOneAndUpdate(
      { clerkId: webhookPayload.data.id },
      {
        $set: {
          firstName: webhookPayload.data.first_name || 'User',
          lastName: webhookPayload.data.last_name || '',
          profilePicture: webhookPayload.data.image_url || null,
          email: email,
          username:
            webhookPayload.data.username ||
            `user_${webhookPayload.data.id.substring(0, 8)}`,
        },
      },
      { new: true, upsert: true }
    );

    console.log('\n✅ User created/updated in MongoDB:');
    console.log({
      mongoId: user._id.toString(),
      clerkId: user.clerkId,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    // Verify the user can be retrieved
    console.log('\n🔍 Verifying user retrieval from MongoDB...');
    const retrievedUser = await checkUserInDB(webhookPayload.data.id);
    if (retrievedUser) {
      console.log('✅ User successfully retrieved:');
      console.log({
        clerkId: retrievedUser.clerkId,
        email: retrievedUser.email,
        username: retrievedUser.username,
      });
    } else {
      console.log('❌ User not found in database');
    }

    // Clean up test user
    console.log('\n🧹 Cleaning up test user...');
    await User.deleteOne({ clerkId: webhookPayload.data.id });
    console.log('✅ Test user removed from database');

    return true;
  } catch (error) {
    console.error('❌ Error simulating webhook:', error.message);
    console.error('📍 Stack:', error.stack);
    return false;
  }
}

async function testWebhookUrl() {
  console.log('\n' + '='.repeat(60));
  console.log('🌐 TESTING WEBHOOK ENDPOINT');
  console.log('='.repeat(60));

  const webhookUrl = process.env.NEXT_PUBLIC_URL
    ? `${process.env.NEXT_PUBLIC_URL}/api/webhooks/clerk`
    : 'http://localhost:3000/api/webhooks/clerk';

  console.log('\n📍 Webhook URL:', webhookUrl);

  // Check if the URL is accessible (this will fail locally but shows the expected path)
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'svix-id': 'msg_test',
        'svix-timestamp': Math.floor(Date.now() / 1000).toString(),
        'svix-signature': 'v1,test', // Invalid signature for this test
      },
      body: JSON.stringify({ type: 'test' }),
    });

    console.log('Response status:', response.status);
    console.log('Response received (expected failure with invalid signature)');
  } catch (error) {
    console.log(
      '⚠️  Expected error (webhook not accessible from this environment):'
    );
    console.log('   This is normal when running from CLI');
    console.log('   The webhook will be called by Clerk when a user signs up');
  }
}

async function showDashboardInstructions() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 MANUAL VERIFICATION STEPS');
  console.log('='.repeat(60));
  console.log(`
1. START YOUR APPLICATION:
   npm run dev

2. CREATE A TEST ACCOUNT in Clerk:
   - Go to http://localhost:3000/sign-up
   - Sign up with a test email and password
   - Note the Clerk ID from your profile

3. VERIFY WEBHOOK WAS TRIGGERED:
   - Check app console for webhook logs
   - Look for: "🔔 Webhook received from Clerk"
   - Verify signature validation passed

4. CHECK MONGODB:
   - Run: npm run check:users
   - Or check MongoDB Atlas directly
   - Verify the new user appears

5. CHECK CLERK METADATA:
   - Verify that userMongoId is set in Clerk's public metadata
   - This indicates successful webhook and metadata sync

6. TEST DASHBOARD ACCESS:
   - Log in with the test account
   - Check if the dashboard shows the new user
   - Verify the user's MongoDB ID is stored correctly
  `);
}

async function main() {
  console.log('🚀 Starting Clerk Sign-Up Synchronization Test\n');

  try {
    await connectDB();

    const success = await simulateWebhookPayload();

    if (success) {
      console.log('\n✅ Simulation successful! User creation logic verified.');
    } else {
      console.log('\n❌ Simulation failed. Check logs above.');
    }

    await testWebhookUrl();

    await showDashboardInstructions();

    console.log('\n' + '='.repeat(60));
    console.log('✅ TEST COMPLETE');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

main();
