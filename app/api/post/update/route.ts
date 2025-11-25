import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/post.model';
import { auth } from '@clerk/nextjs/server';

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { message: 'You are not authorized to update this post' },
        { status: 401 }
      );
    }

    await connect();
    
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const postUserId = searchParams.get('userId');

    if (!postId || !postUserId) {
      return NextResponse.json(
        { message: 'Please provide postId and userId' },
        { status: 400 }
      );
    }

    if (userId !== postUserId) {
      return NextResponse.json(
        { message: 'You are not authorized to update this post' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, content, category, image } = body;

    const updateData: any = {};
    
    if (title) {
      updateData.title = title;
      updateData.slug = title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
    }
    
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (image) updateData.image = image;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { message: 'Error updating post', error: error.message },
      { status: 500 }
    );
  }
}
