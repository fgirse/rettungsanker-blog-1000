// Quick script to check posts in MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    image: { type: String },
    category: { type: String, default: 'uncategorized' },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

async function checkPosts() {
  try {
    await mongoose.connect(mongoUri, { dbName: 'rettungsanker-blog' });
    console.log('✅ Connected to MongoDB\n');
    
    const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
    
    const count = await Post.countDocuments();
    console.log(`📊 Total posts: ${count}\n`);
    
    if (count > 0) {
      const posts = await Post.find().sort({ createdAt: -1 });
      console.log('📄 Posts in database:\n');
      posts.forEach((post, index) => {
        console.log(`${index + 1}. "${post.title}"`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   Category: ${post.category}`);
        console.log(`   User ID: ${post.userId}`);
        console.log(`   Created: ${post.createdAt}`);
        console.log(`   Content preview: ${post.content.substring(0, 100)}...`);
        console.log('');
      });
    } else {
      console.log('📭 No posts found. Create one through the UI at http://localhost:3000/dashboard/create-post\n');
    }
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkPosts();
