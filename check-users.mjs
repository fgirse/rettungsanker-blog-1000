// Quick script to check users in MongoDB
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

async function checkUsers() {
  try {
    await mongoose.connect(mongoUri, { dbName: 'rettungsanker-blog' });
    console.log('✅ Connected to MongoDB\n');
    
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    
    const count = await User.countDocuments();
    console.log(`📊 Total users: ${count}\n`);
    
    if (count > 0) {
      const users = await User.find().sort({ createdAt: -1 });
      console.log('👥 Users in database:\n');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.firstName} ${user.lastName} (@${user.username})`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Clerk ID: ${user.clerkId}`);
        console.log(`   MongoDB ID: ${user._id}`);
        console.log(`   Admin: ${user.isAdmin ? '✅ Yes' : '❌ No'}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log(`   Updated: ${user.updatedAt}`);
        console.log('');
      });
    } else {
      console.log('📭 No users found in database.\n');
      console.log('💡 Users are created via Clerk webhooks when:');
      console.log('   1. A new user signs up');
      console.log('   2. An existing user updates their profile');
      console.log('   3. The webhook endpoint is properly configured\n');
      console.log('🔗 Webhook endpoint: http://localhost:3000/api/webhooks/clerk');
      console.log('📚 Configure webhooks at: https://dashboard.clerk.com\n');
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
