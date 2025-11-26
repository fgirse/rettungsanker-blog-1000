import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  console.log('🔔 Webhook received from Clerk');
  
  const SIGNING_SECRET = process.env.WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error('❌ Error: WEBHOOK_SECRET is not set');
    throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }
  
  console.log('🔑 Webhook secret configured:', SIGNING_SECRET.substring(0, 10) + '...');

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Error: Missing svix headers');
    return new Response('Error: Missing svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('❌ Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log('📋 Webhook event type:', eventType);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses, username } = evt.data;
    
    console.log('👤 Processing user:', {
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
      
      console.log('✅ User created/updated in MongoDB:', user?._id);

      // If this is a new user creation, update their public metadata with MongoDB ID
      if (eventType === 'user.created' && user) {
        try {
          const client = await clerkClient();
          await client.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id?.toString(),
              isAdmin: user.isAdmin || false,
            },
          });
          console.log('✅ Updated Clerk metadata with MongoDB ID');
        } catch (metadataError) {
          console.error('⚠️  Error updating Clerk metadata:', metadataError);
        }
      }

      return new Response('User created/updated successfully', { status: 200 });
    } catch (error) {
      console.error('❌ Error creating/updating user:', error);
      return new Response('Error processing user', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    console.log('🗑️  Deleting user:', id);

    try {
      await deleteUser(id!);
      console.log('✅ User deleted from MongoDB');
      return new Response('User deleted successfully', { status: 200 });
    } catch (error) {
      console.error('❌ Error deleting user:', error);
      return new Response('Error deleting user', { status: 500 });
    }
  }

  console.log('ℹ️  Unhandled webhook event type:', eventType);
  return new Response('Webhook received', { status: 200 });
}
