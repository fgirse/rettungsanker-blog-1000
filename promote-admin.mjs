// Script zum Promotieren eines Benutzers zu Admin
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

async function promoteToAdmin() {
  try {
    await mongoose.connect(mongoUri, { dbName: 'rettungsanker-blog' });
    console.log('✅ MongoDB verbunden\n');
    
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    
    // Zeige alle Benutzer
    const users = await User.find().sort({ createdAt: -1 });
    console.log('👥 Alle Benutzer in der Datenbank:\n');
    
    if (users.length === 0) {
      console.log('❌ Keine Benutzer gefunden');
      await mongoose.connection.close();
      process.exit(1);
    }
    
    users.forEach((user, index) => {
      console.log(`${index}. "${user.firstName} ${user.lastName}" (@${user.username})`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Admin: ${user.isAdmin ? '✅ Yes' : '❌ No'}`);
      console.log(`   MongoDB ID: ${user._id}\n`);
    });
    
    // Promotiere den ersten Benutzer zu Admin
    if (users.length > 0) {
      const firstUser = users[0];
      
      if (firstUser.isAdmin) {
        console.log(`⚠️  "${firstUser.firstName}" ist bereits ein Admin`);
      } else {
        firstUser.isAdmin = true;
        await firstUser.save();
        console.log(`✅ "${firstUser.firstName}" wurde zu Admin promotiert!`);
      }
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Fehler:', error.message);
    process.exit(1);
  }
}

promoteToAdmin();
