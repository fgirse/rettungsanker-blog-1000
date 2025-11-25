import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/post.model';
import { auth } from '@clerk/nextjs/server';

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { message: 'You are not authorized to delete this post' },
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
        { message: 'You are not authorized to delete this post' },
        { status: 403 }
      );
    }

    await Post.findByIdAndDelete(postId);

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'Error deleting post', error: error.message },
      { status: 500 }
    );
  }
}
