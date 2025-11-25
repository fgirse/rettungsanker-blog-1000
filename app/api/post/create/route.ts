import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/post.model';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { message: 'You are not authorized to create a post' },
        { status: 401 }
      );
    }

    await connect();
    
    const body = await req.json();
    const { title, content, category, image } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
      title,
      content,
      category: category || 'uncategorized',
      image: image || 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
      slug,
      userId,
    });

    const savedPost = await newPost.save();

    return NextResponse.json(savedPost, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: 'Error creating post', error: error.message },
      { status: 500 }
    );
  }
}
