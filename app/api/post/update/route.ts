import { NextResponse } from 'next/server';
import Post from '../../../../lib/models/post.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';

export async function PUT(req: Request) {
  console.log('✏️  PUT /api/post/update called');
  
  try {
    const user = await currentUser();
    console.log('👤 Current user:', user?.id);
    
    if (!user) {
      console.error('❌ No user found - not authenticated');
      return NextResponse.json(
        { message: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }
    
    await connect();
    console.log('✅ MongoDB connected');
    
    const data = await req.json();
    console.log('📦 Update request data:', {
      postId: data.postId,
      title: data.title,
      category: data.category,
    });

    // Check if user is admin or post owner
    const isAdmin = user.publicMetadata?.isAdmin === true;
    const isOwner = user.publicMetadata?.userMongoId === data.userMongoId;
    
    console.log('🔐 Authorization check:', { isAdmin, isOwner });

    if (!isAdmin && !isOwner) {
      console.error('❌ Unauthorized - User is not admin or post owner');
      return NextResponse.json(
        { message: 'Unauthorized - You do not have permission to update this post' },
        { status: 403 }
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      data.postId,
      {
        $set: {
          title: data.title,
          content: data.content,
          category: data.category,
          image: data.image,
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      console.error('❌ Post not found:', data.postId);
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    console.log('✅ Post updated successfully:', updatedPost._id);

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error updating post:', error);
    console.error('Stack trace:', error.stack);
    return NextResponse.json(
      { message: 'Error updating post', error: error.message },
      { status: 500 }
    );
  }
}
