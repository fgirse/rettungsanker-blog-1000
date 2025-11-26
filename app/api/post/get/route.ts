import { NextResponse } from 'next/server';
import Post from '../../../../lib/models/post.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';

export async function POST(req: Request) {
  console.log('📥 POST /api/post/get called');
  
  try {
    await connect();
    console.log('✅ MongoDB connected');
    
    const data = await req.json();
    console.log('📦 Query parameters:', data);
    
    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === 'asc' ? 1 : -1;
    
    // Build query object
    const query: any = {};
    
    if (data.userId) {
      query.userId = data.userId;
    }
    
    if (data.category && data.category !== 'null' && data.category !== 'undefined') {
      query.category = data.category;
    }
    
    if (data.slug) {
      query.slug = data.slug;
    }
    
    if (data.postId) {
      query._id = data.postId;
    }
    
    if (data.searchTerm) {
      query.$or = [
        { title: { $regex: data.searchTerm, $options: 'i' } },
        { content: { $regex: data.searchTerm, $options: 'i' } },
      ];
    }
    
    console.log('🔍 Query:', JSON.stringify(query));
    
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    console.log('✅ Found posts:', {
      count: posts.length,
      totalPosts,
      lastMonthPosts,
    });

    return NextResponse.json(
      { posts, totalPosts, lastMonthPosts },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Error getting posts:', error);
    console.error('Stack trace:', error.stack);
    return NextResponse.json(
      { message: 'Error getting posts', error: error.message },
      { status: 500 }
    );
  }
}