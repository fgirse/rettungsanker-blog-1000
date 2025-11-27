// Test MongoDB connection and Post model
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

console.log('🔍 Testing MongoDB Connection...');
console.log('📍 URI exists:', !!mongoUri);
console.log('📍 URI (masked):', mongoUri?.replace(/:[^:@]+@/, ':****@'));

async function testConnection() {
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'rettungsanker-blog',
    });
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    // Import Post model
    const postSchema = new mongoose.Schema(
      {
        userId: { type: String, required: true },
        content: { type: String, required: true },
        title: { type: String, required: true, unique: true },
        image: { type: String, default: 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png' },
        category: { type: String, default: 'uncategorized' },
        slug: { type: String, required: true, unique: true },
      },
      { timestamps: true }
    );
    
    const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
    
    // Check existing posts
    const postCount = await Post.countDocuments();
    console.log('📄 Existing posts count:', postCount);
    
    if (postCount > 0) {
      const posts = await Post.find().limit(3);
      console.log('📝 Sample posts:', posts.map(p => ({ title: p.title, slug: p.slug })));
    }
    
    // Create a test post
    const testPost = new Post({
      title: 'Test Post ' + Date.now(),
      content: 'This is a test post to verify MongoDB connection',
      slug: 'test-post-' + Date.now(),
      userId: 'test-user-id',
      category: 'test',
    });
    
    const saved = await testPost.save();
    console.log('✅ Test post created successfully!');
    console.log('🆔 Post ID:', saved._id);
    
    // Delete the test post
    await Post.deleteOne({ _id: saved._id });
    console.log('🗑️  Test post deleted');
    
    await mongoose.connection.close();
    console.log('👋 Connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testConnection();
