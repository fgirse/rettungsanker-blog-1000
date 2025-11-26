import { NextResponse } from 'next/server';
import Post from '../../../../lib/models/post.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export async function DELETE(req: Request) {
  console.log('🗑️  DELETE /api/post/delete called');
  
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
    console.log('📦 Delete request data:', data);
    
    const { postId, userId } = data;
    
    // Check if user is admin or post owner
    const isAdmin = user.publicMetadata?.isAdmin === true;
    const isOwner = user.publicMetadata?.userMongoId === userId;
    
    console.log('🔐 Authorization check:', { isAdmin, isOwner });
    
    if (!isAdmin && !isOwner) {
      console.error('❌ Unauthorized - User is not admin or post owner');
      return NextResponse.json(
        { message: 'Unauthorized - You do not have permission to delete this post' },
        { status: 403 }
      );
    }
    
    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost) {
      console.error('❌ Post not found:', postId);
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Post deleted successfully:', deletedPost._id);
    
    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Error deleting post:', error);
    console.error('Stack trace:', error.stack);
    return NextResponse.json(
      { message: 'Error deleting post', error: error.message },
      { status: 500 }
    );
  }
}