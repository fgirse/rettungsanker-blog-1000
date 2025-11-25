import PostCard from './PostCard';
import { connect } from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/post.model';

export default async function RecentPosts({limit}) {
  let posts = null;
  try {
    await connect();
    const fetchedPosts = await Post.find({})
      .sort({ updatedAt: -1 })
      .limit(limit || 3)
      .lean();
    
    posts = fetchedPosts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.log('Error getting post:', error);
  }
  return (
    <div className='flex flex-col justify-center items-center mb-5'>
      <h1 className='text-xl mt-5'>Recent articles</h1>
      <div className='flex flex-wrap gap-5 mt-5 justify-center'>
        {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}