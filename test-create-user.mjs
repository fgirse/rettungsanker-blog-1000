// Manueller Test zum Erstellen eines Users in MongoDB
import { connect } from './lib/mongodb/mongoose.js';
import User from './lib/models/user.model.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function createTestUser() {
  try {
    console.log('🔌 Verbindung zu MongoDB...');
    await connect();
    console.log('✅ MongoDB verbunden');

    // Test-User erstellen
    const testUser = new User({
      clerkId: 'test_user_' + Date.now(),
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser_' + Date.now(),
      isAdmin: false,
    });

    const savedUser = await testUser.save();
    console.log('✅ Test-User erfolgreich erstellt:');
    console.log(savedUser);

    // Alle User abrufen
    const allUsers = await User.find();
    console.log(`\n📊 Gesamt Users in DB: ${allUsers.length}`);

  } catch (error) {
    console.error('❌ Fehler:', error.message);
    process.exit(1);
  }
}

createTestUser();
