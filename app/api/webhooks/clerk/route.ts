import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';

// Retry configuration
const METADATA_RETRY_COUNT = 3;
const METADATA_RETRY_DELAY_MS = 1000;

async function updateClerkMetadataWithRetry(
  userId: string,
  mongoId: string,
  isAdmin: boolean,
  retryCount = 0
): Promise<boolean> {
  try {
    console.log(`🔄 Updating Clerk metadata (attempt ${retryCount + 1}/${METADATA_RETRY_COUNT})...`);
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        userMongoId: mongoId,
        isAdmin: isAdmin,
      },
    });
    console.log('✅ Updated Clerk metadata with MongoDB ID:', mongoId);
    return true;
  } catch (error: any) {
    console.error(`❌ Attempt ${retryCount + 1} failed to update Clerk metadata:`, error.message);

    // Retry if we haven't exceeded the retry limit
    if (retryCount < METADATA_RETRY_COUNT - 1) {
      const delayMs = METADATA_RETRY_DELAY_MS * (retryCount + 1); // Exponential backoff
      console.log(`⏳ Retrying in ${delayMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return updateClerkMetadataWithRetry(userId, mongoId, isAdmin, retryCount + 1);
    }

    console.warn(
      '⚠️  Failed to update Clerk metadata after all retries. User creation will continue without metadata.'
    );
    return false;
  }
}

export async function POST(req: Request) {
  const requestId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
  console.log(`\n🔔 [${requestId}] Webhook received from Clerk`);
  console.log(`📍 [${requestId}] Request URL:`, req.url);
  console.log(`📍 [${requestId}] Request method:`, req.method);
  
  const SIGNING_SECRET = process.env.WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error(`❌ [${requestId}] Error: WEBHOOK_SECRET is not set in environment`);
    console.error(`📍 [${requestId}] Available env vars:`, Object.keys(process.env).filter(k => k.includes('WEBHOOK') || k.includes('CLERK')));
    return new Response(JSON.stringify({ error: 'WEBHOOK_SECRET not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  console.log(`🔑 [${requestId}] Webhook secret found:`, SIGNING_SECRET.substring(0, 15) + '...');

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  console.log(`📋 [${requestId}] Webhook headers:`, {
    'svix-id': svix_id ? '✅' : '❌',
    'svix-timestamp': svix_timestamp ? '✅' : '❌',
    'svix-signature': svix_signature ? '✅' : '❌',
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error(`❌ [${requestId}] Missing svix headers:`, { svix_id, svix_timestamp, svix_signature });
    return new Response(JSON.stringify({ error: 'Missing svix headers' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get body
  let payload: any;
  try {
    payload = await req.json();
    console.log(`📦 [${requestId}] Webhook payload:`, JSON.stringify(payload).substring(0, 200) + '...');
  } catch (err) {
    console.error(`❌ [${requestId}] Error parsing JSON:`, err);
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    console.log(`🔐 [${requestId}] Verifying webhook signature...`);
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
    console.log(`✅ [${requestId}] Webhook signature verified`);
  } catch (err) {
    console.error(`❌ [${requestId}] Webhook verification failed:`, err);
    return new Response(JSON.stringify({ error: 'Signature verification failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log(`📋 [${requestId}] Event type:`, eventType);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses, username } = evt.data;
    
    console.log(`👤 [${requestId}] Processing user:`, {
      id,
      first_name,
      last_name,
      username,
      email: email_addresses?.[0]?.email_address,
    });

    try {
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );
      
      console.log(`✅ [${requestId}] User created/updated in MongoDB:`, {
        mongoId: user?._id,
        username: user?.username,
        email: user?.email,
      });

      // If this is a new user creation, update their public metadata with MongoDB ID
      if (eventType === 'user.created' && user) {
        console.log(`🔄 [${requestId}] Attempting to sync Clerk metadata...`);
        const metadataUpdated = await updateClerkMetadataWithRetry(
          id,
          user._id?.toString() || '',
          user.isAdmin || false
        );
        
        if (metadataUpdated) {
          console.log(`✅ [${requestId}] Clerk metadata synchronized successfully`);
        } else {
          console.warn(`⚠️  [${requestId}] Clerk metadata sync failed, but user was created in MongoDB`);
        }
      }

      return new Response(JSON.stringify({ success: true, userId: user?._id }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error: any) {
      console.error(`❌ [${requestId}] Error creating/updating user:`, error);
      console.error(`📍 [${requestId}] Error details:`, error.message);
      console.error(`📍 [${requestId}] Stack:`, error.stack);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    console.log(`🗑️  [${requestId}] Deleting user:`, id);

    try {
      await deleteUser(id!);
      console.log(`✅ [${requestId}] User deleted from MongoDB`);
      return new Response('User deleted successfully', { status: 200 });
    } catch (error) {
      console.error(`❌ [${requestId}] Error deleting user:`, error);
      return new Response('Error deleting user', { status: 500 });
    }
  }

  console.log(`ℹ️  [${requestId}] Unhandled webhook event type:`, eventType);
  return new Response('Webhook received', { status: 200 });
}
