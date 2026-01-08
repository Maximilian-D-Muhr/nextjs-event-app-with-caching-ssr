import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 86400 } // 24 hours cache
    });
    if (!res.ok) return { title: 'Post Not Found' };
    const post = await res.json();

    return {
      title: post.title,
      description: post.body.slice(0, 160),
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function PostDetail({ params }) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 86400 } // 24 hours cache
  });

  if (!res.ok) {
    notFound();
  }

  const post = await res.json();

  if (!post || !post.id) {
    notFound();
  }

  return (
    <main className='p-4 space-y-4 max-w-3xl mx-auto'>
      <Link href='/blog' className='text-blue-600 hover:underline'>
        ← Back to Blog
      </Link>

      <article className='border p-6 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
        <p className='text-gray-600 text-sm mb-4'>Post ID: {post.id} | User ID: {post.userId}</p>
        <p className='leading-relaxed'>{post.body}</p>
      </article>
    </main>
  );
}
