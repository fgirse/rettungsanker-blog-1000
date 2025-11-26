import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/post.model';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  console.log('🔵 POST /api/post/create called');
  
  try {
    const { userId } = await auth();
    console.log('👤 Authenticated userId from Clerk:', userId);
    
    if (!userId) {
      console.error('❌ No userId found - user not authenticated');
      return NextResponse.json(
        { message: 'You are not authorized to create a post' },
        { status: 401 }
      );
    }

    console.log('🔌 Connecting to MongoDB...');
    await connect();
    console.log('✅ MongoDB connected');
    
    const body = await req.json();
    console.log('📦 Request body:', body);
    
    const { title, content, category, image } = body;

    if (!title || !content) {
      console.error('❌ Missing required fields:', { title: !!title, content: !!content });
      return NextResponse.json(
        { message: 'Please provide all required fields (title and content)' },
        { status: 400 }
      );
    }

    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    console.log('📝 Creating post with slug:', slug);

    const postData = {
      title,
      content,
      category: category || 'uncategorized',
      image: image || 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
      slug,
      userId,
    };
    
    console.log('💾 Post data to save:', postData);

    const newPost = new Post(postData);
    const savedPost = await newPost.save();
    
    console.log('✅ Post saved successfully! ID:', savedPost._id);
    console.log('📄 Saved post:', savedPost);

    return NextResponse.json(savedPost, { status: 201 });
  } catch (error: any) {
    console.error('❌ Error creating post:', error);
    console.error('Stack trace:', error.stack);
    return NextResponse.json(
      { message: 'Error creating post', error: error.message, details: error.toString() },
      { status: 500 }
    );
  }
}
