// Script um Clerk-Metadaten mit MongoDB IDs zu synchronisieren
import pkg from '@clerk/nextjs/server';
const { clerkClient } = pkg;
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

async function syncClerkMetadata() {
  try {
    await mongoose.connect(mongoUri, { dbName: 'rettungsanker-blog' });
    console.log('✅ MongoDB verbunden\n');
    
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    const client = await clerkClient();
    
    // Hole alle MongoDB-Benutzer
    const mongoUsers = await User.find();
    console.log(`📊 Gefundene MongoDB-Benutzer: ${mongoUsers.length}\n`);
    
    for (const mongoUser of mongoUsers) {
      try {
        console.log(`👤 Aktualisiere: ${mongoUser.firstName} ${mongoUser.lastName}`);
        console.log(`   Clerk ID: ${mongoUser.clerkId}`);
        console.log(`   MongoDB ID: ${mongoUser._id}`);
        
        // Update Clerk metadata
        await client.users.updateUserMetadata(mongoUser.clerkId, {
          publicMetadata: {
            userMongoId: mongoUser._id.toString(),
            isAdmin: mongoUser.isAdmin,
          },
        });
        
        console.log(`   ✅ Metadaten aktualisiert\n`);
      } catch (error) {
        console.error(`   ❌ Fehler:`, error.message, '\n');
      }
    }
    
    console.log('✅ Synchronisierung abgeschlossen!');
    await mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Fehler:', error.message);
    process.exit(1);
  }
}

syncClerkMetadata();
