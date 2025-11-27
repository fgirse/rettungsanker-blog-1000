// Manual sync script for existing Clerk users
import { clerkClient } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

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

async function syncUsers() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoUri, { dbName: 'rettungsanker-blog' });
    console.log('✅ MongoDB connected\n');
    
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    
    console.log('📥 Fetching users from Clerk...');
    const client = await clerkClient();
    const { data: clerkUsers } = await client.users.getUserList();
    
    console.log(`📊 Found ${clerkUsers.length} users in Clerk\n`);
    
    for (const clerkUser of clerkUsers) {
      try {
        console.log(`👤 Processing: ${clerkUser.firstName} ${clerkUser.lastName} (@${clerkUser.username})`);
        
        const user = await User.findOneAndUpdate(
          { clerkId: clerkUser.id },
          {
            $set: {
              firstName: clerkUser.firstName || 'Unknown',
              lastName: clerkUser.lastName || 'Unknown',
              profilePicture: clerkUser.imageUrl,
              email: clerkUser.emailAddresses[0].emailAddress,
              username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split('@')[0],
            },
          },
          { new: true, upsert: true }
        );
        
        console.log(`   ✅ Synced to MongoDB (ID: ${user._id})`);
        
        // Update Clerk metadata
        await client.users.updateUserMetadata(clerkUser.id, {
          publicMetadata: {
            userMongoId: user._id.toString(),
            isAdmin: user.isAdmin || false,
          },
        });
        
        console.log(`   ✅ Updated Clerk metadata\n`);
      } catch (error) {
        console.error(`   ❌ Error syncing user:`, error.message, '\n');
      }
    }
    
    console.log('✅ Sync complete!');
    
    const totalUsers = await User.countDocuments();
    console.log(`📊 Total users in MongoDB: ${totalUsers}`);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

syncUsers();
