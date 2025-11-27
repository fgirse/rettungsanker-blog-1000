import Link from 'next/link';
import CallToAction from '@/app/components/CallToAction';
import RecentPosts from '@/app/components/RecentPosts';
import { connect } from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/post.model';

// Mark this page as dynamic since it fetches data
export const dynamic = 'force-dynamic';

export default async function Home() {
  let posts = null;
  try {
    // Connect to database and fetch posts directly
    await connect();
    posts = await Post.find({})
      .sort({ updatedAt: -1 })
      .limit(9)
      .lean();
    
    // Convert MongoDB _id to string for JSON serialization
    posts = posts.map((post: any) => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.log('Error getting post:', error);
  }
  return (
    <main className='w-screen overflow-x-hidden'>
      <div className='w-[95vw] max-w-[95vw] mx-auto' style={{ boxSizing: 'border-box' }}>
        <div className='px-4 py-8 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold lg:text-6xl mb-6'>Willkommen zum Rettungsanker-Blog</h1>
          <p className='text-gray-500 text-sm sm:text-base mb-6'>
            Entdecke zahlreiche Artikel, Meinungen und Stellungsnahmen zu Themen wie <span className="border rounded-xl p-1 bg-yellow-500">Rettungsanker-Freiburg</span>, <span className="border rounded-xl p-1 bg-red-700">SC Freiburg</span>, <span className="border rounded-xl p-1 bg-yellow-600">Bundesliga</span> oder <span className="border rounded-xl p-1 bg-yellow-400">allgemeines</span>, die unseren interessierten Nutzern durch einen Blog präsentiert werden. Unser Blog bietet eine Plattform für den Austausch von Gedanken und Ideen rund um diese spannenden Themen. Tauche ein in die Welt des Rettungsanker-Blogs und bleibe stets informiert! &nbsp; (Die Redaktion des Rettungsankers behält sich vor rassistische, sexistische  oder Gewalt verherrlichende Beiträge oder Bemerkungen zu entfernen!)
          </p>
          <Link
            href='/search'
            className='text-xl sm:text-sm text-teal-500 font-bold hover:underline'
          >
            View all posts
          </Link>
        </div>
        
        <div className='px-4 py-3 bg-amber-100 dark:bg-slate-700'>
          <CallToAction />
        </div>
        
        <div className='px-4 py-8 sm:px-6 lg:px-8'>
          <RecentPosts limit={9} />
          <div className='text-center mt-8'>
            <Link
              href={'/search?category=null'}
              className='text-3xl text-teal-500 hover:underline cursor-pointer'
            >
              View all posts
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
