#!/usr/bin/env node

/**
 * Debug script to verify Clerk webhook configuration
 * Checks environment variables, webhook endpoints, and Clerk configuration
 */

import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

console.log('🔍 CLERK WEBHOOK CONFIGURATION DEBUG\n');
console.log('='.repeat(60));

// Check environment variables
console.log('📋 ENVIRONMENT VARIABLES:');
console.log('='.repeat(60));

const requiredEnvVars = [
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'WEBHOOK_SECRET',
  'NEXT_PUBLIC_URL',
  'MONGODB_URL',
];

let allEnvVarsPresent = true;
requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    // Mask sensitive values
    let displayValue = value;
    if (
      varName.includes('SECRET') ||
      varName.includes('KEY') ||
      varName.includes('MONGODB')
    ) {
      displayValue = value.substring(0, 10) + '...' + value.substring(value.length - 5);
    }
    console.log(`✅ ${varName}: ${displayValue}`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allEnvVarsPresent = false;
  }
});

console.log('\n📍 WEBHOOK CONFIGURATION:');
console.log('='.repeat(60));

const webhookSecret = process.env.WEBHOOK_SECRET;
const appUrl = process.env.NEXT_PUBLIC_URL;

if (webhookSecret && appUrl) {
  console.log(`✅ Webhook Secret is set`);
  console.log(`✅ App URL: ${appUrl}`);
  console.log(`✅ Expected Webhook Endpoint:`);
  console.log(`   ${appUrl}/api/webhooks/clerk`);
} else {
  console.log('❌ Missing webhook configuration');
}

console.log('\n📂 FILE STRUCTURE:');
console.log('='.repeat(60));

const requiredFiles = [
  'app/api/webhooks/clerk/route.ts',
  'lib/actions/user.js',
  'lib/models/user.model.js',
  'lib/mongodb/mongoose.js',
  '.env.local',
];

requiredFiles.forEach((filePath) => {
  const exists = fs.existsSync(filePath);
  const icon = exists ? '✅' : '❌';
  console.log(`${icon} ${filePath}`);
});

console.log('\n🔐 WEBHOOK ENDPOINT DETAILS:');
console.log('='.repeat(60));

console.log(`
POST endpoint: ${appUrl || 'http://localhost:3000'}/api/webhooks/clerk

Expected headers:
  - svix-id: Message ID from Clerk
  - svix-timestamp: Unix timestamp
  - svix-signature: HMAC signature

Expected body:
  - type: "user.created" or "user.updated" or "user.deleted"
  - data: User object with id, first_name, last_name, email_addresses, etc.

Clerk Dashboard Configuration:
  1. Go to https://dashboard.clerk.com
  2. Select your application
  3. Navigate to Webhooks
  4. Create an endpoint with:
     - URL: ${appUrl}/api/webhooks/clerk
     - Events: user.created, user.updated, user.deleted
     - Secret: Use the WEBHOOK_SECRET from your .env.local file
`);

console.log('\n🧪 TESTING WEBHOOK HANDLER:');
console.log('='.repeat(60));

try {
  const webhookFile = fs.readFileSync('app/api/webhooks/clerk/route.ts', 'utf8');

  const hasWebhookSecret = webhookFile.includes('WEBHOOK_SECRET');
  const hasSvixValidation = webhookFile.includes('svix-id');
  const hasUserCreated = webhookFile.includes('user.created');
  const hasMetadataSync = webhookFile.includes('publicMetadata');

  console.log(`${hasWebhookSecret ? '✅' : '❌'} Webhook secret validation`);
  console.log(`${hasSvixValidation ? '✅' : '❌'} Svix header validation`);
  console.log(`${hasUserCreated ? '✅' : '❌'} user.created event handling`);
  console.log(`${hasMetadataSync ? '✅' : '❌'} Clerk metadata sync`);
} catch (error) {
  console.log('❌ Could not read webhook handler file');
}

console.log('\n📊 SUMMARY:');
console.log('='.repeat(60));

if (allEnvVarsPresent && webhookSecret && appUrl) {
  console.log(
    '✅ All required configurations are present!'
  );
  console.log(`
Next steps:
1. Make sure your app is running: npm run dev
2. Set the webhook endpoint in Clerk Dashboard to:
   ${appUrl}/api/webhooks/clerk
3. Create a test account via ${appUrl}/sign-up
4. Check your app logs for webhook activity
5. Verify user appears in MongoDB
  `);
} else {
  console.log('❌ Some configurations are missing!');
  console.log('Please check the items marked with ❌ above.');
}

console.log('='.repeat(60));
