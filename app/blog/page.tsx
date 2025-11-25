import Link from 'next/link';
import CallToAction from '@/app/components/CallToAction';
import RecentPosts from '@/app/components/RecentPosts';

// Mark this page as dynamic since it fetches data
export const dynamic = 'force-dynamic';

export default async function Home() {
  let posts = null;
  try {
    // Use absolute URL or relative path for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_URL || process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const result = await fetch(`${baseUrl}/api/post/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ limit: 9, order: 'desc' }),
      cache: 'no-store',
    });
    
    if (!result.ok) {
      throw new Error(`Failed to fetch posts: ${result.status}`);
    }
    
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log('Error getting post:', error);
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Willkommen zum Rettungsanker-Blog</h1>
        <p className='text-gray-500 text-sm sm:text-base'>
          Entdecke zahlreiche Artikel, Meinungen und Stellungsnahmen zu Themen wie <span className="border rounded-xl p-1 bg-yellow-500">Rettungsanker-Freiburg</span>, <span className="border rounded-xl p-1 bg-red-700">SC Freiburg</span>, <span className="border rounded-xl p-1 bg-yellow-600">Bundesliga</span> oder <span className="border rounded-xl p-1 bg-yellow-400">allgemeines</span>, die unseren interessierten Nutzern durch einen Blog präsentiert werden. Unser Blog bietet eine Plattform für den Austausch von Gedanken und Ideen rund um diese spannenden Themen. Tauche ein in die Welt des Rettungsanker-Blogs und bleibe stets informiert! &nbsp; (Die Redaktion des Rettungsankers behält sich vor rassistische, sexistische  oder Gewalt verherrlichende Beiträge oder Bemerkungen zu entfernen!)
       
          .
        </p>
        <Link
          href='/search'
          className='text-xl sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
      <div className='p-3 flex flex-col gap-8 py-7'>
        <RecentPosts limit={9} />
        <Link
          href={'/search?category=null'}
          className='text-3xl text-teal-500 hover:underline text-center cursor-pointer'
        >
          View all posts
        </Link>
      </div>
    </div>
  );
}
