import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  console.log('🔔 Webhook received from Clerk');
  console.log('📍 Request URL:', req.url);
  console.log('📍 Request method:', req.method);
  
  const SIGNING_SECRET = process.env.WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error('❌ Error: WEBHOOK_SECRET is not set in environment');
    console.error('📍 Available env vars:', Object.keys(process.env).filter(k => k.includes('WEBHOOK') || k.includes('CLERK')));
    return new Response(JSON.stringify({ error: 'WEBHOOK_SECRET not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  console.log('🔑 Webhook secret found:', SIGNING_SECRET.substring(0, 15) + '...');

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  console.log('📋 Webhook headers:', {
    'svix-id': svix_id ? '✅' : '❌',
    'svix-timestamp': svix_timestamp ? '✅' : '❌',
    'svix-signature': svix_signature ? '✅' : '❌',
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Missing svix headers:', { svix_id, svix_timestamp, svix_signature });
    return new Response(JSON.stringify({ error: 'Missing svix headers' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get body
  let payload: any;
  try {
    payload = await req.json();
    console.log('📦 Webhook payload:', JSON.stringify(payload).substring(0, 200) + '...');
  } catch (err) {
    console.error('❌ Error parsing JSON:', err);
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    console.log('🔐 Verifying webhook signature...');
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
    console.log('✅ Webhook signature verified');
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return new Response(JSON.stringify({ error: 'Signature verification failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log('📋 Event type:', eventType);

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
      
      console.log('✅ User created/updated in MongoDB:', {
        mongoId: user?._id,
        username: user?.username,
        email: user?.email,
      });

      // If this is a new user creation, update their public metadata with MongoDB ID
      if (eventType === 'user.created' && user) {
        try {
          console.log('📝 Updating Clerk user metadata...');
          const client = await clerkClient();
          
          const result = await client.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id?.toString(),
              isAdmin: user.isAdmin || false,
            },
          });
          
          console.log('✅ Clerk metadata updated successfully');
          console.log('📍 Updated metadata:', result.publicMetadata);
        } catch (metadataError: any) {
          console.error('⚠️  Error updating Clerk metadata on first attempt');
          console.error('📍 Error:', metadataError.message);
          
          // Retry after 1 second
          try {
            console.log('🔄 Retrying metadata update...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const client = await clerkClient();
            await client.users.updateUserMetadata(id, {
              publicMetadata: {
                userMongoId: user._id?.toString(),
                isAdmin: user.isAdmin || false,
              },
            });
            console.log('✅ Clerk metadata updated successfully on retry');
          } catch (retryError: any) {
            console.error('⚠️  Error updating Clerk metadata on retry');
            console.error('📍 Error:', retryError.message);
            // Don't fail the webhook - user was created in MongoDB
          }
        }
      }

      return new Response(JSON.stringify({ success: true, userId: user?._id }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error: any) {
      console.error('❌ Error creating/updating user:', error);
      console.error('📍 Error details:', error.message);
      console.error('📍 Stack:', error.stack);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    console.log('🗑️  Deleting user:', id);

    try {
      await deleteUser(id!);
      console.log('✅ User deleted from MongoDB');
      return new Response(JSON.stringify({ success: true }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error: any) {
      console.error('❌ Error deleting user:', error);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  console.log('ℹ️  Unhandled webhook event type:', eventType);
  return new Response(JSON.stringify({ received: true }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
