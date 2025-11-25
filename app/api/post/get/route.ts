import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/post.model';

export async function POST(req: Request) {
  try {
    await connect();
    
    const body = await req.json();
    const {
      limit = 9,
      order = 'desc',
      category,
      searchTerm,
      userId,
      slug,
      postId,
      startIndex = 0,
    } = body;

    // Build query
    const query: any = {};
    
    if (userId) {
      query.userId = userId;
    }
    
    if (category && category !== 'uncategorized') {
      query.category = category;
    }
    
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { content: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    
    if (slug) {
      query.slug = slug;
    }
    
    if (postId) {
      query._id = postId;
    }

    const sortOrder = order === 'asc' ? 1 : -1;

    const posts = await Post.find(query)
      .sort({ updatedAt: sortOrder })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return NextResponse.json(
      {
        posts,
        totalPosts,
        lastMonthPosts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { message: 'Error fetching posts', error: error.message },
      { status: 500 }
    );
  }
}
