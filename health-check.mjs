#!/usr/bin/env node

/**
 * Health Check and Monitoring Script
 * Verifies all critical components of the Clerk + MongoDB integration
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Store results
const results = {
  timestamp: new Date().toISOString(),
  checks: {},
  summary: {},
};

function logCheck(name, passed, details = '') {
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${name}${details ? ': ' + details : ''}`);
  results.checks[name] = { passed, details };
}

async function checkEnvironmentVariables() {
  console.log('\n' + '='.repeat(70));
  console.log('🔧 ENVIRONMENT VARIABLES');
  console.log('='.repeat(70));

  const requiredVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'WEBHOOK_SECRET',
    'NEXT_PUBLIC_URL',
    'MONGODB_URL',
  ];

  let allPresent = true;
  requiredVars.forEach((varName) => {
    const value = process.env[varName];
    const passed = !!value;
    logCheck(varName, passed, passed ? 'Set' : 'NOT SET');
    if (!passed) allPresent = false;
  });

  return allPresent;
}

async function checkFileStructure() {
  console.log('\n' + '='.repeat(70));
  console.log('📁 FILE STRUCTURE');
  console.log('='.repeat(70));

  const requiredFiles = [
    'app/api/webhooks/clerk/route.ts',
    'lib/actions/user.js',
    'lib/models/user.model.js',
    'lib/mongodb/mongoose.js',
    'middleware.ts',
    '.env.local',
  ];

  let allExist = true;
  requiredFiles.forEach((filePath) => {
    const fullPath = `${__dirname}/${filePath}`;
    const exists = fs.existsSync(fullPath);
    logCheck(filePath, exists);
    if (!exists) allExist = false;
  });

  return allExist;
}

async function checkMongoDBConnection() {
  console.log('\n' + '='.repeat(70));
  console.log('🗄️  MONGODB CONNECTION');
  console.log('='.repeat(70));

  try {
    const connected = await mongoose.connect(MONGODB_URL, {
      dbName: 'rettungsanker-blog',
    });
    User = mongoose.model('User', userSchema, 'users');
    logCheck('MongoDB Connection', true, 'Connected');
    return true;
  } catch (error) {
    logCheck('MongoDB Connection', false, error.message);
    return false;
  }
}

async function checkUserCollection() {
  console.log('\n' + '='.repeat(70));
  console.log('👥 USER COLLECTION');
  console.log('='.repeat(70));

  try {
    const count = await User.countDocuments();
    logCheck('User Collection Accessible', true, `${count} documents`);

    const adminCount = await User.countDocuments({ isAdmin: true });
    logCheck('Admin Users', true, `${adminCount} admin(s)`);

    const regularCount = count - adminCount;
    logCheck('Regular Users', true, `${regularCount} user(s)`);

    // Check for duplicate emails or usernames
    const users = await User.find();
    const emails = new Set();
    const usernames = new Set();
    let emailDuplicates = 0;
    let usernameDuplicates = 0;

    users.forEach((user) => {
      if (emails.has(user.email)) emailDuplicates++;
      if (usernames.has(user.username)) usernameDuplicates++;
      emails.add(user.email);
      usernames.add(user.username);
    });

    logCheck('Email Uniqueness', emailDuplicates === 0, `${emailDuplicates} duplicates found`);
    logCheck('Username Uniqueness', usernameDuplicates === 0, `${usernameDuplicates} duplicates found`);

    return count > 0;
  } catch (error) {
    logCheck('User Collection', false, error.message);
    return false;
  }
}

async function checkWebhookHandler() {
  console.log('\n' + '='.repeat(70));
  console.log('🪝 WEBHOOK HANDLER');
  console.log('='.repeat(70));

  try {
    const filePath = `${__dirname}/app/api/webhooks/clerk/route.ts`;
    const content = fs.readFileSync(filePath, 'utf8');

    const checks = [
      ['WEBHOOK_SECRET validation', content.includes('WEBHOOK_SECRET')],
      ['Svix header validation', content.includes('svix-id')],
      ['user.created event handling', content.includes('user.created')],
      ['user.updated event handling', content.includes('user.updated')],
      ['user.deleted event handling', content.includes('user.deleted')],
      ['Clerk metadata sync', content.includes('publicMetadata')],
      ['Error handling', content.includes('catch')],
      ['Request logging', content.includes('console.log')],
    ];

    let allPassed = true;
    checks.forEach(([name, passed]) => {
      logCheck(name, passed);
      if (!passed) allPassed = false;
    });

    return allPassed;
  } catch (error) {
    logCheck('Webhook Handler', false, error.message);
    return false;
  }
}

async function checkUserActionHandler() {
  console.log('\n' + '='.repeat(70));
  console.log('⚙️  USER ACTION HANDLER');
  console.log('='.repeat(70));

  try {
    const filePath = `${__dirname}/lib/actions/user.js`;
    const content = fs.readFileSync(filePath, 'utf8');

    const checks = [
      ['createOrUpdateUser function', content.includes('createOrUpdateUser')],
      ['deleteUser function', content.includes('deleteUser')],
      ['MongoDB connection', content.includes('connect()')],
      ['Email handling', content.includes('email')],
      ['Error handling', content.includes('catch')],
      ['Logging', content.includes('console.log')],
    ];

    let allPassed = true;
    checks.forEach(([name, passed]) => {
      logCheck(name, passed);
      if (!passed) allPassed = false;
    });

    return allPassed;
  } catch (error) {
    logCheck('User Action Handler', false, error.message);
    return false;
  }
}

async function generateReport() {
  console.log('\n' + '='.repeat(70));
  console.log('📊 HEALTH CHECK SUMMARY');
  console.log('='.repeat(70));

  const totalChecks = Object.keys(results.checks).length;
  const passedChecks = Object.values(results.checks).filter((c) => c.passed).length;
  const failedChecks = totalChecks - passedChecks;

  console.log(`
Total Checks: ${totalChecks}
Passed: ${passedChecks} ✅
Failed: ${failedChecks} ❌
Success Rate: ${((passedChecks / totalChecks) * 100).toFixed(1)}%
Timestamp: ${results.timestamp}
`);

  if (failedChecks === 0) {
    console.log('🎉 ALL CHECKS PASSED! The application is healthy.');
  } else {
    console.log('⚠️  SOME CHECKS FAILED. Review the items marked with ❌ above.');
  }
}

async function showRecommendations() {
  console.log('\n' + '='.repeat(70));
  console.log('💡 RECOMMENDATIONS');
  console.log('='.repeat(70));

  console.log(`
1. VERIFY WEBHOOK SETUP:
   - Ensure WEBHOOK_SECRET matches Clerk Dashboard
   - Test webhook by creating a new user via /sign-up
   - Monitor logs for webhook events

2. TEST USER SYNCHRONIZATION:
   - Run: node test-signup-sync.mjs
   - Create a test account at /sign-up
   - Verify user appears in MongoDB

3. VERIFY CLERK METADATA:
   - Check Clerk Dashboard for userMongoId in publicMetadata
   - Run: node sync-clerk-metadata.mjs if missing

4. TEST DASHBOARD:
   - Navigate to http://localhost:3000/client
   - Verify dashboard loads with user data
   - Test admin features if promoted

5. MONITORING:
   - Watch application logs during sign-up
   - Check MongoDB for new users
   - Verify Clerk webhook delivery in Clerk Dashboard

6. PRODUCTION CHECKLIST:
   - ✅ Update NEXT_PUBLIC_URL to production domain
   - ✅ Update webhook endpoint in Clerk Dashboard
   - ✅ Verify MONGODB_URL uses production database
   - ✅ Test with real user creation
   - ✅ Set up log aggregation/monitoring
   - ✅ Configure alerts for webhook failures
`);
}

async function main() {
  console.log('🏥 HEALTH CHECK & MONITORING TOOL\n');

  try {
    // Run all checks
    const envOk = await checkEnvironmentVariables();
    const filesOk = await checkFileStructure();
    const mongoOk = await checkMongoDBConnection();

    if (mongoOk) {
      await checkUserCollection();
    }

    await checkWebhookHandler();
    await checkUserActionHandler();

    await generateReport();
    await showRecommendations();

    // Save report to file
    const reportPath = `${__dirname}/health-check-report.json`;
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📄 Report saved to: health-check-report.json`);

    console.log('\n' + '='.repeat(70));
    console.log('✅ HEALTH CHECK COMPLETE');
    console.log('='.repeat(70) + '\n');
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
}

main();
